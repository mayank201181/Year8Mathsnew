// node render.mjs <outdir> [--stills t1,t2,...] [--workers 4]
import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)('playwright');
import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const out = path.resolve(process.argv[2]);
const args = process.argv.slice(3);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const tl = JSON.parse(fs.readFileSync(path.join(out, 'timeline.json'), 'utf8'));

const server = http.createServer((req, res) => {
  const p = path.join(HERE, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  const ext = path.extname(p);
  res.writeHead(200, { 'content-type': { '.html': 'text/html', '.woff2': 'font/woff2' }[ext] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;

async function page(browser) {
  const pg = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  pg.on('pageerror', e => console.error('PAGEERR', e.message));
  pg.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await pg.goto(`http://127.0.0.1:${port}/render.html`);
  await pg.evaluate(tl => window.init(tl), tl);
  return pg;
}

const browser = await chromium.launch({ args: ['--disable-gpu-vsync'] });
const poster = opt('--poster');
if (poster) {
  const pg = await page(browser);
  const d = await pg.evaluate(t => window.frameJpeg(t, 0.85), tl.poster_t || 8);
  fs.writeFileSync(poster, Buffer.from(d.split(',')[1], 'base64'));
  await browser.close(); server.close(); process.exit(0);
}
const stills = opt('--stills');
if (stills) {
  const pg = await page(browser);
  fs.mkdirSync(path.join(out, 'stills'), { recursive: true });
  for (const ts of stills.split(',')) {
    const d = await pg.evaluate(t => window.frameJpeg(+t, 0.85), ts);
    fs.writeFileSync(path.join(out, 'stills', `t${(+ts).toFixed(1).padStart(6, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64'));
  }
  await browser.close(); server.close(); process.exit(0);
}

const fps = tl.fps, N = Math.ceil(tl.duration * fps);
const workers = +opt('--workers', 4);
const per = Math.ceil(N / workers);
const t0 = Date.now();
await Promise.all([...Array(workers)].map(async (_, w) => {
  const a = w * per, b = Math.min(N, a + per);
  const pg = await page(browser);
  const seg = path.join(out, `part${w}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p', '-tune', 'animation', seg], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = a; i < b; i++) {
    const d = await pg.evaluate(t => window.frameJpeg(t, 0.92), i / fps);
    const buf = Buffer.from(d.slice(d.indexOf(',') + 1), 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (w === 0 && i % 240 === 0) console.log(`w0 ${i - a}/${b - a}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
}));
await browser.close(); server.close();
fs.writeFileSync(path.join(out, 'parts.txt'), [...Array(workers)].map((_, w) => `file 'part${w}.mp4'`).join('\n'));
console.log('frames done', ((Date.now() - t0) / 1000).toFixed(0), 's');
