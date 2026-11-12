package it.radiciapp.prenota;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Aggiornamento dell'app senza passare dal browser:
 * scarica il nuovo APK nella cache dell'app e apre la schermata di installazione di Android.
 */
@CapacitorPlugin(name = "Aggiorna")
public class AggiornaPlugin extends Plugin {

    /** true se Android permette a questa app di installare aggiornamenti. */
    @PluginMethod
    public void puoInstallare(PluginCall call) {
        boolean ok = Build.VERSION.SDK_INT < Build.VERSION_CODES.O
            || getContext().getPackageManager().canRequestPackageInstalls();
        JSObject r = new JSObject();
        r.put("ok", ok);
        call.resolve(r);
    }

    /** Apre l'impostazione "Installa app sconosciute" per questa app. */
    @PluginMethod
    public void apriPermesso(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Intent i = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
        }
        call.resolve();
    }

    /** Scarica l'APK da "url" (segue i reindirizzamenti) e avvia l'installazione. Evento "progresso" con {p: 0-100}. */
    @PluginMethod
    public void installa(PluginCall call) {
        String url = call.getString("url");
        if (url == null || !url.startsWith("https://")) {
            call.reject("Indirizzo non valido");
            return;
        }
        call.setKeepAlive(false);
        new Thread(() -> {
            HttpURLConnection c = null;
            try {
                Context ctx = getContext();
                File dir = new File(ctx.getCacheDir(), "aggiornamento");
                if (!dir.exists() && !dir.mkdirs()) throw new Exception("Spazio non disponibile");
                File apk = new File(dir, "Radici.apk");
                if (apk.exists()) apk.delete();

                // Segue a mano fino a 5 reindirizzamenti (GitHub manda al file vero su un altro indirizzo)
                URL u = new URL(url);
                for (int n = 0; n < 6; n++) {
                    c = (HttpURLConnection) u.openConnection();
                    c.setInstanceFollowRedirects(false);
                    c.setConnectTimeout(20000);
                    c.setReadTimeout(30000);
                    int code = c.getResponseCode();
                    if (code >= 300 && code < 400) {
                        String loc = c.getHeaderField("Location");
                        c.disconnect();
                        if (loc == null) throw new Exception("Reindirizzamento senza indirizzo");
                        u = new URL(u, loc);
                        if (!"https".equals(u.getProtocol())) throw new Exception("Indirizzo non sicuro");
                        continue;
                    }
                    if (code != 200) throw new Exception("Errore del server: " + code);
                    break;
                }

                long tot = c.getContentLengthLong();
                long letti = 0;
                int ultimo = -1;
                try (InputStream in = c.getInputStream(); OutputStream out = new FileOutputStream(apk)) {
                    byte[] buf = new byte[65536];
                    int k;
                    while ((k = in.read(buf)) != -1) {
                        out.write(buf, 0, k);
                        letti += k;
                        if (tot > 0) {
                            int p = (int) (letti * 100 / tot);
                            if (p != ultimo) {
                                ultimo = p;
                                JSObject ev = new JSObject();
                                ev.put("p", p);
                                notifyListeners("progresso", ev);
                            }
                        }
                    }
                }
                if (letti < 100000) throw new Exception("File scaricato incompleto");

                Uri uri = FileProvider.getUriForFile(ctx, ctx.getPackageName() + ".fileprovider", apk);
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setDataAndType(uri, "application/vnd.android.package-archive");
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                getActivity().runOnUiThread(() -> {
                    try {
                        ctx.startActivity(i);
                        call.resolve();
                    } catch (Exception e) {
                        call.reject("Impossibile aprire l'installazione: " + e.getMessage());
                    }
                });
            } catch (Exception e) {
                call.reject(e.getMessage() != null ? e.getMessage() : "Scaricamento non riuscito");
            } finally {
                if (c != null) c.disconnect();
            }
        }).start();
    }
}
