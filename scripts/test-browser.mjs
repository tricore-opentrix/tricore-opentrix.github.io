// SPDX-License-Identifier: Apache-2.0
// Optional local test tools: npm install --prefix .local/tools --no-save playwright html-validate
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { root } from './build-site.mjs';
const require = createRequire(join(root, existsSync(join(root,'tools/qa/node_modules/playwright')) ? 'tools/qa/package.json' : '.local/tools/package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
const results = [];
const origin = process.argv[2] || 'http://127.0.0.1:4187';
let server;
mkdirSync(join(root, '.local/screenshots'), { recursive: true });
try {
  if (!process.argv[2]) {
    server = spawn(process.execPath, [join(root, 'scripts/serve-site.mjs')], {
      cwd: root, env: { ...process.env, OPENTRIX_PREVIEW_PORT: '4187' }, stdio: 'pipe' });
    let ready = false;
    for (let n = 0; n < 50; n++) {
      try { ready = (await fetch(origin)).ok; } catch { /* Wait for local listener. */ }
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert(ready, 'Local artifact preview did not start');
  }
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    const requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('request', r => requests.push(r.url()));
    const response = await page.goto(origin, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.title(), 'OpenTrix — DX-OS Open-Core của TRICORE');
    assert(await page.locator('html').getAttribute('lang') === 'vi');
    assert.equal(await page.locator('[id^="s"]').evaluateAll(es => es.filter(e => /^s\d+$/.test(e.id)).length), 13);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert(!overflow, `Horizontal overflow at ${width}`);
    const missing = await page.locator('p,h1,h2,h3,dt,dd').evaluateAll(es => es.filter(e => {
      if (!e.textContent.trim() || e.closest('noscript')) return false;
      if (e.closest('[data-claim]')) return false;
      return !e.closest('footer'); // Footer column headings are neutral navigation labels.
    }).map(e => e.outerHTML));
    assert.deepEqual(missing, [], 'Unmapped factual copy');
    const oldTheme = await page.locator('html').getAttribute('data-theme');
    await page.locator('.theme-toggle').click();
    assert.notEqual(await page.locator('html').getAttribute('data-theme'), oldTheme);
    await page.reload({ waitUntil: 'networkidle' });
    assert.notEqual(await page.locator('html').getAttribute('data-theme'), oldTheme, 'Theme persistence');
    if (width <= 760) {
      const menu = page.locator('.menu-toggle');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      assert(await menu.evaluate(e => e === document.activeElement), 'Escape returns focus');
      await menu.click();
      await page.locator('.nav a[href="#s6"]').click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    }
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.className), 'skip', 'Keyboard skip link');
    if (width === 390) await page.screenshot({ path: join(root, '.local/screenshots/keyboard-focus.png') });
    await page.locator('h1').click();
    if (await page.locator('html').getAttribute('data-theme') === 'dark') await page.locator('.theme-toggle').click();
    await page.screenshot({ path: join(root, `.local/screenshots/landing-${width}-light.png`), fullPage: true });
    if ([390, 1440].includes(width)) {
      await page.locator('.theme-toggle').click();
      await page.screenshot({ path: join(root, `.local/screenshots/landing-${width}-dark.png`), fullPage: true });
    }
    assert.deepEqual(errors, [], `Browser errors at ${width}`);
    assert(requests.every(u => u.startsWith(origin)), 'Unexpected third-party network requests');
    results.push({ width, result: 'PASS', consoleErrors: errors.length, thirdPartyRequests: 0, overflow });
    await page.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin);
  assert(await page.locator('h1').isVisible());
  assert(await page.locator('noscript').isVisible());
  assert(await page.locator('.hero-actions a[href="#s6"]').isVisible(), 'No-JS content navigation');
  await context.close();
  const held = ['blog.html', ...readdirSync(join(root, 'articles')).filter(f => f.endsWith('.html')).map(f => 'articles/' + f)];
  const paths = held.flatMap(p => [p, p.replace(/\.html$/, ''), p.replace(/\.html$/, '/')]);
  for (const path of paths) {
    const response = await fetch(origin + '/' + path);
    assert.equal(response.status, 404, path);
    const body = await response.text();
    assert(body.includes('Không tìm thấy trang') && !body.includes('article-body'), path);
  }
  results.push({ result: 'PASS', javaScriptDisabled: true, heldURLChecks: paths.length });
  writeFileSync(join(root, '.local/browser-check.json'), JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { server?.kill(); await browser.close(); }
