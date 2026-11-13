// Loads every Holo-Board SVG diagram from the episode scripts in Chromium and
// writes a contact sheet per episode so diagrams can be eyeballed before rendering.
//   node check_diagrams.mjs [topic ...]      -> out/diagrams/<topic>.png
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
const { chromium } = createRequire(import.meta.url)('playwright');
const HERE = path.dirname(new URL(import.meta.url).pathname);
const topics = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(path.join(HERE, 'episodes')).filter(f => f.endsWith('.py')).map(f => f.slice(0, -3));
const py = `
import json, sys
ns = {}
exec(open(${JSON.stringify(path.join(HERE, 'common.py'))}).read(), ns)
exec(open(sys.argv[1]).read(), ns)
print(json.dumps([b['diagram'] for b in ns['B'] if b.get('type') == 'line' and b.get('diagram')]))
`;
fs.mkdirSync(path.join(HERE, 'out', 'diagrams'), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 400 } });
let bad = 0;
for (const t of topics) {
  const svgs = JSON.parse(execFileSync('python3', ['-c', py, path.join(HERE, 'episodes', t + '.py')]).toString());
  if (!svgs.length) { console.log(`${t}: no diagrams`); continue; }
  const html = `<body style="margin:0;background:#14281f;display:flex;flex-wrap:wrap;gap:8px;padding:8px;width:1084px">` +
    svgs.map((s, i) => `<div style="border:1px solid #a78bfa;position:relative"><img id="d${i}" width="520" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}"><span style="position:absolute;top:2px;left:4px;color:#fde047;font:12px sans-serif">#${i + 1}</span></div>`).join('') + `</body>`;
  await page.setContent(html);
  const res = await page.evaluate(async () => Promise.all([...document.images].map(im => im.decode().then(() => im.naturalWidth > 0).catch(() => false))));
  const failed = res.map((ok, i) => ok ? null : i + 1).filter(Boolean);
  bad += failed.length;
  await page.screenshot({ path: path.join(HERE, 'out', 'diagrams', `${t}.png`), fullPage: true });
  console.log(`${t}: ${svgs.length} diagrams${failed.length ? ' FAILED: ' + failed.join(',') : ' ok'}`);
}
await browser.close();
process.exit(bad ? 1 : 0);
