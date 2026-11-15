# Google Play – scheda dello store e moduli della Play Console

Testi pronti da copiare e incollare. Lingua predefinita della scheda: **Italiano – it-IT**.

---

## 1. Dettagli dell'app

| Campo | Testo |
|---|---|
| Nome dell'app (max 30) | `Radici – Ambito Hair Studio` (27 caratteri) |
| Nome sotto l'icona sul telefono | `Radici` (già impostato nell'app) |
| Identificativo (package) | `it.radiciapp.prenota` |
| App o gioco | App |
| Gratuita o a pagamento | Gratuita |
| Categoria | **Bellezza** |
| Tag (facoltativi) | Prenotazioni, Parrucchiere, Barbiere |
| Email di contatto | l'email di Eurogestion che vuoi mostrare pubblicamente |
| Sito web | `https://radici-app.github.io/Radici/` |
| Telefono (facoltativo) | quello del salone |
| Norme sulla privacy (URL) | `https://radici-app.github.io/Radici/privacy.html` |

### Descrizione breve (max 80 caratteri)

```
Prenota taglio, barba e trattamenti dal tuo salone in pochi tocchi
```
(66 caratteri. Alternativa: `Prenota da Radici – Ambito Hair Studio: servizi, operatore e orario in un tocco` – 79)

### Descrizione completa (max 4000 caratteri)

```
Radici – Ambito Hair Studio è l'app ufficiale del salone per prenotare i tuoi appuntamenti in modo semplice e veloce, quando vuoi, senza telefonare.

PRENOTA IN POCHI PASSI
• Scegli uno o più servizi: taglio, barba, colore, trattamenti e molto altro
• Scegli l'operatore che preferisci, oppure "indifferente" per il primo libero
• Vedi i giorni e gli orari davvero disponibili e conferma con un tocco
• La durata e il prezzo indicativo si calcolano da soli

LE TUE PRENOTAZIONI SEMPRE CON TE
• Consulta gli appuntamenti in programma e lo storico
• Annulla una prenotazione se cambi programma
• Aggiungi l'appuntamento al calendario del telefono

TUTTO SUL SALONE
• Listino completo con prezzi e durate
• Orari di apertura, giorni di chiusura e staff
• Avvisi e novità del salone
• Galleria dei lavori

FIDELITY CARD
• Raccogli punti a ogni visita e scopri i premi riservati ai clienti registrati

ACCESSO SEMPLICE E SICURO
• Accedi con il tuo account Google oppure con email e password
• Puoi modificare o cancellare il tuo profilo in qualsiasi momento direttamente dall'app

L'app è gratuita e non gestisce pagamenti: i servizi si pagano direttamente in salone.

App realizzata da Eurogestion S.A.S. di Di Fiore Rosa.
```

### Grafica (cartella `store/google-play/`)

| Elemento | File |
|---|---|
| Icona 512×512 | `icona-512.png` |
| Immagine in evidenza 1024×500 | `immagine-in-evidenza-1024x500.png` |
| Screenshot telefono (6, 1080×1920) | `screenshot/play-1-home.png` … `play-6-listino.png` |

Ordine consigliato degli screenshot: 1 home, 2 servizi, 4 giorno e ora, 3 operatore, 6 listino, 5 informazioni.
Tablet: non servono screenshot (l'app è pensata per il telefono).

---

## 2. Contenuti dell'app (menu "Monitora e migliora" → "Norme e programmi" → "Contenuti dell'app")

### 2.1 Norme sulla privacy
URL: `https://radici-app.github.io/Radici/privacy.html`

### 2.2 Accesso all'app
Scegli: **"Tutte le funzionalità o alcune sono soggette a restrizioni"** → **Aggiungi istruzioni**.

- Nome: `Account di prova per la revisione`
- Nome utente / email: `info@eurogestionradix.it`
- Password: *(la sua password)*
- Altre informazioni:
```
L'app si apre senza accesso: home, informazioni del salone, listino e scelta dei servizi sono liberi.
L'accesso serve per confermare una prenotazione, vedere "Prenotazioni", "Profilo" e "Fidelity Card".
Per accedere: tocca "Accedi" in alto a destra, spunta la casella dei Termini e della Privacy, inserisci email e password qui sopra e tocca "Accedi".
Per provare una prenotazione: Nuova prenotazione → scegli un servizio → Continua → scegli l'operatore → scegli giorno e ora → Conferma. Poi puoi annullarla da "Prenotazioni".
La cancellazione dell'account si trova in Profilo → "Cancella profilo" (per favore non cancellare l'account di prova).
```

### 2.3 Annunci
**No, la mia app non contiene annunci.**

### 2.4 Classificazione dei contenuti (questionario IARC)
- Email: quella di contatto
- Categoria: **Tutte le altre tipologie di app** (non "Gioco", non "Social")
- Risposte: **No** a tutte le domande su violenza, paura, sesso, linguaggio volgare, sostanze, gioco d'azzardo, contenuti generati dagli utenti condivisi con altri, acquisti digitali.
  - "Gli utenti possono interagire o scambiarsi contenuti?" → **No** (le note della prenotazione le legge solo il salone)
  - "L'app condivide la posizione dell'utente con altri?" → **No**
  - "L'app consente acquisti digitali?" → **No**
- Risultato atteso: PEGI 3 / Per tutti.

### 2.5 Pubblico di destinazione e contenuti
- Fasce d'età: **18 e oltre** (consigliato; si può aggiungere anche 16-17). Non selezionare fasce sotto i 13 anni.
- "L'app potrebbe attirare involontariamente i bambini?" → **No**.

### 2.6 App di notizie
**No.**

### 2.7 App governative / Funzionalità finanziarie / Salute
**No** a tutte (nessuna funzionalità finanziaria, nessuna app per la salute).

### 2.8 ID pubblicità (Advertising ID)
**No**, l'app non usa l'ID pubblicità.

### 2.9 Sicurezza dei dati (Data safety)

Domande generali:
| Domanda | Risposta |
|---|---|
| L'app raccoglie o condivide uno dei tipi di dati utente richiesti? | **Sì** |
| Tutti i dati raccolti sono criptati in transito? | **Sì** |
| Fornisci agli utenti un modo per richiedere l'eliminazione dei dati? | **Sì** – in app (Profilo → Cancella profilo) e dal web |
| URL per la cancellazione dell'account | `https://radici-app.github.io/Radici/cancella-account.html` |

Dati **raccolti** (nessuno è **condiviso** con terze parti: Firebase/Google agisce come fornitore per conto del salone, e Google lo considera "non condivisione"). Per tutti: *raccolti*, *non trattati in modo temporaneo*.

| Categoria → tipo | Obbligatorio o facoltativo | Finalità |
|---|---|---|
| Informazioni personali → **Nome** | Obbligatorio | Funzionalità dell'app, Gestione dell'account |
| Informazioni personali → **Indirizzo email** | Obbligatorio | Funzionalità dell'app, Gestione dell'account |
| Informazioni personali → **ID utente** | Obbligatorio | Funzionalità dell'app, Gestione dell'account |
| Informazioni personali → **Numero di telefono** | Obbligatorio | Funzionalità dell'app (il salone ti contatta per l'appuntamento) |
| Foto e video → **Foto** | Facoltativo (foto profilo) | Funzionalità dell'app, Personalizzazione |
| Attività nelle app → **Altre azioni** (prenotazioni, punti fedeltà) | Obbligatorio | Funzionalità dell'app |
| ID dispositivo o altri ID → **ID dispositivo o altri ID** (codice per le notifiche) | Facoltativo | Funzionalità dell'app (promemoria) |

Non raccolti: posizione, dati finanziari, salute, messaggi, contatti, calendario (l'app crea l'evento ma non legge il calendario), audio, file, cronologia di navigazione, diagnostica, ID pubblicità.

> Il codice per le notifiche è indicato anche se oggi i promemoria sono spenti (`PROMEMORIA_ATTIVI = false`), così la dichiarazione resta valida quando li riattivi.

### 2.10 Permessi
La versione per Google Play chiede solo Internet, Notifiche (Android 13+) e, solo se tocchi "cambia foto", la scelta di un'immagine dalla galleria tramite il selettore di sistema. **Non** contiene il permesso `REQUEST_INSTALL_PACKAGES` (che rimane solo nell'APK di GitHub), quindi non serve alcuna dichiarazione.

---

## 3. Dopo il primo caricamento: SHA-1 di Google Play in Firebase (per "Accedi con Google")

Google Play firma l'app che scarica la gente con la **chiave di firma dell'app** (diversa dalla tua chiave di caricamento, se lasci che la generi Google). L'accesso con Google funziona solo se Firebase conosce anche quell'impronta.

1. Play Console → la tua app → **Test e rilascio → Configurazione → Integrità dell'app → Firma dell'app**.
2. Copia lo **SHA-1** (e lo SHA-256) del **"Certificato della chiave di firma dell'app"**.
3. Firebase Console → progetto **radici-app** → ⚙ Impostazioni progetto → Le tue app → app Android `it.radiciapp.prenota` → **Aggiungi impronta digitale** → incolla SHA-1, poi di nuovo per SHA-256.
4. Scarica il nuovo `google-services.json` e sostituisci `app-android/android/app/google-services.json` nel repository (o chiedimelo e lo faccio io).
5. Lascia anche le impronte di oggi (quelle della chiave di GitHub): servono all'APK di GitHub.
