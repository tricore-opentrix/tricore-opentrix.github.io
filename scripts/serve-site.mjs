// SPDX-License-Identifier: Apache-2.0
// Local preview only. Never serve the repository root.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { approvedFiles, root } from './build-site.mjs';
const artifact = resolve(process.argv[2] || readFileSync(join(root, '.local/latest-build.txt'), 'utf8').trim());
const within = relative(join(root, '.local'), artifact);
if (!within || within.startsWith('..') || within.includes(':')) throw Error('Preview must use an isolated .local artifact');
const types = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8', txt: 'text/plain; charset=utf-8' };
const port = Number(process.argv[3] || process.env.OPENTRIX_PREVIEW_PORT || 4177);
createServer((req, res) => {
  let file;
  try { file = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).slice(1) || 'index.html'; }
  catch { res.writeHead(400).end(); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  if (!approvedFiles.includes(file)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : readFileSync(join(artifact, '404.html'))); return;
  }
  res.writeHead(200, { 'Content-Type': types[file.split('.').pop()] || 'text/plain; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : readFileSync(join(artifact, file)));
}).listen(port, '127.0.0.1', () => console.log(`Local artifact preview: http://127.0.0.1:${port}`));
