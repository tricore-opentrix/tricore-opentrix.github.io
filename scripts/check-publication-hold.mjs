import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

// Public URL identifiers only; no article bodies or private preservation manifest.
const held = [
  "articles/api-va-giao-dich-khong-ro-ket-qua.html",
  "articles/danh-tinh-va-quyen-truy-cap.html",
  "articles/doc-bang-chung-ma-nguon-mo.html",
  "articles/facility-va-bai-kiem-tra-tai-su-dung.html",
  "articles/helpdesk-tu-yeu-cau-den-xac-nhan.html",
  "articles/khao-sat-truoc-khi-viet-code.html",
  "articles/tu-mock-den-live.html",
  "articles/workflow-va-ung-dung.html"
];
// One-way fingerprints of former public titles/excerpts, independent of the private backup.
const fingerprints = [
  [
    12,
    "63925eed8e55932851758b47ce0f436ece26a5efde0cd834a29748260a74296d"
  ],
  [
    20,
    "4687d9cd1b0655b24a3c37f38512569044bb30ebc36ee67794b085079ed9b877"
  ],
  [
    9,
    "04dfb175635094fc06c7c74d91f98990d1a712a1ecd8562bf86ddc7e64a44658"
  ],
  [
    20,
    "e35bcabe2b12ba7c491506de2096f386109546553cb74cf10d7d103aaee0a1bb"
  ],
  [
    14,
    "98117f9da8862df83f0444e7c72a3bfce81c54c313bf122da0bcd7246374ee83"
  ],
  [
    23,
    "be66c570d8c97eae2ebdd93eec2df07c745eabdb2e257f5c5ebc277f6fd2f27f"
  ],
  [
    13,
    "2203e0d701fc95ecca9a5a45c840484a6131249b5df3e183fda329760706e86a"
  ],
  [
    25,
    "59655d684082078d0c1995360730be00f7b3de1d9d99a5d95c40259c5b6c25ec"
  ],
  [
    13,
    "d693fcf005ca490936e38ad82c3c0b81a0c1b0bd516885bd6c53a4a6a68afd04"
  ],
  [
    23,
    "4e09e4f0a15c8ff10b58a0d3c78477e26fe3a7344699ac9f8c508ad93b6eb9a3"
  ],
  [
    12,
    "1c3f1fee17d8939794f23354d6c205c5bbe3456d95a7588c8e089126441f1794"
  ],
  [
    25,
    "f5f60fb945664b10d532a62e0c8970870a101bb62f74c303de08a38046c3d330"
  ],
  [
    11,
    "d1e6f9d1d31088f38d49d340d2c46ab6154573a0f4c5ec0993fc5568738a5b19"
  ],
  [
    24,
    "6cb5525c99135b921da3e789bba5cf2c5b3030a22a0cccfc64df2553a13e2021"
  ],
  [
    8,
    "29ba11d17026543416e17587ff0e121f8eea7639719f1e255962cb6c6faf9620"
  ],
  [
    22,
    "dcedfa753791e3fec8e38ab96f42f88bfdc3380d1fec4250008b31f9cce248b7"
  ]
];
const root = fileURLToPath(new URL('../', import.meta.url));
const self = 'scripts/check-publication-hold.mjs';
const failures = [];
const normalize = text => text.normalize('NFC').toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
const decode = text => text.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))).replace(/&(?:amp|quot|apos|lt|gt|nbsp);/g, s => ({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' '})[s]);
const groups = new Map();
for (const [length, hash] of fingerprints) {
  if (!groups.has(length)) groups.set(length, new Set());
  groups.get(length).add(hash);
}
function walk(dir='') {
  for (const entry of fs.readdirSync(path.join(root,dir), {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name,'en'))) {
    if (entry.name.startsWith('.') || entry.name==='node_modules') continue;
    const file=path.posix.join(dir,entry.name);
    if (entry.isSymbolicLink()) { failures.push(file+': symbolic link requires review'); continue; }
    if (entry.isDirectory()) { walk(file); continue; }
    if (file===self) continue;
    if (held.some(p=>file.toLowerCase()===p)) failures.push(file+': HOLD file exists');
    const bytes=fs.readFileSync(path.join(root,file));
    let text;
    try { text=new TextDecoder('utf-8',{fatal:true}).decode(bytes); } catch { continue; }
    if (text.includes('\0')) continue;
    let decoded=decode(text);
    try { decoded=decodeURIComponent(decoded); } catch {}
    if (held.some(p=>decoded.toLowerCase().includes(path.posix.basename(p,'.html')))) failures.push(file+': prohibited article reference');
    for (const words of [normalize(decoded), normalize(decoded.replace(/<[^>]*>/g,' '))]) {
    for (const [length, hashes] of groups) {
      for (let i=0;i+length<=words.length;i++) {
        if (hashes.has(createHash('sha256').update(words.slice(i,i+length).join(' ')).digest('hex'))) {
          failures.push(file+': prohibited title/excerpt fingerprint'); break;
        }
      }
    }
    }
  }
}
walk();
if (failures.length) { console.error([...new Set(failures)].sort().join('\n')); process.exitCode=1; }
else console.log('PASS: eight publication-HOLD paths absent; no prohibited public references or title/excerpt copies.');
