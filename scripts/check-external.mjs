// SPDX-License-Identifier: Apache-2.0
// Read-only HTTP/fragment checks of the active artifact, excluding intended deployment URLs.
import { mkdirSync,readFileSync,writeFileSync } from 'node:fs';
import { join,resolve } from 'node:path';
import { root } from './build-site.mjs';
const artifact=resolve(process.argv[2]||readFileSync(join(root,'.local/latest-build.txt'),'utf8').trim());
const manifest=JSON.parse(readFileSync(join(artifact,'website-manifest.json'),'utf8'));
const urls=[...new Set(manifest.files.filter(f=>f.endsWith('.html')).flatMap(file=>[...readFileSync(join(artifact,file),'utf8').matchAll(/href="(https:\/\/[^"\s]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'))))].filter(url=>new URL(url).hostname!=='tricore-opentrix.github.io');
const bases=[...new Set(urls.map(value=>{const u=new URL(value);u.hash='';return u.href;}))];
const cache=new Map();let cursor=0;
await Promise.all(Array.from({length:Math.min(4,bases.length)},async()=>{while(cursor<bases.length){const url=bases[cursor++];try{const r=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(15000)});cache.set(url,{status:r.status,finalUrl:r.url,body:await r.text()});}catch(error){cache.set(url,{error:error.message});}}}));
const results=urls.map(value=>{const u=new URL(value),hash=u.hash.slice(1);u.hash='';const r=cache.get(u.href),fragmentPresent=!hash||r.body?.includes(hash);
 const p=new URL(r.finalUrl||value).pathname,correctRepository=u.hostname!=='github.com'||p.startsWith('/tricore-opentrix/opentrix')||p.startsWith('/tricore-opentrix/tricore-opentrix.github.io');
 return {url:value,status:r.status,finalUrl:r.finalUrl,fragmentPresent,correctRepository,...(r.error?{error:r.error}:{}),result:r.error||[403,429].includes(r.status)?'BLOCKED':r.status===200&&fragmentPresent&&correctRepository?'PASS':'FAIL'};});
mkdirSync(join(root,'.local/qa'),{recursive:true});writeFileSync(join(root,'.local/qa/external-check.json'),JSON.stringify({checkedAt:new Date().toISOString(),artifact,results},null,2)+'\n');
console.log(JSON.stringify(results,null,2));if(results.some(r=>r.result!=='PASS'))process.exitCode=1;
