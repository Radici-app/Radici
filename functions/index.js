/* Programma delle notifiche push (Firebase Cloud Functions).
   Invia ai clienti che hanno attivato le notifiche nell'app:
   - i promemoria prima degli appuntamenti (controllo ogni 5 minuti);
   - le comunicazioni del salone, quando il titolare ne pubblica una;
   - l'avviso dei punti della Fidelity Card ricevuti;
   - una volta al giorno, il messaggio ai clienti che non vengono da un po'.
   Cosa inviare e quando lo decide il titolare nel gestionale → Notifiche push (documento saloni/<id>, campo notifiche).
   Non parte niente finché nel gestionale non è acceso "Invio notifiche attivo" (notifiche.attive).
   Lo installa la fabbrica "Notifiche Firebase" (GitHub Actions), che copia qui anche seed.js (valori di partenza e Fidelity). */
const { setGlobalOptions } = require('firebase-functions/v2');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./logica');

setGlobalOptions({ region: 'europe-west1', maxInstances: 2, memory: '256MiB' });
admin.initializeApp();
const db = admin.firestore();

/* seed.js del sito: valori di partenza delle notifiche, testo dei segnaposto, saldo della Fidelity */
const W = { APP: {} };
try { vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'seed.js'), 'utf8'), { window: W, console }); } catch (e) { logger.warn('seed.js non disponibile', e.message); }
const SEED = W.APP_SEED || W.RADICI_SEED || {};
const conf = s => {
  const n = Object.assign({}, SEED.notifiche || {}, s.notifiche || {});
  return { attive: n.attive === true, promemoria: n.promemoria || [], comunicazioni: n.comunicazioni !== false,
    punti: Object.assign({ attivo: false, testo: '' }, n.punti), inattivi: Object.assign({ attivo: false, giorni: 45, testo: '' }, n.inattivi), silenzio: n.silenzio || null };
};
const nomeSalone = s => s.nome || SEED.nome || '';

/* ---------- invio ---------- */
const NON_VALIDI = ['messaging/registration-token-not-registered', 'messaging/invalid-registration-token', 'messaging/invalid-argument'];
/* uids: elenco di clienti, oppure 'tutti' (chi ha le notifiche attive) */
async function invia(sid, uids, { titolo, corpo, pagina, canale }) {
  const col = db.collection('saloni').doc(sid).collection('clienti');
  const docs = uids === 'tutti' ? (await col.where('notifiche', '==', true).get()).docs
    : (await Promise.all(uids.map(u => col.doc(u).get()))).filter(d => d.exists);
  let ok = 0;
  for (const d of docs) {
    const c = d.data(), disp = (c.dispositivi || []).filter(x => x && x.token);
    if (c.notifiche !== true || !disp.length) continue;
    const r = await admin.messaging().sendEachForMulticast({
      tokens: disp.map(x => x.token),
      notification: { title: titolo, body: corpo },
      data: { pagina: pagina || '' },
      android: { priority: 'high', notification: { channelId: canale || 'salone' } },
      apns: { payload: { aps: { sound: 'default' } } }
    });
    ok += r.successCount;
    const via = disp.filter((x, i) => !r.responses[i].success && NON_VALIDI.includes(r.responses[i].error && r.responses[i].error.code));
    if (via.length) await d.ref.update({ dispositivi: disp.filter(x => !via.includes(x)) }).catch(() => {});
  }
  return ok;
}
/* nell'orario di silenzio il messaggio aspetta in saloni/<id>/coda e parte alla fine del silenzio */
async function inviaOAccoda(sid, n, uids, msg) {
  const ora = Date.now();
  if (L.inSilenzio(n.silenzio, ora)) {
    await db.collection('saloni').doc(sid).collection('coda').add(Object.assign({ uids, dopo: L.fineSilenzio(n.silenzio, ora), creato: ora }, msg));
    return 0;
  }
  return invia(sid, uids, msg);
}

/* ---------- ogni 5 minuti: promemoria e messaggi in coda ---------- */
exports.promemoria = onSchedule({ schedule: 'every 5 minutes', timeZone: L.FUSO || 'Europe/Rome' }, async () => {
  const adesso = Date.now(), oggi = L.roma(adesso).k;
  for (const s of (await db.collection('saloni').get()).docs) {
    const n = conf(s.data()); if (!n.attive) continue;
    const sal = s.ref;
    /* messaggi rimasti in attesa per l'orario di silenzio */
    for (const q of (await sal.collection('coda').where('dopo', '<=', adesso).get()).docs) {
      const m = q.data();
      if (!L.inSilenzio(n.silenzio, adesso)) { await invia(s.id, m.uids, m).catch(e => logger.error('coda', e)); await q.ref.delete(); }
    }
    const regole = n.promemoria.filter(r => r.attivo); if (!regole.length) continue;
    const maxGiorni = Math.ceil(Math.max(...regole.map(r => r.prima)) / 1440) + 1;
    const pren = await sal.collection('prenotazioni').where('data', '>=', oggi).where('data', '<=', L.piuGiorni(oggi, maxGiorni)).get();
    for (const d of pren.docs) {
      const p = d.data(), dovuti = L.promemoriaDovuti(p, regole, adesso); if (!dovuti.length || !p.uid) continue;
      const v = L.valoriPromemoria(p, nomeSalone(s.data()), adesso), segna = {};
      for (const r of dovuti) {
        try { await invia(s.id, [p.uid], { titolo: L.testo(r.titolo, v) || nomeSalone(s.data()), corpo: L.testo(r.testo, v), pagina: 'pm', canale: 'promemoria' }); }
        catch (e) { logger.error('promemoria', d.id, e); }
        segna['inviati.' + r.id] = adesso;   /* segnato anche se il cliente non ha notifiche: non si riprova */
      }
      await d.ref.update(segna);
    }
  }
});

/* ---------- comunicazione pubblicata dal salone ---------- */
exports.comunicazione = onDocumentCreated('saloni/{sid}/avvisi/{id}', async ev => {
  const s = await db.collection('saloni').doc(ev.params.sid).get(), n = conf(s.data() || {});
  if (!n.attive || !n.comunicazioni || !ev.data) return;
  const a = ev.data.data();
  await inviaOAccoda(ev.params.sid, n, 'tutti', { titolo: a.titolo || nomeSalone(s.data()), corpo: a.testo || '', pagina: 'pa', canale: 'salone' });
});

/* ---------- punti della Fidelity Card ricevuti ---------- */
exports.punti = onDocumentCreated('saloni/{sid}/punti/{id}', async ev => {
  const m = ev.data && ev.data.data(); if (!m || m.annullato || !(m.punti > 0) || !m.uid) return;
  const s = await db.collection('saloni').doc(ev.params.sid).get(), sd = s.data() || {}, n = conf(sd);
  if (!n.attive || !n.punti.attivo || !String(n.punti.testo).trim()) return;
  let saldo = '';
  try {
    const movs = (await s.ref.collection('punti').where('uid', '==', m.uid).get()).docs.map(d => d.data()).filter(x => !x.annullato);
    const f = Object.assign({}, SEED.fidelity || {}, sd.fidelity || {});
    if (W.FID) saldo = W.FID.saldo(movs, f, L.roma(Date.now()).k).saldo;
  } catch (e) { logger.warn('saldo', e.message); }
  const c = await s.ref.collection('clienti').doc(m.uid).get();
  const v = { punti: m.punti, saldo, nome: (c.data() || {}).nome || '', salone: nomeSalone(sd) };
  await inviaOAccoda(ev.params.sid, n, [m.uid], { titolo: nomeSalone(sd), corpo: L.testo(n.punti.testo, v), pagina: 'pf', canale: 'salone' });
});

/* ---------- ogni giorno alle 10: clienti che non vengono da un po' (una volta per ogni periodo di assenza) ---------- */
exports.inattivi = onSchedule({ schedule: 'every day 10:00', timeZone: 'Europe/Rome' }, async () => {
  const oggi = L.roma(Date.now()).k;
  for (const s of (await db.collection('saloni').get()).docs) {
    const n = conf(s.data()); if (!n.attive || !n.inattivi.attivo || !String(n.inattivi.testo).trim()) continue;
    if (L.inSilenzio(n.silenzio, Date.now())) continue;
    const limite = L.piuGiorni(oggi, -Math.max(15, n.inattivi.giorni || 45));
    const clienti = (await s.ref.collection('clienti').where('notifiche', '==', true).get()).docs;
    if (!clienti.length) continue;
    const ultima = {}, futura = new Set();
    for (const d of (await s.ref.collection('prenotazioni').where('stato', '==', 'ok').get()).docs) {
      const p = d.data(); if (!p.uid) continue;
      if (p.data >= oggi) futura.add(p.uid);
      else if (p.presenza !== 'no' && (!ultima[p.uid] || p.data > ultima[p.uid])) ultima[p.uid] = p.data;
    }
    for (const c of clienti) {
      const u = c.id, cd = c.data(), ult = ultima[u];
      if (!ult || futura.has(u) || ult > limite || cd.inattivoPer === ult) continue;
      const v = { nome: cd.nome || '', salone: nomeSalone(s.data()) };
      try { await invia(s.id, [u], { titolo: nomeSalone(s.data()), corpo: L.testo(n.inattivi.testo, v), pagina: 'p1', canale: 'salone' }); } catch (e) { logger.error('inattivi', u, e); }
      await c.ref.update({ inattivoPer: ult });
    }
  }
});
