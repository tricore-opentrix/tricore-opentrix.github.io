// SPDX-License-Identifier: Apache-2.0
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOpenAPI } from '../scripts/openapi.mjs';
import { renderAPI } from '../scripts/render-api.mjs';
import { mockResponse, sampleSchema } from '../assets/mock-engine.mjs';
const spec = JSON.parse(readFileSync(new URL('./fixtures/test-openapi.json', import.meta.url)));
test('TEST seeded response repeats, changes with seed and respects fixture bounds', () => {
  const op = parseOpenAPI(spec).operations.find(o => o.path.includes('widgets') && o.method === 'GET');
  const a = mockResponse(op,spec,'7'); assert.deepEqual(a,mockResponse(op,spec,'7')); assert.notDeepEqual(a,mockResponse(op,spec,'8'));
  assert.equal(a.label,'MOCK'); assert(a.body.count>=1 && a.body.count<=9); assert.match(a.body.id,/^[a-f0-9]{8}-0000-4000-8000-000000000000$/);
});
test('204 and unsupported schemas are explicit, recursive refs do not loop', () => {
  const op = parseOpenAPI(spec).operations.find(o => o.path === '/test/ping'); assert.equal(mockResponse(op,spec,'7').body,null);
  assert.throws(()=>sampleSchema({type:'string',pattern:'^x'},spec),/pattern/);
  const s={components:{schemas:{Loop:{$ref:'#/components/schemas/Loop'}}}};
  assert.throws(()=>sampleSchema({$ref:'#/components/schemas/Loop'},s),/đệ quy/);
});
test('render all methods once and encode hostile text and embedded JSON', () => {
  const s=structuredClone(spec); s.info.title='</script><script>alert(1)</script>';
  s.paths['/test/ping'].get.summary='<img src=x onerror=alert(1)>';
  const {html,model}=renderAPI(s,{test:true});
  assert.equal((html.match(/class="api-operation"/g)||[]).length,model.operations.length);
  assert(!html.includes('<img')); assert(!html.includes('</script><script>alert'));
  const embedded=html.match(/id="api-model">([\s\S]*?)<\/script>/)[1]; assert.equal(JSON.parse(embedded).spec.info.title,s.info.title);
  assert(html.includes('test-api-docs.json')); assert(html.includes('TEST fixture'));
});
