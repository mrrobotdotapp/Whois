# TWA (Trusted Web Activity) Setup Guide

Ce guide explique comment transformer cette application PWA en TWA pour Android.

## Qu'est-ce qu'une TWA ?

Une Trusted Web Activity (TWA) permet d'intégrer votre application web Progressive (PWA) dans une application Android native, offrant une expérience utilisateur fluide sans la barre d'URL du navigateur.

## Prérequis

- Application PWA fonctionnelle
- Manifest.json configuré correctement
- HTTPS activé sur votre domaine
- Android Studio installé
- Compte Google Play Developer (pour publication)

## Structure du Projet

Le projet est maintenant organisé comme suit :
```
Whois/
├── src/
│   ├── app.js              # Application Express principale
│   ├── config/
│   │   └── config.example.js
│   ├── routes/
│   │   └── index.js        # Routes de l'application
│   └── utils/
│       └── badges.js       # Utilitaires pour les badges Discord
├── public/
│   ├── .well-known/
│   │   └── assetlinks.json # Configuration TWA
│   ├── manifest.json       # Manifest PWA/TWA
│   └── ...
├── views/                  # Templates EJS
├── index.js               # Point d'entrée
└── package.json
```

## Configuration du Manifest

Le fichier `public/manifest.json` doit contenir :

### Éléments Essentiels TWA
- `name` : Nom complet de l'application
- `short_name` : Nom court (12 caractères max recommandé)
- `start_url` : URL de démarrage (généralement "/")
- `display` : "standalone" (recommandé pour TWA)
- `theme_color` : Couleur du thème Android
- `background_color` : Couleur de fond de l'écran de démarrage
- `icons` : Icônes avec `purpose: "any maskable"` pour l'icône adaptative Android

### Icons Requirements
Pour une TWA, vous avez besoin au minimum de :
- 192x192px icon (avec `purpose: "any maskable"`)
- 512x512px icon (avec `purpose: "any maskable"`)

## Configuration Asset Links

### 1. Générer le SHA-256 Fingerprint

Pour obtenir votre fingerprint de signature Android :

```bash
# Pour debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Pour release keystore
keytool -list -v -keystore /path/to/your/keystore.jks -alias your-alias
```

### 2. Configurer assetlinks.json

Remplacez `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` dans `public/.well-known/assetlinks.json` avec votre fingerprint obtenu.

Format : `XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX`

### 3. Vérifier Asset Links

Vérifiez que votre fichier est accessible :
```
https://votre-domaine.com/.well-known/assetlinks.json
```

## Créer l'Application Android TWA

### Option 1 : Utiliser Bubblewrap CLI (Recommandé)

```bash
# Installer Bubblewrap
npm install -g @bubblewrap/cli

# Initialiser le projet TWA
bubblewrap init --manifest=https://whois.mrrobot.app/manifest.json

# Builder l'APK
bubblewrap build

# Installer sur un appareil
bubblewrap install
```

### Option 2 : Utiliser Android Studio

1. Créer un nouveau projet Android
2. Ajouter la dépendance TWA dans `build.gradle` :
```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

3. Configurer `AndroidManifest.xml`
4. Ajouter l'activité TWA

## Vérification

### Tester en Local

1. Installer l'APK sur un appareil Android
2. Ouvrir l'application
3. Vérifier qu'il n'y a pas de barre d'URL
4. Tester toutes les fonctionnalités PWA

### Outils de Débogage

- Chrome DevTools pour déboguer via `chrome://inspect`
- Logcat pour voir les logs Android
- Test la validation TWA : https://developers.google.com/digital-asset-links/tools/generator

## Optimisations TWA

### 1. Performance
- Minimiser les ressources
- Activer la compression GZIP/Brotli
- Utiliser le cache HTTP approprié

### 2. Service Worker
- Maintenir le service worker à jour
- Gérer le mode offline correctement

### 3. Splash Screen
- Configurer `background_color` et une icône adaptative
- Android générera automatiquement l'écran de démarrage

## Publication sur Google Play

1. Signer l'APK avec votre keystore de production
2. Générer un AAB (Android App Bundle) au lieu d'un APK
3. Créer une fiche sur Google Play Console
4. Uploader l'AAB
5. Remplir les informations requises
6. Soumettre pour révision

## Troubleshooting

### TWA ne lance pas mon site
- Vérifier que assetlinks.json est accessible
- Vérifier que le SHA-256 fingerprint est correct
- Vérifier que le package_name correspond

### Chrome Custom Tab s'affiche au lieu de TWA
- Les Asset Links ne sont pas validés
- Attendre quelques minutes pour la propagation
- Vérifier les logs Logcat pour plus de détails

### Icône ne s'affiche pas correctement
- Vérifier que les icônes 192x192 et 512x512 existent
- Ajouter `purpose: "any maskable"` dans le manifest
- Utiliser maskable.app pour tester vos icônes

## Resources

- [TWA Documentation officielle](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Bubblewrap Guide](https://github.com/GoogleChromeLabs/bubblewrap)
- [PWA to Android](https://web.dev/android/)
- [Asset Links Tool](https://developers.google.com/digital-asset-links/tools/generator)

## Support

Pour toute question, ouvrir une issue sur le repository GitHub.
