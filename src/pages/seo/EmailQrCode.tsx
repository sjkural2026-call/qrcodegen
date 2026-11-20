import LandingTemplate from '../../components/LandingTemplate';
import EmailQrTool from '../../components/tools/EmailQrTool';
import { LANDING } from '../../seo/landingData';

export default function EmailQrCode() {
  return <LandingTemplate page={LANDING.email}><EmailQrTool /></LandingTemplate>;
}
