import '../assets/config.js';
const config=globalThis.OPENTRIX_CONFIG;
import path from 'node:path';

const external='target="_blank" rel="noopener noreferrer"';
export function linksFor(file){
  const prefix='../'.repeat(file.split('/').length-1);
  return {prefix,home:prefix+'index.html',docs:prefix+'docs/',blog:prefix+'blog/',api:prefix+'docs/api/',survey:prefix+'survey.html',project:prefix+'projects/dx-os.html',community:prefix+'index.html#cong-dong'};
}
export function header(file){
  const p=linksFor(file),active=file.startsWith('docs/api/')?'api':file.startsWith('docs/')?'docs':/^blog(?:\/|\.html)/.test(file)?'blog':file==='index.html'?'home':file.startsWith('projects/')?'project':'';
  const items=[['home','Giới thiệu'],['project','Dự án'],['blog','Blog'],['community','Cộng đồng']];
  const nav=()=>items.map(([key,label])=>`<a href="${p[key]}"${active===key?' aria-current="page"':''}>${label}</a>`).join('');
  return `<!-- site-header:start -->
<header class="site-header"><div class="site-container site-header-inner">
  <a class="site-brand" href="${p.home}" aria-label="opentrix — Trang chủ"><span class="site-mark" aria-hidden="true"></span>opentrix</a>
  <nav class="site-nav" aria-label="Điều hướng chính">${nav()}</nav>
  <details class="site-menu"><summary aria-label="Menu điều hướng">Menu</summary><nav aria-label="Điều hướng mobile">${nav()}</nav></details>
  <button class="site-theme" type="button" aria-label="Chuyển sang giao diện tối" hidden><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/></svg><span>Giao diện</span></button>
</div></header><!-- site-header:end -->`;
}
export function footer(file){
 const p=linksFor(file);
 return `<!-- site-footer:start --><footer class="site-footer"><div class="site-container"><div class="site-footer-grid">
 <div><a class="site-brand" href="${p.home}"><span class="site-mark" aria-hidden="true"></span>opentrix</a><p>Đội sinh viên TRICORE.<br>Cùng xây dựng và chia sẻ phần mềm nguồn mở.</p></div>
 <nav aria-label="Tài nguyên"><h2>Tài nguyên</h2><a href="${p.project}">Dự án DX-OS Open-Core</a><a href="${p.blog}">Blog</a><a href="https://github.com/lexuanbao258-collab/dxos-open-core" ${external}>Mã nguồn DX-OS Open-Core ↗</a></nav>
 <nav aria-label="Giải pháp và kết nối"><h2>Khám phá</h2><a href="${p.prefix}solutions/helpdesk.html">IT Helpdesk</a><a href="${p.survey}">Khảo sát doanh nghiệp</a><a href="${p.prefix}solutions.html">Các giải pháp</a><a href="${p.prefix}technology.html">Kiến trúc &amp; công nghệ</a><a href="${p.prefix}about.html">Về TRICORE</a></nav>
 </div><div class="site-footer-bottom"><span>© 2026 opentrix · TRICORE</span><a href="${p.project}#lo-trinh">Lộ trình dự án</a><a href="#top">Lên đầu trang</a></div></div></footer><!-- site-footer:end -->`;
}
export function metadata(title,description){
 const e=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
 return `<meta name="description" content="${e(description)}"><meta name="theme-color" content="#b43a1e"><meta property="og:type" content="website"><meta property="og:locale" content="vi_VN"><meta property="og:site_name" content="opentrix"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:image" content="https://tricore-opentrix.github.io/assets/share.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="opentrix — IT Helpdesk trên nền tảng DX-OS Open-Core"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(title)}"><meta name="twitter:description" content="${e(description)}"><meta name="twitter:image" content="https://tricore-opentrix.github.io/assets/share.png"><meta name="twitter:image:alt" content="opentrix — IT Helpdesk trên nền tảng DX-OS Open-Core">`;
}
export function applyShell(html,file){
 const p=linksFor(file),isDocs=file.startsWith('docs/');
 html=html.replaceAll('TRAKZOR','opentrix').replaceAll('OPENTRIX','opentrix').replaceAll('DX-OS OPEN-CORE','DX-OS Open-Core');
 html=html.replace(/<html([^>]*)>/,(_,attrs)=>`<html${attrs.replace(/\s+id="[^"]*"/,'')} id="top">`);
 html=html.replace(/<!-- site-header:start -->[\s\S]*?<!-- site-header:end -->/,header(file));
 if(!html.includes('<!-- site-header:start -->'))html=html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,header(file));
 html=html.replace(/<!-- site-footer:start -->[\s\S]*?<!-- site-footer:end -->/,'').replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/g,'');
 html=html.replace('</body>',footer(file)+'\n</body>');
 html=html.replace(/<script(?:\s+data-site-theme)?>([\s\S]*?)<\/script>/g,(s)=>s.includes('localStorage.getItem')||s.includes("var b=document.querySelector('.theme-toggle')")?'':s);
 html=html.replace(/<link\b(?=[^>]*href="(?:\.\.\/)*(?:assets\/)?(?:tokens|unified)\.css")[^>]*>/g,'');
  html=html.replace(/<link\b(?=[^>]*rel="icon")[^>]*>/g,'');
  html=html.replace(/<script\b(?=[^>]*src="(?:\.\.\/)*assets\/unified\.js")[^>]*>[\s\S]*?<\/script>/g,'');
 html=html.replace('</head>',`<link rel="stylesheet" href="${p.prefix}assets/tokens.css"><link rel="stylesheet" href="${p.prefix}assets/unified.css"><link rel="icon" type="image/svg+xml" href="${p.prefix}assets/favicon.svg"><script data-site-theme>try{document.documentElement.dataset.theme=localStorage.getItem('opentrix-theme')||localStorage.getItem('trakzor-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}</script><script defer src="${p.prefix}assets/unified.js"></script></head>`);
 // Metadata is static so crawlers and JavaScript-disabled browsers see the same brand.
 const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'opentrix';
 const oldDescription=html.match(/<meta\b(?=[^>]*name="description")(?=[^>]*content="([^"]*)")[^>]*>/)?.[1]||'IT Helpdesk, tài liệu và mã nguồn DX-OS Open-Core từ TRICORE.';
 html=html.replace(/<meta\b(?=[^>]*(?:name="(?:description|theme-color|twitter:[^"]+)"|property="og:[^"]+"))[^>]*>/g,'');
 html=html.replace('</title>','</title>'+metadata(title.replaceAll('&amp;','&'),oldDescription.replaceAll('&amp;','&')));
 if(isDocs){
  html=html.replace(/<div class="doc-meta">[\s\S]*?<\/div>/,'<div class="doc-meta"><a class="release-label release-live" href="https://github.com/lexuanbao258-collab/dxos-open-core/releases/tag/v0.1.0">v0.1.0 · Pre-release</a></div>');
  html=html.replace('v0.1.0 · nguồn đang đối chiếu','v0.1.0 · mốc 04/11/2026').replace('README và CHANGELOG chưa thống nhất cách gọi; chưa phải xác nhận production.','DX-OS Open-Core · v0.1.0 · Pre-release.');
  if(!html.includes('class="docs-toolbar"'))html=html.replace('<div class="docs-layout">','<div class="docs-toolbar"><button aria-controls="docs-sidebar" aria-expanded="false" class="mobile-sidebar-toggle" type="button">Mục lục tài liệu</button></div><div class="docs-layout">');
 }
 const value=key=>key.split('.').reduce((v,k)=>v?.[k],config);
 html=html.replace(/(<a\b[^>]*data-config-url="([^"]+)"[^>]*href=")[^"]*(")/g,(_,start,key,end)=>start+(value(key)||'#')+end);
 html=html.replace(/(<[^>]+data-config-text="([^"]+)"[^>]*>)[^<]*(<\/[^>]+>)/g,(_,start,key,end)=>start+String(value(key)||'Thông tin đang được cập nhật.')+end);
 return html;
}
