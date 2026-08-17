import { departmentsEn } from '../lib/i18n/content-en.ts';
import { bookingDepartments } from './booking-departments.ts';

type Locale = 'ar' | 'en';

function departmentLabel(department: string, locale: Locale): string {
  if (locale !== 'en') return department;
  return departmentsEn[department as keyof typeof departmentsEn] ?? department;
}

export type FormLandingCopy = {
  pageTitle: string;
  pageDescription: string;
  homeHref: string;
  formHref: string;
  breadcrumbHome: string;
  breadcrumbContact: string;
  breadcrumbsAria: string;
  branchesEyebrow: string;
  branchesHeading: string;
  addressLabel: string;
  hoursLabel: string;
  phoneLabel: string;
  followUs: string;
  phone: string;
  name: string;
  service: string;
  message: string;
  phonePlaceholder: string;
  namePlaceholder: string;
  servicePlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  saving: string;
  redirecting: string;
  saveFailed: string;
  invalid: string;
  goFullSite: string;
  languageLabel: string;
  languageAria: string;
  brandHomeAria: string;
  actionsAria: string;
  whatsappAction: string;
  callAction: string;
  locationAction: string;
  offersAction: string;
  offersHref: string;
  departments: ReadonlyArray<{ value: string; label: string }>;
};

const copy = {
  ar: {
    pageTitle: 'تواصل معنا - بيوتي كورنر',
    pageDescription:
      'أرسل اسمك ورقم جوالك واختر القسم، ثم أكمل التواصل عبر واتساب. بيوتي كورنر في حفر الباطن.',
    homeHref: '/',
    formHref: '/form',
    breadcrumbHome: 'الرئيسية',
    breadcrumbContact: 'تواصل معنا',
    breadcrumbsAria: 'مسار التنقل',
    branchesEyebrow: 'موقعنا',
    branchesHeading: 'زُرنا في أقرب فرع',
    addressLabel: 'العنوان',
    hoursLabel: 'ساعات العمل',
    phoneLabel: 'الهاتف',
    followUs: 'تابعنا:',
    phone: 'رقم الجوال',
    name: 'الاسم الكامل',
    service: 'القسم المطلوب',
    message: 'رسالتك (اختياري)',
    phonePlaceholder: '05XXXXXXXX',
    namePlaceholder: 'اكتب اسمك',
    servicePlaceholder: 'اختر القسم',
    messagePlaceholder: 'اكتب تفاصيل طلبك هنا...',
    submit: 'إرسال عبر واتساب',
    saving: 'جاري حفظ بياناتك...',
    redirecting: 'جاري فتح واتساب...',
    saveFailed: 'تعذر حفظ السجل الإلكتروني. سيتم فتح واتساب لإرسال الطلب للعيادة.',
    invalid: 'يرجى التأكد من الاسم ورقم الجوال السعودي واختيار القسم.',
    goFullSite: 'الموقع الكامل',
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    brandHomeAria: 'بيوتي كورنر - الرئيسية',
    actionsAria: 'خيارات التواصل',
    whatsappAction: 'تواصل واتساب',
    callAction: 'اتصال',
    locationAction: 'الموقع',
    offersAction: 'العروض',
    offersHref: '/#services',
  },
  en: {
    pageTitle: 'Contact us - Beauty Corner',
    pageDescription:
      'Send your name, mobile number, and department, then continue on WhatsApp. Beauty Corner in Hafr Al-Batin.',
    homeHref: '/en',
    formHref: '/en/form',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact',
    breadcrumbsAria: 'Breadcrumb',
    branchesEyebrow: 'Visit us',
    branchesHeading: 'Visit our nearest branch',
    addressLabel: 'Address',
    hoursLabel: 'Working hours',
    phoneLabel: 'Phone',
    followUs: 'Follow us:',
    phone: 'Mobile number',
    name: 'Full name',
    service: 'Requested department',
    message: 'Your message (optional)',
    phonePlaceholder: '05XXXXXXXX',
    namePlaceholder: 'Enter your name',
    servicePlaceholder: 'Choose a department',
    messagePlaceholder: 'Write your request details here...',
    submit: 'Send via WhatsApp',
    saving: 'Saving your details...',
    redirecting: 'Opening WhatsApp...',
    saveFailed: 'We could not save the online record. WhatsApp will still open so the clinic receives the request.',
    invalid: 'Please check your name, Saudi mobile number, and department.',
    goFullSite: 'Full website',
    languageLabel: 'AR',
    languageAria: 'التبديل إلى العربية',
    brandHomeAria: 'Beauty Corner - Home',
    actionsAria: 'Contact options',
    whatsappAction: 'WhatsApp',
    callAction: 'Call',
    locationAction: 'Location',
    offersAction: 'Offers',
    offersHref: '/en#services',
  },
} as const;

export function getFormLandingCopy(locale: Locale): FormLandingCopy {
  return {
    ...copy[locale],
    departments: bookingDepartments.map((department) => ({
      value: department,
      label: departmentLabel(department, locale),
    })),
  };
}
