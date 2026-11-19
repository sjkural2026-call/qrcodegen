import { ReactNode, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Download, ImagePlus, Printer, RotateCcw, X } from 'lucide-react';
import {
  DEFAULT_STYLE, QrStyle, EC, drawQr, toPngBlob, toSvgString, downloadBlob, printBlob,
  sanitizeFilename, readabilityWarnings,
} from '../utils/qr';

export function QrPreview({ text, style }: { text: string; style: QrStyle }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    let live = true;
    const t = setTimeout(() => {
      if (!ref.current) return;
      drawQr(ref.current, text, style).then(() => live && setErr('')).catch((e) => live && setErr(e.message));
    }, 120);
    return () => { live = false; clearTimeout(t); };
  }, [text, style]);
  return (
    <>
      {err && <p role="alert" className="err">{err}</p>}
      <canvas ref={ref} aria-label="QR code preview" className="mx-auto h-auto max-w-full rounded-lg" style={{ width: style.size }} />
    </>
  );
}

export default function QrStudio({ form, payload, baseName }: { form: ReactNode; payload: string | null; baseName: string }) {
  const [s, setS] = useState<QrStyle>(DEFAULT_STYLE);
  const [msg, setMsg] = useState('');
  const set = (p: Partial<QrStyle>) => setS((v) => ({ ...v, ...p }));
  const name = sanitizeFilename(baseName) + '-qr';
  const run = async (fn: () => Promise<void>) => {
    try { await fn(); setMsg(''); } catch (e) { setMsg((e as Error).message); }
  };
  const png = () => run(async () => downloadBlob(await toPngBlob(payload!, s), name + '.png'));
  const svg = () => run(async () => downloadBlob(new Blob([await toSvgString(payload!, s)], { type: 'image/svg+xml' }), name + '.svg'));
  const print = () => run(async () => printBlob(await toPngBlob(payload!, s)));
  const pickLogo = (f?: File) => {
    if (!f) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(f.type) || f.size > 1_000_000) { setMsg('Logo must be a PNG, JPG, WebP or GIF under 1 MB.'); return; }
    const r = new FileReader();
    r.onload = () => set({ logo: String(r.result) });
    r.readAsDataURL(f);
  };
  const warns = payload ? readabilityWarnings(s) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <div className="card">{form}</div>
        <fieldset className="card">
          <legend className="px-1 text-sm font-semibold">Customize</legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <label className="label">Foreground color
              <input type="color" className="input h-10 p-1" value={s.fg} onChange={(e) => set({ fg: e.target.value })} /></label>
            <label className="label">Background color
              <input type="color" className="input h-10 p-1" value={s.bg} onChange={(e) => set({ bg: e.target.value })} /></label>
            <label className="label">Size: {s.size}px
              <input type="range" min={160} max={1024} step={32} className="mt-3 w-full" value={s.size} onChange={(e) => set({ size: +e.target.value })} /></label>
            <label className="label">Margin: {s.margin} modules
              <input type="range" min={0} max={8} className="mt-3 w-full" value={s.margin} onChange={(e) => set({ margin: +e.target.value })} /></label>
            <label className="label">Error correction
              <select className="input" value={s.ec} onChange={(e) => set({ ec: e.target.value as EC })}>
                <option value="L">Low (7%)</option><option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option><option value="H">High (30%)</option>
              </select></label>
            <div>
              <span className="label">Center logo (optional)</span>
              <div className="mt-1 flex gap-2">
                <label className="btn btn-ghost cursor-pointer"><ImagePlus size={16} /> Upload
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={(e) => pickLogo(e.target.files?.[0])} /></label>
                {s.logo && <button type="button" className="btn btn-ghost" onClick={() => set({ logo: null })}><X size={16} /> Remove</button>}
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-ghost mt-4" onClick={() => { setS(DEFAULT_STYLE); setMsg(''); }}><RotateCcw size={16} /> Reset</button>
        </fieldset>
      </div>

      <div className="card h-fit lg:sticky lg:top-20" aria-live="polite">
        {payload ? (
          <>
            <QrPreview text={payload} style={s} />
            <p className="mt-3 text-center text-xs text-muted">{s.size} × {s.size} px · PNG &amp; SVG</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button className="btn btn-primary" onClick={png}><Download size={16} /> PNG</button>
              <button className="btn btn-ghost" onClick={svg}><Download size={16} /> SVG</button>
              <button className="btn btn-ghost" onClick={print}><Printer size={16} /> Print</button>
            </div>
            {warns.map((w) => (
              <p key={w} className="mt-3 flex gap-2 text-sm text-amber-700 dark:text-amber-400"><AlertTriangle size={16} className="mt-0.5 shrink-0" />{w}</p>
            ))}
            <p className="mt-3 text-xs text-muted">Always test-scan with a phone before printing or sharing. Scanning cannot be guaranteed for every custom design.</p>
          </>
        ) : (
          <p className="py-16 text-center text-sm text-muted">Your QR code will appear here.</p>
        )}
        {msg && <p role="alert" className="err">{msg}</p>}
      </div>
    </div>
  );
}
