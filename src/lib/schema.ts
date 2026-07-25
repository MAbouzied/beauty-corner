import type { Doctor } from '../data/doctors';
import type { FaqItem } from '../data/faq';
import { organization } from '../data/organization';
import type { ClinicService } from '../data/services';

type JsonLd = Record<string, unknown>;

const absoluteUrl = (site: URL, path = '/'): string => new URL(path, site).href;

export const organizationId = (site: URL): string => `${site.origin}/#organization`;
export const websiteId = (site: URL): string => `${site.origin}/#website`;

export function buildOrganizationSchema(site: URL): JsonLd {
  const address: JsonLd = {
    '@type': 'PostalAddress',
    addressCountry: organization.addressCountry,
    addressRegion: organization.addressRegion,
    addressLocality: organization.addressLocality,
  };

  if (organization.streetAddress) {
    address.streetAddress = organization.streetAddress;
  }

  return {
    '@type': 'MedicalClinic',
    '@id': organizationId(site),
    name: organization.name,
    alternateName: organization.alternateName,
    legalName: organization.legalName,
    description: organization.description,
    url: site.origin,
    logo: absoluteUrl(site, organization.logoPath),
    image: absoluteUrl(site, organization.imagePath),
    email: organization.email,
    telephone: organization.telephone,
    address,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...organization.openingHours.days],
        opens: organization.openingHours.opens,
        closes: organization.openingHours.closes,
      },
    ],
    medicalSpecialty: [...organization.medicalSpecialties],
    availableLanguage: ['ar'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: organization.telephone,
        email: organization.email,
        availableLanguage: ['ar'],
        url: organization.whatsappUrl,
      },
      {
        '@type': 'ContactPoint',
        contactType: 'reservations',
        telephone: organization.telephone,
        availableLanguage: ['ar'],
        url: absoluteUrl(site, '/contact'),
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات بيوتي كورنر',
      itemListElement: organization.serviceCatalog.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          url: absoluteUrl(site, `/services/${service.id}`),
        },
        position: index + 1,
      })),
    },
  };
}

export function buildWebsiteSchema(site: URL): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: site.origin,
    name: organization.name,
    alternateName: organization.alternateName,
    description: organization.description,
    inLanguage: 'ar',
    publisher: { '@id': organizationId(site) },
  };
}

export function buildWebPageSchema(options: {
  site: URL;
  path: string;
  name: string;
  description: string;
  type?: string;
}): JsonLd {
  const url = absoluteUrl(options.site, options.path);
  return {
    '@type': options.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    inLanguage: 'ar',
    isPartOf: { '@id': websiteId(options.site) },
    about: { '@id': organizationId(options.site) },
    provider: { '@id': organizationId(options.site) },
  };
}

export function buildBreadcrumbSchema(
  site: URL,
  items: readonly { name: string; path: string }[],
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}

export function buildFaqSchema(items: readonly FaqItem[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema(site: URL, service: ClinicService): JsonLd {
  const url = absoluteUrl(site, `/services/${service.id}`);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    image: absoluteUrl(site, service.heroImage),
    serviceType: service.category,
    category: service.doctorSpecialty,
    provider: { '@id': organizationId(site) },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl(site, '/contact'),
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: organization.telephone,
        contactType: 'reservations',
      },
    },
  };
}

export function buildPhysicianSchema(site: URL, doctor: Doctor): JsonLd {
  const url = absoluteUrl(site, `/doctors/${doctor.id}`);
  return {
    '@type': 'Physician',
    '@id': `${url}#physician`,
    name: doctor.name,
    description: doctor.summary,
    url,
    image: absoluteUrl(site, doctor.image),
    jobTitle: doctor.title,
    medicalSpecialty: doctor.specialty,
    worksFor: { '@id': organizationId(site) },
    hospitalAffiliation: { '@id': organizationId(site) },
    knowsAbout: [
      doctor.specialty,
      ...doctor.sections.flatMap((section) => section.listItems ?? []),
    ],
    availableService: doctor.services.map((serviceName) => ({
      '@type': 'MedicalProcedure',
      name: serviceName,
    })),
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'yearsOfExperience',
      value: doctor.experienceYears,
    },
  };
}

export function buildItemListSchema(options: {
  site: URL;
  path: string;
  name: string;
  description: string;
  items: readonly { name: string; path: string; description?: string; image?: string }[];
  itemType: string;
}): JsonLd {
  const url = absoluteUrl(options.site, options.path);
  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name: options.name,
    description: options.description,
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(options.site, item.path),
      item: {
        '@type': options.itemType,
        name: item.name,
        description: item.description,
        url: absoluteUrl(options.site, item.path),
        ...(item.image ? { image: absoluteUrl(options.site, item.image) } : {}),
      },
    })),
  };
}

export function buildGraph(site: URL, nodes: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationSchema(site), buildWebsiteSchema(site), ...nodes],
  };
}
