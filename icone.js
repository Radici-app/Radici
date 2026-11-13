/* Icone di Radici: disegni semplici a linea, originali */
window.ICO = {
  forbici: '<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.2 15.8 19 4M15.8 15.8 5 4"/>',
  phon: '<path d="M3 6h11a4 4 0 0 1 0 8H8"/><path d="M9 14l-1 7h3l1-7"/><path d="M18.5 8h2.5M18.5 12h2.5"/>',
  rasoio: '<rect x="4" y="3" width="9" height="5" rx="1"/><path d="M8.5 8v3l5.5 10"/>',
  barba: '<path d="M5 7c0 8 3 12 7 12s7-4 7-12"/><path d="M9 13c1.5 1 4.5 1 6 0"/>',
  spa: '<path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z"/><path d="M10 14a2 2 0 0 0 2 2"/>',
  pennello: '<path d="M14 3l7 7-6 2-3-3z"/><path d="M12 9l-8 8 3 3 8-8"/>',
  viso: '<circle cx="12" cy="10" r="6"/><path d="M10 9h.01M14 9h.01M10 12.5c1 .7 3 .7 4 0"/><path d="M6 21c1-3 3.5-4 6-4s5 1 6 4"/>',
  mani: '<path d="M7 13V5.5a1.5 1.5 0 0 1 3 0V11M10 11V4a1.5 1.5 0 0 1 3 0v7M13 11V5a1.5 1.5 0 0 1 3 0v7M16 12V9.5a1.5 1.5 0 0 1 3 0V14c0 4-3 7-7 7-3 0-5-1.5-6.3-4L4 14a1.5 1.5 0 0 1 2.6-1.5L7 13"/>',
  piedi: '<path d="M8 3c-1 4-1 9 1 13 1 2 3 4 6 4s4-2 3-4c-1-2-3-3-4-6-1-2 0-5 0-7"/>',
  smalto: '<rect x="7" y="10" width="10" height="11" rx="2"/><path d="M10 10V6h4v4M11 6V3h2v3"/>',
  ciglia: '<path d="M3 10c3 4 15 4 18 0"/><path d="M6 13l-1 2M10 14l-.5 2.2M14 14l.5 2.2M18 13l1 2"/>',
  cuore: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  negozio: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v9h14v-9"/><path d="M10 21v-5h4v5"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  calendarioPiu: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5"/>',
  carta: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
  listino: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  utente: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  scudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  cestino: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  esci: '<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  chat: '<path d="M4 20l1.5-4A8 8 0 1 1 8 19z"/>',
  campana: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  mappa: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>'
};
window.ico = n => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (window.ICO[n] || window.ICO.forbici) + '</svg>';
window.riempiIcone = (radice) => (radice || document).querySelectorAll('svg[data-i]').forEach(s => {
  s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', '1.7'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
  s.setAttribute('aria-hidden', 'true'); s.innerHTML = window.ICO[s.dataset.i] || '';
});
