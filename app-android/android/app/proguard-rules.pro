# Regole di R8 (ottimizzazione/offuscamento) per Radici.
# R8 rinomina e rimuove il codice che crede inutilizzato: qui si elenca cosa NON va toccato,
# perché viene chiamato "per nome" (dal JavaScript dell'app o tramite riflessione).

# Informazioni utili per i report di errore (righe e nomi dei file nei crash)
-keepattributes SourceFile,LineNumberTable,*Annotation*,Signature,InnerClasses,EnclosingMethod,Exceptions
-renamesourcefileattribute SourceFile

# --- Capacitor: il ponte tra JavaScript e Android trova plugin e metodi per nome ---
-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keep @com.getcapacitor.NativePlugin class * { *; }
-keep class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod public <methods>;
    @com.getcapacitor.annotation.PermissionCallback <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
    @android.webkit.JavascriptInterface <methods>;
}

# Plugin Aggiorna (solo versione GitHub): caricato con Class.forName in MainActivity
-keep class it.radiciapp.prenota.AggiornaPlugin { *; }
-dontwarn it.radiciapp.prenota.AggiornaPlugin

# --- Cordova (usato internamente da Capacitor per i plugin compatibili) ---
-keep class org.apache.cordova.** { *; }
-dontwarn org.apache.cordova.**

# --- Plugin Capacitor usati dall'app (Firebase Authentication/Messaging, App) ---
-keep class io.capawesome.capacitorjs.plugins.** { *; }
-keep class com.capacitorjs.plugins.** { *; }

# --- Accesso con Google (Credential Manager): il provider di Play Services è caricato per riflessione ---
-if class androidx.credentials.CredentialManager
-keep class androidx.credentials.playservices.** { *; }
-dontwarn androidx.credentials.**

# Firebase e Google Play Services includono già le proprie regole; si silenziano solo gli avvisi
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**
