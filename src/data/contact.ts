export type ClinicLineId = 'dental' | 'dermatology';

export interface ClinicLine {
  id: ClinicLineId;
  /** Arabic department value used in booking forms. */
  departmentAr: 'أسنان' | 'جلدية';
  labelAr: string;
  labelEn: string;
  /** International digits only (no +), e.g. 96655… */
  number: string;
  /** Local Saudi display, e.g. 055 295 9863 */
  phoneDisplay: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Normalize a Saudi local (05…) or international (966…) value to 966… digits. */
function toInternationalSa(value: string): string {
  const digits = digitsOnly(value);
  if (digits.startsWith('966')) return digits;
  if (digits.startsWith('0')) return `966${digits.slice(1)}`;
  return digits;
}

/** Format 96655… as local Saudi display: 055 295 9863 */
function toLocalDisplay(intlDigits: string): string {
  const local = intlDigits.startsWith('966') ? `0${intlDigits.slice(3)}` : intlDigits;
  if (local.length !== 10) return local;
  return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

function envDigits(name: string): string {
  const env = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env;
  const raw = env?.[name];
  return typeof raw === 'string' ? toInternationalSa(raw) : '';
}

const dentalNumber = envDigits('PUBLIC_DENTAL_PHONE') || '966552959863';
const dermatologyNumber = envDigits('PUBLIC_DERMATOLOGY_PHONE') || '966559523784';

export const clinicLines: readonly ClinicLine[] = [
  {
    id: 'dental',
    departmentAr: 'أسنان',
    labelAr: 'عيادة الأسنان',
    labelEn: 'Dental clinic',
    number: dentalNumber,
    phoneDisplay: toLocalDisplay(dentalNumber),
  },
  {
    id: 'dermatology',
    departmentAr: 'جلدية',
    labelAr: 'عيادة الجلدية',
    labelEn: 'Dermatology clinic',
    number: dermatologyNumber,
    phoneDisplay: toLocalDisplay(dermatologyNumber),
  },
] as const;

export function getClinicLine(id: ClinicLineId): ClinicLine {
  const line = clinicLines.find((entry) => entry.id === id);
  if (!line) throw new Error(`Unknown clinic line: ${id}`);
  return line;
}

/** Map a booking department label to the matching clinic phone/WhatsApp line. */
export function clinicLineFromDepartment(department: string): ClinicLineId {
  const value = department.trim().toLowerCase();
  if (value === 'أسنان' || value === 'dentistry' || value === 'dental') return 'dental';
  // Aesthetic booking departments and dermatology share the dermatology line.
  return 'dermatology';
}

export const clinicContact = {
  phones: clinicLines,
  email: 'info@beautycorner.sa',
  hours: 'السبت – الخميس · 10:00 ص – 10:00 م',
  branch: 'حفر الباطن',
  district: 'حي المحمدية',
  street: 'طريق الملك فيصل',
  city: 'حفر الباطن',
  location: 'حفر الباطن، حي المحمدية، طريق الملك فيصل',
} as const;

export type ClinicSocialId = 'instagram' | 'tiktok' | 'snapchat';

export interface ClinicSocialLink {
  id: ClinicSocialId;
  href: string;
  labelAr: string;
  labelEn: string;
  icon: string;
}

/** Official Beauty Corner social profiles. */
export const clinicSocialLinks: readonly ClinicSocialLink[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/beauty_1_corner/',
    labelAr: 'إنستغرام بيوتي كورنر',
    labelEn: 'Beauty Corner on Instagram',
    icon: '/assets/instagram.svg',
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@beauty.corner.sa',
    labelAr: 'تيك توك بيوتي كورنر',
    labelEn: 'Beauty Corner on TikTok',
    icon: '/assets/tiktok.svg',
  },
  {
    id: 'snapchat',
    href: 'https://www.snapchat.com/@beauty.corner25',
    labelAr: 'سناب شات بيوتي كورنر',
    labelEn: 'Beauty Corner on Snapchat',
    icon: '/assets/snapchat.svg',
  },
] as const;

export function buildWhatsAppUrl(message?: string, line: ClinicLineId = 'dental'): string {
  const base = `https://wa.me/${getClinicLine(line).number}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(line: ClinicLineId = 'dental'): string {
  return `tel:+${getClinicLine(line).number}`;
}

export interface BookingWhatsAppFields {
  name: string;
  phone: string;
  department: string;
  service?: string;
  branch?: string;
  message?: string;
}

export function buildBookingWhatsAppMessage(fields: BookingWhatsAppFields): string {
  const lines = [
    'طلب حجز جديد من موقع بيوتي كورنر',
    '',
    `الاسم: ${fields.name}`,
    `الجوال: ${fields.phone}`,
    `القسم: ${fields.department}`,
  ];

  if (fields.service?.trim()) lines.push(`الخدمة: ${fields.service}`);
  lines.push(`الفرع: ${fields.branch?.trim() || clinicContact.branch}`);
  if (fields.message?.trim()) {
    lines.push('');
    lines.push(`ملاحظات: ${fields.message}`);
  }

  return lines.join('\n');
}

