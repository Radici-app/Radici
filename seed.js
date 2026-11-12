/* Radici – valori iniziali del salone.
   Vengono usati finché la titolare non salva le sue impostazioni dalla dashboard
   (poi l'app legge tutto da Firebase: saloni/radici). */
window.RADICI_SEED = {
  id: 'radici',
  nome: 'Radici',
  sottotitolo: 'Ambito Hair Studio',
  descrizione: 'Il brand Radici nasce con lo scopo di migliorarsi costantemente. Scegli i servizi, l’operatore e l’orario che preferisci: ti aspettiamo.',
  indirizzo: '',
  telefono: '',
  whatsapp: '',
  instagram: '',
  colore: '#8E9A55',
  /* 0 = domenica … 6 = sabato; ogni giorno: elenco di fasce [inizio, fine] in minuti */
  orari: {
    0: [],
    1: [[555, 1140]],
    2: [[540, 1200]],
    3: [[540, 780], [900, 1200]],
    4: [[540, 780], [900, 1200]],
    5: [[540, 1200]],
    6: [[540, 1200]]
  },
  eccezioni: [],   /* {data:'2026-12-24', fasce:[[540,1080]]} */
  chiusure: [],    /* {da:'2026-08-10', a:'2026-08-20', msg:'Ferie estive'} */
  regole: {
    giorniMax: 60,      /* si prenota al massimo fino a 60 giorni avanti */
    maxServizi: 5,      /* servizi per prenotazione */
    passo: 40,          /* un orario ogni 40 minuti */
    annulloMin: 60,     /* si annulla dall'app fino a 60 minuti prima */
    anticipoMin: 20,    /* si prenota fino a 20 minuti prima */
    maxAttive: 3,       /* prenotazioni attive per cliente */
    tempiDinamici: true /* durata = somma dei servizi scelti */
  },
  staff: [
    { id: 's1', nome: 'Simone', foto: '', servizi: [] },
    { id: 's2', nome: 'Alberto', foto: '', servizi: [] },
    { id: 's3', nome: 'Alessio', foto: '', servizi: [] },
    { id: 's4', nome: 'Rossella', foto: '', servizi: [] }
  ],
  /* tipo: base | aggiuntivo (solo insieme a un servizio base o combo) | combo (una sola per prenotazione) */
  categorie: [
    { id: 'gen', nome: 'Capelli e barba', icona: 'forbici', tipo: 'base' },
    { id: 'spa', nome: 'HAIRspa', icona: 'spa', tipo: 'aggiuntivo' },
    { id: 'beard', nome: 'Beard spa', icona: 'barba', tipo: 'base' },
    { id: 'color', nome: 'Hair color', icona: 'pennello', tipo: 'aggiuntivo' },
    { id: 'viso', nome: 'Epilazione viso & Trattamenti', icona: 'viso', tipo: 'base' },
    { id: 'mani', nome: 'Manicure', icona: 'mani', tipo: 'base' },
    { id: 'piedi', nome: 'Pedicure', icona: 'piedi', tipo: 'base' },
    { id: 'combo', nome: 'Combo', icona: 'cuore', tipo: 'combo' }
  ],
  servizi: [
    ['gen', 'Styling', '10 €', 15, 'phon'],
    ['gen', 'Taglio + shampoo', '20 €', 45, 'forbici'],
    ['gen', 'Taglio bimbo', '16 €', 30, 'forbici'],
    ['gen', 'Re-fresh', '14 €', 30, 'forbici'],
    ['gen', 'Barba Classic', '6 €', 20, 'rasoio'],
    ['gen', 'Foggiatura barba', '8 €', 30, 'rasoio'],
    ['gen', 'Relax (stiratura)', '20 €', 30, 'phon'],
    ['gen', 'Laminazione Classica', '35 €', 60, 'ciglia'],
    ['gen', 'Laminazione Coreana', '50 €', 75, 'ciglia'],
    ['spa', 'Re-builder sauna', '10 €', 15, 'spa', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['spa', 'Detox & energizing', '8 €', 15, 'spa', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['spa', 'Curly ritual', '10 €', 15, 'spa', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['beard', 'Barba all’italiana', '15 €', 30, 'barba'],
    ['beard', 'American trend', '15 €', 30, 'barba'],
    ['color', 'Re-light', '15 €', 20, 'pennello', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['color', 'Meches', 'a partire da 10 €', 60, 'pennello', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['color', 'Deco', '20 € ad applicazione', 60, 'pennello', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['color', 'Colore', 'a partire da 20 €', 60, 'pennello', 'Da abbinare allo styling o ad altri servizi simili.'],
    ['viso', 'Sopracciglia', '5 €', 20, 'viso'],
    ['viso', 'Baffetto', '3 €', 10, 'viso'],
    ['viso', 'Maschera all’argilla', '5 €', 15, 'viso'],
    ['viso', 'Gold mask', '8 €', 10, 'viso'],
    ['viso', 'Skin Bloom (igiene viso)', '50 €', 60, 'viso', 'Igiene viso completa per eliminare le tossine e stimolare il turnover cellulare. Include un massaggio alla cervicale e una digitopressione a mani o piedi, a scelta.'],
    ['viso', 'Skin Elements Complex', '65 €', 60, 'viso', 'Trattamento di rinvigorimento cellulare per gli inestetismi della pelle, con sieri specifici miscelati.'],
    ['mani', 'Classic manicure', '12 €', 40, 'mani'],
    ['mani', 'Russian manicure', '18 €', 45, 'mani'],
    ['mani', 'Copertura in gel / acrygel', '25 €', 90, 'smalto', '25 € S · 30 € M · 35 € L'],
    ['mani', 'Nail Extensions', '50 €', 120, 'smalto', 'A partire da 50 €'],
    ['piedi', 'Classic pedicure', '18 €', 40, 'piedi'],
    ['piedi', 'Pedicure podox', '23 €', 60, 'piedi'],
    ['piedi', 'Semi-pedicure', '25 €', 70, 'piedi'],
    ['piedi', 'Russian pedicure', '28 €', 45, 'piedi'],
    ['piedi', 'Applicazione smalto', '10 €', 15, 'smalto'],
    ['piedi', 'Scrub piedi', '6 €', 5, 'piedi'],
    ['combo', 'Taglio + barba classic', '25 €', 60, 'cuore'],
    ['combo', 'Taglio + foggiatura barba', '25 €', 60, 'cuore'],
    ['combo', 'Taglio + Detox & energizing', '25 €', 60, 'cuore'],
    ['combo', 'Taglio + Re-builder sauna', '25 €', 60, 'cuore'],
    ['combo', 'Taglio + Curly ritual', '25 €', 60, 'cuore'],
    ['combo', 'Taglio + barba all’italiana', '30 €', 80, 'cuore'],
    ['combo', 'Taglio + barba American trend', '30 €', 80, 'cuore'],
    ['combo', 'Re-fresh + barba classic', '20 €', 40, 'cuore'],
    ['combo', 'Re-fresh + foggiatura barba', '20 €', 40, 'cuore'],
    ['combo', 'Re-fresh + barba all’italiana', '25 €', 60, 'cuore'],
    ['combo', 'Re-fresh + barba American trend', '25 €', 60, 'cuore']
  ].map((s, i) => ({ id: 'v' + (i + 1), cat: s[0], nome: s[1], prezzo: s[2], durata: s[3], icona: s[4], descr: s[5] || '', visibile: true }))
};
/* Firestore non accetta liste dentro liste: le fasce orarie si salvano come {da, a} e si rileggono come [da, a] */
window.fasceDaDb = c => {
  const f = l => (l || []).map(x => Array.isArray(x) ? x : [x.da, x.a]);
  if (c && c.orari) Object.keys(c.orari).forEach(g => { c.orari[g] = f(c.orari[g]); });
  if (c && c.eccezioni) c.eccezioni.forEach(e => { e.fasce = f(e.fasce); });
  return c;
};
window.fasceVersoDb = c => {
  const o = JSON.parse(JSON.stringify(c)), f = l => (l || []).map(x => Array.isArray(x) ? { da: x[0], a: x[1] } : x);
  if (o.orari) Object.keys(o.orari).forEach(g => { o.orari[g] = f(o.orari[g]); });
  if (o.eccezioni) o.eccezioni.forEach(e => { e.fasce = f(e.fasce); });
  return o;
};
