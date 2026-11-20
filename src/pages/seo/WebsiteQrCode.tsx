import LandingTemplate from '../../components/LandingTemplate';
import WebsiteQrTool from '../../components/tools/WebsiteQrTool';
import { LANDING } from '../../seo/landingData';

export default function WebsiteQrCode() {
  return <LandingTemplate page={LANDING.website}><WebsiteQrTool /></LandingTemplate>;
}
