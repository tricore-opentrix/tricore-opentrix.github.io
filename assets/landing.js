// SPDX-License-Identifier: Apache-2.0
// Original Website v1 interactions, Issue #7, 2026-11-11.
(() => {
  'use strict';
  const button = document.querySelector('.theme-toggle');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const labelTheme = () => button.setAttribute('aria-label',
    document.documentElement.dataset.theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  labelTheme();
  button.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('opentrix-theme', theme); } catch { /* Storage can be unavailable. */ }
    labelTheme();
  });
  const close = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Mở menu');
  };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { close(); menu.focus(); }
  });
  matchMedia('(min-width:761px)').addEventListener('change', close);
})();
