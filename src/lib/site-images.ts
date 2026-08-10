import type { ImageMetadata } from 'astro';
import doctorDentistry from '../assets/images/doctor-dentistry.png';
import doctorDermatology from '../assets/images/doctor-dermatology.png';
import doctorLaser from '../assets/images/doctor-laser.png';
import doctorWissam from '../assets/images/doctor-wissam.png';
import beyondWhitening from '../assets/images/devices/beyond-whitening.jpg';
import dentalExaminationUnit from '../assets/images/devices/dental-examination-unit.jpg';
import dentalUnitBlue from '../assets/images/devices/dental-unit-blue.jpg';
import dentalUnitLed from '../assets/images/devices/dental-unit-led.jpg';
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
  doctorLaser,
  doctorWissam,
  beyondWhitening,
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
  '/assets/doctor-laser.png': 'doctorLaser',
  '/assets/doctor-wissam.png': 'doctorWissam',
  '/assets/devices/beyond-whitening.jpg': 'beyondWhitening',
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
