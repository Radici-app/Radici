/* Radici – app clienti */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signInWithCredential, GoogleAuthProvider, signOut, deleteUser } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, onSnapshot, query, where, getDocs, writeBatch } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const VERSIONE = '1.0';
const SALONE = 'radici';
const fbApp = initializeApp({ apiKey: 'AIzaSyCUhd6pXSheUQ6gPhT5OfvprM5dYI2uxz4', authDomain: 'radici-app.firebaseapp.com', projectId: 'radici-app', storageBucket: 'radici-app.firebasestorage.app', messagingSenderId: '602201707324', appId: '1:602201707324:web:88d8681280de279b81c439' });
const auth = getAuth(fbApp), db = getFirestore(fbApp);
const colP = collection(db, 'saloni', SALONE, 'prenotazioni'), colB = collection(db, 'saloni', SALONE, 'busy');

/* ---------- utilità ---------- */
const $ = id => document.getElementById(id);
const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const p2 = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
const hm = m => p2(Math.floor(m / 60)) + ':' + p2(m % 60);
const fd = m => m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + m % 60 : '');
const oggi = () => iso(new Date());
const oraMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const dataLunga = k => new Date(k + 'T12:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
const GIORNI = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const ORD = [1, 2, 3, 4, 5, 6, 0];
const cp = o => JSON.parse(JSON.stringify(o));
function toast(t) { document.querySelectorAll('.toast').forEach(x => x.remove()); const e = document.createElement('div'); e.className = 'toast'; e.textContent = t; document.body.appendChild(e); setTimeout(() => e.remove(), 2600); }
function dialogo(t, p, ok, no) { return new Promise(r => { $('dlgT').textContent = t; $('dlgP').textContent = p || ''; $('dlgOk').textContent = ok; $('dlgNo').textContent = no || ''; $('dlgNo').hidden = !no; $('dlg').hidden = false; const f = v => { $('dlg').hidden = true; r(v); }; $('dlgOk').onclick = () => f(true); $('dlgNo').onclick = () => f(false); }); }
const avvisa = t => dialogo('Attenzione', t, 'Ok');
const iniziali = n => String(n || '?').trim().split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase();
const avatar = st => `<span class="av">${st && st.foto ? `<img src="${esc(st.foto)}" alt="">` : esc(iniziali(st && st.nome))}</span>`;

/* ---------- dati del salone ---------- */
let C = cp(window.RADICI_SEED);
let BUSY = [], busyOk = false, utente = null, PROF = null, MIE = [], mieOk = false, storico = false;
let sel = [], staffSel = 'any', giorno = null, ora = null, mese = null;
let prCfg = false, prAuth = false;
const prova = () => { if (prCfg && prAuth && window.splashPronto) window.splashPronto(); };
onSnapshot(doc(db, 'saloni', SALONE), s => { if (s.exists()) { C = Object.assign(cp(window.RADICI_SEED), window.fasceDaDb(s.data())); window.splashDati && window.splashDati(C); sel = sel.filter(id => serv(id)); ridisegna(); } prCfg = true; prova(); }, () => { prCfg = true; prova(); });
onSnapshot(colB, s => { BUSY = s.docs.map(d => d.data()); busyOk = true; if (PAG === 'p3') renderSlots(); }, () => { busyOk = true; });

const serv = id => C.servizi.find(s => s.id === id);
const cat = id => C.categorie.find(c => c.id === id);
const tipo = s => (s && cat(s.cat) && cat(s.cat).tipo) || 'base';
const visibili = () => C.servizi.filter(s => s.visibile !== false);
const scelti = () => sel.map(serv).filter(Boolean);
const durTot = () => { const d = scelti().map(s => +s.durata || 0); return d.length ? (C.regole.tempiDinamici ? d.reduce((a, b) => a + b, 0) : Math.max(...d)) : 0; };
function prezzoTot() {
  let tot = 0, da = false;
  scelti().forEach(s => { const m = String(s.prezzo).replace(',', '.').match(/\d+(\.\d+)?/); if (m) tot += +m[0]; if (/partire|da |ad |\bS\b|-/i.test(s.prezzo) || !m) da = true; });
  return (da ? 'da ' : '') + (Number.isInteger(tot) ? tot : tot.toFixed(2)) + ' €';
}
const staffPer = ids => C.staff.filter(st => !(st.servizi && st.servizi.length) || ids.every(id => st.servizi.includes(id)));
const chiusura = k => C.chiusure.find(c => k >= c.da && k <= c.a);
function fasce(k) { if (chiusura(k)) return []; const e = C.eccezioni.find(x => x.data === k); if (e) return e.fasce || []; return C.orari[new Date(k + 'T12:00').getDay()] || []; }
const libero = (st, k, a, b) => !BUSY.some(x => x.data === k && x.staff === st && a < x.fine && x.ini < b);

/* ---------- navigazione: una schermata per passo, il tasto Indietro torna alla precedente ---------- */
let PAG = 'ph', STORIA = ['ph'];
function mostraP(p) {
  if (['p2', 'p3', 'p4'].includes(p) && !sel.length) p = 'p1';
  if (p === 'p4' && ora == null) p = 'p3';
  document.querySelectorAll('#pagine>.p').forEach(e => e.hidden = e.id !== p);
  PAG = p;
  ({ ph: renderHome, pi: renderInfo, pl: renderListino, p1: renderServizi, p2: renderOperatori, p3: renderGiorni, p4: renderConferma, pm: renderMie, pp: renderProfilo })[p]?.();
  aggBarra(); scrollTo(0, 0);
}
function vai(p) { if (p === 'ph') STORIA = ['ph']; else if (STORIA[STORIA.length - 1] !== p) { STORIA.push(p); try { history.pushState({ r: STORIA.length }, ''); } catch (e) {} } mostraP(p); }
function indietro() { if (STORIA.length > 1) history.back(); else mostraP('ph'); }
addEventListener('popstate', () => { for (const id of ['login', 'dlg', 'prof']) if (!$(id).hidden) { $(id).hidden = true; return; } if (STORIA.length > 1) { STORIA.pop(); mostraP(STORIA[STORIA.length - 1]); } });
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { const p = g.dataset.go; if ((p === 'pm' || p === 'pp') && !utente) { apriLogin(); return; } if (p === 'ph' || p === 'p1' && PAG === 'p5') STORIA = ['ph']; vai(p); return; }
  if (e.target.closest('[data-back]')) indietro();
});
function ridisegna() { mostraP(PAG); }

function aggBarra() {
  let t = '', fn = null;
  if (PAG === 'p1' && sel.length) { t = sel.length + (sel.length === 1 ? ' servizio' : ' servizi') + `<small>${fd(durTot())} · ${prezzoTot()}</small>`; fn = () => vai('p2'); }
  else if (PAG === 'p3' && ora != null) { t = dataLunga(giorno) + `<small>ore ${hm(ora)} · ${fd(durTot())}</small>`; fn = () => vai('p4'); }
  $('barra').hidden = !fn; $('btxt').innerHTML = t; $('bNext').onclick = fn;
}

/* ---------- home e informazioni ---------- */
function renderTesta() {
  $('bNome').textContent = C.nome; $('bSub').textContent = C.sottotitolo || '';
  $('logo').innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="">` : esc(iniziali(C.nome)[0]);
  $('cBtn').textContent = utente ? 'Esci' : 'Accedi';
  document.title = C.nome + ' – Prenota';
}
/* Adatta le scritte dei riquadri: se una parola non entra, rimpicciolisce il testo finché ci sta */
function adattaTesti() {
  document.querySelectorAll('#ph .mt b').forEach(b => {
    b.style.fontSize = ''; let f = parseFloat(getComputedStyle(b).fontSize), giri = 0;
    const largo = () => { const r = b.getBoundingClientRect(), q = b.parentNode.getBoundingClientRect(), pad = parseFloat(getComputedStyle(b.parentNode).paddingRight) || 0; return b.scrollWidth > b.clientWidth + 1 || r.right > q.right - pad + 1; };
    while (largo() && f > 9 && giri++ < 30) { f -= 0.5; b.style.fontSize = f + 'px'; }
  });
  /* stessa grandezza per tutte le scritte dello stesso tipo di riquadro, la più piccola che serve */
  ['big', 'sm'].forEach(t => { const l = [...document.querySelectorAll('#ph .mt.' + t + ' b')], m = Math.min(...l.map(b => parseFloat(getComputedStyle(b).fontSize))); l.forEach(b => { b.style.fontSize = m + 'px'; }); });
}
addEventListener('resize', () => { if (PAG === 'ph') adattaTesti(); });
function renderHome() {
  renderTesta();
  $('cover').querySelector('img')?.remove();
  if (C.cover) $('cover').insertAdjacentHTML('afterbegin', `<img src="${esc(C.cover)}" alt="">`);
  $('hTit').textContent = utente && PROF && PROF.nome ? 'Ciao ' + PROF.nome : C.nome;
  $('hSub').textContent = C.sottotitolo || 'Prenota in pochi tocchi';
  const fut = MIE.filter(attiva).length; $('nMie').textContent = fut || '';
  const ch = C.chiusure.find(c => c.a >= oggi()); $('nChiuso').textContent = ch ? '!' : '';
  requestAnimationFrame(adattaTesti); if (document.fonts) document.fonts.ready.then(adattaTesti);
}
function renderInfo() {
  $('iNome').textContent = C.nome;
  const q = [];
  if (C.telefono) q.push(`<a href="tel:${esc(C.telefono.replace(/[^\d+]/g, ''))}" aria-label="Chiama">${ico('tel')}</a>`);
  if (C.whatsapp) q.push(`<a href="https://wa.me/${esc(C.whatsapp.replace(/\D/g, ''))}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico('chat')}</a>`);
  if (C.instagram) q.push(`<a href="https://instagram.com/${esc(C.instagram.replace(/^@/, ''))}" target="_blank" rel="noopener" aria-label="Instagram">${ico('insta')}</a>`);
  if (C.indirizzo) q.push(`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.indirizzo)}" target="_blank" rel="noopener" aria-label="Navigatore">${ico('mappa')}</a>`);
  $('iQa').innerHTML = q.join(''); $('iQa').hidden = !q.length;
  const ch = C.chiusure.filter(c => c.a >= oggi()).sort((a, b) => a.da.localeCompare(b.da))[0];
  $('iChiuso').innerHTML = ch ? `<div class="row" style="margin-top:14px"><b>Chiuso ${ch.da === ch.a ? dataLunga(ch.da) : 'dal ' + dataLunga(ch.da) + ' al ' + dataLunga(ch.a)}</b>${ch.msg ? `<small>${esc(ch.msg)}</small>` : ''}</div>` : '';
  $('iAddr').innerHTML = C.indirizzo ? `<h3>Indirizzo</h3><p style="margin:0">${esc(C.indirizzo)}</p>` : '';
  $('iDesc').textContent = C.descrizione || '';
  $('iStaff').innerHTML = C.staff.map(st => `<div class="op">${avatar(st)}<b>${esc(st.nome)}</b></div>`).join('');
  const d = new Date().getDay();
  $('iOrari').innerHTML = ORD.map(g => { const f = C.orari[g] || []; return `<div class="orw${g === d ? ' oggi' : ''}"><b>${GIORNI[g].slice(0, 3).toUpperCase()}</b><span>${f.length ? f.map(x => hm(x[0]) + ' – ' + hm(x[1])).join('&nbsp;&nbsp; ') : 'Chiuso'}</span></div>`; }).join('');
}
function renderListino() {
  $('lAcc').innerHTML = C.categorie.map(c => { const l = visibili().filter(s => s.cat === c.id); if (!l.length) return '';
    return `<div class="acc"><button>${ico(c.icona)}<b>${esc(c.nome)}</b><i>⌄</i></button><div class="ls" hidden>${l.map(s => `<div class="lr"><div class="t"><b>${esc(s.nome)}</b>${s.descr ? `<small>${esc(s.descr)}</small>` : ''}</div><div class="p"><b>${esc(s.prezzo)}</b><span>${fd(s.durata)}</span></div></div>`).join('')}</div></div>`; }).join('');
  $('lAcc').querySelectorAll('.acc>button').forEach(b => b.onclick = () => { const a = b.parentNode, ls = a.querySelector('.ls'); ls.hidden = !ls.hidden; a.toggleAttribute('open', !ls.hidden); });
}

/* ---------- 1. servizi, con le regole: max servizi, una sola combo, aggiuntivi solo con un servizio base ---------- */
function puoi(s) {
  if (sel.includes(s.id)) return '';
  if (sel.length >= C.regole.maxServizi) return 'Puoi scegliere al massimo ' + C.regole.maxServizi + ' servizi per prenotazione.';
  const t = tipo(s);
  if (t === 'combo' && scelti().some(x => tipo(x) === 'combo')) return 'Puoi scegliere una sola combo per prenotazione.';
  if (t === 'aggiuntivo' && !scelti().some(x => tipo(x) !== 'aggiuntivo')) return 'Questo servizio si aggiunge a un taglio, a uno styling o a una combo: scegli prima quello.';
  if (!staffPer(sel.concat(s.id)).length) return 'Nessun operatore esegue questo servizio insieme a quelli già scelti.';
  return '';
}
function renderServizi() {
  $('h1').textContent = 'Puoi sceglierne fino a ' + C.regole.maxServizi + '. La durata si calcola da sola.';
  $('sGrid').innerHTML = C.categorie.map(c => { const l = visibili().filter(s => s.cat === c.id); if (!l.length) return '';
    return `<div class="gl">${ico(c.icona)}${esc(c.nome)}</div><div class="grid">${l.map(s => `<button class="sv${puoi(s) ? ' off' : ''}" data-s="${s.id}" aria-pressed="${sel.includes(s.id)}">${s.descr ? `<span class="inf" data-info="${s.id}">i</span>` : ''}${ico(s.icona)}<b>${esc(s.nome)}</b><small>${esc(s.prezzo)} · ${fd(s.durata)}</small></button>`).join('')}</div>`; }).join('');
  $('sGrid').querySelectorAll('.sv').forEach(b => b.onclick = e => {
    const s = serv(b.dataset.s);
    if (e.target.closest('[data-info]')) { dialogo(s.nome, s.descr + '\n' + s.prezzo + ' · ' + fd(s.durata), 'Ok'); return; }
    if (sel.includes(s.id)) { sel = sel.filter(x => x !== s.id); if (!scelti().some(x => tipo(x) !== 'aggiuntivo')) sel = []; }
    else { const no = puoi(s); if (no) { toast(no); return; } sel.push(s.id); }
    staffSel = 'any'; ora = null; renderServizi(); aggBarra();
  });
}

/* ---------- 2. operatore ---------- */
function renderOperatori() {
  const l = staffPer(sel);
  $('oList').innerHTML = `<button class="op" data-o="any" aria-pressed="${staffSel === 'any'}"><span class="av">★</span><b>Indifferente<br><small style="color:var(--mute);font-weight:500">il primo libero</small></b></button>` +
    l.map(st => `<button class="op" data-o="${st.id}" aria-pressed="${staffSel === st.id}">${avatar(st)}<b>${esc(st.nome)}</b></button>`).join('');
  $('oList').querySelectorAll('.op').forEach(b => b.onclick = () => { staffSel = b.dataset.o; ora = null; vai('p3'); });
}

/* ---------- 3. giorno e ora ---------- */
function giornoOk(k) { const t = oggi(), max = new Date(); max.setDate(max.getDate() + C.regole.giorniMax); return k >= t && k <= iso(max) && fasce(k).length > 0; }
function renderGiorni() {
  const t = new Date(); if (!mese) mese = { y: t.getFullYear(), m: t.getMonth() };
  const max = new Date(); max.setDate(max.getDate() + C.regole.giorniMax);
  const f = new Date(mese.y, mese.m, 1), off = (f.getDay() + 6) % 7, n = new Date(mese.y, mese.m + 1, 0).getDate();
  let g = ['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(x => `<span class="wd">${x}</span>`).join('') + '<span></span>'.repeat(off);
  for (let d = 1; d <= n; d++) { const k = iso(new Date(mese.y, mese.m, d)); g += `<button data-k="${k}" ${giornoOk(k) ? '' : 'disabled'} aria-pressed="${giorno === k}">${d}</button>`; }
  const prevOff = mese.y * 12 + mese.m <= t.getFullYear() * 12 + t.getMonth(), nextOff = mese.y * 12 + mese.m >= max.getFullYear() * 12 + max.getMonth();
  $('dCal').innerHTML = `<div class="cal"><div class="calh"><button data-n="-1" ${prevOff ? 'disabled' : ''} aria-label="Mese precedente">‹</button><b>${f.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</b><button data-n="1" ${nextOff ? 'disabled' : ''} aria-label="Mese successivo">›</button></div><div class="cg">${g}</div></div>`;
  $('dCal').querySelectorAll('[data-n]').forEach(b => b.onclick = () => { const x = new Date(mese.y, mese.m + +b.dataset.n, 1); mese = { y: x.getFullYear(), m: x.getMonth() }; renderGiorni(); });
  $('dCal').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { giorno = b.dataset.k; ora = null; renderGiorni(); aggBarra(); $('dSlots').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  renderSlots();
}
function liberiA(k, m, dur) { const c = staffSel === 'any' ? staffPer(sel) : C.staff.filter(s => s.id === staffSel); return c.filter(st => libero(st.id, k, m, m + dur)); }
function orariLiberi(k) {
  const dur = durTot(), out = [], lim = k === oggi() ? oraMin() + C.regole.anticipoMin : -1;
  fasce(k).forEach(([a, b]) => { for (let m = a; m + dur <= b; m += C.regole.passo) if (m >= lim && liberiA(k, m, dur).length) out.push(m); });
  return out;
}
function renderSlots() {
  if (!giorno) { $('dSlots').innerHTML = ''; $('dMsg').textContent = 'Scegli un giorno.'; return; }
  if (!busyOk) { $('dSlots').innerHTML = '<div class="spin"></div>'; return; }
  const l = orariLiberi(giorno);
  $('dSlots').innerHTML = l.map(m => `<button class="slot" data-m="${m}" aria-pressed="${ora === m}">${hm(m)}</button>`).join('');
  $('dMsg').textContent = l.length ? '' : 'Nessun orario libero in questo giorno: provane un altro.';
  $('dSlots').querySelectorAll('.slot').forEach(b => b.onclick = () => { ora = +b.dataset.m; renderSlots(); aggBarra(); });
}

/* ---------- 4. conferma ---------- */
function renderConferma() {
  const st = staffSel === 'any' ? null : C.staff.find(s => s.id === staffSel);
  $('riep').innerHTML = `<b>${esc(dataLunga(giorno))}, ore ${hm(ora)}</b><small>${st ? 'con ' + esc(st.nome) : 'Operatore: il primo libero'} · ${fd(durTot())} · ${prezzoTot()}</small><div>${scelti().map(s => `<span class="chip">${esc(s.nome)}</span>`).join('')}</div>`;
  $('cLogin').hidden = !!utente; $('cDati').hidden = !utente; $('err').textContent = '';
  if (utente) { const p = PROF || {}; if (!$('fNome').value) $('fNome').value = p.nome || ''; if (!$('fCogn').value) $('fCogn').value = p.cogn || ''; if (!$('fTel').value) $('fTel').value = p.tel || ''; }
}
$('cAccedi').onclick = () => apriLogin();
$('bConf').onclick = async () => {
  const b = $('bConf'), E = t => { $('err').textContent = t; };
  const n = $('fNome').value.trim(), c = $('fCogn').value.trim(), t = $('fTel').value.trim(), note = $('fNote').value.trim();
  if (!n || !c) return E('Inserisci nome e cognome.');
  if (t.replace(/\D/g, '').length < 6) return E('Inserisci un numero di telefono valido.');
  b.classList.add('load');
  try {
    const s = await getDocs(query(colP, where('uid', '==', utente.uid)));
    const att = s.docs.map(d => d.data()).filter(attiva).length;
    if (att >= C.regole.maxAttive) { b.classList.remove('load'); return E('Hai già ' + att + ' prenotazioni in programma: il massimo è ' + C.regole.maxAttive + '. Annullane una o contatta il salone.'); }
  } catch (x) { b.classList.remove('load'); return E('Non riesco a controllare le tue prenotazioni. Controlla la connessione e riprova.'); }
  const dur = durTot(), lib = liberiA(giorno, ora, dur);
  if (!lib.length || (giorno === oggi() && ora < oraMin() + C.regole.anticipoMin)) { b.classList.remove('load'); ora = null; await avvisa('Questo orario non è più disponibile: scegline un altro.'); indietro(); return; }
  const conta = id => BUSY.filter(x => x.data === giorno && x.staff === id).length;
  const st = lib.sort((a, z) => conta(a.id) - conta(z.id))[0];
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const rec = { id, uid: utente.uid, nome: n, cogn: c, tel: t, mail: utente.email || '', note, data: giorno, ini: ora, fine: ora + dur, dur, staff: st.id, staffNome: st.nome,
    servizi: scelti().map(s => ({ id: s.id, nome: s.nome, prezzo: s.prezzo, durata: s.durata })), prezzo: prezzoTot(), stato: 'ok', creata: Date.now() };
  try {
    const w = writeBatch(db);
    w.set(doc(colP, id), rec); w.set(doc(colB, id), { data: giorno, ini: ora, fine: ora + dur, staff: st.id });
    w.set(doc(db, 'saloni', SALONE, 'clienti', utente.uid), { nome: n, cogn: c, tel: t, mail: utente.email || '' }, { merge: true });
    await w.commit();
  } catch (x) { b.classList.remove('load'); return E('Prenotazione non riuscita. Controlla la connessione e riprova.'); }
  b.classList.remove('load'); PROF = Object.assign(PROF || {}, { nome: n, cogn: c, tel: t });
  $('okTxt').textContent = `Ti aspettiamo ${dataLunga(giorno)} alle ${hm(ora)} con ${st.nome}.`;
  $('okCal').href = gcal(rec);
  sel = []; ora = null; giorno = null; staffSel = 'any'; $('fNote').value = '';
  STORIA = ['ph']; vai('p5');
};
function gcal(b) {
  const dt = (k, m) => k.replace(/-/g, '') + 'T' + p2(Math.floor(m / 60)) + p2(m % 60) + '00';
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(C.nome + ' – ' + b.servizi.map(s => s.nome).join(', ')) + '&dates=' + dt(b.data, b.ini) + '/' + dt(b.data, b.fine) + '&ctz=Europe%2FRome&details=' + encodeURIComponent('Con ' + b.staffNome) + (C.indirizzo ? '&location=' + encodeURIComponent(C.indirizzo) : '');
}

/* ---------- le mie prenotazioni ---------- */
const attiva = b => b.stato !== 'annullata' && (b.data > oggi() || (b.data === oggi() && b.ini > oraMin()));
const minutiA = b => (new Date(b.data + 'T00:00').getTime() + b.ini * 60000 - Date.now()) / 60000;
function renderMie() {
  $('mFut').style.opacity = storico ? .6 : 1; $('mSto').style.opacity = storico ? 1 : .6;
  if (!mieOk) { $('mList').innerHTML = '<div class="spin"></div>'; return; }
  const l = MIE.filter(b => storico ? !attiva(b) : attiva(b)).sort((a, b) => (a.data + p2(a.ini)).localeCompare(b.data + p2(b.ini)) * (storico ? -1 : 1));
  if (!l.length) { $('mList').innerHTML = `<p class="vuoto">${storico ? 'Nessuna prenotazione passata.' : 'Non hai prenotazioni in programma.'}</p>` + (storico ? '' : '<button class="cta" data-go="p1">Prenota ora</button>'); return; }
  $('mList').innerHTML = l.map(b => { const d = new Date(b.data + 'T12:00'), st = C.staff.find(s => s.id === b.staff) || { nome: b.staffNome };
    return `<div class="bk${b.stato === 'annullata' ? ' ann' : ''}"><div class="dt"><i>${d.toLocaleDateString('it-IT', { month: 'short' })}</i><span>${d.toLocaleDateString('it-IT', { weekday: 'short' })}</span><b>${d.getDate()}</b><em>${hm(b.ini)}</em></div>
     <div class="bd"><div class="who">${avatar(st)}${esc(st.nome)}</div>${b.servizi.map(s => `<span class="chip">${esc(s.nome)}</span>`).join('')}${b.stato === 'annullata' ? '<small style="display:block;margin-top:6px;color:var(--wait)">Annullata</small>' : ''}
     ${!storico ? `<button class="x" data-x="${b.id}" aria-label="Annulla">✕</button>` : ''}</div></div>`; }).join('');
  $('mList').querySelectorAll('[data-x]').forEach(k => k.onclick = async () => {
    const b = MIE.find(z => z.id === k.dataset.x); if (!b) return;
    if (minutiA(b) < C.regole.annulloMin) { avvisa('Si può annullare dall’app fino a ' + fd(C.regole.annulloMin) + ' prima dell’appuntamento. Contatta il salone.'); return; }
    if (!await dialogo('Annullare la prenotazione?', dataLunga(b.data) + ' alle ' + hm(b.ini), 'Sì, annulla', 'No')) return;
    try { const w = writeBatch(db); w.update(doc(colP, b.id), { stato: 'annullata', annullataIl: Date.now(), annullataDa: 'cliente' }); w.delete(doc(colB, b.id)); await w.commit(); toast('Prenotazione annullata'); }
    catch (x) { avvisa('Non riesco ad annullare. Controlla la connessione e riprova.'); }
  });
}
$('mFut').onclick = () => { storico = false; renderMie(); };
$('mSto').onclick = () => { storico = true; renderMie(); };

/* ---------- profilo ---------- */
function renderProfilo() {
  const n = PROF && (PROF.nome || PROF.cogn) ? (PROF.nome + ' ' + PROF.cogn).trim() : (utente && utente.displayName) || 'Ospite';
  const foto = (PROF && PROF.foto) || (utente && utente.photoURL) || '';
  $('pAv').innerHTML = foto ? `<img src="${esc(foto)}" alt="" referrerpolicy="no-referrer">` : esc(iniziali(n)); $('pNome').textContent = n; $('pMail').textContent = utente ? utente.email || '' : ''; $('pVer').textContent = VERSIONE;
  if (C.privacy) $('tPriv').textContent = C.privacy; if (C.termini) $('tTerm').textContent = C.termini;
}
/* foto del profilo: rimpicciolita sul telefono e salvata con i dati del cliente */
function riduci(file, lato) { return new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, lato / Math.min(im.width, im.height)), c = document.createElement('canvas'), w = Math.round(im.width * s), h = Math.round(im.height * s), q = Math.min(w, h); c.width = c.height = q; c.getContext('2d').drawImage(im, (q - w) / 2, (q - h) / 2, w, h); ok(c.toDataURL('image/jpeg', .82)); }; im.onerror = ko; im.src = r.result; }; r.onerror = ko; r.readAsDataURL(file); }); }
$('pFile').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f || !utente) return;
  if (PROF && PROF.foto && !await dialogo('Foto del profilo', 'Vuoi sostituire la foto attuale?', 'Sostituisci', 'Togli la foto')) {
    try { await setDoc(doc(db, 'saloni', SALONE, 'clienti', utente.uid), { foto: '' }, { merge: true }); PROF.foto = ''; renderProfilo(); toast('Foto tolta'); } catch (x) { avvisa('Non riuscito. Riprova.'); } return;
  }
  try { const foto = await riduci(f, 256); await setDoc(doc(db, 'saloni', SALONE, 'clienti', utente.uid), { foto }, { merge: true }); PROF = Object.assign(PROF || {}, { foto }); renderProfilo(); toast('Foto aggiornata'); }
  catch (x) { avvisa('Non riesco a caricare la foto. Prova con un’altra immagine.'); }
};
$('pMod').onclick = () => { const p = PROF || {}; $('eNome').value = p.nome || ''; $('eCogn').value = p.cogn || ''; $('eTel').value = p.tel || ''; $('eErr').textContent = ''; $('prof').hidden = false; };
$('eNo').onclick = () => { $('prof').hidden = true; };
$('eOk').onclick = async () => {
  const d = { nome: $('eNome').value.trim(), cogn: $('eCogn').value.trim(), tel: $('eTel').value.trim(), mail: utente.email || '' };
  if (!d.nome || !d.cogn) { $('eErr').textContent = 'Inserisci nome e cognome.'; return; }
  try { await setDoc(doc(db, 'saloni', SALONE, 'clienti', utente.uid), d, { merge: true }); PROF = d; $('prof').hidden = true; renderProfilo(); toast('Dati salvati'); }
  catch (x) { $('eErr').textContent = 'Salvataggio non riuscito. Riprova.'; }
};
$('pOut').onclick = () => signOut(auth).then(() => { STORIA = ['ph']; mostraP('ph'); });
$('pDel').onclick = async () => {
  if (!await dialogo('Cancellare il profilo?', 'Le prenotazioni in programma verranno annullate e i tuoi dati cancellati. Non si può tornare indietro.', 'Sì, cancella', 'No')) return;
  try {
    const w = writeBatch(db);
    MIE.filter(attiva).forEach(b => { w.update(doc(colP, b.id), { stato: 'annullata', annullataIl: Date.now(), annullataDa: 'cliente' }); w.delete(doc(colB, b.id)); });
    w.delete(doc(db, 'saloni', SALONE, 'clienti', utente.uid)); await w.commit();
    await deleteUser(auth.currentUser); toast('Profilo cancellato'); STORIA = ['ph']; mostraP('ph');
  } catch (x) { avvisa(x && x.code === 'auth/requires-recent-login' ? 'Per sicurezza esci, accedi di nuovo e riprova a cancellare il profilo.' : 'Cancellazione non riuscita. Riprova.'); }
};

/* ---------- accesso ---------- */
function apriLogin() { $('lErr').textContent = ''; $('login').hidden = false; }
$('lX').onclick = () => { $('login').hidden = true; };
$('cBtn').onclick = () => utente ? signOut(auth) : apriLogin();
const errAuth = e => ({ 'auth/invalid-credential': 'Email o password non corretti.', 'auth/wrong-password': 'Email o password non corretti.', 'auth/user-not-found': 'Email o password non corretti.', 'auth/invalid-email': 'Controlla l’indirizzo email.', 'auth/email-already-in-use': 'Esiste già un account con questa email: accedi.', 'auth/weak-password': 'La password deve avere almeno 6 caratteri.', 'auth/too-many-requests': 'Troppi tentativi: riprova tra qualche minuto.', 'auth/network-request-failed': 'Controlla la connessione e riprova.' })[e && e.code] || 'Operazione non riuscita. Riprova.';
/* Google: nell'app Android con la scelta dell'account del telefono, sul sito con la finestra di Google */
const FA = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() && window.Capacitor.Plugins ? window.Capacitor.Plugins.FirebaseAuthentication : null;
$('lGoogle').onclick = async () => { try { if (FA) { const r = await FA.signInWithGoogle(); await signInWithCredential(auth, GoogleAuthProvider.credential(r.credential && r.credential.idToken)); } else await signInWithPopup(auth, new GoogleAuthProvider()); } catch (e) { if (/popup-closed|cancelled-popup/.test(e.code) || /cancel/i.test(String(e && e.message))) return; $('lErr').textContent = FA ? 'Accesso con Google non riuscito (' + (e.code || e.message || 'errore') + ').' : errAuth(e); } };
$('lIn').onclick = async () => { const m = $('lMail').value.trim(), p = $('lPass').value; if (!m || !p) { $('lErr').textContent = 'Inserisci email e password.'; return; } try { await signInWithEmailAndPassword(auth, m, p); } catch (e) { $('lErr').textContent = errAuth(e); } };
$('lReg').onclick = async () => { const m = $('lMail').value.trim(), p = $('lPass').value; if (!/^\S+@\S+\.\S+$/.test(m)) { $('lErr').textContent = 'Inserisci un’email valida.'; return; } if (p.length < 6) { $('lErr').textContent = 'Scegli una password di almeno 6 caratteri.'; return; } try { const c = await createUserWithEmailAndPassword(auth, m, p); sendEmailVerification(c.user).catch(() => {}); } catch (e) { $('lErr').textContent = errAuth(e); } };
$('lRes').onclick = async () => { const m = $('lMail').value.trim(); if (!/^\S+@\S+\.\S+$/.test(m)) { $('lErr').textContent = 'Scrivi la tua email, poi tocca “Password dimenticata?”.'; return; } try { await sendPasswordResetEmail(auth, m); } catch (e) {} $('lErr').textContent = 'Se l’email è registrata, ti abbiamo inviato un link per scegliere una nuova password.'; };

let unsubMie = null;
onAuthStateChanged(auth, async u => {
  utente = u; PROF = null; MIE = []; mieOk = false;
  if (unsubMie) { unsubMie(); unsubMie = null; }
  if (u) {
    $('login').hidden = true;
    try { const d = await getDoc(doc(db, 'saloni', SALONE, 'clienti', u.uid)); if (d.exists()) PROF = d.data(); } catch (e) {}
    if (!PROF && u.displayName) { const p = u.displayName.split(' '); PROF = { nome: p[0], cogn: p.slice(1).join(' '), tel: '' }; }
    unsubMie = onSnapshot(query(colP, where('uid', '==', u.uid)), s => { MIE = s.docs.map(d => d.data()); mieOk = true; if (PAG === 'pm' || PAG === 'ph') mostraP(PAG); }, () => { mieOk = true; });
  } else if (['pm', 'pp'].includes(PAG)) { STORIA = ['ph']; }
  renderTesta(); mostraP(PAG === 'pm' || PAG === 'pp' ? (u ? PAG : 'ph') : PAG);
  prAuth = true; prova();
});

/* ---------- solo nell'app Android: tasto Indietro, Google non disponibile, avviso di nuova versione ---------- */
const APP = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
if (APP) {
  document.documentElement.classList.add('in-app');
  if (!FA) { $('lGoogle').hidden = true; $('lOpp').hidden = true; } // l'accesso con Google dentro l'app richiede la configurazione del nuovo progetto Firebase
  const N = window.Capacitor.Plugins || {};
  if (N.App) N.App.addListener('backButton', () => {
    for (const id of ['dlg', 'prof', 'login']) if (!$(id).hidden) { if (id === 'dlg') ($('dlgNo').hidden ? $('dlgOk') : $('dlgNo')).click(); else $(id).hidden = true; return; }
    if (PAG !== 'ph') { indietro(); return; }
    N.App.exitApp();
  });
  (async () => {
    const REPO = 'Radici-app/Radici', AGG = N.Aggiorna;
    let mia = 0; try { mia = (await (await fetch('versione.json', { cache: 'no-store' })).json()).v || 0; } catch (e) { return; }
    if (!mia) return;
    let aperto = false;
    const controlla = async () => {
      if (aperto) return;
      try {
        const r = await fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { cache: 'no-store' }); if (!r.ok) return;
        const n = Number((String((await r.json()).tag_name).match(/^app-v1\.(\d+)$/) || [])[1] || 0);
        let no = ''; try { no = sessionStorage.getItem('aggNo') || ''; } catch (e) {}
        if (!(n > mia) || no === String(n)) return;
        aperto = true;
        const url = 'https://github.com/' + REPO + '/releases/download/app-v1.' + n + '/Radici.apk';
        if (!await dialogo('Nuova versione disponibile', 'È uscita la versione 1.' + n + ' dell’app (tu hai la 1.' + mia + '). Tocca “Aggiorna”: l’app la scarica da sola, poi conferma nella schermata di Android. I tuoi dati restano.', 'Aggiorna', 'Più tardi')) { try { sessionStorage.setItem('aggNo', String(n)); } catch (e) {} aperto = false; return; }
        if (!AGG) { location.href = url; aperto = false; return; }
        if (!(await AGG.puoInstallare()).ok) {
          if (!await dialogo('Un permesso, una volta sola', 'Android chiede di consentire a questa app di installare gli aggiornamenti. Nella schermata che si apre attiva “Consenti da questa fonte”, poi torna indietro.', 'Apri impostazioni', 'Annulla')) { aperto = false; return; }
          await AGG.apriPermesso();
          await new Promise(ok => { const f = () => { if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', f); ok(); } }; document.addEventListener('visibilitychange', f); });
          if (!(await AGG.puoInstallare()).ok) { await avvisa('Senza quel permesso l’aggiornamento non si può installare. Riprova la prossima volta che apri l’app.'); aperto = false; return; }
        }
        $('dlgT').textContent = 'Scarico l’aggiornamento…'; $('dlgP').textContent = '0%'; $('dlgOk').hidden = true; $('dlgNo').hidden = true; $('dlg').hidden = false;
        const h = await AGG.addListener('progresso', e => { $('dlgP').textContent = e.p + '%'; });
        try { await AGG.installa({ url }); } catch (e) { $('dlg').hidden = true; $('dlgOk').hidden = false; await avvisa('Aggiornamento non riuscito (' + (e && e.message || e) + '). Riprova.'); }
        finally { h.remove(); $('dlg').hidden = true; $('dlgOk').hidden = false; aperto = false; }
      } catch (e) { aperto = false; }
    };
    setTimeout(controlla, 3500);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') controlla(); });
  })();
}
window.riempiIcone(); try { history.replaceState({ r: 1 }, ''); } catch (e) {}
mostraP('ph');
if (!APP && 'serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
