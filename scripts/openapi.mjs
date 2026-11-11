// SPDX-License-Identifier: Apache-2.0
// Build-time reader only. No network, runtime discovery or hand-written product routes.
import { createHash } from 'node:crypto';
export const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
export function localRef(spec, ref) {
  if (typeof ref !== 'string' || !ref.startsWith('#/')) throw Error(`Only local JSON references are supported: ${ref}`);
  let result = spec;
  for (const part of ref.slice(2).split('/').map(p => decodeURIComponent(p).replace(/~1/g, '/').replace(/~0/g, '~'))) {
    if (!object(result) || !Object.hasOwn(result, part)) throw Error(`Unresolved reference: ${ref}`);
    result = result[part];
  }
  return result;
}
function deref(spec, value, seen = new Set()) {
  if (!value?.$ref) return value;
  if (seen.has(value.$ref)) throw Error('Cyclic non-schema reference');
  seen.add(value.$ref);
  return deref(spec, localRef(spec, value.$ref), seen);
}
export function parseOpenAPI(spec) {
  if (!object(spec) || !/^3\.(0|1)\.\d+$/.test(spec.openapi || '') || !object(spec.info) ||
      typeof spec.info.title !== 'string' || typeof spec.info.version !== 'string' || !object(spec.paths)) {
    throw Error('Expected OpenAPI 3.0/3.1 JSON with info.title, info.version and paths');
  }
  // Validate all references, including schemas, without expanding recursive schemas.
  const visit = value => {
    if (!value || typeof value !== 'object') return;
    if (value.$ref) localRef(spec, value.$ref);
    for (const child of Object.values(value)) visit(child);
  };
  visit(spec);
  const groups = new Map(), operations = [];
  for (const [path, raw] of Object.entries(spec.paths).sort(([a], [b]) => a.localeCompare(b))) {
    if (path.startsWith('x-')) continue;
    if (!path.startsWith('/') || !object(raw)) throw Error(`Invalid Path Item: ${path}`);
    const item = deref(spec, raw);
    for (const method of methods) {
      if (!Object.hasOwn(item, method)) continue;
      const operation = item[method];
      if (!object(operation) || !object(operation.responses) || !Object.keys(operation.responses).length) throw Error(`Missing responses: ${method} ${path}`);
      const parameters = new Map();
      for (const source of [item.parameters || [], operation.parameters || []]) {
        if (!Array.isArray(source)) throw Error('Parameters must be an array');
        for (const p of source) {
          const param = deref(spec, p);
          if (!object(param) || typeof param.name !== 'string' || !['path', 'query', 'header', 'cookie'].includes(param.in)) throw Error('Invalid parameter');
          parameters.set(`${param.in}:${param.name}`, param);
        }
      }
      for (const name of [...path.matchAll(/\{([^}]+)\}/g)].map(m => m[1])) {
        if (parameters.get(`path:${name}`)?.required !== true) throw Error(`Missing required path parameter ${name}`);
      }
      const tags = operation.tags?.length ? [...new Set(operation.tags)] : ['Untagged'];
      if (!tags.every(t => typeof t === 'string')) throw Error('Tags must be strings');
      const key = `${method.toUpperCase()} ${path}`;
      const slug = `${method}-${path.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${createHash('sha256').update(key).digest('hex').slice(0, 12)}`;
      const record = { key, slug, method: method.toUpperCase(), path, tags, summary: operation.summary || '', description: operation.description || '',
        parameters: [...parameters.values()], requestBody: deref(spec, operation.requestBody),
        responses: Object.fromEntries(Object.entries(operation.responses).map(([code, response]) => [code, deref(spec, response)])),
        security: operation.security ?? spec.security ?? [] };
      operations.push(record);
      for (const tag of tags) { if (!groups.has(tag)) groups.set(tag, []); groups.get(tag).push(slug); }
    }
  }
  return { title: spec.info.title, version: spec.info.version, operations,
    groups: [...groups].map(([tag, slugs]) => ({ tag, slugs })), schemas: spec.components?.schemas || {} };
}
export function verifyProvenance(bytes, spec, metadata) {
  parseOpenAPI(spec);
  if (spec['x-opentrix-fixture']) throw Error('TEST fixture cannot be published as an official API');
  const digest = createHash('sha256').update(bytes).digest('hex');
  if (metadata?.sha256 !== digest || !/^[a-f0-9]{40}$/.test(metadata.productCommit || '') ||
      metadata.runtimeCompared !== true || !metadata.approvedBy || !/^https:\/\/github\.com\/tricore-opentrix\/[^\s]+$/.test(metadata.approvalUrl || '') ||
      !Array.isArray(metadata.exports) || !['core-service', 'helpdesk-service'].every(service => metadata.exports.some(e =>
        e.service === service && e.sourcePath === '/v3/api-docs' && typeof e.exportedAt === 'string' &&
        /^[a-f0-9]{64}$/.test(e.sha256 || '') && typeof e.comparisonEvidence === 'string' && /^https:\/\/github\.com\/tricore-opentrix\//.test(e.comparisonEvidence)))) {
    throw Error('Official export needs matching SHA-256, product SHA, both service exports, runtime comparison and reviewer approval');
  }
  return digest;
}
