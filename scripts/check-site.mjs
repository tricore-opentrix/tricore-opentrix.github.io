// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { approvedFiles, root } from './build-site.mjs';
import { checkLinks } from './check-links.mjs';
const artifact=resolve(process.argv[2]||readFileSync(join(root,'.local/latest-build.txt'),'utf8').trim());
const manifest=JSON.parse(readFileSync(join(artifact,'website-manifest.json'),'utf8'));
const walk=(dir,prefix='')=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name),prefix+e.name+'/'):[prefix+e.name]);
assert.deepEqual(walk(artifact).sort(),[...manifest.files].sort(),'Actual files equal manifest');
const expected=[...approvedFiles,'website-manifest.json'];
if(manifest.kind==='TEST')expected.push('docs/test-api-docs.json');else if(manifest.officialAPI)expected.push('docs/api-docs.json');
assert.deepEqual([...manifest.files].sort(),expected.sort(),'Exact allowlist');
assert(!manifest.files.some(f=>/articles\/|blog|\.idea|backup|\.env|\.local|node_modules/i.test(f)));
const guide=readFileSync(join(root,'MARKETING_GUIDE.md'),'utf8'),codes=new Set([...guide.matchAll(/^\| (M\d{2}) \|/gm)].map(m=>m[1])),used=new Set();
for(const file of manifest.files.filter(f=>f.endsWith('.html'))){
 const doc=readFileSync(join(artifact,file),'utf8');
 for(const [,value] of doc.matchAll(/data-claim="([^"]+)"/g))for(const code of value.split(' ')){assert(codes.has(code),`${file}: unmapped ${code}`);used.add(code);}
 assert(!/TRAKZOR|being updated|lexuanbao258-collab|blog\.html|articles\/|survey\.html/i.test(doc),`${file}: legacy/HOLD publication`);
 assert(!/\ufffd|\?{3}|[\p{L}]\?[\p{L}]/u.test(doc),`${file}: broken UTF-8`);
 for(const pattern of [/<title[^>]*>[^<]+<\/title>/,/<meta name="description"[^>]+>/,/<meta property="og:image"[^>]+>/,/<link rel="canonical"[^>]+>/])assert(pattern.test(doc),`${file}: metadata`);
 assert.equal(doc.match(/<meta property="og:image"[^>]*content="([^"]+)"/)[1],'https://tricore-opentrix.github.io/assets/og-image.png');
 assert.equal((doc.match(/<h1\b/g)||[]).length,1,`${file}: one h1`);
 if(manifest.kind!=='TEST'&&!manifest.officialAPI&&file==='docs/index.html')assert(doc.includes('BLOCKED')&&!doc.includes('api-operation')&&!doc.includes('/test/'));
}
for(const code of ['M23','M26'])assert(!used.has(code),`${code} remains HOLD`);
const home=readFileSync(join(artifact,'index.html'),'utf8');
for(let n=0;n<=12;n++)assert.equal((home.match(new RegExp(`id="s${n}"`,'g'))||[]).length,1,`S${n}`);
for(const label of ['Available','Optional — off by default','Self-configured','Not yet'])assert(home.includes(label));
const roadmap=readFileSync(join(artifact,'roadmap.html'),'utf8');
for(const code of ['M27','M28','M29','M30']){const pattern=new RegExp(`<li data-roadmap="${code}"[\\s\\S]*?<\/li>`);assert.equal(home.match(pattern)?.[0],roadmap.match(pattern)?.[0],`Roadmap ${code}`);}
assert(!/v0\.2\.0|v1\.0\.0|202[6-9]-\d\d-\d\d/.test(roadmap.match(/<ol class="roadmap-list">([\s\S]*?)<\/ol>/)[1]),'No hard release dates in milestones');
for(const file of manifest.files.filter(f=>f.endsWith('.css')))assert(!/@import|url\(/i.test(readFileSync(join(artifact,file),'utf8')),'Unknown external/font asset');
const sandbox={window:{}};runInNewContext(readFileSync(join(artifact,'assets/config.js'),'utf8'),sandbox);const c=sandbox.window.OPENTRIX_CONFIG;
assert.equal(c.name,'OpenTrix');assert.equal(c.repository,'tricore-opentrix/opentrix');assert.equal(c.demoMode,'mock');assert.equal(c.surveyUrl,'');assert.equal(c.teamProfile.members.length,0);assert.equal(c.teamProfile.affiliation,'');
for(const file of manifest.files.filter(f=>/\.(js|mjs)$/.test(f)))execFileSync(process.execPath,['--check',join(artifact,file)]);
const articles=readdirSync(join(root,'articles')).filter(f=>f.endsWith('.html'));assert.equal(articles.length,8);
for(const file of articles)assert.deepEqual(readFileSync(join(root,'articles',file)),execFileSync('git',['show',`HEAD:articles/${file}`],{cwd:root,maxBuffer:5e6}),`HOLD bytes ${file}`);
const sitemap=readFileSync(join(artifact,'sitemap.xml'),'utf8');for(const path of ['','about.html','roadmap.html','technology.html','docs/'])assert(sitemap.includes(`<loc>https://tricore-opentrix.github.io/${path}</loc>`));
assert.equal((sitemap.match(/<loc>/g)||[]).length,5);assert(!/articles|blog|survey|404/.test(sitemap));
assert(readFileSync(join(artifact,'robots.txt'),'utf8').includes(manifest.kind==='TEST'?'Disallow: /':'Sitemap:'));
assert(readFileSync(join(artifact,'LICENSE'),'utf8').includes('Apache License'));
console.log(`PASS ${manifest.kind}: ${manifest.files.length} files, ${used.size} M-codes, ${checkLinks(artifact)} links, S0–S12, SEO/UTF-8, roadmap, MOCK, JS syntax, 8 byte-identical HOLD articles.`);
