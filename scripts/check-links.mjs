// SPDX-License-Identifier: Apache-2.0
// Checks only isolated artifact files; held source and historical URLs are not publication targets.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root } from './build-site.mjs';
export function checkLinks(artifact) {
  const manifest = JSON.parse(readFileSync(join(artifact, 'website-manifest.json')));
  let count = 0;
  for (const file of manifest.files.filter(f => f.endsWith('.html'))) {
    const text = readFileSync(join(artifact, file), 'utf8');
    const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
    for (const [, encoded] of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = encoded.replace(/&amp;/g, '&');
      if (href === 'data:,') continue;
      assert(!/^(?:javascript|data):/i.test(href), `Unsafe link ${href}`);
      const url = new URL(href, `https://local.test/${file}`);
      assert(['http:', 'https:'].includes(url.protocol), `Unexpected scheme ${href}`);
      if (url.hostname !== 'local.test') continue;
      let path = decodeURIComponent(url.pathname).slice(1) || 'index.html';
      if (path.endsWith('/')) path += 'index.html';
      if (path === 'docs') path = 'docs/index.html';
      assert(!path.includes('..') && !posix.isAbsolute(path), `Unsafe target ${path}`);
      assert(manifest.files.includes(path) && existsSync(join(artifact, path)), `${file}: unpublished target ${href}`);
      if (url.hash) assert(readFileSync(join(artifact,path),'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing fragment ${href}`);
      count++;
    }
  }
  return count;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const artifact = resolve(process.argv[2] || readFileSync(join(root,'.local/latest-build.txt'),'utf8').trim());
  console.log(`PASS: ${checkLinks(artifact)} internal links/assets/fragments`);
}
