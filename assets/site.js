(() => {
  'use strict';
  const search=document.querySelector('#blog-search');
  const cards=[...document.querySelectorAll('[data-article]')];
  if(!search)return;
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const update=()=>{
    const words=normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let count=0;
    for(const card of cards){const show=words.every(w=>normalize(card.dataset.search||card.textContent).includes(w));card.hidden=!show;if(show)count++;}
    document.querySelector('#result-count').textContent=count+' bài viết';
    document.querySelector('#blog-empty').hidden=count!==0;
  };
  search.addEventListener('input',update);
  search.form.addEventListener('submit',e=>e.preventDefault());
  search.form.addEventListener('reset',()=>{search.value='';update();search.focus();});
})();
