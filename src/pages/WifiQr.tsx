import { FormEvent, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import QrStudio from '../components/QrStudio';
import { wifiPayload } from '../utils/qr';
import { useSeo } from '../utils/useSeo';

type Sec = 'WPA' | 'WEP' | 'nopass';

export default function WifiQr() {
  useSeo('Wi-Fi QR Code Generator – Free | QR Code Studio', 'Create a Wi-Fi QR code so guests can join your network with one scan. Processed locally in your browser.');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<Sec>('WPA');
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  const gen = (e: FormEvent) => {
    e.preventDefault();
    let m = '';
    if (!ssid.trim()) m = 'Enter the network name (SSID).';
    else if (ssid.length > 32) m = 'Network names are at most 32 characters.';
    else if (security === 'WPA' && (password.length < 8 || password.length > 63)) m = 'WPA/WPA2/WPA3 passwords must be 8–63 characters.';
    else if (security === 'WEP' && !password) m = 'Enter the WEP password.';
    setErr(m);
    setPayload(m ? null : wifiPayload({ ssid, password, security, hidden }));
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Wi-Fi QR Code Generator</h1>
      <p className="mb-4 mt-2 text-muted">Let people join your network by scanning a code instead of typing a password.</p>
      <p className="mb-6 flex gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
        <ShieldAlert size={18} className="mt-0.5 shrink-0" />
        Your Wi-Fi information is processed locally in your browser. Anyone who scans this QR code may be able to access the network details encoded in it. Share it only with people you trust.
      </p>
      <QrStudio payload={payload} baseName="wifi" form={
        <form onSubmit={gen} noValidate>
          <label className="label">Network name (SSID)
            <input className="input" value={ssid} maxLength={32} onChange={(e) => setSsid(e.target.value)} autoComplete="off" /></label>
          <label className="label mt-4">Security
            <select className="input" value={security} onChange={(e) => setSecurity(e.target.value as Sec)}>
              <option value="WPA">WPA / WPA2 / WPA3</option><option value="WEP">WEP</option><option value="nopass">None (open network)</option>
            </select></label>
          {security !== 'nopass' && (
            <label className="label mt-4">Password
              <input className="input" type={show ? 'text' : 'password'} value={password} maxLength={63} onChange={(e) => setPassword(e.target.value)} autoComplete="off" /></label>
          )}
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {security !== 'nopass' && <label className="flex items-center gap-2"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> Show password</label>}
            <label className="flex items-center gap-2"><input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> Hidden network</label>
          </div>
          {err && <p role="alert" className="err">{err}</p>}
          <button className="btn btn-primary mt-4" type="submit">Generate QR Code</button>
        </form>
      } />
    </>
  );
}
