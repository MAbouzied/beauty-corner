import { clinicContact } from './contact';
import { clinicServices } from './services';

export const organization = {
  name: 'بيوتي كورنر',
  alternateName: 'Beauty Corner',
  legalName: 'بيوتي كورنر',
  description:
    'عيادة متعددة التخصصات في المملكة العربية السعودية — طب وتجميل الأسنان، الجلدية والتجميل، وخدمات الليزر.',
  email: clinicContact.email,
  telephone: `+${clinicContact.whatsappNumber}`,
  whatsappUrl: `https://wa.me/${clinicContact.whatsappNumber}`,
  logoPath: '/assets/logo.svg',
  imagePath: '/assets/landing-hero.jpg',
  addressCountry: 'SA',
  addressRegion: 'المملكة العربية السعودية',
  addressLocality: clinicContact.location.includes('[')
    ? 'المملكة العربية السعودية'
    : clinicContact.location,
  streetAddress: clinicContact.location.includes('[') ? undefined : clinicContact.location,
  openingHours: {
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const,
    opens: '10:00',
    closes: '22:00',
  },
  medicalSpecialties: [
    'Dentistry',
    'Dermatology',
    'CosmeticSurgery',
  ] as const,
  serviceCatalog: clinicServices.map((service) => ({
    id: service.id,
    name: service.title,
    description: service.description,
  })),
} as const;
