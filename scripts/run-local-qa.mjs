// SPDX-License-Identifier: Apache-2.0
// Records actual commands/exits; never commits, uploads, deploys or runs product tests.
import { execFileSync } from 'node:child_process';
import { existsSync,mkdirSync,readFileSync,writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './build-site.mjs';
const qaRoot=existsSync(join(root,'tools/qa/node_modules/html-validate'))?'tools/qa':'.local/tools';
const pkg=JSON.parse(readFileSync(join(root,qaRoot,'node_modules/html-validate/package.json'),'utf8'));
const htmlCLI=join(root,qaRoot,'node_modules/html-validate',pkg.bin['html-validate']);
const records=[];mkdirSync(join(root,'.local/qa'),{recursive:true});
function run(file,args){
 const checkedAt=new Date().toISOString();let exit=0,output;
 try{output=execFileSync(file,args,{cwd:root,encoding:'utf8',maxBuffer:8e6,env:process.env,timeout:180000});}
 catch(error){exit=error.status??1;output=String(error.stdout||'')+String(error.stderr||error.message);}
 records.push({command:[file,...args],checkedAt,exit,result:exit===0?'PASS':'FAIL',output});
 writeFileSync(join(root,'.local/qa/local-checks.json'),JSON.stringify({checkedAt:new Date().toISOString(),node:process.version,records},null,2)+'\n');
 console.log(`${exit===0?'PASS':'FAIL'} ${args.join(' ')}`);
 if(exit)throw Error(output);
}
run(process.execPath,['--test',...['mock','openapi'].map(p=>`tests/${p}.test.mjs`)]);
run(process.execPath,['scripts/build-site.mjs']);
run(process.execPath,['scripts/check-links.mjs']);
run(process.execPath,['scripts/check-site.mjs']);
run(process.execPath,[htmlCLI,...['index.html','about.html','roadmap.html','technology.html','docs/index.html','404.html']]);
run(process.execPath,['scripts/test-browser.mjs']);
run(process.execPath,['scripts/test-full-browser.mjs']);
const testArtifact=readFileSync(join(root,'.local/latest-test-build.txt'),'utf8').trim();
run(process.execPath,['scripts/check-site.mjs',testArtifact]);
run(process.execPath,[htmlCLI,join(testArtifact,'docs/index.html')]);
run(process.execPath,['scripts/check-hygiene.mjs']);
run('git',['diff','--check']);
console.log('Local QA complete. External links are recorded separately by check-external.mjs.');
