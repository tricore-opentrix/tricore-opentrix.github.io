// SPDX-License-Identifier: Apache-2.0
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOpenAPI, verifyProvenance } from '../scripts/openapi.mjs';
const bytes = readFileSync(new URL('./fixtures/test-openapi.json', import.meta.url));
const spec = JSON.parse(bytes);
test('TEST: every method/path, multi-tag grouping, required path params and stable unique slugs', () => {
  const a = parseOpenAPI(spec), b = parseOpenAPI(structuredClone(spec));
  assert.equal(a.operations.length, 3); assert.deepEqual(a, b);
  assert.equal(new Set(a.operations.map(o => o.slug)).size, 3);
  assert.equal(a.groups.find(g => g.tag === 'TEST Read').slugs.length, 1);
  assert.equal(a.operations.find(o => o.method === 'PATCH').parameters[0].name, 'id');
  assert(a.operations.some(o => o.tags.includes('Untagged')));
});
test('operation parameter overrides path parameter', () => {
  const s = structuredClone(spec);
  s.paths['/test/widgets/{id}'].get.parameters.push({name:'id',in:'path',required:true,schema:{type:'string',format:'uuid'}});
  const o = parseOpenAPI(s).operations.find(o => o.method === 'GET' && o.path.includes('widgets'));
  assert.equal(o.parameters.filter(p => p.name === 'id').length, 1); assert.equal(o.parameters[0].schema.format, 'uuid');
});
test('reject malformed, remote/missing refs and missing required path parameter', () => {
  for (const ref of ['https://example.test/remote.json', '#/missing']) {
    const s = structuredClone(spec); s.components.schemas.TestWidget = {$ref:ref}; assert.throws(() => parseOpenAPI(s));
  }
  assert.throws(() => parseOpenAPI({openapi:'2.0'}));
  const s = structuredClone(spec); s.paths['/test/widgets/{id}'].parameters = []; assert.throws(() => parseOpenAPI(s));
});
test('recursive schema refs remain finite and TEST cannot pass official gate', () => {
  const s = structuredClone(spec); s.components.schemas.TestWidget.properties.child = {$ref:'#/components/schemas/TestWidget'};
  assert.equal(parseOpenAPI(s).operations.length, 3); assert.throws(() => verifyProvenance(bytes, spec, {}), /TEST/);
  const official = structuredClone(spec); delete official['x-opentrix-fixture']; assert.throws(() => verifyProvenance(bytes, official, {}), /SHA-256/);
});
