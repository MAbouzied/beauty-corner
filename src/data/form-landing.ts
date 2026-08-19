import { departmentsEn, servicesEn } from '../lib/i18n/content-en.ts';
import { bookingDepartments } from './booking-departments.ts';
import { clinicServices } from './services.ts';

type Locale = 'ar' | 'en';

const formDepartmentOrder = ['أسنان', 'جلدية'] as const;

export type FormServiceOption = {
  value: string;
  label: string;
};

export type FormServiceGroup = {
  department: (typeof formDepartmentOrder)[number];
  label: string;
  services: ReadonlyArray<FormServiceOption>;
};

export const formServiceValues = clinicServices.map((service) => service.title);

export const acceptedLeadDepartments = [...bookingDepartments, ...formServiceValues];

export function getFormServiceGroups(locale: Locale): ReadonlyArray<FormServiceGroup> {
  return formDepartmentOrder.map((department) => ({
    department,
    label: locale === 'en' ? departmentsEn[department] : department,
    services: clinicServices
      .filter((service) => service.department === department)
      .map((service) => ({
        value: service.title,
        label: locale === 'en' ? (servicesEn[service.id]?.title ?? service.title) : service.title,
      })),
  }));
}

export type FormLandingCopy = {
  pageTitle: string;
  pageDescription: string;
  homeHref: string;
  formHref: string;
  branchesEyebrow: string;
  branchesHeading: string;
  addressLabel: string;
  hoursLabel: string;
  phoneLabel: string;
  followUs: string;
  phone: string;
  name: string;
  service: string;
  phonePlaceholder: string;
  namePlaceholder: string;
  servicePlaceholder: string;
  submit: string;
  saving: string;
  redirecting: string;
  saveFailed: string;
  invalid: string;
  languageLabel: string;
  languageAria: string;
  brandAria: string;
  actionsAria: string;
  whatsappAction: string;
  callAction: string;
  locationAction: string;
  departments: ReadonlyArray<FormServiceOption>;
  serviceGroups: ReadonlyArray<FormServiceGroup>;
};

const copy = {
  ar: {
    pageTitle: 'تواصل معنا - بيوتي كورنر',
    pageDescription:
      'أرسل اسمك ورقم جوالك واختر الخدمة، ثم أكمل الطلب. بيوتي كورنر في حفر الباطن.',
    homeHref: '/',
    formHref: '/form',
    branchesEyebrow: 'موقعنا',
    branchesHeading: 'زُرنا في أقرب فرع',
    addressLabel: 'العنوان',
    hoursLabel: 'ساعات العمل',
    phoneLabel: 'الهاتف',
    followUs: 'تابعنا:',
    phone: 'رقم الجوال',
    name: 'الاسم الكامل',
    service: 'الخدمة المطلوبة',
    phonePlaceholder: '05XXXXXXXX',
    namePlaceholder: 'اكتب اسمك',
    servicePlaceholder: 'اختر الخدمة',
    submit: 'أرسل الآن',
    saving: 'جاري حفظ بياناتك...',
    redirecting: 'جاري إرسال طلبك...',
    saveFailed: 'تعذر حفظ السجل الإلكتروني. سيتم إرسال الطلب للعيادة الآن.',
    invalid: 'يرجى التأكد من الاسم ورقم الجوال السعودي واختيار الخدمة.',
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    brandAria: 'بيوتي كورنر',
    actionsAria: 'خيارات التواصل',
    whatsappAction: 'تواصل واتساب',
    callAction: 'اتصال',
    locationAction: 'الموقع',
  },
  en: {
    pageTitle: 'Contact us - Beauty Corner',
    pageDescription:
      'Send your name, mobile number, and requested service. Beauty Corner in Hafr Al-Batin.',
    homeHref: '/en',
    formHref: '/en/form',
    branchesEyebrow: 'Visit us',
    branchesHeading: 'Visit our nearest branch',
    addressLabel: 'Address',
    hoursLabel: 'Working hours',
    phoneLabel: 'Phone',
    followUs: 'Follow us:',
    phone: 'Mobile number',
    name: 'Full name',
    service: 'Requested service',
    phonePlaceholder: '05XXXXXXXX',
    namePlaceholder: 'Enter your name',
    servicePlaceholder: 'Choose a service',
    submit: 'Send now',
    saving: 'Saving your details...',
    redirecting: 'Sending your request...',
    saveFailed: 'We could not save the online record. Your request will still be sent to the clinic.',
    invalid: 'Please check your name, Saudi mobile number, and service.',
    languageLabel: 'AR',
    languageAria: 'التبديل إلى العربية',
    brandAria: 'Beauty Corner',
    actionsAria: 'Contact options',
    whatsappAction: 'WhatsApp',
    callAction: 'Call',
    locationAction: 'Location',
  },
} as const;

export function getFormLandingCopy(locale: Locale): FormLandingCopy {
  const serviceGroups = getFormServiceGroups(locale);
  return {
    ...copy[locale],
    serviceGroups,
    departments: serviceGroups.flatMap((group) => [...group.services]),
  };
}
