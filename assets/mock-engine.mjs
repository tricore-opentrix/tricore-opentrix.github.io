// SPDX-License-Identifier: Apache-2.0
// Small deterministic MOCK sampler. Explicitly not a general JSON Schema validator.
const unsupported = ['pattern', 'allOf', 'not', 'if', 'then', 'else', 'contains', 'multipleOf', 'dependentSchemas', 'patternProperties', 'prefixItems', 'uniqueItems'];
export function sampleSchema(schema, spec, seed = '7', seen = new Set(), depth = 0) {
  if (depth > 12 || schema === false || !schema || typeof schema !== 'object') throw Error('Schema không được MOCK sampler hỗ trợ');
  if (schema.$ref) {
    if (!schema.$ref.startsWith('#/') || seen.has(schema.$ref)) throw Error('MOCK không hỗ trợ reference ngoài file hoặc đệ quy');
    const next = new Set(seen); next.add(schema.$ref);
    let value = spec;
    for (const part of schema.$ref.slice(2).split('/').map(p => decodeURIComponent(p).replace(/~1/g, '/').replace(/~0/g, '~'))) {
      if (!value || !Object.hasOwn(value, part)) throw Error('Reference không tồn tại');
      value = value[part];
    }
    return sampleSchema(value, spec, seed, next, depth + 1);
  }
  for (const key of unsupported) if (Object.hasOwn(schema, key)) throw Error(`MOCK chưa hỗ trợ ${key}; xem schema gốc`);
  let hash = 2166136261;
  for (const c of String(seed)) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619) >>> 0;
  if (Object.hasOwn(schema, 'const')) return schema.const;
  if (schema.enum?.length) return schema.enum[hash % schema.enum.length];
  if (schema.oneOf || schema.anyOf) throw Error('MOCK chưa hỗ trợ oneOf/anyOf; xem schema gốc');
  let type = Array.isArray(schema.type) ? schema.type.find(t => t !== 'null') || 'null' : schema.type;
  type ||= schema.properties ? 'object' : schema.items ? 'array' : undefined;
  switch (type) {
    case 'null': return null;
    case 'boolean': return hash % 2 === 0;
    case 'integer': case 'number': {
      let low = schema.minimum ?? 0, high = schema.maximum ?? Math.max(low + 9, 9);
      if (typeof schema.exclusiveMinimum === 'number') low = Math.max(low, schema.exclusiveMinimum + 1);
      else if (schema.exclusiveMinimum) low += 1;
      if (typeof schema.exclusiveMaximum === 'number') high = Math.min(high, schema.exclusiveMaximum - 1);
      else if (schema.exclusiveMaximum) high -= 1;
      low = Math.ceil(low); high = Math.floor(high);
      if (!Number.isSafeInteger(low) || !Number.isSafeInteger(high) || high < low) throw Error('MOCK không hỗ trợ khoảng số này');
      return low + hash % (Math.min(high - low, 1000000) + 1);
    }
    case 'string': {
      let text;
      switch (schema.format) {
        case undefined: text = `MOCK-${hash.toString(16)}`; break;
        case 'uuid': text = `${hash.toString(16).padStart(8, '0')}-0000-4000-8000-000000000000`; break;
        case 'date-time': text = '2000-01-01T00:00:00Z'; break;
        case 'date': text = '2000-01-01'; break;
        case 'email': text = 'mock@example.test'; break;
        default: throw Error(`MOCK chưa hỗ trợ format ${schema.format}`);
      }
      const min = schema.minLength ?? 0, max = schema.maxLength ?? Math.max(min, 256);
      if (min > 256 || min < 0 || max < min || (schema.format && (text.length < min || text.length > max))) throw Error('MOCK không hỗ trợ độ dài này');
      return text.padEnd(min, 'x').slice(0, max);
    }
    case 'array': {
      const count = schema.minItems ?? Math.min(1, schema.maxItems ?? 1);
      if (!Number.isInteger(count) || count < 0 || count > 8 || count > (schema.maxItems ?? 8)) throw Error('MOCK hỗ trợ tối đa 8 phần tử');
      return Array.from({length:count}, (_, i) => sampleSchema(schema.items, spec, `${seed}:${i}`, seen, depth + 1));
    }
    case 'object': {
      const props = schema.properties || {};
      if ((schema.required || []).some(k => !Object.hasOwn(props, k))) throw Error('MOCK thiếu schema cho required property');
      if ((schema.minProperties ?? 0) > Object.keys(props).length || (schema.maxProperties ?? Infinity) < Object.keys(props).length) throw Error('MOCK chưa hỗ trợ property bounds này');
      return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, sampleSchema(value, spec, `${seed}:${key}`, seen, depth + 1)]));
    }
    default: throw Error('MOCK cần type cụ thể; không tự suy schema sản phẩm');
  }
}
export function mockResponse(operation, spec, seed) {
  const status = Object.keys(operation.responses).filter(c => /^2\d\d$/.test(c)).sort()[0];
  if (!status) throw Error('MOCK cần response 2xx cụ thể');
  const response = operation.responses[status];
  if (status === '204') return {label:'MOCK', status:204, body:null};
  const schema = response.content?.['application/json']?.schema;
  if (!schema) throw Error('MOCK chỉ hỗ trợ response application/json có schema');
  return {label:'MOCK', status:Number(status), body:sampleSchema(schema, spec, `${operation.key}:${seed}`)};
}
