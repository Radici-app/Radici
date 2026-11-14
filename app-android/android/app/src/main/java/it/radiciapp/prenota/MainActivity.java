package it.radiciapp.prenota;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

public class MainActivity extends BridgeActivity {
    /** Ingrandimento massimo del testo (carattere di sistema grande): oltre si rompe l'impaginazione. */
    private static final int ZOOM_TESTO_MAX = 120;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Plugin scritto per questa app: scarica e installa gli aggiornamenti.
        // Esiste solo nella versione "github" (APK delle Releases); nella versione per Google Play non c'è.
        registraAggiorna();
        super.onCreate(savedInstanceState);
        limitaZoomTesto();
    }

    @SuppressWarnings("unchecked")
    private void registraAggiorna() {
        try {
            registerPlugin((Class<? extends Plugin>) Class.forName(MainActivity.class.getPackage().getName() + ".AggiornaPlugin"));
        } catch (ClassNotFoundException e) {
            // versione per Google Play: niente aggiornamento automatico
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        limitaZoomTesto();
    }

    private void limitaZoomTesto() {
        if (getBridge() == null || getBridge().getWebView() == null) return;
        WebSettings ws = getBridge().getWebView().getSettings();
        float scala = getResources().getConfiguration().fontScale;
        int voluto = Math.round(scala * 100);
        ws.setTextZoom(Math.max(100, Math.min(voluto, ZOOM_TESTO_MAX)));
    }
}
