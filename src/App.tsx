import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UrlQr from './pages/UrlQr';
import WifiQr from './pages/WifiQr';
import ContactQr from './pages/ContactQr';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/url-to-qr" element={<UrlQr />} />
          <Route path="/wifi-qr" element={<WifiQr />} />
          <Route path="/contact-qr" element={<ContactQr />} />
          <Route path="*" element={<p className="py-24 text-center text-muted">Page not found.</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
