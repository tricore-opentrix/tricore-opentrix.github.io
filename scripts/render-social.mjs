// SPDX-License-Identifier: Apache-2.0
// Original typographic social preview; no third-party images, logo or font.
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { root } from './build-site.mjs';
import { existsSync } from 'node:fs';
const require = createRequire(join(root,existsSync(join(root,'tools/qa/node_modules/playwright'))?'tools/qa/package.json':'.local/tools/package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {})});
try {
  const page = await browser.newPage({viewport:{width:1200,height:630}, deviceScaleFactor:1});
  await page.setContent('<!doctype html><html lang="vi"><meta charset="utf-8"><style>body{margin:0;background:#edf2ff;color:#14223b;font:30px Segoe UI,Arial,sans-serif;padding:72px;box-sizing:border-box;height:630px;border-top:16px solid #2455e9}h1{font-size:92px;margin:15px 0 24px;letter-spacing:-4px}p{margin:12px 0;max-width:900px}small{display:block;margin-top:65px;color:#34476a}</style><body><p>TRICORE</p><h1>OpenTrix</h1><p>DX-OS Open-Core</p><p>Nền tảng thử nghiệm cho ứng dụng dịch vụ nội bộ.</p><small>Portal MOCK · phạm vi kiểm chứng riêng</small></body></html>');
  await page.screenshot({path:join(root,'assets/og-image.png')});
  console.log('Rendered original 1200×630 social image (M01 M03 M12)');
} finally { await browser.close(); }
