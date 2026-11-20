import { FormEvent, useState } from 'react';
import QrStudio from '../QrStudio';
import { EMAIL_LIMITS, mailtoPayload, validateEmailFields } from '../../utils/mailto';

export default function EmailQrTool() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  const gen = (e: FormEvent) => {
    e.preventDefault();
    const f = { to, subject, body };
    const m = validateEmailFields(f);
    setErr(m);
    setPayload(m ? null : mailtoPayload(f));
  };

  return (
    <QrStudio payload={payload} baseName={to.trim() || 'email'} form={
      <form onSubmit={gen} noValidate aria-label="Email QR code details">
        <label className="label">Email address
          <input className="input" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} value={to} maxLength={EMAIL_LIMITS.to}
            onChange={(e) => setTo(e.target.value)} placeholder="name@example.com" autoComplete="off"
            aria-invalid={!!err} aria-describedby={err ? 'email-qr-error' : undefined} /></label>
        <label className="label mt-4">Subject (optional)
          <input className="input" value={subject} maxLength={EMAIL_LIMITS.subject} onChange={(e) => setSubject(e.target.value)} placeholder="Support request" /></label>
        <label className="label mt-4">Message (optional)
          <textarea className="input" rows={4} value={body} maxLength={EMAIL_LIMITS.body} onChange={(e) => setBody(e.target.value)} placeholder="Hello, I would like to…" /></label>
        <p className="mt-1 text-xs text-muted">Short subjects and messages keep the QR code simple and easy to scan.</p>
        {err && <p id="email-qr-error" role="alert" className="err">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" type="submit">Generate QR Code</button>
          <button className="btn btn-ghost" type="button" onClick={() => { setTo(''); setSubject(''); setBody(''); setPayload(null); setErr(''); }}>Clear</button>
        </div>
      </form>
    } />
  );
}
