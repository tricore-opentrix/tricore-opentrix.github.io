// SPDX-License-Identifier: Apache-2.0
// Issue #8: configuration contains public, approved values only.
(() => {
  const profile = window.OPENTRIX_CONFIG.teamProfile;
  const name = document.querySelector('[data-team-name]');
  if (name) name.textContent = profile.displayName;
  const target = document.querySelector('#approved-team');
  if (!target || !profile.approvalSource) return;
  if (profile.affiliation) {
    const p = document.createElement('p');
    p.textContent = `${profile.affiliation} — liên hệ giáo dục, không phải bảo trợ của trường.`;
    target.append(p);
  }
  for (const member of profile.members) {
    const card = document.createElement('article');
    card.className = 'team-card';
    card.dataset.claim = 'M26';
    const initials = document.createElement('span');
    initials.className = 'initial-avatar';
    initials.setAttribute('role', 'img');
    initials.setAttribute('aria-label', `Chữ viết tắt của ${member.name}`);
    initials.textContent = member.initials;
    const h = document.createElement('h3');
    h.textContent = member.name;
    card.append(initials, h);
    for (const value of [member.role, member.biography]) if (value) {
      const p = document.createElement('p'); p.textContent = value; card.append(p);
    }
    target.append(card);
  }
})();
