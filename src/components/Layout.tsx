import { ReactNode, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, QrCode, Sun, X } from 'lucide-react';
import { LANDING_LIST } from '../seo/landingData';

const nav: [string, string][] = [['/', 'Home'], ['/url-to-qr', 'URL QR'], ['/wifi-qr', 'Wi-Fi QR'], ['/contact-qr', 'Contact QR']];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
    try { localStorage.setItem('theme', d ? 'dark' : 'light'); } catch { /* ignore */ }
  };
  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted hover:text-ink'}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold"><QrCode className="text-primary" /> QR Code Studio</Link>
          <nav aria-label="Main" className="hidden gap-1 md:flex">
            {nav.map(([to, t]) => <NavLink key={to} to={to} end className={link}>{t}</NavLink>)}
          </nav>
          <div className="flex gap-1">
            <button className="btn btn-ghost !px-2.5" onClick={toggle} aria-label="Toggle dark mode">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button className="btn btn-ghost !px-2.5 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X size={16} /> : <Menu size={16} />}</button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-line p-3 md:hidden" onClick={() => setOpen(false)}>
            {nav.map(([to, t]) => <NavLink key={to} to={to} end className={link}>{t}</NavLink>)}
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">
        <nav aria-label="QR code generators" className="mx-auto mb-3 flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-1 px-4">
          {LANDING_LIST.map((p) => <Link key={p.path} to={p.path} className="hover:text-ink hover:underline">{p.navLabel}</Link>)}
        </nav>
        © {new Date().getFullYear()} QR Code Studio · Create. Customize. Download. Free.
        <br />QR codes are generated in your browser; your data is not uploaded.
      </footer>
    </div>
  );
}
