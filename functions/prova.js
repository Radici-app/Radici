/* Prove dei calcoli: node prova.js */
const L = require('./logica'), assert = require('assert');
// ora legale e solare
assert.strictEqual(new Date(L.istante('2026-07-10', 600)).toISOString(), '2026-07-10T08:00:00.000Z');
assert.strictEqual(new Date(L.istante('2026-12-10', 600)).toISOString(), '2026-12-10T09:00:00.000Z');
assert.deepStrictEqual(L.roma(Date.parse('2026-12-10T22:30:00Z')), { k: '2026-12-10', m: 23 * 60 + 30 });
// silenzio 21:00-08:30
const sil = { da: '21:00', a: '08:30' };
assert.strictEqual(L.inSilenzio(sil, L.istante('2026-12-10', 22 * 60)), true);
assert.strictEqual(L.inSilenzio(sil, L.istante('2026-12-10', 8 * 60)), true);
assert.strictEqual(L.inSilenzio(sil, L.istante('2026-12-10', 9 * 60)), false);
assert.strictEqual(new Date(L.fineSilenzio(sil, L.istante('2026-12-10', 22 * 60))).toISOString(), new Date(L.istante('2026-12-11', 510)).toISOString());
assert.strictEqual(L.fineSilenzio(sil, L.istante('2026-12-10', 600)), L.istante('2026-12-10', 600));
// promemoria 24 ore e 1 ora prima
const regole = [{ id: 'r24', attivo: true, prima: 1440, testo: 'x' }, { id: 'r1', attivo: true, prima: 60, testo: 'y' }];
const p = { stato: 'ok', data: '2026-12-11', ini: 600, creata: L.istante('2026-12-01', 600), inviati: {} };
const ids = t => L.promemoriaDovuti(p, regole, t).map(r => r.id);
assert.deepStrictEqual(ids(L.istante('2026-12-10', 590)), []);
assert.deepStrictEqual(ids(L.istante('2026-12-10', 602)), ['r24']);
assert.deepStrictEqual(ids(L.istante('2026-12-11', 545)), ['r24', 'r1']);
p.inviati = { r24: 1 }; assert.deepStrictEqual(ids(L.istante('2026-12-11', 545)), ['r1']);
assert.deepStrictEqual(ids(L.istante('2026-12-11', 601)), []);            // appuntamento iniziato
// prenotata 3 ore prima: niente promemoria 24 ore, sì quello di 1 ora
const q = { stato: 'ok', data: '2026-12-11', ini: 600, creata: L.istante('2026-12-11', 420) };
assert.deepStrictEqual(L.promemoriaDovuti(q, regole, L.istante('2026-12-11', 545)).map(r => r.id), ['r1']);
assert.deepStrictEqual(L.promemoriaDovuti({ ...q, stato: 'annullata' }, regole, L.istante('2026-12-11', 545)), []);
// testi
const v = L.valoriPromemoria({ nome: 'Maria', data: '2026-12-11', ini: 930, servizi: [{ nome: 'Taglio' }, { nome: 'Piega' }], staffNome: 'Simone' }, 'Radici', L.istante('2026-12-10', 600));
assert.strictEqual(L.testo('Ciao {{nome}}, ti aspettiamo {{quando}} da {{salone}} per {{servizi}} con {{operatore}}.', v), 'Ciao Maria, ti aspettiamo domani alle 15:30 da Radici per Taglio, Piega con Simone.');
assert.strictEqual(v.giorno, 'venerdì 11 dicembre');
console.log('Tutte le prove superate');
