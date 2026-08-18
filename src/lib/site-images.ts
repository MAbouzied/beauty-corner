import type { ImageMetadata } from 'astro';
import doctorDentistry from '../assets/images/doctor-dentistry.png';
import doctorDermatology from '../assets/images/doctor-dermatology.png';
import doctorHala from '../assets/images/doctor-hala.jpg';
import doctorLaser from '../assets/images/doctor-laser.png';
import doctorWissam from '../assets/images/doctor-wissam.png';
import aquaPeelTera from '../assets/images/devices/aqua-peel-tera.jpg';
import beyondWhitening from '../assets/images/devices/beyond-whitening.jpg';
import candelaGentlemaxPro from '../assets/images/devices/candela-gentlemax-pro.jpg';
import curasQswitched from '../assets/images/devices/curas-qswitched.jpg';
import dentalExaminationUnit from '../assets/images/devices/dental-examination-unit.jpg';
import dentalUnitBlue from '../assets/images/devices/dental-unit-blue.jpg';
import dentalUnitLed from '../assets/images/devices/dental-unit-led.jpg';
import fractionalCo2Laser from '../assets/images/devices/fractional-co2-laser.jpg';
import lumenisSplendorX from '../assets/images/devices/lumenis-splendor-x.jpg';
import nueraTight from '../assets/images/devices/nuera-tight.jpg';
import preimeDermafacial from '../assets/images/devices/preime-dermafacial.jpg';
import woodpeckerPtb from '../assets/images/devices/woodpecker-ptb.png';
import landingClinicGallery from '../assets/images/landing-clinic-gallery.jpg';
import landingHero from '../assets/images/landing-hero.jpg';
import commercialRegistration from '../assets/images/licenses/commercial-registration.png';

/**
 * Canonical raster assets for the Astro image pipeline.
 * Exact duplicates share one imported file.
 */
export const siteImages = {
  landingHero,
  landingClinicGallery,
  /** Alias of dental-unit-blue (exact duplicate source). */
  landingWaitingArea: dentalUnitBlue,
  doctorDentistry,
  doctorDermatology,
  doctorHala,
  doctorLaser,
  doctorWissam,
  beyondWhitening,
  curasQswitched,
  nueraTight,
  candelaGentlemaxPro,
  lumenisSplendorX,
  preimeDermafacial,
  aquaPeelTera,
  fractionalCo2Laser,
  /** Alias of landing-hero (exact duplicate source). */
  dentalUnitIntegrated: landingHero,
  dentalUnitBlue,
  dentalUnitLed,
  woodpeckerPtb,
  dentalExaminationUnit,
  commercialRegistration,
} as const satisfies Record<string, ImageMetadata>;

export type SiteImageKey = keyof typeof siteImages;

const publicPathToKey: Record<string, SiteImageKey> = {
  '/assets/landing-hero.jpg': 'landingHero',
  '/assets/service-detail-dentistry.jpg': 'landingHero',
  '/assets/landing-clinic-gallery.jpg': 'landingClinicGallery',
  '/assets/landing-waiting-area.jpg': 'landingWaitingArea',
  '/assets/landing-blog-dental.jpg': 'dentalUnitLed',
  '/assets/landing-blog-laser.jpg': 'beyondWhitening',
  '/assets/landing-blog-skin.jpg': 'dentalExaminationUnit',
  '/assets/doctor-dentistry.png': 'doctorDentistry',
  '/assets/doctor-dermatology.png': 'doctorDermatology',
  '/assets/doctor-hala.jpg': 'doctorHala',
  '/assets/doctor-laser.png': 'doctorLaser',
  '/assets/doctor-wissam.png': 'doctorWissam',
  '/assets/devices/beyond-whitening.jpg': 'beyondWhitening',
  '/assets/devices/curas-qswitched.jpg': 'curasQswitched',
  '/assets/devices/nuera-tight.jpg': 'nueraTight',
  '/assets/devices/candela-gentlemax-pro.jpg': 'candelaGentlemaxPro',
  '/assets/devices/lumenis-splendor-x.jpg': 'lumenisSplendorX',
  '/assets/devices/preime-dermafacial.jpg': 'preimeDermafacial',
  '/assets/devices/aqua-peel-tera.jpg': 'aquaPeelTera',
  '/assets/devices/fractional-co2-laser.jpg': 'fractionalCo2Laser',
  '/assets/devices/dental-unit-integrated.jpg': 'dentalUnitIntegrated',
  '/assets/devices/dental-unit-blue.jpg': 'dentalUnitBlue',
  '/assets/devices/dental-unit-led.jpg': 'dentalUnitLed',
  '/assets/devices/woodpecker-ptb.png': 'woodpeckerPtb',
  '/assets/devices/dental-examination-unit.jpg': 'dentalExaminationUnit',
  '/assets/licenses/commercial-registration.png': 'commercialRegistration',
};

export function resolveSiteImage(path: string): ImageMetadata | null {
  const key = publicPathToKey[path];
  return key ? siteImages[key] : null;
}
