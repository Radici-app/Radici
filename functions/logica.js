/* Calcoli del programma delle notifiche, senza Firebase: orari (fuso di Roma), silenzio, testi.
   Separati da index.js per poterli provare (node prova.js). */
const FUSO = 'Europe/Rome';
const p2 = n => String(n).padStart(2, '0');

/* ora di Roma di un istante: { k: 'AAAA-MM-GG', m: minuti dalla mezzanotte } */
function roma(ms) {
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: FUSO, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const o = Object.fromEntries(f.formatToParts(new Date(ms)).map(x => [x.type, x.value]));
  return { k: `${o.year}-${o.month}-${o.day}`, m: +o.hour * 60 + +o.minute };
}
/* istante (ms) di un giorno e minuto dell'ora di Roma */
function istante(k, minuti) {
  const [y, mo, d] = k.split('-').map(Number);
  const finto = Date.UTC(y, mo - 1, d, 0, minuti);            /* come se Roma fosse UTC */
  let t = finto;
  for (let i = 0; i < 2; i++) { const r = roma(t), vista = Date.UTC(...r.k.split('-').map((v, j) => j === 1 ? v - 1 : +v), 0, r.m); t += finto - vista; }
  return t;
}
const piuGiorni = (k, n) => { const d = new Date(k + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const hm = m => p2(Math.floor(m / 60)) + ':' + p2(m % 60);
const aMin = t => { const [h, m] = String(t || '').split(':').map(Number); return (h || 0) * 60 + (m || 0); };

/* siamo nell'orario di silenzio? (es. dalle 21:00 alle 08:30, anche a cavallo della mezzanotte) */
function inSilenzio(sil, ms) {
  if (!sil || !sil.da || !sil.a || sil.da === sil.a) return false;
  const m = roma(ms).m, da = aMin(sil.da), a = aMin(sil.a);
  return da < a ? (m >= da && m < a) : (m >= da || m < a);
}
/* prossimo istante fuori dal silenzio */
function fineSilenzio(sil, ms) {
  if (!inSilenzio(sil, ms)) return ms;
  const r = roma(ms), a = aMin(sil.a);
  return istante(r.m < a ? r.k : piuGiorni(r.k, 1), a);
}

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
/* valori per i segnaposto di un promemoria: {{nome}} {{quando}} {{ora}} {{giorno}} {{servizi}} {{operatore}} {{salone}} */
function valoriPromemoria(p, salone, adesso) {
  const oggi = roma(adesso).k, [y, mo, d] = p.data.split('-').map(Number), gs = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  const ora = hm(p.ini), giorno = `${GIORNI[gs]} ${d} ${MESI[mo - 1]}`;
  const quando = (p.data === oggi ? 'oggi' : p.data === piuGiorni(oggi, 1) ? 'domani' : `${GIORNI[gs]} ${d}`) + ' alle ' + ora;
  return { nome: p.nome || '', quando, ora, giorno, servizi: (p.servizi || []).map(s => s.nome).join(', '), operatore: p.staffNome || '', salone };
}
/* promemoria da inviare ora per una prenotazione: regole attive, momento arrivato, appuntamento non ancora iniziato,
   non già inviato e prenotazione fatta prima del momento del promemoria (niente promemoria subito dopo aver prenotato) */
function promemoriaDovuti(p, regole, adesso) {
  if (p.stato !== 'ok' || !p.data || !(p.ini >= 0)) return [];
  const inizio = istante(p.data, p.ini), inviati = p.inviati || {};
  return (regole || []).filter(r => r.attivo && r.prima >= 1 && !inviati[r.id] && String(r.testo || '').trim()).filter(r => {
    const quando = inizio - r.prima * 60000;
    return adesso >= quando && adesso < inizio && !(p.creata > quando);
  });
}
const testo = (t, v) => String(t || '').replace(/\{\{(\w+)\}\}/g, (_, k) => v[k] !== undefined && v[k] !== null ? String(v[k]) : '');

module.exports = { FUSO, roma, istante, piuGiorni, inSilenzio, fineSilenzio, valoriPromemoria, promemoriaDovuti, testo, hm };
