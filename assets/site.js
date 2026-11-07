(() => {
  'use strict';
  const search=document.querySelector('#blog-search');
  const cards=[...document.querySelectorAll('[data-article]')];
  if(!search)return;
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
  const filters=[...document.querySelectorAll('[data-filter]')];
  const params=new URLSearchParams(location.search);
  let category=filters.some(b=>b.dataset.filter===params.get('category'))?params.get('category'):'all';
  search.value=params.get('q')||'';
  const update=()=>{
    const words=normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let count=0;
    for(const card of cards){const show=(category==='all'||card.dataset.category===category)&&words.every(w=>normalize(card.dataset.search||card.textContent).includes(w));card.hidden=!show;if(show)count++;}
    for(const filter of filters)filter.setAttribute('aria-pressed',String(filter.dataset.filter===category));
    document.querySelector('#result-count').textContent=count+' bài viết';
    document.querySelector('#blog-empty').hidden=count!==0;
    const next=new URLSearchParams();if(search.value.trim())next.set('q',search.value.trim());if(category!=='all')next.set('category',category);
    try{history.replaceState(null,'',location.pathname+(next.size?'?'+next:'')+location.hash);}catch{}
  };
  search.addEventListener('input',update);
  search.form.addEventListener('submit',e=>e.preventDefault());
  search.form.addEventListener('reset',()=>{category='all';search.value='';update();search.focus();});
  for(const filter of filters)filter.addEventListener('click',()=>{category=filter.dataset.filter;update();});
  const bar=document.querySelector('.blog-filters');if(bar)bar.hidden=false;
  update();
})();
