(function(){
  'use strict';
  const root=document.documentElement;
  const toggle=document.querySelector('.docs-theme');
  function theme(){const t=root.dataset.theme;return t||(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}
  function updateThemeLabel(){toggle.setAttribute('aria-label',theme()==='dark'?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối');}
  if(toggle){toggle.addEventListener('click',()=>{const next=theme()==='dark'?'light':'dark';root.dataset.theme=next;try{localStorage.setItem('opentrix-theme',next);}catch(e){}updateThemeLabel();});updateThemeLabel();}
  const search=document.getElementById('doc-search');
  const links=[...document.querySelectorAll('[data-search-item]')];
  const count=document.getElementById('search-count');
  function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();}
  if(search){search.addEventListener('input',()=>{const q=normalize(search.value.trim());let found=0;links.forEach(a=>{const ok=normalize((a.dataset.label||a.textContent)+" "+(a.dataset.keywords||"")).includes(q);a.hidden=!ok;if(ok)found++;});count.textContent=q?`${found} trang phù hợp`:'';});}
  const mobileToggle=document.querySelector('.mobile-sidebar-toggle');
  const sidebar=document.getElementById('docs-sidebar');
  const mobileQuery=window.matchMedia('(max-width:900px)');
  function syncSidebar(){
    if(!sidebar||!mobileToggle)return;
    const mobile=mobileQuery.matches;
    if(!mobile)sidebar.classList.remove('is-open');
    const open=mobile&&sidebar.classList.contains('is-open');
    sidebar.inert=mobile&&!open;
    if(mobile&&!open)sidebar.setAttribute('aria-hidden','true');
    else sidebar.removeAttribute('aria-hidden');
    mobileToggle.setAttribute('aria-expanded',String(open));
  }
  function openSide(){sidebar?.classList.add('is-open');syncSidebar();}
  function closeSide(){sidebar?.classList.remove('is-open');syncSidebar();}
  if(mobileToggle&&sidebar){
    syncSidebar();
    mobileToggle.addEventListener('click',()=>{
      if(sidebar.classList.contains('is-open')){closeSide();mobileToggle.focus();}
      else {openSide();search?.focus();}
    });
    sidebar.addEventListener('click',e=>{if(e.target.closest('a'))closeSide();});
    mobileQuery.addEventListener('change',syncSidebar);
    document.addEventListener('pointerdown',e=>{
      if(mobileQuery.matches&&sidebar.classList.contains('is-open')&&
         !sidebar.contains(e.target)&&!mobileToggle.contains(e.target))closeSide();
    });
  }
  document.addEventListener('keydown',e=>{
    const typing=!!e.target.closest('input,textarea,[contenteditable="true"]');
    if(e.key==='/'&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&search){
      e.preventDefault();if(mobileQuery.matches)openSide();search.focus();
    }
    if(e.key==='Escape'){
      if(search===document.activeElement){search.value='';search.dispatchEvent(new Event('input'));search.blur();}
      if(sidebar?.classList.contains('is-open')){closeSide();mobileToggle.focus();}
    }
  });
  document.querySelectorAll('.copy-code').forEach(button=>button.addEventListener('click',async()=>{
    const text=button.closest('.code-wrap').querySelector('code').textContent;
    try{await navigator.clipboard.writeText(text);button.textContent='Đã sao chép';}
    catch(e){button.textContent='Không thể sao chép';}
    setTimeout(()=>button.textContent='Sao chép',1700);
  }));
  // Progressive enhancement: a scroll region is in the Tab order only while it actually scrolls.
  // Initial HTML remains keyboard-reachable without JavaScript for overflowing code/table content.
  const scrollRegions=[...document.querySelectorAll('.code-wrap pre, .table-overflow')];
  function syncScrollRegions(){
    for(const el of scrollRegions){
      const scrolls=(el.scrollWidth>el.clientWidth+1)||(el.scrollHeight>el.clientHeight+1);
      if(scrolls){
        el.setAttribute('tabindex','0');
        el.setAttribute('role','region');
        el.setAttribute('aria-label',el.dataset.scrollLabel||el.getAttribute('aria-label')||'Vùng nội dung cuộn');
      }else{
        el.removeAttribute('tabindex');
        el.removeAttribute('role');
        el.removeAttribute('aria-label');
      }
    }
  }
  // Capture persistent, specific accessible names before removing attributes.
  for(const el of scrollRegions){el.dataset.scrollLabel=el.getAttribute('aria-label')||'';}
  syncScrollRegions();
  window.addEventListener('resize',syncScrollRegions);
  if(document.fonts?.ready){document.fonts.ready.then(syncScrollRegions).catch(()=>{});}
  const headings=[...document.querySelectorAll('.doc-article section[id] > .section-top h2')];
  const toc=document.getElementById('page-toc');
  if(toc){headings.forEach(h=>{const id=h.closest('section').id;const a=document.createElement('a');a.href='#'+id;a.textContent=h.textContent;toc.append(a);});}
  if('IntersectionObserver' in window && toc){const links=[...toc.querySelectorAll('a')];const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('toc-active',a.hash==='#'+e.target.id));}})},{rootMargin:'-110px 0px -70% 0px',threshold:0});document.querySelectorAll('.doc-article section[id]').forEach(s=>observer.observe(s));}
})();
