# Contributing

Thanks for helping! The app is intentionally a **single file**: `www/index.html`.

## Setup

```bash
npm install
npm run prepare:web
npm run serve        # open http://localhost:8080
```

## The one rule: CSP hashes

`index.html` ships a strict Content-Security-Policy. Every inline `<script>` must have its SHA-256 hash listed in the `Content-Security-Policy` meta tag, otherwise the browser silently refuses to run it. If you edit any inline script:

```bash
npm run csp:fix      # adds the new hash(es)
npm run csp:check    # CI runs this and fails the build if a script is not allowed
```

Old hashes of scripts that no longer exist are harmless; remove them only if you are sure no script is created at runtime with that exact text.

Do not add remote scripts, `eval`-style loaders or new network hosts without discussing it in an issue: they widen the CSP.

## Pull requests

- Keep changes focused; describe what you tested (browser and/or Android version).
- Do not commit keystores, API keys, `android/`, `www/vendor/` or APK files (they are git-ignored).
- Do not add audio, images, fonts or code you do not have the right to redistribute under the MIT license; state the source and license of any new asset in `THIRD_PARTY_NOTICES.md`.
- Do not add photos of real people.

## Reporting bugs

Open an issue with: device and Android/WebView or browser version, steps to reproduce, and (if possible) a screenshot. Security problems: see [SECURITY.md](SECURITY.md).
