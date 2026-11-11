// SPDX-License-Identifier: Apache-2.0
// Original Website v1 publication boundary, Issue #7, 2026-11-11.
import { copyFileSync, existsSync, readFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyProvenance } from './openapi.mjs';
import { renderAPI } from './render-api.mjs';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const approvedFiles = Object.freeze([
  'index.html', '404.html', 'robots.txt', '.nojekyll', 'LICENSE', 'NOTICE',
  'assets/style.css', 'assets/config.js', 'assets/landing.js',
  'about.html', 'roadmap.html', 'technology.html', 'docs/index.html', 'sitemap.xml',
  'assets/pages.css', 'assets/tokens.css', 'assets/team.js',
  'assets/dxos-architecture.svg', 'assets/og-image.png', 'assets/og-image.png.license',
  'assets/api-reference.mjs', 'assets/mock-engine.mjs',
]);
export function buildSite({ testAPI = false } = {}) {
  let spec, bytes;
  const specPath = join(root, testAPI ? 'tests/fixtures/test-openapi.json' : 'api-docs.json');
  const hasSpec = existsSync(specPath);
  const provenancePath = join(root, 'api-docs.provenance.json');
  if (!testAPI && hasSpec !== existsSync(provenancePath)) throw Error('Official spec and provenance must be supplied together');
  if (hasSpec) {
    bytes = readFileSync(specPath); spec = JSON.parse(bytes);
    if (testAPI) {
      if (spec['x-opentrix-fixture'] !== 'TEST') throw Error('Explicit TEST fixture required');
    } else verifyProvenance(bytes, spec, JSON.parse(readFileSync(provenancePath, 'utf8')));
  }
  mkdirSync(join(root, '.local'), { recursive: true });
  // Never clean the repository or overwrite an existing artifact.
  const output = mkdtempSync(join(root, '.local', testAPI ? 'test-website-' : 'website-v1-'));
  for (const file of approvedFiles) {
    mkdirSync(dirname(join(output, file)), { recursive: true });
    copyFileSync(join(root, file), join(output, file));
  }
  const files = [...approvedFiles];
  if (spec) {
    const name = testAPI ? 'test-api-docs.json' : 'api-docs.json';
    writeFileSync(join(output, 'docs', name), bytes); files.push(`docs/${name}`);
    const source = readFileSync(join(output, 'docs/index.html'), 'utf8');
    const html = source.replace(/<!-- API_CONTENT_START -->[\s\S]*?<!-- API_CONTENT_END -->/, renderAPI(spec, {test:testAPI}).html);
    writeFileSync(join(output, 'docs/index.html'), html);
  }
  if (testAPI) {
    for (const file of approvedFiles.filter(f => f.endsWith('.html'))) {
      const p = join(output, file);
      writeFileSync(p, readFileSync(p, 'utf8').replace('</head>', '<meta name="robots" content="noindex,nofollow"></head>').replace('<body>', '<body><p class="noscript">TEST artifact — không xuất bản.</p>'));
    }
    writeFileSync(join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  }
  files.push('website-manifest.json');
  writeFileSync(join(output, 'website-manifest.json'), JSON.stringify({
    kind: testAPI ? 'TEST' : 'LOCAL_REVIEW', officialAPI: hasSpec && !testAPI,
    releaseApproval: 'PENDING Yến/Bảo', files
  }, null, 2) + '\n');
  writeFileSync(join(root, '.local', testAPI ? 'latest-test-build.txt' : 'latest-build.txt'), output + '\n');
  return output;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(buildSite({testAPI:process.argv.includes('--test-api')}));
