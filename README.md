# Radici – app clienti

- Sito (anche per iPhone): https://radici-app.github.io/Radici/
- App Android: https://github.com/Radici-app/Radici/releases/latest/download/Radici.apk
- La cartella `app-android/` racchiude lo stesso sito in un'app Android (Capacitor). A ogni modifica su `main`, GitHub Actions ("App Android") compila l'APK e lo pubblica in Releases.
- Firma: la password va nel segreto del repository `RADICI_KEY_PASSWORD` (Settings > Secrets and variables > Actions). Alla prima compilazione GitHub crea la chiave cifrata `app-android/firma-app.p12`. Non perdere la password: senza, l'app installata non si può più aggiornare.
