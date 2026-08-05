import { clinicContact } from './contact';
import { clinicServices } from './services';

export const organization = {
  name: 'بيوتي كورنر',
  alternateName: 'Beauty Corner',
  legalName: 'بيوتي كورنر',
  description:
    'عيادة لطب الأسنان والجلدية في حفر الباطن — حي المحمدية، طريق الملك فيصل.',
  email: clinicContact.email,
  telephone: `+${clinicContact.whatsappNumber}`,
  whatsappUrl: `https://wa.me/${clinicContact.whatsappNumber}`,
  logoPath: '/assets/logo.png',
  imagePath: '/assets/landing-hero.jpg',
  addressCountry: 'SA',
  addressRegion: 'المنطقة الشرقية',
  addressLocality: clinicContact.city,
  streetAddress: `${clinicContact.district}، ${clinicContact.street}`,
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
