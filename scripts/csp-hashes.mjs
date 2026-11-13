// index.html uses a strict Content-Security-Policy: every inline <script> must have its
// SHA-256 hash listed in the CSP <meta> tag. If you edit an inline script, its hash changes
// and the browser will silently refuse to run it.
//
//   node scripts/csp-hashes.mjs --check   -> exit 1 if any inline script is not allowed
//   node scripts/csp-hashes.mjs --write   -> add the missing hashes to the CSP
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'www', 'index.html');
const write = process.argv.includes('--write');
let html = readFileSync(file, 'utf8');

const metaRe = /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/;
const meta = html.match(metaRe);
if (!meta) {
  console.error('No Content-Security-Policy meta tag found in www/index.html');
  process.exit(1);
}
let csp = meta[2];
const allowed = new Set([...csp.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]));

const missing = [];
let total = 0;
for (const m of html.matchAll(/<script(?<attrs>[^>]*)>(?<body>[\s\S]*?)<\/script>/g)) {
  const { attrs, body } = m.groups;
  if (/\ssrc\s*=/.test(attrs)) continue;
  const type = (attrs.match(/\stype\s*=\s*["']?([^"'\s>]+)/) || [])[1];
  if (type && !/^(module|text\/javascript|application\/javascript)$/i.test(type)) continue;
  total++;
  const hash = createHash('sha256').update(body, 'utf8').digest('base64');
  if (!allowed.has(hash)) missing.push({ hash, id: (attrs.match(/id="([^"]+)"/) || [])[1] || '(no id)' });
}

console.log(`${total} inline scripts, ${missing.length} not allowed by the CSP`);
if (!missing.length) process.exit(0);

if (!write) {
  for (const x of missing) console.log(`  missing: ${x.id}  sha256-${x.hash}`);
  console.error('Run "npm run csp:fix" to add them.');
  process.exit(1);
}
const add = [...new Set(missing.map((x) => `'sha256-${x.hash}'`))].join(' ');
csp = csp.replace(/script-src 'self' /, (s) => `${s}${add} `);
html = html.replace(metaRe, (_, a, __, c) => a + csp + c);
writeFileSync(file, html);
console.log(`Added ${missing.length} hash(es) to the CSP.`);
