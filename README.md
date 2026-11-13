# Nijashwa Studio (নিজস্ব স্টুডিও)

A free, offline-first video editor that runs as a **single HTML file** (`www/index.html`) and can be packaged as an **Android APK** with [Capacitor](https://capacitorjs.com/). No server, no account, no paid API required.

- Timeline editor with text, video, image, audio, shape and mask layers
- Bengali and English text, text animations, transitions, effects and a built-in sound-effect library
- Theme control (colors, glass, borders) from the home screen logo
- MP4 export in the browser/WebView (WebCodecs + `mp4-muxer`), MP3 export (`lamejs`)
- Optional AI features that use *your own* key or a one-time model download (see [Privacy](#privacy-and-network-use))

> Status: early public release. Expect rough edges - issues and pull requests are welcome.

## Get an APK (no tools needed)

1. **Fork** this repository on GitHub.
2. Open the **Actions** tab of your fork and enable workflows if asked.
3. Choose **Build Android APK** -> **Run workflow**.
4. When it finishes (about 5-10 minutes), open the run and download the **NijashwaStudio-apk** artifact (a zip containing the `.apk`).
5. Unzip, copy the APK to your phone and install it (you may need to allow "Install unknown apps").

Pushing a tag such as `v0.1.0` also attaches the APK to a GitHub Release.

**Debug vs. signed APK.** Without any secrets the workflow builds a *debug* APK. Debug builds are signed with a throw-away key, so a newer build cannot be installed over an older one from a different run (uninstall first). For a stable, updatable APK, create your own keystore and add these repository secrets: `ANDROID_KEYSTORE_BASE64` (`base64 -w0 my.jks`), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`. The workflow then produces a signed release APK. Never commit a keystore.

**Version.** The version shown in the app (Profile page -> App card) is the `version` in `package.json` plus the build number (CI run number) inside the APK. To release a new version: edit `version` in `package.json`, commit, and push a tag like `v0.2.0`.

**Using it as your own app?** Change `appId` in `capacitor.config.json` (default `com.nijashwa.studio`) so it does not clash with other builds.

## Build locally

Requirements: Node.js 20, JDK 17, Android SDK (Android Studio installs it).

```bash
npm install
npm run prepare:web        # copies mp4-muxer, html2canvas, lamejs into www/vendor
npm run android:add        # creates android/ and applies small tweaks
npm run android:icons      # launcher icons from assets/
npm run android:debug      # builds the debug APK
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

## Run in a browser

```bash
npm install && npm run prepare:web
npm run serve              # http://localhost:8080
```

Use a recent Chrome/Edge: export relies on WebCodecs (`VideoEncoder`/`AudioEncoder`). On Android the app needs a recent Android System WebView.

## Project layout

| Path | What it is |
| --- | --- |
| `www/index.html` | The whole app (HTML, CSS, JS) |
| `scripts/prepare-web.mjs` | Copies third-party libs to `www/vendor` |
| `scripts/csp-hashes.mjs` | Checks / fixes the CSP script hashes (see [CONTRIBUTING](CONTRIBUTING.md)) |
| `scripts/android-patch.mjs` | Android permissions (microphone), version, backup off |
| `assets/` | Launcher icon sources |
| `.github/workflows/build-apk.yml` | CI that builds the APK |

`android/` and `www/vendor/` are generated and git-ignored.

## Privacy and network use

The editor works offline and keeps projects on your device. Network is used only when you trigger these features, or as a fallback for missing local files:

- **AI captions / transcription:** on first use the app downloads a speech engine (`@huggingface/transformers` from jsDelivr) and a Whisper model (`onnx-community/whisper-*`, from huggingface.co). Needs internet once.
- **Gemini (optional):** if you enter your own Google AI API key, requests go to `generativelanguage.googleapis.com`. The key is stored on the device (Android Keystore through the secure-storage plugin in the APK, `localStorage` in a browser). No key is bundled in this repository.
- **Fonts:** Google Fonts are requested for Inter, Baloo Da 2, Hind Siliguri, Tiro Bangla and Noto Serif Bengali; the UI falls back to system fonts offline.
- **CDN fallback:** if `vendor/*.js` is missing, the app tries jsDelivr / cdnjs.

There is no analytics or tracking. The profile and "license key" fields on the Profile page are stored locally only and are not verified online.

## Contributing, security, licenses

- [CONTRIBUTING.md](CONTRIBUTING.md) - how to edit the single-file app safely
- [SECURITY.md](SECURITY.md) - reporting vulnerabilities
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) - libraries, fonts, models
- [LICENSE](LICENSE) - MIT

---

## বাংলায় সংক্ষেপে

নিজস্ব স্টুডিও একটি ফ্রি, অফলাইন ভিডিও এডিটর - পুরো অ্যাপ একটাই HTML ফাইল (`www/index.html`)। APK বানাতে কোনো সফটওয়্যার লাগে না:

1. এই রিপোজিটরি **Fork** করো
2. **Actions** ট্যাব -> **Build Android APK** -> **Run workflow**
3. কাজ শেষ হলে **NijashwaStudio-apk** আর্টিফ্যাক্ট ডাউনলোড করো, জিপ খুলে APK ফোনে ইনস্টল করো

নিজের স্থায়ী সাইন করা APK চাইলে উপরের `ANDROID_KEYSTORE_*` secrets যোগ করো। `index.html`-এর ইনলাইন স্ক্রিপ্ট বদলালে `npm run csp:fix` চালাতে ভুলো না।
