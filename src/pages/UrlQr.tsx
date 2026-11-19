import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QrStudio from '../components/QrStudio';
import { normalizeUrl } from '../utils/qr';
import { useSeo } from '../utils/useSeo';

export default function UrlQr() {
  useSeo('URL to QR Code Generator – Free | QR Code Studio', 'Turn any link into a free, customizable QR code. Download PNG or SVG, no sign-up needed.');
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get('u') || '');
  const [label, setLabel] = useState('');
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  const gen = (e?: FormEvent) => {
    e?.preventDefault();
    const r = normalizeUrl(url);
    if (!r.ok) { setErr(r.error); setPayload(null); return; }
    setErr(''); setPayload(r.url);
  };
  useEffect(() => { if (params.get('u')) gen(); /* eslint-disable-next-line */ }, []);

  const host = payload ? new URL(payload).hostname : 'url';
  return (
    <>
      <h1 className="text-3xl font-bold">URL to QR Code Generator</h1>
      <p className="mb-6 mt-2 text-muted">Paste a link, customize the design and download your QR code. Everything runs in your browser.</p>
      <QrStudio payload={payload} baseName={label || host} form={
        <form onSubmit={gen} noValidate>
          <label className="label">Website URL
            <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com or https://example.com" aria-invalid={!!err} /></label>
          <label className="label mt-4">Label (optional, used for the file name)
            <input className="input" value={label} maxLength={60} onChange={(e) => setLabel(e.target.value)} placeholder="My website" /></label>
          {err && <p role="alert" className="err">{err}</p>}
          <div className="mt-4 flex gap-2">
            <button className="btn btn-primary" type="submit">Generate QR Code</button>
            <button className="btn btn-ghost" type="button" onClick={() => { setUrl(''); setLabel(''); setPayload(null); setErr(''); }}>Clear</button>
          </div>
        </form>
      } />
    </>
  );
}
