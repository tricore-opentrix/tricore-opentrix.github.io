import fs from 'node:fs';
import {siteFiles} from './site-files.mjs';
import {applyShell} from './site-shell.mjs';
import '../assets/config.js';
const config=globalThis.OPENTRIX_CONFIG;
const pages=siteFiles().filter(file=>file.endsWith('.html'));
const publicPages=[];
for(const file of pages){
  const html=applyShell(fs.readFileSync(file,'utf8'),file);
  fs.writeFileSync(file,html);
  if(file!=='404.html'&&!/<meta\b[^>]*http-equiv="refresh"/i.test(html))publicPages.push(file);
}
const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;');
const canonicalURLs=[...new Set(publicPages.map(file=>config.origin+'/'+(config.pages[file]?.canonical||file.replace(/index\.html$/,''))))];
const urls=canonicalURLs.map(url=>`  <url><loc>${escape(url)}</loc></url>`).join('\n');
fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\nDisallow: /export/\nSitemap: ${config.origin}/sitemap.xml\n`);
console.log(`Shared static header, footer, metadata and theme synchronized. Sitemap: ${publicPages.length} pages.`);
