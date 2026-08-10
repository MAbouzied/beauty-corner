import { clinicFacts } from './clinic-facts.ts';
import { clinicContact, clinicLines } from './contact.ts';
import { clinicServices } from './services.ts';

export const organization = {
  name: clinicFacts.nameAr,
  alternateName: clinicFacts.nameEn,
  legalName: clinicFacts.nameAr,
  description:
    'عيادة لطب الأسنان والجلدية في حفر الباطن — حي المحمدية، طريق الملك فيصل.',
  email: clinicContact.email,
  /** Both clinic lines for Schema.org `telephone` (Text or array of Text). */
  telephone: clinicLines.map((line) => `+${line.number}`),
  contactLines: clinicLines.map((line) => ({
    id: line.id,
    telephone: `+${line.number}`,
    whatsappUrl: `https://wa.me/${line.number}`,
    labelAr: line.labelAr,
    labelEn: line.labelEn,
    departmentAr: line.departmentAr,
  })),
  logoPath: '/assets/logo.png',
  imagePath: '/assets/landing-hero.jpg',
  addressCountry: 'SA',
  addressRegion: clinicFacts.regionAr,
  addressLocality: clinicContact.city,
  streetAddress: `${clinicContact.district}، ${clinicContact.street}`,
  openingHours: {
    days: clinicFacts.openDays,
    opens: clinicFacts.opens,
    closes: clinicFacts.closes,
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
