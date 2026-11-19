import QRCode from 'qrcode';

export type EC = 'L' | 'M' | 'Q' | 'H';
export interface QrStyle { fg: string; bg: string; size: number; ec: EC; margin: number; logo: string | null }
export const DEFAULT_STYLE: QrStyle = { fg: '#0F172A', bg: '#FFFFFF', size: 320, ec: 'M', margin: 2, logo: null };

const hex = (c: string) => (/^#[0-9a-f]{6}$/i.test(c) ? c : '#000000');
const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error('Could not load the logo image.'));
    i.src = src;
  });

export async function drawQr(canvas: HTMLCanvasElement, text: string, s: QrStyle) {
  try {
    await QRCode.toCanvas(canvas, text, {
      width: s.size, margin: s.margin, errorCorrectionLevel: s.logo ? 'H' : s.ec,
      color: { dark: hex(s.fg), light: hex(s.bg) },
    });
  } catch {
    throw new Error('This content is too long to fit in a QR code. Shorten it or lower the error correction level.');
  }
  if (s.logo) {
    const img = await loadImage(s.logo);
    const ctx = canvas.getContext('2d')!;
    const box = Math.round(canvas.width * 0.22);
    const x = (canvas.width - box) / 2;
    ctx.fillStyle = hex(s.bg);
    ctx.fillRect(x - 4, x - 4, box + 8, box + 8);
    const r = Math.min(box / img.width, box / img.height);
    ctx.drawImage(img, (canvas.width - img.width * r) / 2, (canvas.height - img.height * r) / 2, img.width * r, img.height * r);
  }
}

export async function toPngBlob(text: string, s: QrStyle): Promise<Blob> {
  const c = document.createElement('canvas');
  await drawQr(c, text, s);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('PNG export failed.'))), 'image/png'));
}

export async function toSvgString(text: string, s: QrStyle): Promise<string> {
  let svg = await QRCode.toString(text, {
    type: 'svg', width: s.size, margin: s.margin, errorCorrectionLevel: s.logo ? 'H' : s.ec,
    color: { dark: hex(s.fg), light: hex(s.bg) },
  });
  const m = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
  if (s.logo && m) {
    const n = +m[1], box = n * 0.22, x = (n - box) / 2;
    svg = svg.replace('</svg>', `<rect x="${x - 0.5}" y="${x - 0.5}" width="${box + 1}" height="${box + 1}" fill="${hex(s.bg)}"/><image href="${s.logo}" x="${x}" y="${x}" width="${box}" height="${box}" preserveAspectRatio="xMidYMid meet"/></svg>`);
  }
  return svg;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function printBlob(blob: Blob) {
  const w = window.open('', '_blank');
  if (!w) throw new Error('Pop-up blocked. Allow pop-ups to print.');
  const url = URL.createObjectURL(blob);
  w.document.write('<!doctype html><title>Print QR code</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;height:100vh}img{max-width:90%}</style><body></body>');
  const img = w.document.createElement('img');
  img.onload = () => { w.focus(); w.print(); };
  img.src = url;
  w.document.body.appendChild(img);
  w.document.close();
}

export function sanitizeFilename(name: string, fallback = 'qr') {
  const s = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  return s || fallback;
}

export function normalizeUrl(input: string): { ok: true; url: string } | { ok: false; error: string } {
  const raw = input.trim();
  if (!raw) return { ok: false, error: 'Please enter a website address.' };
  if (raw.length > 2000) return { ok: false, error: 'That address is too long (2000 characters max).' };
  if (/\s/.test(raw)) return { ok: false, error: 'Web addresses cannot contain spaces.' };
  const bad = { ok: false as const, error: 'Only http and https web addresses are supported.' };
  let candidate = raw;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    if (/^(javascript|data|vbscript|file|blob|mailto|tel):/i.test(raw)) return bad;
    candidate = 'https://' + raw;
  }
  try {
    const u = new URL(candidate);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return bad;
    if (!u.hostname.includes('.') && u.hostname !== 'localhost') return { ok: false, error: 'Enter a valid domain, e.g. example.com.' };
    return { ok: true, url: u.href };
  } catch {
    return { ok: false, error: 'That does not look like a valid web address.' };
  }
}

const wEsc = (s: string) => s.replace(/([\\;,:"])/g, '\\$1');
export function wifiPayload(o: { ssid: string; password: string; security: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }) {
  const pw = o.security !== 'nopass' && o.password ? `P:${wEsc(o.password)};` : '';
  return `WIFI:T:${o.security};S:${wEsc(o.ssid)};${pw}${o.hidden ? 'H:true;' : ''};`;
}

const vEsc = (s: string) =>
  s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
export interface Contact { first: string; last: string; phone: string; email: string; company: string; title: string; website: string; address: string }
export function vcardPayload(c: Contact) {
  const L = ['BEGIN:VCARD', 'VERSION:3.0', `N:${vEsc(c.last)};${vEsc(c.first)};;;`, `FN:${vEsc((c.first + ' ' + c.last).trim() || c.company)}`];
  if (c.company) L.push(`ORG:${vEsc(c.company)}`);
  if (c.title) L.push(`TITLE:${vEsc(c.title)}`);
  if (c.phone) L.push(`TEL;TYPE=CELL:${vEsc(c.phone)}`);
  if (c.email) L.push(`EMAIL:${vEsc(c.email)}`);
  if (c.website) L.push(`URL:${vEsc(c.website)}`);
  if (c.address) L.push(`ADR;TYPE=WORK:;;${vEsc(c.address)};;;;`);
  L.push('END:VCARD');
  return L.join('\r\n');
}

const lum = (h: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export function readabilityWarnings(s: QrStyle): string[] {
  const a = lum(hex(s.fg)), b = lum(hex(s.bg)), w: string[] = [];
  if (a > b) w.push('Light-on-dark codes are not read by some scanners. Use a darker foreground than background.');
  if ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) < 4) w.push('Low contrast between the colors may make the code hard to scan.');
  if (s.margin < 2) w.push('A margin under 2 modules can stop scanners from detecting the code.');
  if (s.logo) w.push('The logo covers part of the code. Error correction is forced to High; test before printing.');
  return w;
}
