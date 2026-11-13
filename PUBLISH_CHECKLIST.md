# Publish checklist (maintainer only - delete this file when done)

Do these before the first public push. Once something is pushed to a public repo it stays in git history.

1. **Sound effects licensing (important).** `www/index.html` embeds ~17 MP3 sound effects. Their metadata (Logic Pro / iZotope / Premiere, one set with sample-library style originator IDs) suggests some may come from a commercial sound library, whose license usually allows use *in your videos* but not *redistributing the raw sounds* in a public repo. Confirm you own them or they are CC0 / properly licensed. If not sure, remove or replace them before publishing, then run `npm run csp:fix`. Then fill in the "Built-in sound effects" section of `THIRD_PARTY_NOTICES.md`.
2. **Sample photos.** The two transition-preview photos (real people) were replaced with neutral generated images. Keep it that way unless you and everyone shown agree to publish their faces permanently. If you swap images, run `npm run csp:fix`.
3. **Copyright holder.** Edit the name in `LICENSE`. Change `appId` in `capacitor.config.json` if you want your own package name.
4. **Lock file.** After the first local `npm install`, commit `package-lock.json`, then change `npm install` to `npm ci` in `.github/workflows/build-apk.yml` for reproducible builds.
5. **"License key" on the Profile page.** It only stores text locally and has no verification. With an MIT license it cannot gate features; either keep it as a harmless placeholder or remove it.
6. **GitHub settings.** Enable secret scanning and push protection, add branch protection on `main`, and add the `ANDROID_KEYSTORE_*` secrets only if you want signed release APKs. Never commit a keystore.
7. **First run.** Run the workflow once from the Actions tab and test the APK on a real phone (export, microphone, sharing the exported file).
