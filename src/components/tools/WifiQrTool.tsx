import { FormEvent, useState } from 'react';
import QrStudio from '../QrStudio';
import { wifiPayload } from '../../utils/qr';

type Sec = 'WPA' | 'WEP' | 'nopass';

export default function WifiQrTool() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<Sec>('WPA');
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState<string | null>(null);
  const [err, setErr] = useState('');

  // Same validation rules as the existing /wifi-qr page.
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
    <QrStudio payload={payload} baseName="wifi" form={
      <form onSubmit={gen} noValidate aria-label="WiFi QR code details">
        <label className="label">Network name (SSID)
          <input className="input" value={ssid} maxLength={32} onChange={(e) => setSsid(e.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} /></label>
        <label className="label mt-4">Security
          <select className="input" value={security} onChange={(e) => setSecurity(e.target.value as Sec)}>
            <option value="WPA">WPA / WPA2 / WPA3</option><option value="WEP">WEP</option><option value="nopass">None (open network)</option>
          </select></label>
        {security !== 'nopass' && (
          <label className="label mt-4">Password
            <input className="input" type={show ? 'text' : 'password'} value={password} maxLength={63} onChange={(e) => setPassword(e.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} /></label>
        )}
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          {security !== 'nopass' && <label className="flex items-center gap-2"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> Show password</label>}
          <label className="flex items-center gap-2"><input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> Hidden network</label>
        </div>
        {err && <p role="alert" className="err">{err}</p>}
        <button className="btn btn-primary mt-4" type="submit">Generate QR Code</button>
      </form>
    } />
  );
}
