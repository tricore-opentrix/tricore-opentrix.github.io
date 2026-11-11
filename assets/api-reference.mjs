// SPDX-License-Identifier: Apache-2.0
import { mockResponse } from './mock-engine.mjs';
const payload = document.querySelector('#api-model');
if (payload) {
  const { model, spec } = JSON.parse(payload.textContent);
  for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
    const block = document.getElementById(button.dataset.copy);
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(block.textContent);
      status.textContent = 'Đã sao chép JSON.';
    } catch {
      const range = document.createRange(); range.selectNodeContents(block);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Clipboard không khả dụng. JSON đã được chọn; dùng Ctrl+C hoặc Command+C.';
    }
  });
  for (const button of document.querySelectorAll('[data-mock]')) button.addEventListener('click', async () => {
    const section = button.closest('.api-operation');
    const output = section.querySelector('.mock-result');
    const seed = section.querySelector('input').value;
    button.disabled = true; section.setAttribute('aria-busy', 'true');
    output.textContent = 'MOCK — đang mô phỏng độ trễ 180 ms…';
    await new Promise(resolve => setTimeout(resolve, 180));
    try {
      const operation = model.operations.find(o => o.slug === button.dataset.mock);
      output.textContent = JSON.stringify(mockResponse(operation, spec, seed), null, 2);
    } catch (error) { output.textContent = `MOCK — ${error.message}`; }
    finally { button.disabled = false; section.removeAttribute('aria-busy'); }
  });
}
