import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Public form identifier only; no responses or operator information.
const heldFormID = '1FAIpQLSdTy5JAp0-JV6A687tl9i7EAkGzDLkVdQ8GaiK_GNLdWjw9hQ';
const root = fileURLToPath(new URL('../', import.meta.url));
const self = 'scripts/check-survey-publication.mjs';
const failures = new Set();

function decode(text) {
  // Decode common source/URL encodings, including nested encodings, without executing code.
  for (let pass = 0; pass < 4; pass++) {
    const previous = text;
    text = text.replace(/\\u\{([0-9a-f]{1,6})\}|\\u([0-9a-f]{4})|\\x([0-9a-f]{2})/gi,
      (match, a, b, c) => {
        const code = parseInt(a || b || c, 16);
        return code <= 0x10ffff ? String.fromCodePoint(code) : match;
      }).replace(/\\\//g, '/').replace(/&#(x[0-9a-f]+|[0-9]+);?/gi,
      (match, number) => {
        const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
        return code <= 0x10ffff ? String.fromCodePoint(code) : match;
      }).replace(/&(amp|quot|apos|lt|gt|colon|sol);/gi,
      (_, entity) => ({amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', colon: ':', sol: '/'}[entity.toLowerCase()]));
    text = text.replace(/(?:%[0-9a-f]{2})+/gi, sequence => {
      try { return decodeURIComponent(sequence); } catch { return sequence; }
    });
    if (text === previous) break;
  }
  return text;
}

function inspect(file) {
  if (file === self) return;
  const bytes = fs.readFileSync(path.join(root, file));
  let text;
  // Non-text assets are outside this source-reference guard.
  try { text = new TextDecoder('utf-8', {fatal: true}).decode(bytes); } catch { return; }
  if (text.includes('\0')) return;
  const decoded = decode(text);
  if (decoded.toLowerCase().includes(heldFormID.toLowerCase())) failures.add(`${file}: held Google Form identifier`);
  // During deferral, reject Google Forms URLs even if an alternative/short URL is introduced.
  if (/(?:docs\.google\.com\s*\/\s*forms\b|forms\.gle\b|forms\.google\.com\b)/i.test(decoded)) failures.add(`${file}: external Google Forms reference`);
  if (/\bsurveyUrl\b/i.test(decoded)) failures.add(`${file}: outbound survey configuration/binding`);
}

function walk(dir = '') {
  const entries = fs.readdirSync(path.join(root, dir), {withFileTypes: true});
  entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const file = path.posix.join(dir, entry.name);
    if (entry.isSymbolicLink()) failures.add(`${file}: symbolic link requires review`);
    else if (entry.isDirectory()) walk(file);
    else inspect(file);
  }
}

walk();
if (failures.size) {
  console.error([...failures].sort().join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS: no unapproved external survey references or bindings; internal survey links allowed.');
}
