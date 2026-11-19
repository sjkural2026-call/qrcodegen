import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Contact, Link2, Wifi, ShieldCheck, Zap, Gift } from 'lucide-react';
import { QrPreview } from '../components/QrStudio';
import { DEFAULT_STYLE, normalizeUrl } from '../utils/qr';
import { useSeo } from '../utils/useSeo';

const SAMPLE = { ...DEFAULT_STYLE, size: 240 };
const tools = [
  { to: '/url-to-qr', title: 'URL QR Code', desc: 'Turn any link into a scannable code.', Icon: Link2 },
  { to: '/wifi-qr', title: 'Wi-Fi QR Code', desc: 'Share your network without typing a password.', Icon: Wifi },
  { to: '/contact-qr', title: 'Contact QR Code', desc: 'Share a vCard that saves straight to a phone.', Icon: Contact },
];
const faqs = [
  ['Is QR Code Studio really free?', 'Yes. Creating and downloading QR codes is free and needs no account.'],
  ['Is my data uploaded?', 'No. QR codes are generated in your browser, so links, Wi-Fi passwords and contact details are not sent to our servers.'],
  ['Will my QR code expire?', 'No. These are static QR codes: the data is encoded directly in the image, so they work as long as the destination does.'],
];

export default function Home() {
  useSeo('QR Code Studio – Create Free QR Codes Instantly', 'Generate, customize and download QR codes for links, Wi-Fi and contacts. Simple, fast and completely free.');
  const nav = useNavigate();
  const [type, setType] = useState('url');
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');

  const go = (e: FormEvent) => {
    e.preventDefault();
    if (type !== 'url') return nav(type === 'wifi' ? '/wifi-qr' : '/contact-qr');
    const r = normalizeUrl(url);
    if (!r.ok) return setErr(r.error);
    nav('/url-to-qr?u=' + encodeURIComponent(r.url));
  };

  return (
    <>
      <section className="grid items-center gap-8 py-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Create Free QR Codes <span className="text-primary">Instantly</span></h1>
          <p className="mt-4 max-w-xl text-lg text-muted">Generate, customize and download QR codes for links, Wi-Fi, contacts and more. Simple, fast and completely free.</p>
          <form onSubmit={go} className="card mt-6" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select className="input mt-0 sm:w-40" value={type} onChange={(e) => setType(e.target.value)} aria-label="QR type">
                <option value="url">URL</option><option value="wifi">Wi-Fi</option><option value="contact">Contact</option>
              </select>
              {type === 'url' && <input className="input mt-0 flex-1" value={url} onChange={(e) => { setUrl(e.target.value); setErr(''); }} placeholder="Paste a link, e.g. example.com" aria-label="Website URL" />}
            </div>
            {err && <p role="alert" className="err">{err}</p>}
            <div className="mt-3 flex gap-2">
              <button className="btn btn-primary" type="submit">Generate QR Code</button>
              <button className="btn btn-ghost" type="button" onClick={() => { setUrl(''); setErr(''); }}>Clear</button>
            </div>
          </form>
        </div>
        <div className="card mx-auto text-center">
          <QrPreview text="QR Code Studio" style={SAMPLE} />
          <p className="mt-2 text-xs text-muted">Sample preview</p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="tools">
        <h2 id="tools" className="text-2xl font-bold">QR tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {tools.map(({ to, title, desc, Icon }) => (
            <Link key={to} to={to} className="card transition hover:-translate-y-0.5 hover:border-primary">
              <Icon className="text-primary" /><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm text-muted">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[[Zap, 'Instant', 'Codes appear as you generate them, with no waiting on a server.'],
          [ShieldCheck, 'Private', 'Generation happens locally in your browser.'],
          [Gift, 'Free', 'No sign-up, no watermark, PNG and SVG downloads.']].map(([I, t, d]) => {
          const Icon = I as typeof Zap;
          return <div key={t as string} className="card"><Icon className="text-accent" /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-muted">{d as string}</p></div>;
        })}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">How to create a QR code</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted">
          <li>Choose a QR type and enter your link, Wi-Fi details or contact information.</li>
          <li>Adjust colors, size, margin and error correction if you like.</li>
          <li>Download as PNG or SVG, or print it, then test-scan it with a phone.</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 space-y-2">
          {faqs.map(([q, a]) => (
            <details key={q} className="card"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2 text-sm text-muted">{a}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
