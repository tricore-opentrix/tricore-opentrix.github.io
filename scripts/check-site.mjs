// SPDX-License-Identifier: Apache-2.0
// Content/publication regression checks for Issue #7.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, posix } from 'node:path';
import { runInNewContext } from 'node:vm';
import { approvedFiles, root } from './build-site.mjs';

const artifact = resolve(process.argv[2] || readFileSync(join(root, '.local/latest-build.txt'), 'utf8').trim());
const walk = (dir, prefix = '') => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(join(dir, e.name), prefix + e.name + '/') : [prefix + e.name]);
const publishedFiles=existsSync(join(artifact,'website-manifest.json'))?JSON.parse(readFileSync(join(artifact,'website-manifest.json'),'utf8')).files:approvedFiles;
assert.deepEqual(walk(artifact).sort(), [...publishedFiles].sort(), 'Artifact must exactly match the publication allowlist');
const html = readFileSync(join(artifact, 'index.html'), 'utf8');
const guide = readFileSync(join(root, 'MARKETING_GUIDE.md'), 'utf8');
for (let n = 0; n <= 12; n++) assert.equal((html.match(new RegExp(`id="s${n}"`, 'g')) || []).length, 1, `S${n}`);
const codes = new Set([...guide.matchAll(/^\| (M\d{2}) \|/gm)].map(m => m[1]));
const allHTML=approvedFiles.filter(f=>f.endsWith('.html')).map(f=>readFileSync(join(artifact,f),'utf8')).join('\n');
const used = new Set([...allHTML.matchAll(/data-claim="([^"]+)"/g)].flatMap(m => m[1].split(' ')));
for (const code of used) assert(codes.has(code), `Unmapped ${code}`);
// Reserved HOLD/dependency claims need not have a public page yet.
assert(!used.has('M26'), 'Personal fields stay HOLD');
assert(!used.has('M23'), 'Survey must stay HOLD');
assert(!/TRAKZOR|OPENTRIX/.test(html) && !/lexuanbao258-collab|blog\.html|articles\/|survey\.html|<img|<svg/i.test(html), 'Unapproved legacy content in landing');
for (const label of ['Available', 'Optional — off by default', 'Self-configured', 'Not yet']) assert(html.includes(label), label);
for (const file of approvedFiles.filter(f=>f.endsWith('.html'))) {
  const doc = readFileSync(join(artifact, file), 'utf8');
  const ids = [...doc.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
  for (const [, href] of doc.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (href === 'data:,') continue; // Empty favicon: no unverified logo or fallback request.
    if (href === 'data:,') continue; // Empty favicon: no unverified logo or fallback request.
    if (href.startsWith('https:')) {
      const u = new URL(href);
      assert(['github.com','vfossa.vn'].includes(u.hostname), 'Unverified external host');
      if(u.hostname==='github.com') assert(u.pathname.startsWith('/tricore-opentrix/opentrix')||u.pathname.startsWith('/tricore-opentrix/tricore-opentrix.github.io'),'Old repository');
    } else {
      const [path, fragment] = href.split('#');
      assert(!path.includes('..'), 'Unexpected traversal link');
      let target=path?(path.startsWith('/')?path.slice(1):posix.join(posix.dirname(file),path)):file;
      if(!target)target='index.html';
      if(target==='docs'||target.endsWith('/'))target=target.replace(/\/$/,'')+'/index.html';
      assert(publishedFiles.includes(target), `Unpublished target: ${href}`);
      if (fragment) assert(readFileSync(join(artifact, target), 'utf8').includes(`id="${fragment}"`), `Missing anchor ${href}`);
    }
  }
}
const css = readFileSync(join(artifact, 'assets/style.css'), 'utf8');
assert(!/@import|url\(/i.test(css), 'Unapproved external/font asset dependency');
const sandbox = { window: {} };
runInNewContext(readFileSync(join(artifact, 'assets/config.js'), 'utf8'), sandbox);
assert.equal(sandbox.window.OPENTRIX_CONFIG.name, 'OpenTrix');
assert.equal(sandbox.window.OPENTRIX_CONFIG.repository, 'tricore-opentrix/opentrix');
assert.equal(sandbox.window.OPENTRIX_CONFIG.demoMode, 'mock');
assert.equal(sandbox.window.OPENTRIX_CONFIG.surveyUrl, '');
const articles = readdirSync(join(root, 'articles')).filter(f => f.endsWith('.html'));
assert.equal(articles.length, 8);
for (const file of articles) {
  const historical = execFileSync('git', ['show', `HEAD:articles/${file}`], { cwd: root, maxBuffer: 5e6 });
  assert.deepEqual(readFileSync(join(root, 'articles', file)), historical, `HOLD source changed: ${file}`);
}
for (const file of ['assets/config.js', 'assets/landing.js']) execFileSync(process.execPath, ['--check', join(artifact, file)]);
console.log(`PASS: 13 sections, ${used.size} published M-codes / ${codes.size} matrix rows, internal links, allowlist, 4 status labels, mock config, 8 unchanged HOLD articles, JS syntax.`);
console.log(`Artifact: ${artifact}`);
