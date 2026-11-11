// SPDX-License-Identifier: Apache-2.0
// Original Website v1 publication boundary, Issue #7, 2026-11-11.
import { copyFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const approvedFiles = Object.freeze([
  'index.html',
  '404.html',
  'robots.txt',
  '.nojekyll',
  'LICENSE',
  'NOTICE',
  'assets/style.css',
  'assets/config.js',
  'assets/landing.js',
  'about.html',
  'assets/pages.css',
  'assets/team.js',
  'roadmap.html',
  'technology.html',
  'assets/dxos-architecture.svg',
  'assets/tokens.css',
]);
export function buildSite() {
  mkdirSync(join(root, '.local'), { recursive: true });
  // Never clean the repository or overwrite an existing artifact.
  const output = mkdtempSync(join(root, '.local', 'website-v1-'));
  for (const file of approvedFiles) {
    mkdirSync(dirname(join(output, file)), { recursive: true });
    copyFileSync(join(root, file), join(output, file));
  }
  writeFileSync(join(root, '.local', 'latest-build.txt'), output + '\n');
  return output;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(buildSite());
