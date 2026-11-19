import { FormEvent, useState } from 'react';
import QrStudio from '../components/QrStudio';
import { Contact, normalizeUrl, vcardPayload } from '../utils/qr';
import { useSeo } from '../utils/useSeo';

const empty: Contact = { first: '', last: '', phone: '', email: '', company: '', title: '', website: '', address: '' };
const fields: [keyof Contact, string, string][] = [
  ['first', 'First name', 'given-name'], ['last', 'Last name', 'family-name'], ['phone', 'Phone', 'tel'], ['email', 'Email', 'email'],
  ['company', 'Company', 'organization'], ['title', 'Job title', 'organization-title'], ['website', 'Website', 'url'], ['address', 'Address', 'street-address'],
];

export default function ContactQr() {
  useSeo('Contact (vCard) QR Code Generator – Free | QR Code Studio', 'Create a vCard QR code that saves your contact details to a phone with one scan. Processed in your browser.');
  const [c, setC] = useState<Contact>(empty);
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

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
    <>
      <h1 className="text-3xl font-bold">Contact QR Code Generator</h1>
      <p className="mb-6 mt-2 text-muted">Create a vCard QR code. All fields are optional except a name or company. Your details stay in your browser.</p>
      <QrStudio payload={payload} baseName={`${c.first} ${c.last}`.trim() || c.company || 'contact'} form={
        <form onSubmit={gen} noValidate>
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
    </>
  );
}
