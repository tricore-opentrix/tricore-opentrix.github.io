// SPDX-License-Identifier: Apache-2.0
// Read-only HTTP probes. Run again against the actual reviewed deployment.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './build-site.mjs';
const origin = new URL(process.argv[2] || 'https://tricore-opentrix.github.io/');
if (!['https:', 'http:'].includes(origin.protocol)) throw Error('Expected HTTP origin');
const paths = ['blog.html', ...readdirSync(join(root, 'articles')).filter(f => f.endsWith('.html')).map(f => 'articles/' + f)];
const results = [];
for (const path of paths) {
  const source = readFileSync(join(root, path), 'utf8');
  const title = source.match(/<title>(.*?)<\/title>/s)?.[1];
  for (const variant of [path, path.replace(/\.html$/, ''), path.replace(/\.html$/, '/')]) {
    const url = new URL(variant, origin).href;
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      const body = await response.text();
      const leaked = Boolean(title && body.includes(title));
      results.push({ url, finalUrl: response.url, status: response.status, heldTitlePresent: leaked,
        result: [404, 410].includes(response.status) && !leaked ? 'PASS' : 'FAIL' });
    } catch (error) { results.push({ url, result: 'BLOCKED', error: error.message }); }
  }
}
mkdirSync(join(root, '.local'), { recursive: true });
const summary = { checkedAt: new Date().toISOString(), origin: origin.href, results,
  result: results.some(r => r.result === 'FAIL') ? 'FAIL' : results.some(r => r.result === 'BLOCKED') ? 'BLOCKED' : 'PASS' };
writeFileSync(join(root, '.local/deployed-check.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
if (summary.result !== 'PASS') process.exitCode = 1;
