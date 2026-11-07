import fs from 'node:fs';
import path from 'node:path';
export function siteFiles(dir=''){
 const files=[];
 for(const entry of fs.readdirSync(dir||'.',{withFileTypes:true})){
  if(entry.name.startsWith('.')||['node_modules','handoff','export'].includes(entry.name))continue;
  const file=path.posix.join(dir,entry.name);
  if(entry.isDirectory())files.push(...siteFiles(file));else files.push(file);
 }
 return files;
}
