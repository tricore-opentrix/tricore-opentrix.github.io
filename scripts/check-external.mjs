// SPDX-License-Identifier: Apache-2.0
// Read-only HTTP/fragment checks for actual landing targets, not all legacy source links.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './build-site.mjs';
const html = readFileSync(join(root, 'index.html'), 'utf8');
const urls = [...new Set([...html.matchAll(/href="(https:\/\/[^"\s]+)"/g)].map(m => m[1]))];
const cache = new Map();
const results = [];
for (const value of urls) {
  const url = new URL(value);
  const hash = url.hash.slice(1);
  url.hash = '';
  let response = cache.get(url.href);
  if (!response) {
    try {
      const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
      response = { status: r.status, finalUrl: r.url, body: await r.text() };
    } catch (error) { response = { error: error.message }; }
    cache.set(url.href, response);
  }
  // GitHub emits markdown heading anchors in its returned HTML/embedded rendering.
  const fragmentPresent = !hash || response.body?.includes(hash);
  results.push({ url: value, status: response.status, finalUrl: response.finalUrl,
    fragmentPresent, ...(response.error ? { error: response.error } : {}),
    result: response.error ? 'BLOCKED' : response.status === 200 && fragmentPresent ? 'PASS' : 'FAIL' });
}
mkdirSync(join(root, '.local'), { recursive: true });
const result = { checkedAt: new Date().toISOString(), results };
writeFileSync(join(root, '.local/external-check.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (results.some(r => r.result !== 'PASS')) process.exitCode = 1;
