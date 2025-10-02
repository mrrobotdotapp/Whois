# Quick Start: Transform to TWA (Trusted Web Activity)

Ce guide rapide vous aide à transformer votre PWA en application Android TWA en quelques minutes.

## Prérequis
- Node.js installé
- Application déployée sur HTTPS
- Compte Google Play Developer (optionnel, pour publication)

## Étape 1: Vérifier que votre PWA est prête

```bash
npm run validate-twa
```

Assurez-vous qu'il n'y a pas d'erreurs critiques.

## Étape 2: Installer Bubblewrap CLI

```bash
npm install -g @bubblewrap/cli
```

## Étape 3: Initialiser le projet TWA

```bash
# Naviguer vers un nouveau dossier pour votre app Android
cd ~/Desktop
mkdir whois-twa
cd whois-twa

# Initialiser avec votre manifest
bubblewrap init --manifest=https://whois.mrrobot.app/manifest.json
```

Répondez aux questions:
- **Application package name**: `app.mrrobot.whois.twa` (ou votre propre)
- **Confirm**: `y`

## Étape 4: Générer le Keystore (première fois seulement)

```bash
# Bubblewrap le fait automatiquement ou utilise votre keystore existant
# Pour créer manuellement:
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

## Étape 5: Obtenir le SHA-256 Fingerprint

```bash
# Depuis le dossier de votre TWA
bubblewrap fingerprint
```

Ou manuellement:
```bash
keytool -list -v -keystore ./android.keystore -alias android -storepass android -keypass android
```

Copiez la valeur SHA256, format: `AA:BB:CC:...`

## Étape 6: Mettre à jour assetlinks.json

Éditez `public/.well-known/assetlinks.json` sur votre serveur:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "app.mrrobot.whois.twa",
      "sha256_cert_fingerprints": [
        "VOTRE_SHA256_ICI"
      ]
    }
  }
]
```

Vérifiez l'accessibilité:
```
https://votre-domaine.com/.well-known/assetlinks.json
```

## Étape 7: Builder l'APK

```bash
# Build de développement (debug)
bubblewrap build

# Build de production (release)
bubblewrap build --release
```

## Étape 8: Installer et Tester

```bash
# Connecter votre appareil Android en USB
# Activer le débogage USB sur votre téléphone

# Installer l'app
bubblewrap install
```

## Étape 9: Vérifier le Fonctionnement

Sur votre téléphone Android:
1. Ouvrez l'application installée
2. ✅ Vérifiez qu'il n'y a **PAS** de barre d'URL
3. ✅ Vérifiez que l'icône apparaît correctement
4. ✅ Testez toutes les fonctionnalités
5. ✅ Testez le mode hors ligne

Si vous voyez une barre d'URL (Chrome Custom Tab):
- Les Asset Links ne sont pas validés
- Attendez quelques minutes pour la propagation DNS
- Vérifiez que le SHA-256 est correct
- Vérifiez que le package name correspond

## Étape 10: Publication sur Google Play (Optionnel)

```bash
# Générer un App Bundle (recommandé)
bubblewrap build --release

# Le fichier .aab sera dans le dossier app-release-bundle/
```

Puis:
1. Allez sur [Google Play Console](https://play.google.com/console)
2. Créez une nouvelle application
3. Uploadez le fichier .aab
4. Remplissez les informations requises
5. Soumettez pour révision

## Commandes Utiles

```bash
# Valider la configuration TWA
npm run validate-twa

# Mettre à jour depuis le manifest
bubblewrap update

# Voir les logs de l'app Android
adb logcat | grep chromium
```

## Dépannage Rapide

### "Erreur de signature"
```bash
bubblewrap fingerprint
# Vérifiez que ce SHA-256 est dans assetlinks.json
```

### "L'app ouvre Chrome au lieu de TWA"
- Attendez 5-10 minutes pour la propagation des Asset Links
- Désinstallez et réinstallez l'app
- Vérifiez https://votre-domaine.com/.well-known/assetlinks.json

### "Icône ne s'affiche pas"
- Vérifiez que les icônes 192x192 et 512x512 existent
- Ajoutez `"purpose": "any maskable"` dans manifest.json

## Resources

- [Documentation TWA Complète](./TWA_SETUP.md)
- [Bubblewrap GitHub](https://github.com/GoogleChromeLabs/bubblewrap)
- [Asset Links Tool](https://developers.google.com/digital-asset-links/tools/generator)

## Besoin d'Aide?

Ouvrez une issue sur GitHub avec:
- Les messages d'erreur
- Votre manifest.json
- Votre assetlinks.json
- Les logs `adb logcat`
