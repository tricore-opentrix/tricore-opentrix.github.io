(() => {
  'use strict';
  const root=document.documentElement,button=document.querySelector('.site-theme');
  const current=()=>root.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  function label(){button?.setAttribute('aria-label',current()==='dark'?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối');}
  if(button){button.hidden=false;button.addEventListener('click',()=>{const next=current()==='dark'?'light':'dark';root.dataset.theme=next;try{localStorage.setItem('opentrix-theme',next);}catch{}label();});label();}
  const menu=document.querySelector('.site-menu');
  const close=()=>{if(menu)menu.open=false;};
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.open){close();menu.querySelector('summary').focus();}});
  document.addEventListener('click',event=>{if(menu?.open&&!event.target.closest('.site-menu'))close();});
  menu?.querySelector('nav')?.addEventListener('click',event=>{if(event.target.closest('a'))close();});
  document.addEventListener('focusin',event=>{if(menu?.open&&!event.target.closest('.site-menu'))close();});
  matchMedia('(min-width:1001px)').addEventListener('change',close);
})();
