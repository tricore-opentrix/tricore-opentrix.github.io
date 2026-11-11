// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { existsSync,readFileSync,mkdirSync,writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { root,buildSite } from './build-site.mjs';
const require=createRequire(join(root,existsSync(join(root,'tools/qa/node_modules/playwright'))?'tools/qa/package.json':'.local/tools/package.json'));
const { chromium }=require('playwright');
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
const results=[],servers=[];
const shots=join(root,'.local/qa/screenshots');mkdirSync(shots,{recursive:true});
async function serve(artifact,port){
 const server=spawn(process.execPath,[join(root,'scripts/serve-site.mjs'),artifact,String(port)],{cwd:root,stdio:'pipe'});servers.push(server);
 let diagnostic='';server.stderr.on('data',chunk=>diagnostic+=chunk);server.on('error',error=>diagnostic+=error.message);
 const origin=`http://127.0.0.1:${port}`;
 for(let n=0;n<80;n++){try{if((await fetch(origin)).ok)return origin;}catch{}await new Promise(r=>setTimeout(r,100));}
 throw Error(`Preview did not start: ${diagnostic}`);
}
try{
 const artifact=readFileSync(join(root,'.local/latest-build.txt'),'utf8').trim();
 const origin=await serve(artifact,4188);
 for(const width of [390,1440])for(const [name,path] of [['home','/'],['team','/about.html'],['roadmap','/roadmap.html'],['architecture','/technology.html'],['docs','/docs/'],['404','/missing-page']]){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width,height:900}});
   await context.addInitScript(t=>localStorage.setItem('opentrix-theme',t),theme);
   const page=await context.newPage(),errors=[],requests=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
   const response=await page.goto(origin+path,{waitUntil:'networkidle'});assert.equal(response.status(),name==='404'?404:200);
   assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
   assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`${name} overflow ${width}`);
   assert(await page.locator('h1').isVisible());
   assert(!/TRAKZOR|being updated|\ufffd|\?{3}/i.test(await page.locator('body').innerText()));
   assert(requests.every(u=>u.startsWith(origin)),'No third party network');assert.deepEqual(errors,[]);
   await page.keyboard.press('Tab');
   if(name!=='404'){
    assert.equal(await page.evaluate(()=>document.activeElement.className),'skip');
    await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main');
    const missing=await page.locator('main p,main h1,main h2,main h3,main li').evaluateAll(es=>es.filter(e=>e.textContent.trim()&&!e.closest('[data-claim]')).map(e=>e.outerHTML));
    assert.deepEqual(missing,[],`${name} factual copy lacks M-code`);
    const toggle=page.locator('.theme-toggle');await toggle.click();assert.notEqual(await page.locator('html').getAttribute('data-theme'),theme);await toggle.click();
    if(width===390){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
   }else assert.equal(await page.evaluate(()=>document.activeElement.tagName),'A');
   if(name==='team'){assert.equal(await page.locator('#approved-team').textContent(),'');assert(!/Phan Hải Yến|Nguyễn Ngọc Ánh|Lê Xuân Bảo|CMC University/.test(await page.content()));}
   if(name==='docs'){assert(await page.getByRole('heading',{name:/BLOCKED/}).isVisible());assert.equal(await page.locator('[data-mock]').count(),0);}
   if(name==='architecture'){
    assert.equal(await page.locator('svg title').count(),1);assert.equal(await page.locator('svg desc').count(),1);
    const overlaps=await page.locator('svg .label,svg .chip').evaluateAll(es=>es.filter(e=>{const b=e.getBBox(),r=e.parentElement.querySelector('rect');return b.x+b.width>+r.getAttribute('x')+(+r.getAttribute('width'))-4;}).map(e=>e.textContent));
    assert.deepEqual(overlaps,[],'SVG labels inside component boxes');
   }
   await page.screenshot({path:join(shots,`${name}-${width}-${theme}.png`),fullPage:true});
   results.push({name,width,theme,status:'PASS',overflow:false,pageErrors:0,thirdPartyRequests:0});await context.close();
  }
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),noJS=await context.newPage();
 for(const path of ['/','/about.html','/roadmap.html','/technology.html','/docs/']){await noJS.goto(origin+path);assert(await noJS.locator('h1').isVisible());}await context.close();
 const held=['blog',...['api-va-giao-dich-khong-ro-ket-qua','danh-tinh-va-quyen-truy-cap','doc-bang-chung-ma-nguon-mo','facility-va-bai-kiem-tra-tai-su-dung','helpdesk-tu-yeu-cau-den-xac-nhan','khao-sat-truoc-khi-viet-code','tu-mock-den-live','workflow-va-ung-dung'].map(s=>'articles/'+s)];
 for(const base of held)for(const suffix of ['.html','','/']){const r=await fetch(origin+'/'+base+suffix);assert.equal(r.status,404);assert(!(await r.text()).includes('article-body'));}
 results.push({status:'PASS',noJS:5,heldURLs:27});
 const testArtifact=buildSite({testAPI:true}),testOrigin=await serve(testArtifact,4189);
 const testContext=await browser.newContext({viewport:{width:390,height:900},permissions:['clipboard-read','clipboard-write']});
 const page=await testContext.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto(testOrigin+'/docs/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.api-operation').count(),3);assert((await page.locator('body').innerText()).includes('TEST fixture'));
 assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
 const downloadEvent=page.waitForEvent('download');await page.getByText('Tải JSON TEST',{exact:true}).click();const download=await downloadEvent;
 await download.saveAs(join(root,'.local/qa/test-api-docs-download.json'));
 assert.deepEqual(readFileSync(join(root,'.local/qa/test-api-docs-download.json')),readFileSync(join(root,'tests/fixtures/test-openapi.json')));
 const copy=page.locator('[data-copy]').first();await copy.click();assert((await page.evaluate(()=>navigator.clipboard.readText())).length>0);
 await page.evaluate(()=>Object.defineProperty(navigator.clipboard,'writeText',{value:()=>Promise.reject(Error('TEST denied'))}));await copy.click();assert((await page.evaluate(()=>getSelection().toString())).length>0);
 await testContext.setOffline(true);const initialRequests=requests.length;
 const section=page.locator('.api-operation').filter({has:page.locator('h3',{hasText:'GET /test/widgets/'})}),button=section.locator('[data-mock]'),output=section.locator('.mock-result');
 await button.click();await button.waitFor({state:'visible'});await page.waitForFunction(()=>!document.querySelector('.api-operation[aria-busy]'));
 const first=await output.textContent();assert.equal(JSON.parse(first).label,'MOCK');
 await button.click();await page.waitForFunction(()=>!document.querySelector('.api-operation[aria-busy]'));assert.equal(await output.textContent(),first);
 await section.locator('input').fill('8');await button.click();await page.waitForFunction(()=>!document.querySelector('.api-operation[aria-busy]'));assert.notEqual(await output.textContent(),first);
 assert.equal(requests.length,initialRequests,'No network request from MOCK actions');assert.deepEqual(errors,[]);
 for(const theme of ['light','dark']){await page.evaluate(t=>{document.documentElement.dataset.theme=t;window.scrollTo(0,0);},theme);await page.screenshot({path:join(shots,`docs-TEST-390-${theme}.png`),fullPage:true});}
 await testContext.close();results.push({status:'PASS',testOperations:3,offlineMOCK:true,seedRepeat:true,seedChange:true,copy:true,copyFallback:true,downloadByteMatch:true,mockRequests:0});
 writeFileSync(join(root,'.local/qa/browser-check.json'),JSON.stringify({checkedAt:new Date().toISOString(),browser:browser.version(),artifact,testArtifact,results},null,2)+'\n');
 console.log(`PASS: ${results.length} browser cases; 24 page screenshots + 2 TEST screenshots, keyboard/theme, no-JS, HOLD URLs, offline MOCK/copy/download.`);
}finally{for(const server of servers)server.kill();await browser.close();}
