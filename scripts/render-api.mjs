// SPDX-License-Identifier: Apache-2.0
import { parseOpenAPI } from './openapi.mjs';
export const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = data => escapeHTML(JSON.stringify(data, null, 2));
export function renderAPI(spec, { test = false } = {}) {
  const model = parseOpenAPI(spec);
  const label = test ? 'TEST fixture — không phải API OpenTrix đã phát hành' : 'API từ export được reviewer xác nhận; playground luôn MOCK';
  const blocks = (id, title, value) => `<h4>${title}</h4><button type="button" class="text-button" data-copy="${id}">Sao chép ${title}</button><pre id="${id}"><code>${json(value)}</code></pre>`;
  let html = `<div class="evidence-note" data-claim="M34 M35"><p><strong>${label}</strong></p><p>MOCK deterministic theo seed, độ trễ giả lập 180 ms, không gửi yêu cầu API. Sampler chỉ hỗ trợ một tập con schema; cấu trúc chưa hỗ trợ được thông báo rõ.</p><a href="${test ? 'test-api-docs.json' : 'api-docs.json'}" download>Tải JSON ${test ? 'TEST' : 'OpenAPI'}</a></div><p id="copy-status" role="status" aria-live="polite"></p><nav aria-label="Nhóm endpoint">`;
  for (const {tag, slugs} of model.groups) html += `<details open><summary>${escapeHTML(tag)}</summary><ul>${slugs.map(slug => `<li><a href="#${slug}">${escapeHTML(model.operations.find(o => o.slug === slug).key)}</a></li>`).join('')}</ul></details>`;
  html += '</nav>';
  for (const o of model.operations) html += `<section class="api-operation" id="${o.slug}" data-claim="M34 M35"><h2>${escapeHTML(o.tags.join(' · '))}</h2><h3>${escapeHTML(o.key)}</h3><p>${escapeHTML(o.summary)}</p><p>${escapeHTML(o.description)}</p>${blocks(o.slug+'-params','Parameters',o.parameters)}${blocks(o.slug+'-request','Request body',o.requestBody || null)}${blocks(o.slug+'-response','Responses',o.responses)}${blocks(o.slug+'-security','Security',o.security)}<label for="${o.slug}-seed">Seed MOCK</label><input type="text" id="${o.slug}-seed" value="7" maxlength="64"><button type="button" class="button secondary" data-mock="${o.slug}">Try it out — MOCK</button><pre class="mock-result" role="status" aria-live="polite">MOCK — chưa mô phỏng.</pre></section>`;
  html += `<section data-claim="M34">${blocks('api-schemas', 'JSON schemas', model.schemas)}</section>`;
  const data = JSON.stringify({model, spec}).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  html += `<script type="application/json" id="api-model">${data}</script><script type="module" src="/assets/api-reference.mjs"></script>`;
  return { html, model };
}
