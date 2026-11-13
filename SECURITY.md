# Security Policy

## Reporting a vulnerability

Please do **not** open a public issue for security problems. Use GitHub's private reporting: **Security -> Report a vulnerability** on this repository. Include steps to reproduce and the affected version.

## Scope notes

- Projects and settings are stored locally on the device (`localStorage` / IndexedDB). Treat shared devices accordingly.
- An optional Gemini API key is kept in Android Keystore-backed storage in the APK (browser: `localStorage`). Never share APKs or backups from a device where you entered a key you want to keep private.
- The CSP in `www/index.html` limits scripts to inline hashed scripts and `self`; the only allowed remote hosts are listed there. Changes that widen it need maintainer review.
- Release APKs must be signed with a keystore that is **never** committed to the repository.
