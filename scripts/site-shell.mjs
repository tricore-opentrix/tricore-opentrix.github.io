import '../assets/config.js';
const config=globalThis.OPENTRIX_CONFIG;
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const value=key=>key.split('.').reduce((v,k)=>v?.[k],config);
export function linksFor(file){
  const prefix='../'.repeat(file.split('/').length-1);
  return {prefix,home:prefix+'index.html',project:prefix+'projects/dx-os.html',docs:prefix+'docs/',blog:prefix+'blog/',community:prefix+'index.html#cong-dong',survey:prefix+'survey.html'};
}
export function header(file){
  const p=linksFor(file);
  const active=file==='index.html'?'home':file.startsWith('projects/')?'project':file.startsWith('docs/')?'docs':/^blog(?:\/|\.html)/.test(file)||file.startsWith('articles/')?'blog':'';
  const items=[['home','Giới thiệu'],['project','Dự án'],['docs','Tài liệu'],['blog','Blog'],['community','Cộng đồng']];
  const nav=()=>items.map(([key,label])=>`<a href="${p[key]}"${active===key?' aria-current="page"':''}>${label}</a>`).join('');
  return `<!-- site-header:start -->
<header class="site-header"><div class="site-container site-header-inner">
<a class="site-brand" href="${p.home}" aria-label="opentrix — Trang chủ TRICORE"><span class="site-mark" aria-hidden="true"></span>opentrix</a>
<nav class="site-nav" aria-label="Điều hướng chính">${nav()}</nav>
<details class="site-menu"><summary aria-label="Menu điều hướng">Menu</summary><nav aria-label="Điều hướng trên điện thoại">${nav()}</nav></details>
<button class="site-theme" type="button" aria-label="Chuyển sang giao diện tối" hidden><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/></svg><span>Giao diện</span></button>
</div></header><!-- site-header:end -->`;
}
export function footer(file){
  const p=linksFor(file);
  return `<!-- site-footer:start --><footer class="site-footer"><div class="site-container"><div class="site-footer-grid">
<div><a class="site-brand" href="${p.home}"><span class="site-mark" aria-hidden="true"></span>opentrix</a><p>Đội sinh viên ${escape(config.team)}.<br>Cùng xây dựng và chia sẻ phần mềm nguồn mở.</p></div>
<nav aria-label="Đội và dự án"><h2>Khám phá</h2><a href="${p.prefix}about.html">Về TRICORE</a><a href="${p.project}">Dự án DX-OS Open-Core</a><a href="${p.docs}">Tài liệu</a><a href="${p.blog}">Blog</a><a href="${p.prefix}technology.html">Công nghệ chúng tôi dùng</a></nav>
<nav aria-label="Cộng đồng"><h2>Kết nối</h2><a data-config-url="links.teamGithub" href="${escape(config.links.teamGithub)}">GitHub đội ↗</a><a href="${p.community}">Cộng đồng &amp; liên hệ</a><a href="${p.survey}">Khảo sát</a><a data-config-url="links.source" href="${escape(config.links.source)}">Mã nguồn DX-OS Open-Core ↗</a></nav>
</div><div class="site-footer-bottom"><span>© 2026 opentrix · ${escape(config.team)}</span><a href="${p.project}#lo-trinh">Lộ trình dự án</a><a href="#top">Lên đầu trang</a></div></div></footer><!-- site-footer:end -->`;
}
export function metadata(title,description,canonical){
  // Image and Open Graph publication deferred pending asset clearance.
  return `<meta name="description" content="${escape(description)}"><meta name="theme-color" content="#b43a1e"><link rel="canonical" href="${escape(canonical)}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}">`;
}
export function applyShell(html,file){
  const p=linksFor(file),isDocs=file.startsWith('docs/');
 html=html.replaceAll('TRAKZOR','opentrix').replaceAll('OPENTRIX','opentrix').replaceAll('DX-OS OPEN-CORE','DX-OS Open-Core');
  html=html.replace(/<html[^>]*>/,'<html lang="vi" id="top">');
  html=html.replace(/<!-- site-header:start -->[\s\S]*?<!-- site-header:end -->/,header(file));
  if(!html.includes('<!-- site-header:start -->'))html=html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,header(file));
  html=html.replace(/<!-- site-footer:start -->[\s\S]*?<!-- site-footer:end -->/,'').replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/g,'');
  html=html.replace(/\s*<\/body>/, '\n'+footer(file)+'\n</body>');
  html=html.replace(/<script(?:\s+data-site-theme)?>([\s\S]*?)<\/script>/g,s=>s.includes('localStorage.getItem')?'':s);
  html=html.replace(/<link\b(?=[^>]*href="(?:\.\.\/)*(?:assets\/)?(?:tokens|landing|unified)\.css")[^>]*>/g,'');
  html=html.replace(/<link\b(?=[^>]*rel="(?:icon|canonical)")[^>]*>/g,'');
  html=html.replace(/<script\b(?=[^>]*src="(?:\.\.\/)*assets\/unified\.js")[^>]*>[\s\S]*?<\/script>/g,'');
  html=html.replace('</head>',`<link rel="stylesheet" href="${p.prefix}assets/tokens.css"><link rel="stylesheet" href="${p.prefix}assets/landing.css"><link rel="stylesheet" href="${p.prefix}assets/unified.css"><script data-site-theme>try{document.documentElement.dataset.theme=localStorage.getItem('opentrix-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}</script><script defer src="${p.prefix}assets/unified.js"></script></head>`);
  const page=config.pages[file]||{};
  const heading=decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'')||'opentrix');
  const title=file==='index.html'?'TRICORE — đội phát triển DX-OS Open-Core':(page.title||heading)+' · TRICORE';
  const description=page.description||decode(html.match(/<meta\b(?=[^>]*name="description")(?=[^>]*content="([^"]*)")[^>]*>/)?.[1]||heading);
  const canonical=config.origin+'/'+(page.canonical||file.replace(/index\.html$/,''));
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(title)}</title>`);
  html=html.replace(/<meta\b(?=[^>]*(?:name="(?:description|theme-color|twitter:[^"]+)"|property="og:[^"]+"))[^>]*>/g,'');
  html=html.replace('</title>','</title>'+metadata(title,description,canonical));
  if(isDocs){
    html=html.replace(/<div class="doc-meta">[\s\S]*?<\/div>/,`<div class="doc-meta"><a data-config-url="links.release" href="${escape(config.links.release)}">v0.1.0 · Pre-release</a></div>`);
    if(!html.includes('data-todo='))html=html.replace(/<meta\b[^>]*(?:name="robots"|content="noindex)[^>]*>/g,'');
  }
  html=html.replace(/<a\b[^>]*>/g,tag=>{
    let key=tag.match(/data-config-url="([^"]+)"/)?.[1];
    if(!key){
      const href=decode(tag.match(/\bhref="([^"]+)"/)?.[1]||'');
      const link=Object.keys(config.links).find(k=>config.links[k]===href);
      const reference=Object.keys(config.references||{}).find(k=>config.references[k]===href);
      key=link?'links.'+link:reference?'references.'+reference:null;
      if(key)tag=tag.replace('<a ',`<a data-config-url="${key}" `);
    }
    if(key){const url=value(key);if(!url)throw new Error(`Missing config URL: ${key}`);tag=tag.replace(/\bhref="[^"]*"/,`href="${escape(url)}"`);}
    return tag;
  });
  html=html.replace(/(<[^>]+data-config-text="([^"]+)"[^>]*>)[^<]*(<\/[^>]+>)/g,(_,start,key,end)=>start+escape(value(key)||'Thông tin đang được cập nhật.')+end);
  html=html.replace(/(<p\b[^>]*data-config-optional="([^"]+)"[^>]*>)[\s\S]*?<\/p>/g, (original,start,key)=>{
    const data=value(key);if(!data)return original;
    start=start.replace(/ data-todo="[^"]*"/,'');
    if(key==='social.email')return start+`<a href="mailto:${escape(data)}">${escape(data)}</a></p>`;
    if(key.endsWith('.github')||key==='social.tiktok')return start+`<a href="${escape(data)}">${key.endsWith('.github')?'GitHub cá nhân':'TikTok đội'} ↗</a></p>`;
    return start+escape(data)+'</p>';
  });
  return html;
}
