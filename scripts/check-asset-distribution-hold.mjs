import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const held = [
  {directory: 'assets', stem: 'share', extension: 'png', hash: '25fc52e2822867506c0b40c4561275b87cbb10deb72ebcc4429dbfbc51abb9a1'},
  {directory: 'assets', stem: 'favicon', extension: 'svg', hash: '282682c5517d519d1130dfaa91dd14827012fa82e33a7f4724e3358ab91312bc'}
];
const paths = held.map(item => `${item.directory}/${item.stem}.${item.extension}`);
const names = held.map(item => `${item.stem}.${item.extension}`);
const hashes = new Set(held.map(item => item.hash));
const failures = new Set();
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
// Only this exact existing rejection declaration is inert; appended executable code is not exempt.
const inertLines = new Map([
  ['scripts/check-links.mjs', new Set(['952bfef78e1569b704095836f564ff39f59e5d7b09f74249fcd1364c3b9f81ce'])],
  ['docs/publication/b2-05d-ai-asset-provenance.md', new Set(['034cd590a9f266ba1aad5cc3e4cebde320ec0ce59fb15ce3b1e423499de84213', '414706ccba19db10887152489b5a15f2c692379fc5157ec5cbef42764347e91f', '451ba4ba59967f2401405368091dd7890811fe5d798514315b63a46f9ad542d5', 'e18a0f67cf31c3792f23d204a101cbd3b44cb987060d7a172dba24a6e566b90e'])]
]);

function decode(source) {
  let text = source;
  for (let pass = 0; pass < 4; pass++) {
    const previous = text;
    text = text.replace(/\\u\{([0-9a-f]{1,6})\}|\\u([0-9a-f]{4})|\\x([0-9a-f]{2})/gi,
      (match, a, b, c) => {
        const code = parseInt(a || b || c, 16);
        return code <= 0x10ffff ? String.fromCodePoint(code) : match;
      });
    text = text.replace(/&#(x[0-9a-f]+|[0-9]+);?/gi, (match, value) => {
      const code = value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value);
      return code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }).replace(/&(amp|quot|apos|sol|period|colon);/gi,
      (_, key) => ({amp:'&', quot:'"', apos:"'", sol:'/', period:'.', colon:':'}[key.toLowerCase()]));
    text = text.replace(/(?:%[0-9a-f]{2})+/gi, value => {
      try { return decodeURIComponent(value); } catch { return value; }
    }).replace(/\\([/\.])/g, '$1');
    // Catch ordinary source literals assembled by concatenation, without executing source.
    text = text.replace(/(['"`])\s*\+\s*(['"`])/g, '');
    if (previous === text) break;
  }
  return text.replaceAll('\\', '/').toLowerCase();
}

function inspect(file, bytes) {
  if (hashes.has(sha256(bytes))) failures.add(`${file}: held asset bytes (including renamed copy)`);
  let text;
  try { text = new TextDecoder('utf-8', {fatal:true}).decode(bytes); } catch { return; }
  if (text.includes('\0')) return;
  text = text.split(/\r?\n/).filter(line => !inertLines.get(file)?.has(sha256(line))).join('\n');
  const decoded = decode(text);
  if (names.some(name => decoded.includes(name))) failures.add(`${file}: prohibited asset reference or generator literal`);
}

function walk(dir = '') {
  const absolute = path.join(root, dir);
  for (const entry of fs.readdirSync(absolute, {withFileTypes:true}).sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
    // Inspect hidden content, exports and handoffs too. Never inspect Git internals or dependencies.
    const file = path.posix.join(dir, entry.name);
    const stat = fs.lstatSync(path.join(root, file));
    if (stat.isSymbolicLink()) { failures.add(`${file}: symlink/reparse target requires review`); continue; }
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    if (paths.includes(file.toLowerCase())) failures.add(`${file}: held path exists`);
    if (stat.isDirectory()) walk(file);
    else if (stat.isFile()) inspect(file, fs.readFileSync(path.join(root, file)));
    else failures.add(`${file}: unsupported filesystem entry`);
  }
}
try { walk(); } catch (error) { failures.add(`inspection failed: ${error.message}`); }
if (failures.size) {
  console.error('FAIL: asset distribution HOLD\n' + [...failures].sort().join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS: held asset paths, byte-identical copies and public/generator references absent; no symlink bypass.');
}
