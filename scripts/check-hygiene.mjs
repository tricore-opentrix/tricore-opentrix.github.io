// SPDX-License-Identifier: Apache-2.0
// Local source review aid, not a complete secret scanner or REUSE/legal certification.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync,existsSync,statSync,mkdirSync,writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './build-site.mjs';
const changes=execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const files=changes.map(row=>row.slice(3));
const issues=[];
for(const file of files){
 if(/(^|\/)\.idea\/|\.backup$|(^|\/)\.env$|\.pem$|\.key$/i.test(file))issues.push({file,reason:'Sensitive/unwanted candidate path'});
 const p=join(root,file);if(!existsSync(p)||!statSync(p).isFile())continue;
 if(/\.(png|woff2|jpg|gz|zip)$/i.test(file))continue;
 const s=readFileSync(p,'utf8');
 for(const [name,pattern] of [['GitHub token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/],['AWS access key',/\bAKIA[0-9A-Z]{16}\b/],['private key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/]])if(pattern.test(s))issues.push({file,reason:name});
 if(/\.json$/.test(file)){try{JSON.parse(s);}catch{issues.push({file,reason:'Invalid JSON'});}}
 if(/^\?\? /.test(changes.find(row=>row.slice(3)===file)||'')&&/\.(?:js|mjs|md|css|svg|yml)$/.test(file)&&!s.includes('SPDX-License-Identifier:'))issues.push({file,reason:'Missing SPDX identifier in new original text'});
 if(/\.json$/.test(file)&&!existsSync(p+'.license'))issues.push({file,reason:'Missing JSON SPDX sidecar'});
}
const currentIndex=execFileSync('git',['diff','--cached'],{cwd:root});
let indexPreserved='PENDING baseline not present (expected on CI)';
if(existsSync(join(root,'.local/delivery-baseline/staged.patch'))){assert.deepEqual(currentIndex,readFileSync(join(root,'.local/delivery-baseline/staged.patch')),'Original index must remain untouched');indexPreserved=true;}
mkdirSync(join(root,'.local/qa'),{recursive:true});
writeFileSync(join(root,'.local/qa/hygiene-check.json'),JSON.stringify({checkedAt:new Date().toISOString(),scope:'Changed/untracked source paths only; common token signatures, not exhaustive',files,issues,indexPreserved},null,2)+'\n');
assert.deepEqual(issues,[],'Hygiene issues (file paths/reasons only; no sensitive values printed)');
console.log(`PASS: ${files.length} changed/untracked paths, common secret signatures, JSON/SPDX metadata, original index ${indexPreserved}. Not full license or secret certification.`);
