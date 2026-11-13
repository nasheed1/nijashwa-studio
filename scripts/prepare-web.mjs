// Copies the third-party browser libraries from node_modules into www/vendor,
// so the app works fully offline inside the APK (index.html loads vendor/*.js).
import { mkdirSync, copyFileSync, existsSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www', 'vendor');
mkdirSync(out, { recursive: true });

// Version shown inside the app comes from package.json (single source of truth).
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
writeFileSync(join(root, 'www', 'version.js'), `window.APP_VERSION=${JSON.stringify(version)};\n`);
console.log(`www/version.js  (v${version})`);

const libs = [
  { to: 'mp4-muxer.js', from: ['mp4-muxer/build/mp4-muxer.js'] },
  { to: 'html2canvas.min.js', from: ['html2canvas/dist/html2canvas.min.js'] },
  { to: 'lame.min.js', from: ['lamejs/lame.min.js', 'lamejs/lame.all.js'] },
];

let failed = false;
for (const lib of libs) {
  const src = lib.from.map((p) => join(root, 'node_modules', p)).find(existsSync);
  if (!src) {
    console.error(`Missing ${lib.to}. Run "npm install" first.`);
    failed = true;
    continue;
  }
  copyFileSync(src, join(out, lib.to));
  console.log(`vendor/${lib.to}  (${Math.round(statSync(src).size / 1024)} KB)`);
}
if (failed) process.exit(1);
