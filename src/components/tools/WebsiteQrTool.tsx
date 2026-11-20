import { FormEvent, useState } from 'react';
import QrStudio from '../QrStudio';
import { normalizeUrl } from '../../utils/qr';

export default function WebsiteQrTool() {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  const gen = (e: FormEvent) => {
    e.preventDefault();
    const r = normalizeUrl(url);
    if (!r.ok) { setErr(r.error); setPayload(null); return; }
    setErr(''); setPayload(r.url);
  };

  let host = 'website';
  if (payload) { try { host = new URL(payload).hostname; } catch { /* keep default name */ } }

  return (
    <QrStudio payload={payload} baseName={label || host} form={
      <form onSubmit={gen} noValidate aria-label="Website QR code details">
        <label className="label">Website URL
          <input className="input" type="text" inputMode="url" autoCapitalize="none" spellCheck={false} value={url}
            onChange={(e) => setUrl(e.target.value)} placeholder="example.com or https://example.com"
            aria-invalid={!!err} aria-describedby={err ? 'website-qr-error' : undefined} /></label>
        <label className="label mt-4">Label (optional, used for the file name)
          <input className="input" value={label} maxLength={60} onChange={(e) => setLabel(e.target.value)} placeholder="My website" /></label>
        {err && <p id="website-qr-error" role="alert" className="err">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" type="submit">Generate QR Code</button>
          <button className="btn btn-ghost" type="button" onClick={() => { setUrl(''); setLabel(''); setPayload(null); setErr(''); }}>Clear</button>
        </div>
      </form>
    } />
  );
}
