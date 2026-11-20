import { FormEvent, useState } from 'react';
import QrStudio from '../QrStudio';
import { Contact, normalizeUrl, vcardPayload } from '../../utils/qr';

const empty: Contact = { first: '', last: '', phone: '', email: '', company: '', title: '', website: '', address: '' };
const fields: [keyof Contact, string, string][] = [
  ['first', 'First name', 'given-name'], ['last', 'Last name', 'family-name'], ['phone', 'Phone', 'tel'], ['email', 'Email', 'email'],
  ['company', 'Company', 'organization'], ['title', 'Job title', 'organization-title'], ['website', 'Website', 'url'], ['address', 'Address', 'street-address'],
];

export default function ContactQrTool() {
  const [c, setC] = useState<Contact>(empty);
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  // Same validation rules as the existing /contact-qr page.
  const gen = (e: FormEvent) => {
    e.preventDefault();
    const v = Object.fromEntries(Object.entries(c).map(([k, x]) => [k, x.trim()])) as unknown as Contact;
    let m = '';
    if (!v.first && !v.last && !v.company) m = 'Enter at least a name or a company.';
    else if (v.phone && !/^[+()\d\s.-]{5,25}$/.test(v.phone)) m = 'Enter a valid phone number.';
    else if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) m = 'Enter a valid email address.';
    else if (v.website) {
      const r = normalizeUrl(v.website);
      if (!r.ok) m = r.error; else v.website = r.url;
    }
    setErr(m);
    setPayload(m ? null : vcardPayload(v));
  };

  return (
    <QrStudio payload={payload} baseName={`${c.first} ${c.last}`.trim() || c.company || 'contact'} form={
      <form onSubmit={gen} noValidate aria-label="Contact QR code details">
        <p className="mb-4 text-sm text-muted">A name or company is required. Every other field is optional.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([k, t, ac]) => (
            <label key={k} className={`label ${k === 'address' ? 'sm:col-span-2' : ''}`}>{t}
              <input className="input" value={c[k]} maxLength={200} autoComplete={ac} onChange={(e) => setC({ ...c, [k]: e.target.value })} /></label>
          ))}
        </div>
        {err && <p role="alert" className="err">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" type="submit">Generate QR Code</button>
          <button className="btn btn-ghost" type="button" onClick={() => { setC(empty); setPayload(null); setErr(''); }}>Clear</button>
        </div>
      </form>
    } />
  );
}
