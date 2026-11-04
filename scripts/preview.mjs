import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // Also preview the GitHub Pages project prefix.
    if (pathname === '/trakzor-site') pathname = '/';
    else if (pathname.startsWith('/trakzor-site/')) pathname = pathname.slice('/trakzor-site'.length);
    const file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.')) || relative.split(path.sep)[0] === 'export') {
      res.writeHead(403).end('Forbidden'); return;
    }
    const directory = (await stat(file)).isDirectory();
    const requestURL = new URL(req.url, 'http://localhost');
    if (directory && !requestURL.pathname.endsWith('/')) {
      res.writeHead(308, { Location: requestURL.pathname + '/' + requestURL.search }).end(); return;
    }
    const target = directory ? path.join(file, 'index.html') : file;
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(target));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Không tìm thấy trang.');
  }
}).listen(port, '127.0.0.1', () => console.log(`opentrix preview: http://localhost:${port}/trakzor-site/`));
