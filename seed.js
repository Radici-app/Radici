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

/* Testi legali standard. I segnaposto tra {{ }} si riempiono da soli con i dati del negozio e le regole di prenotazione. */
window.RADICI_SEED.privacy = `## Informativa sul trattamento dei dati personali
Ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 ("GDPR") e del D.Lgs. 196/2003, come modificato dal D.Lgs. 101/2018, ti spieghiamo come trattiamo i tuoi dati quando usi l'app e il sito di prenotazione di {{nome}}.

## 1. Titolare del trattamento
{{ragione}}, con sede in {{indirizzo}}, P.IVA {{piva}}.
Email: {{email}} – Telefono: {{telefono}}.

## 2. Quali dati trattiamo
- Dati dell'account: nome, cognome, indirizzo email, numero di telefono e, se scegli di caricarla, la foto del profilo.
- Se accedi con Google: nome, email e immagine del profilo che Google ci comunica con il tuo consenso.
- Dati delle prenotazioni: servizi scelti, operatore, data, ora, durata, prezzo indicativo, eventuali note che scrivi e lo stato della prenotazione (confermata o annullata).
- Data e ora in cui hai accettato i Termini e questa Informativa.
- Dati tecnici strettamente necessari al funzionamento (identificativo dell'account, dati di accesso, indirizzo IP nei registri di sicurezza dei fornitori).
Non trattiamo dati sanitari o altre categorie particolari di dati. Ti chiediamo di non inserirli nelle note.

## 3. Perché li trattiamo e su quale base giuridica
a) Creare e gestire il tuo account e le tue prenotazioni, mostrarti gli orari disponibili, ricordarti gli appuntamenti e contattarti in caso di modifiche o annullamenti. Base giuridica: esecuzione del servizio richiesto (art. 6.1.b GDPR).
b) Adempiere agli obblighi di legge, ad esempio fiscali e contabili. Base giuridica: obbligo legale (art. 6.1.c GDPR).
c) Garantire la sicurezza dell'app, prevenire abusi e tutelare i diritti del Titolare. Base giuridica: legittimo interesse (art. 6.1.f GDPR).
d) Conservare la prova dell'accettazione dei Termini e dell'Informativa. Base giuridica: legittimo interesse e obbligo di responsabilizzazione (art. 5.2 GDPR).
I tuoi dati non sono usati per pubblicità, non sono venduti e non sono oggetto di profilazione o di decisioni automatizzate.

## 4. Conferimento dei dati
Nome, cognome, email e telefono sono necessari per prenotare: senza non è possibile fornire il servizio. La foto del profilo e le note sono facoltative.

## 5. Come trattiamo i dati e chi li riceve
I dati sono trattati con strumenti elettronici e misure di sicurezza adeguate. Possono accedervi solo il Titolare e il personale del salone autorizzato.
Per far funzionare l'app ci serviamo di fornitori che agiscono come responsabili del trattamento:
- Eurogestion S.A.S. di Di Fiore Rosa (P.IVA 05812141215), che realizza e gestisce l'app e il sito di prenotazione per conto del Titolare (servizio Radix Salon), con accesso ai dati solo per manutenzione e assistenza.
- Google Ireland Limited (Google Firebase): autenticazione e archiviazione dei dati. Il database si trova in data center dell'Unione Europea.
- GitHub, Inc.: pubblicazione del sito e dei file dell'app, con registri tecnici di accesso.
Alcuni fornitori potrebbero trattare dati anche fuori dall'Unione Europea. In questo caso il trasferimento avviene nel rispetto del GDPR, sulla base del Data Privacy Framework UE-USA o delle Clausole Contrattuali Standard approvate dalla Commissione Europea.
I dati non sono diffusi. Possono essere comunicati alle autorità solo se richiesto dalla legge.

## 6. Per quanto tempo li conserviamo
- Dati dell'account: finché l'account resta attivo. Se cancelli il profilo, i dati dell'account e la foto vengono eliminati.
- Prenotazioni: per il tempo necessario a gestirle e, per lo storico, per un massimo di 24 mesi dall'appuntamento.
- Prova del consenso a Termini e Informativa: per la durata dell'account e fino a 24 mesi dopo la sua cancellazione.
- Dati necessari agli obblighi fiscali: per il tempo previsto dalla legge (fino a 10 anni).

## 7. I tuoi diritti
Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, riceverli in un formato leggibile (portabilità) e opporti al trattamento basato sul legittimo interesse (articoli 15–22 GDPR).
Puoi modificare i tuoi dati dalla sezione Profilo dell'app e cancellare l'account con "Cancella profilo". Per le altre richieste scrivi a {{email}}.
Se ritieni che il trattamento violi il GDPR puoi presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).

## 8. Minori
Il servizio è riservato a chi ha compiuto 14 anni. Per i minori di 14 anni la prenotazione deve essere fatta da un genitore o da chi ne esercita la responsabilità.

## 9. Cookie e memoria del dispositivo
L'app e il sito non usano cookie di profilazione né strumenti pubblicitari. Usano solo la memoria del dispositivo per ragioni tecniche: mantenere l'accesso, ricordare le tue preferenze e far funzionare l'app anche senza connessione. Per questi strumenti tecnici non è richiesto il consenso.

## 10. Notifiche
Se le autorizzi, l'app ti invia promemoria sugli appuntamenti. Puoi disattivarle in qualsiasi momento dalle impostazioni del telefono.

## 11. Modifiche
Questa Informativa può essere aggiornata. La versione in vigore è sempre disponibile nell'app, nella sezione Profilo.`;

window.RADICI_SEED.termini = `## Termini e condizioni d'uso
Questi Termini regolano l'uso dell'app e del sito di prenotazione di {{nome}}, gestiti da {{ragione}}, con sede in {{indirizzo}}, P.IVA {{piva}} (di seguito "il Salone"). Registrandoti e usando il servizio dichiari di averli letti e di accettarli.

## 1. Il servizio
L'app permette di consultare i servizi e il listino, vedere gli orari disponibili, prenotare, consultare e annullare i propri appuntamenti. Il servizio è gratuito. L'app non gestisce pagamenti: i servizi si pagano direttamente in salone.

## 2. Account
- Per prenotare serve un account personale, creato con email e password o con Google.
- Ti impegni a fornire dati veri e aggiornati, in particolare nome e numero di telefono, che il Salone usa per contattarti.
- L'account è personale: sei responsabile della custodia delle tue credenziali e delle prenotazioni fatte con il tuo account.
- Il servizio è riservato a chi ha almeno 14 anni. Per i minori la prenotazione va fatta da un genitore.

## 3. Prenotazioni
- Puoi prenotare fino a {{giorniMax}} giorni prima e fino a {{anticipo}} prima dell'orario scelto.
- Puoi avere al massimo {{maxAttive}} prenotazioni in programma contemporaneamente e scegliere fino a {{maxServizi}} servizi per prenotazione.
- Alcuni servizi si possono prenotare solo insieme ad altri: l'app lo indica al momento della scelta.
- La prenotazione è confermata quando compare nella sezione "Prenotazioni" dell'app.

## 4. Durate e prezzi
Durate e prezzi indicati nell'app sono quelli del listino in vigore e hanno valore indicativo. Per i servizi con prezzo "a partire da" o variabile (ad esempio in base alla lunghezza dei capelli o delle unghie, o ai prodotti usati), il prezzo finale viene definito in salone prima di eseguire il servizio. Il Salone può aggiornare listino e servizi in qualsiasi momento; le modifiche non riguardano gli appuntamenti già confermati, salvo diverso accordo.

## 5. Annullamenti e modifiche da parte del cliente
- Puoi annullare una prenotazione direttamente dall'app fino a {{annullo}} prima dell'appuntamento.
- Dopo questo termine l'annullamento va comunicato al Salone per telefono o messaggio, il prima possibile.
- Per spostare un appuntamento annullalo e prenotane uno nuovo, oppure contatta il Salone.

## 6. Ritardi e mancata presentazione
- In caso di ritardo il Salone potrebbe dover ridurre il servizio o spostare l'appuntamento, per non danneggiare i clienti successivi.
- Se non ti presenti senza avvisare, il Salone può limitare o sospendere la possibilità di prenotare online. In caso di mancate presentazioni ripetute può disattivare l'account.

## 7. Modifiche e annullamenti da parte del Salone
Il Salone può spostare o annullare un appuntamento per cause organizzative, assenza dell'operatore, chiusure straordinarie o cause di forza maggiore. In questi casi ti avvisa appena possibile, ai recapiti che hai indicato, e ti propone una nuova data. Non sono previsti indennizzi.

## 8. Comportamento corretto
Non è consentito fare prenotazioni false o di prova, prenotare a nome di altri senza il loro consenso, usare l'app in modo da danneggiarne il funzionamento o tentare di accedere ai dati di altri utenti. In questi casi il Salone può annullare le prenotazioni e sospendere l'account.

## 9. Disponibilità dell'app
Il Salone si impegna a mantenere l'app funzionante, ma non può garantire che sia sempre disponibile e senza errori: possono esserci interruzioni per manutenzione, aggiornamenti o problemi dei fornitori tecnici. In caso di problemi puoi sempre prenotare contattando direttamente il Salone.

## 10. Responsabilità
Il Salone risponde dei servizi eseguiti in salone secondo la legge. Non risponde dei danni dovuti a uso scorretto dell'app, a dati inseriti in modo errato dal cliente o a malfunzionamenti di reti e dispositivi non sotto il suo controllo, nei limiti consentiti dalla legge. Restano salvi i diritti del consumatore previsti dal Codice del Consumo (D.Lgs. 206/2005).

## 11. Contenuti
Nomi, marchi, logo, testi e immagini presenti nell'app appartengono al Salone o ai rispettivi titolari e non possono essere usati senza autorizzazione. La foto del profilo che carichi resta tua: la usiamo solo per mostrarla nel tuo profilo e al personale del Salone.

## 12. Cancellazione dell'account
Puoi cancellare il tuo account in qualsiasi momento con "Cancella profilo". Le prenotazioni in programma vengono annullate e i tuoi dati trattati come indicato nell'Informativa privacy.

## 13. Modifiche ai Termini
Il Salone può aggiornare questi Termini. Le modifiche importanti ti verranno segnalate nell'app. Continuando a usare il servizio dopo l'aggiornamento le accetti.

## 14. Legge applicabile e contatti
Questi Termini sono regolati dalla legge italiana. Per le controversie con i consumatori è competente il foro del luogo di residenza o domicilio del consumatore. Per qualsiasi richiesta: {{email}} – {{telefono}}.`;

/* Riempie i segnaposto con i dati del negozio; quelli mancanti restano evidenti */
window.compilaLegale = (testo, c) => {
  const R = c.regole || {}, mancante = '[da completare]';
  const durata = m => !m ? 'il momento stesso' : m % 1440 === 0 ? (m / 1440) + (m === 1440 ? ' giorno' : ' giorni') : m % 60 === 0 ? (m / 60) + (m === 60 ? ' ora' : ' ore') : m + ' minuti';
  const v = { nome: c.nome, ragione: c.ragioneSociale, piva: c.piva, indirizzo: c.indirizzo, email: c.email, telefono: c.telefono,
    giorniMax: R.giorniMax, maxAttive: R.maxAttive, maxServizi: R.maxServizi, annullo: durata(R.annulloMin), anticipo: durata(R.anticipoMin) };
  return String(testo || '').replace(/\{\{(\w+)\}\}/g, (_, k) => (v[k] !== undefined && v[k] !== '' && v[k] !== null) ? String(v[k]) : mancante);
};

/* ---------- FIDELITY CARD: regole di partenza (si cambiano dalla dashboard → Fidelity Card → Impostazioni) ---------- */
window.RADICI_SEED.fidelity = {
  attiva: true,
  validitaMesi: 12,
  /* punti per appuntamento in base alla spesa: da quell'importo in su (fino allo scaglione dopo) */
  scaglioni: [{ da: 0, punti: 5 }, { da: 15, punti: 10 }, { da: 25, punti: 15 }, { da: 35, punti: 20 }, { da: 50, punti: 25 }, { da: 70, punti: 30 }],
  /* maxMese 0 = senza limite */
  bonus: [
    { id: 'ripren', nome: 'Riprenotazione immediata', punti: 5, maxMese: 1, nota: '' },
    { id: 'insta', nome: 'Storia Instagram con tag @radici_ambitohs', punti: 5, maxMese: 1, nota: '' },
    { id: 'amico', nome: 'Presenta un amico', punti: 20, maxMese: 0, nota: 'dopo il suo primo servizio pagato' },
    { id: 'combo', nome: 'Barber + Estetica nella stessa visita', punti: 10, maxMese: 0, nota: '' }
  ],
  premi: [
    { id: 'p60', punti: 60, nome: 'Gold Mask' },
    { id: 'p100', punti: 100, nome: 'Hairspa o Beardspa' },
    { id: 'p150', punti: 150, nome: 'Pulizia viso express' },
    { id: 'p200', punti: 200, nome: 'Taglio gratuito' },
    { id: 'p250', punti: 250, nome: '50% di sconto su Skin Bloom' },
    { id: 'p350', punti: 350, nome: 'Premium Experience' }
  ],
  regolamento: ''
};
/* Regolamento standard. Le liste {{scaglioni}}, {{bonus}} e {{premi}} si scrivono da sole con i valori impostati. */
window.RADICI_SEED.regolamentoFid = `## Regolamento Fidelity Card {{nome}}
## Chi può partecipare?
La Fidelity Card è gratuita, personale e riservata esclusivamente ai clienti registrati sull'app ufficiale {{nome}}. Senza l'app non è possibile accumulare punti o riscattare premi.
## Come si accumulano i punti?
Ogni appuntamento genera punti in base alla spesa effettuata, sia per i servizi Barber che Nails & Beauty.
{{scaglioni}}
## Bonus fedeltà
{{bonus}}
## Catalogo premi
{{premi}}
## Regole generali
I punti sono validi {{validita}} dall'accredito, non sono trasferibili né convertibili in denaro. Ogni premio riscattato comporta la sottrazione dei punti necessari.
I premi sono riscattabili esclusivamente in salone, previa disponibilità. I servizi gratuiti non generano punti. I bonus sono cumulabili nel rispetto delle condizioni indicate.
Per informazioni o assistenza, rivolgiti al nostro staff.
## {{nome}}
*La tua fedeltà merita di essere premiata!*`;

window.FID = (() => {
  const euro = n => (Math.round(n * 100) / 100).toLocaleString('it-IT', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
  const ordina = f => (f.scaglioni || []).slice().sort((a, b) => a.da - b.da);
  /* punti di un appuntamento in base all'importo speso (0 € = servizio gratuito = 0 punti) */
  const puntiPer = (importo, f) => { if (!(importo > 0)) return 0; let p = 0; ordina(f).forEach(s => { if (importo >= s.da) p = s.punti; }); return p; };
  const piuMesi = (k, m) => { const d = new Date(k + 'T12:00'); d.setMonth(d.getMonth() + m); const p = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };
  /* saldo con scadenza: i punti guadagnati scadono dopo N mesi; i premi consumano prima i punti più vecchi */
  const saldo = (movs, f, oggi) => {
    const mesi = f.validitaMesi || 12, L = movs.slice().sort((a, b) => (a.data + (a.punti < 0 ? 1 : 0) + (a.ts || 0)).localeCompare(b.data + (b.punti < 0 ? 1 : 0) + (b.ts || 0)));
    const cred = [];
    L.forEach(m => {
      if (m.punti > 0) cred.push({ data: m.data, scad: piuMesi(m.data, mesi), resto: m.punti });
      else if (m.punti < 0) { let da = -m.punti; for (const c of cred) { if (c.scad <= m.data || !c.resto) continue; const x = Math.min(c.resto, da); c.resto -= x; da -= x; if (!da) break; } }
    });
    const vivi = cred.filter(c => c.scad > oggi && c.resto > 0), tra30 = piuMesi(oggi, 1);
    const scadenza = vivi.filter(c => c.scad <= tra30).reduce((a, c) => { a.punti += c.resto; a.data = a.data && a.data < c.scad ? a.data : c.scad; return a; }, { punti: 0, data: '' });
    return { saldo: vivi.reduce((a, c) => a + c.resto, 0), scadenza };
  };
  /* quante volte un bonus è già stato dato a un cliente in quel mese (escluso un movimento) */
  const usiMese = (movs, uid, bid, k, tranneId) => movs.filter(m => m.uid === uid && m.bonus === bid && String(m.data).slice(0, 7) === String(k).slice(0, 7) && m.id !== tranneId).length;
  const righeScaglioni = f => { const S = ordina(f); return S.map((s, i) => { const n = S[i + 1]; return '- ' + (i === 0 && !s.da ? 'Fino a ' + euro(n ? n.da - .01 : 0) : n ? 'Da ' + euro(s.da) + ' a ' + euro(n.da - .01) : 'Da ' + euro(s.da) + ' in su') + ' → ' + s.punti + ' punti'; }).join('\n'); };
  const righeBonus = f => (f.bonus || []).map(b => '- ' + b.nome + ': +' + b.punti + ' punti' + (b.nota ? ' ' + b.nota : '') + (b.maxMese ? ' (max ' + b.maxMese + ' al mese)' : '') + '.').join('\n');
  const righePremi = f => (f.premi || []).slice().sort((a, b) => a.punti - b.punti).map(p => '- ' + p.punti + ' punti → ' + p.nome).join('\n');
  const testo = (f, c) => String(f.regolamento || window.RADICI_SEED.regolamentoFid)
    .replace(/\{\{scaglioni\}\}/g, righeScaglioni(f)).replace(/\{\{bonus\}\}/g, righeBonus(f)).replace(/\{\{premi\}\}/g, righePremi(f))
    .replace(/\{\{validita\}\}/g, (f.validitaMesi || 12) + ' mesi').replace(/\{\{nome\}\}/g, c.nome || '');
  /* testo con ## titoli, - elenchi, *corsivo* → HTML */
  const html = (f, c, esc) => testo(f, c).split('\n').map(r => r.trim()).filter(Boolean).map(r => {
    const it = s => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return r.startsWith('## ') ? `<h3>${it(r.slice(3))}</h3>` : r.startsWith('- ') ? `<p class="li">${it(r.slice(2))}</p>` : `<p>${it(r)}</p>`;
  }).join('');
  return { puntiPer, saldo, usiMese, html, euro, piuMesi };
})();

/* ---------- NOTIFICHE PUSH: cosa e quando inviare (dashboard → Notifiche push). Le invia il server (Cloud Functions). ---------- */
window.RADICI_SEED.notifiche = {
  /* promemoria prima dell'appuntamento: "prima" in minuti */
  promemoria: [
    { id: 'r24', attivo: true, prima: 1440, titolo: 'Promemoria appuntamento', testo: 'Ciao {{nome}}, ti aspettiamo {{quando}} da {{salone}} per {{servizi}} con {{operatore}}.' },
    { id: 'r1', attivo: true, prima: 60, titolo: 'Ci vediamo tra poco', testo: 'Alle {{ora}} hai appuntamento da {{salone}}. A dopo!' }
  ],
  comunicazioni: true,
  punti: { attivo: true, testo: 'Hai ricevuto {{punti}} punti! Ora ne hai {{saldo}}.' },
  inattivi: { attivo: false, giorni: 45, testo: 'Ciao {{nome}}, è da un po’ che non ci vediamo! Prenota il tuo prossimo appuntamento da {{salone}}.' },
  silenzio: { da: '21:00', a: '08:30' }
};
/* testo di una notifica con i segnaposto riempiti (serve all'anteprima della dashboard e, uguale, al server) */
window.testoNotifica = (t, v) => String(t || '').replace(/\{\{(\w+)\}\}/g, (_, k) => v[k] !== undefined ? String(v[k]) : '');
