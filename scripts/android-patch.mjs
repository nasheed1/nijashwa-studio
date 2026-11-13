// Run once after "cap add android". Applies the small Android tweaks this app needs.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const manifestPath = join(root, 'android/app/src/main/AndroidManifest.xml');
const gradlePath = join(root, 'android/app/build.gradle');
if (!existsSync(manifestPath) || !existsSync(gradlePath)) {
  console.error('android/ not found. Run "cap add android" first.');
  process.exit(1);
}

// --- AndroidManifest.xml ---
let m = readFileSync(manifestPath, 'utf8');
const perms = ['android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS'];
const addPerms = perms
  .filter((p) => !m.includes(p))
  .map((p) => `    <uses-permission android:name="${p}" />\n`)
  .join('');
if (addPerms) m = m.replace('</manifest>', `${addPerms}</manifest>`);
if (!m.includes('android:largeHeap')) m = m.replace('<application', '<application\n        android:largeHeap="true"');
m = m.replace('android:allowBackup="true"', 'android:allowBackup="false"');
writeFileSync(manifestPath, m);

// --- app/build.gradle (version) ---
let g = readFileSync(gradlePath, 'utf8');
const code = parseInt(process.env.VERSION_CODE || '1', 10) || 1;
g = g.replace(/versionCode\s+\d+/, `versionCode ${code}`).replace(/versionName\s+"[^"]*"/, `versionName "${pkg.version}"`);
writeFileSync(gradlePath, g);

console.log(`Android patched: versionName ${pkg.version}, versionCode ${code}`);
