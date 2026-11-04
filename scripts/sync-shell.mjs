import fs from 'node:fs';
import path from 'node:path';
import {applyShell} from './site-shell.mjs';
function walk(dir=''){
 for(const entry of fs.readdirSync(dir||'.',{withFileTypes:true})){
  if(['.git','.local-preview','node_modules','handoff'].includes(entry.name))continue;
  const file=path.posix.join(dir,entry.name);
  if(entry.isDirectory())walk(file);
  else if(file.endsWith('.html'))fs.writeFileSync(file,applyShell(fs.readFileSync(file,'utf8'),file));
 }
}
walk();
console.log('Shared static header, footer, metadata and theme synchronized.');
