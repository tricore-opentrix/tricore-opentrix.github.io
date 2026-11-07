import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteFiles } from './site-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const pages = siteFiles().filter(f => f.endsWith('.html'));
const contents = new Map(pages.map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]));
const failures = [];
const external = new Set();
let checked = 0;
for (const [page, html] of contents) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  if (ids.length !== new Set(ids).size) failures.push(`${page}: duplicate IDs`);
  for (const [, attribute] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = attribute.replaceAll('&amp;', '&');
    if (/^https?:/.test(href)) { external.add(href); continue; }
    if (/^(?:mailto:|tel:|data:)/.test(href)) continue;
    if (href.startsWith('/')) failures.push(`${page}: use a relative page link: ${href}`);
    checked++;
    const url = new URL(href, `https://preview.local/${page}`);
    let target = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
    if(target.endsWith('/'))target+='index.html';
    if (!fs.existsSync(path.join(root, target))) { failures.push(`${page}: missing ${href}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      const targetHTML = contents.get(target) || '';
      if (![...targetHTML.matchAll(/\sid="([^"]+)"/g)].some(m => m[1] === fragment)) failures.push(`${page}: missing fragment ${href}`);
    }
  }
  for (const key of ['og:title', 'og:description', 'og:site_name', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']) {
    if (!html.includes(`="${key}" content="`)) failures.push(`${page}: missing metadata ${key}`);
  }
  if (!html.match(/<title>[^<]*TRICORE[^<]*<\/title>/)) failures.push(`${page}: missing TRICORE title`);
  if (!html.includes('<html lang="vi"')) failures.push(`${page}: missing Vietnamese language`);
  if ((html.match(/rel="canonical"/g)||[]).length!==1) failures.push(`${page}: canonical missing or duplicated`);
  if (/TRAKZOR|OPENTRIX/.test(html)) failures.push(`${page}: old visible brand`);
  if((html.match(/class="site-header"/g)||[]).length!==1 || (html.match(/class="site-footer"/g)||[]).length!==1)failures.push(`${page}: shared shell missing or duplicated`);
  if((html.match(/src="(?:\.\.\/)*assets\/unified\.js"/g)||[]).length!==1)failures.push(`${page}: shared script missing or duplicated`);
  if(/proto-note|OWNER REVIEW|Docs preview|Riêng prototype|Bản xem thử thiết kế/.test(html))failures.push(`${page}: internal review note`);
}
for (const css of siteFiles().filter(f=>f.endsWith('.css'))) {
  const content = fs.readFileSync(path.join(root, css), 'utf8');
  for (const [, href] of content.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) if (!/^https?:|^data:/.test(href) && !fs.existsSync(path.resolve(root, path.dirname(css), href))) failures.push(`${css}: missing ${href}`);
}
console.log(`${pages.length} pages, ${checked} internal links/assets/anchors, ${external.size} unique external URLs.`);
if (process.argv.includes('--external')) {
  const queue = [...external];
  const results = [];
  await Promise.all(Array.from({length: 4}, async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
        results.push({url, status: response.status, finalURL: response.url});
      } catch (error) { results.push({url, error: error.message}); }
    }
  }));
  console.log(JSON.stringify(results, null, 2));
  for (const result of results) if (result.error || result.status >= 400) failures.push(`External: ${result.status || result.error} ${result.url}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('PASS: no broken links, missing fragments/assets or branding metadata.');
