(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const cfg=window.TRAKZOR_CONFIG||{};
const safe=(value,hosts)=>{try{const u=new URL(value);return u.protocol==='https:'&&(!hosts||hosts.includes(u.hostname))?u.href:null;}catch{return null;}};
const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
let toastTimer;
const toast=msg=>{const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),3000);};
const themeButton=$('.theme-toggle');
function themeUI(){const dark=document.documentElement.dataset.theme==='dark';themeButton?.setAttribute('aria-label',dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối');if(themeButton)themeButton.innerHTML=dark?'<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z"/></svg>';}
themeUI();themeButton?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('trakzor-theme',next);}catch{}themeUI();});
const menu=$('.menu-toggle'),nav=$('.nav');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Mở menu');}
menu?.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',ev=>{if(!ev.target.closest('.header'))closeMenu();});
nav?.addEventListener('click',ev=>{if(ev.target.closest('a'))closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',closeMenu);
const surveyURL=safe(cfg.surveyUrl,['docs.google.com']);if(surveyURL)$$('[data-survey-link]').forEach(a=>a.href=surveyURL);
for(const platform of ['facebook','youtube','tiktok']){
const u=safe(cfg.social?.[platform]);
$$('[data-social="'+platform+'"]').forEach(container=>{
container.replaceChildren();
if(u){const a=node('a','Truy cập kênh chính thức ↗','text-link');a.href=u;a.target='_blank';a.rel='noopener noreferrer';container.append(a);}
else container.append(node('span','Chưa công bố kênh chính thức','coming'));
});
if(u)$$('[data-email]').forEach(container=>{const a=node('a',platform[0].toUpperCase()+platform.slice(1));a.href=u;a.target='_blank';a.rel='noopener noreferrer';container.append(a);});
}
if(cfg.social?.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.social.email))$$('[data-email]').forEach(c=>{const a=node('a','Email liên hệ');a.href='mailto:'+cfg.social.email;c.append(a);});
const search=$('#blog-search'),filters=$$('[data-filter]'),cards=$$('#blog-results [data-article]');
if(search){
const normalize=s=>s.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').trim();
const q=new URLSearchParams(location.search);
search.value=q.get('q')||'';
let category=filters.some(b=>b.dataset.filter===q.get('category'))?q.get('category'):'all';
const haystack=new Map(cards.map(c=>[c,normalize(c.dataset.search)]));
function update(){
const terms=normalize(search.value).split(/\s+/).filter(Boolean);let count=0;
cards.forEach(c=>{const show=(category==='all'||c.dataset.category===category)&&terms.every(t=>haystack.get(c).includes(t));c.hidden=!show;if(show)count++;});
filters.forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
$('#result-count').textContent=count+' bài viết'+(search.value.trim()?' phù hợp với “'+search.value.trim()+'”':'');
$('#blog-empty').hidden=count!==0;
$('#blog-featured').hidden=category!=='all'||!!terms.length;
const params=new URLSearchParams();if(search.value.trim())params.set('q',search.value.trim());if(category!=='all')params.set('category',category);
try{history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);}catch{}
}
search.addEventListener('input',update);
filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;update();}));
$('#reset-search')?.addEventListener('click',()=>{category='all';search.value='';update();search.focus();});
update();
}
$$('.share-button').forEach(b=>b.addEventListener('click',async()=>{
try{if(!navigator.clipboard)throw Error('clipboard unavailable');await navigator.clipboard.writeText(location.href);toast('Đã sao chép đường dẫn bài viết.');}
catch{const fallback=$('.share-fallback');if(fallback){fallback.hidden=false;const input=fallback.querySelector('input');input.value=location.href;input.focus();input.select();toast('Chọn và sao chép đường dẫn trong ô bên dưới bài viết.');}}
}));
const progress=$('.reading-progress>span');
if(progress){
const article=$('main>article');let waiting=false;
function reading(){const y=scrollY,top=article.offsetTop,bottom=top+article.offsetHeight-innerHeight;progress.style.width=(Math.max(0,Math.min(1,(y-top)/Math.max(1,bottom-top)))*100)+'%';waiting=false;}
addEventListener('scroll',()=>{if(!waiting){requestAnimationFrame(reading);waiting=true;}},{passive:true});
addEventListener('resize',reading);reading();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){$$('.toc a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -65% 0px'});$$('.article-body>section').forEach(el=>observer.observe(el));}
}
const ghStatus=$('#github-status'),ghData=$('#github-data'),retry=$('#github-retry');
if(ghStatus){
const repository=/^[\w.-]+\/[\w.-]+$/.test(cfg.repository||'')?cfg.repository:'lexuanbao258-collab/dxos-open-core';
const api='https://api.github.com/repos/'+repository;
let loading=false;
const ghLink=(text,url)=>{const a=node('a',text);a.href=safe(url,['github.com'])||'https://github.com/'+repository;a.target='_blank';a.rel='noopener noreferrer';return a;};
async function get(endpoint){
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),9000);
try{const r=await fetch(api+endpoint,{headers:{Accept:'application/vnd.github+json'},signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}finally{clearTimeout(timer);}
}
async function loadGithub(){
if(loading)return;loading=true;retry.disabled=true;retry.textContent='Đang tải…';ghStatus.textContent='Đang tải dữ liệu trực tiếp từ GitHub…';ghData.hidden=true;
try{
const results=await Promise.allSettled(['','/contributors?per_page=12','/languages','/commits?per_page=4','/pulls?state=all&per_page=4'].map(get));
const val=i=>results[i].status==='fulfilled'?results[i].value:null;
const r=val(0),contributors=val(1),languages=val(2),commits=val(3),prs=val(4);
let successful=0;
$('.github-stats').replaceChildren();$('.language-bar').replaceChildren();$('.language-legend').replaceChildren();
$('#github-contributors').replaceChildren();$('#github-commits').replaceChildren();$('#github-prs').replaceChildren();
if(r&&r.full_name){successful++;for(const [key,label] of [['stargazers_count','Stars'],['forks_count','Forks']])if(Number.isFinite(r[key])){const s=node('span');s.append(node('strong',r[key].toLocaleString('vi-VN')),' '+label);$('.github-stats').append(s);}$('.github-stats').append(node('span','Nhánh mặc định: '+String(r.default_branch||'Chưa xác định')));}
if(languages&&typeof languages==='object'&&!Array.isArray(languages)){const entries=Object.entries(languages).filter(([,n])=>Number.isFinite(n)&&n>0),total=entries.reduce((s,[,n])=>s+n,0),colors=['#2455e9','#6b8eef','#b28ae2','#47a596','#d1a95c','#8292ad'];if(total){successful++;entries.forEach(([name,bytes],i)=>{const color=colors[i%colors.length],pct=bytes/total*100,bar=node('span');bar.style.width=pct+'%';bar.style.background=color;bar.title=name+': '+pct.toFixed(1)+'%';$('.language-bar').append(bar);const label=node('span'),dot=node('i');dot.style.background=color;label.append(dot,name+' '+pct.toFixed(1)+'%');$('.language-legend').append(label);});}}
if(Array.isArray(contributors)){successful++;for(const c of contributors){if(!c.login)continue;const a=ghLink(c.login,c.html_url),avatar=safe(c.avatar_url,['avatars.githubusercontent.com']);if(avatar){const img=node('img');img.src=avatar;img.alt='';img.width=32;img.height=32;img.loading='lazy';img.addEventListener('error',()=>img.remove(),{once:true});a.prepend(img);}$('#github-contributors').append(a);}if(!contributors.length)$('#github-contributors').append(node('span','GitHub chưa trả về contributor.'));}
else $('#github-contributors').append(node('span','Chưa tải được contributor. Xem repository để kiểm tra.'));
if(Array.isArray(commits)){successful++;for(const c of commits){const li=node('li'),msg=String(c.commit?.message||'Commit').split('\n')[0],date=new Date(c.commit?.author?.date);li.append(ghLink(msg,c.html_url),node('small',String(c.sha||'').slice(0,7)+' · '+(Number.isNaN(+date)?'Ngày chưa xác định':date.toLocaleDateString('vi-VN'))));$('#github-commits').append(li);}if(!commits.length)$('#github-commits').append(node('li','Chưa có commit được trả về.'));}
else $('#github-commits').append(node('li','Không tải được commit. Xem trực tiếp trên GitHub.'));
if(Array.isArray(prs)){successful++;for(const p of prs){const li=node('li');li.append(ghLink('#'+p.number+' '+String(p.title||'Pull request'),p.html_url),node('small',p.merged_at?'Đã merge':p.state==='open'?'Đang mở':'Đã đóng, chưa merge'));$('#github-prs').append(li);}if(!prs.length)$('#github-prs').append(node('li','Chưa có pull request được trả về.'));}
else $('#github-prs').append(node('li','Không tải được pull request. Xem trực tiếp trên GitHub.'));
ghData.hidden=successful===0;
ghStatus.textContent=successful?'Cập nhật '+new Date().toLocaleString('vi-VN')+' từ GitHub REST API.'+(results.some(x=>x.status==='rejected')?' Một số mục chưa tải được; bạn có thể thử lại.':' Ngôn ngữ được tính theo số byte mã nguồn GitHub trả về.'):'Không thể tải GitHub API (mất mạng, giới hạn truy cập hoặc dịch vụ tạm gián đoạn). Blog và thông tin giới thiệu vẫn đọc được; hãy thử lại hoặc mở repository.';
}catch{ghStatus.textContent='Chưa tải được GitHub API. Bạn vẫn có thể đọc nội dung tĩnh và truy cập repository.';ghData.hidden=true;}
finally{loading=false;retry.disabled=false;retry.textContent='Tải lại dữ liệu →';}
}
retry.addEventListener('click',loadGithub);
addEventListener('online',loadGithub);
loadGithub();
}
})();
