# App Store Connect – scheda, privacy e note per la revisione

Lingua principale: **Italiano**.

## 1. Informazioni sull'app

| Campo | Testo |
|---|---|
| Nome (max 30) | `Radici – Ambito Hair Studio` |
| Nome sotto l'icona | `Radici` (già impostato nel progetto) |
| Sottotitolo (max 30) | `Prenota il tuo appuntamento` (27) |
| Bundle ID | `it.radiciapp.prenota` |
| SKU | `radici-prenota` |
| Categoria principale | **Lifestyle** (Stile di vita) |
| Categoria secondaria | facoltativa: lasciala vuota |
| Classificazione età | 4+ (rispondi "Nessuno" a tutto il questionario) |
| Prezzo | Gratuito |
| Disponibilità | Italia (o tutti i paesi, a tua scelta) |
| Dispositivi | Solo iPhone (iPad non attivato: non servono screenshot per iPad) |
| URL privacy | `https://radici-app.github.io/Radici/privacy.html` |
| URL di supporto | `https://radici-app.github.io/Radici/` |
| URL marketing (facoltativo) | `https://radici-app.github.io/Radici/` |
| Copyright | `2026 Eurogestion S.A.S. di Di Fiore Rosa` |

### Testo promozionale (max 170, modificabile senza nuova revisione)
```
Prenota taglio, barba e trattamenti da Radici – Ambito Hair Studio quando vuoi: scegli servizio, operatore e orario in pochi tocchi.
```

### Descrizione (max 4000)
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
• Aggiungi l'appuntamento al Calendario dell'iPhone

TUTTO SUL SALONE
• Listino completo con prezzi e durate
• Orari di apertura, giorni di chiusura e staff
• Avvisi e novità del salone
• Galleria dei lavori

FIDELITY CARD
• Raccogli punti a ogni visita e scopri i premi riservati ai clienti registrati

ACCESSO SEMPLICE E SICURO
• Accedi con Apple, con Google oppure con email e password
• Puoi modificare o cancellare il tuo profilo in qualsiasi momento direttamente dall'app

L'app è gratuita e non gestisce pagamenti: i servizi si pagano direttamente in salone.
```

### Parole chiave (max 100 caratteri, separate da virgola, senza spazi)
```
parrucchiere,barbiere,prenotazione,taglio,barba,capelli,salone,appuntamento,hair,ambito,colore
```
(94 caratteri. Il nome "Radici" è già indicizzato dal titolo: non ripeterlo.)

### Screenshot
Cartella `store/app-store/screenshot-iphone-6.9/` – 6 immagini 1320×2868 (iPhone 6,9"). App Store Connect le riduce da solo per gli altri iPhone.
Icona 1024×1024 (già dentro l'app; copia in `store/app-store/icona-1024.png`).

## 2. Privacy dell'app ("etichette" sulla privacy)

**"Raccogli dati da questa app?" → Sì.**
Per ogni tipo di dato: **Collegato all'identità dell'utente: Sì** · **Usato per il tracciamento: No** · Finalità: **Funzionalità dell'app**.

| Tipo di dato (Apple) | Finalità |
|---|---|
| Informazioni di contatto → **Nome** | Funzionalità dell'app |
| Informazioni di contatto → **Indirizzo email** | Funzionalità dell'app |
| Informazioni di contatto → **Numero di telefono** | Funzionalità dell'app |
| Contenuti utente → **Foto o video** (foto del profilo, facoltativa) | Funzionalità dell'app |
| Contenuti utente → **Altri contenuti utente** (note della prenotazione) | Funzionalità dell'app |
| Identificatori → **ID utente** | Funzionalità dell'app |
| Identificatori → **ID dispositivo** (codice per le notifiche push) | Funzionalità dell'app |
| Acquisti → no · Posizione → no · Dati finanziari → no · Salute → no · Cronologia → no · Diagnostica → no | – |

Tracciamento: **No** (nessuna pubblicità, nessuna condivisione con broker di dati). Non serve il popup "Consenti il tracciamento".

## 3. Informazioni per la revisione (App Review Information)

- **Accesso richiesto: Sì**
- Nome utente: *(email dell'account di prova)*
- Password: *(password dell'account di prova)*
- Contatto: nome, telefono ed email di chi segue la pubblicazione

### Note per il revisore (in inglese, così la revisione è più rapida)
```
Radici is the official booking app of the hair salon "Radici – Ambito Hair Studio" (Italy). The app is in Italian.

Without signing in you can browse the home screen, salon information (Informazioni negozio), the price list (Listino) and choose services (Nuova prenotazione).
Signing in is required only to confirm a booking and to see "Prenotazioni" (bookings), "Profilo" (profile) and "Fidelity Card".

How to sign in with the demo account:
1. Tap "Accedi" (top right).
2. Tick the checkbox to accept Terms and Privacy policy.
3. Enter the demo email and password provided above and tap "Accedi".

How to test a booking:
Nuova prenotazione → choose a service → Continua → choose a stylist → choose day and time → Continua → Conferma. You can then cancel it from "Prenotazioni". Bookings made by the demo account are test bookings and are ignored by the salon.

Account deletion: Profilo → "Cancella profilo" (please do not delete the demo account). Web deletion page: https://radici-app.github.io/Radici/cancella-account.html

Sign in options: Sign in with Apple, Google Sign-In, or email and password.
The app does not sell anything and has no payments: services are paid at the salon.
Push notifications are prepared but currently disabled (no prompt is shown).
```

## 4. Esportazione e crittografia
Già impostato nell'app (`ITSAppUsesNonExemptEncryption = NO`): App Store Connect non farà domande sulla crittografia a ogni caricamento.
