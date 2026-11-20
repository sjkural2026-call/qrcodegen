import LandingTemplate from '../../components/LandingTemplate';
import WifiQrTool from '../../components/tools/WifiQrTool';
import { LANDING } from '../../seo/landingData';

export default function WifiQrCode() {
  return <LandingTemplate page={LANDING.wifi}><WifiQrTool /></LandingTemplate>;
}
