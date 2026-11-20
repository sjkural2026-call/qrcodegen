import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UrlQr from './pages/UrlQr';
import WifiQr from './pages/WifiQr';
import ContactQr from './pages/ContactQr';

// SEO landing pages are code-split so they add nothing to the homepage bundle.
const WebsiteQrCode = lazy(() => import('./pages/seo/WebsiteQrCode'));
const WifiQrCode = lazy(() => import('./pages/seo/WifiQrCode'));
const ContactQrCode = lazy(() => import('./pages/seo/ContactQrCode'));
const EmailQrCode = lazy(() => import('./pages/seo/EmailQrCode'));

// The landing pages are long, so start at the top when navigating between pages via footer/related links.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<p role="status" className="py-24 text-center text-muted">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url-to-qr" element={<UrlQr />} />
            <Route path="/wifi-qr" element={<WifiQr />} />
            <Route path="/contact-qr" element={<ContactQr />} />
            <Route path="/website-qr-code" element={<WebsiteQrCode />} />
            <Route path="/wifi-qr-code" element={<WifiQrCode />} />
            <Route path="/contact-qr-code" element={<ContactQrCode />} />
            <Route path="/email-qr-code" element={<EmailQrCode />} />
            <Route path="*" element={<p className="py-24 text-center text-muted">Page not found.</p>} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
