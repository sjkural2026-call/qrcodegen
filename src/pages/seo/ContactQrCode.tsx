import LandingTemplate from '../../components/LandingTemplate';
import ContactQrTool from '../../components/tools/ContactQrTool';
import { LANDING } from '../../seo/landingData';

export default function ContactQrCode() {
  return <LandingTemplate page={LANDING.contact}><ContactQrTool /></LandingTemplate>;
}
