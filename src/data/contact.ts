/** Clinic WhatsApp number in international format, digits only (no +). */
const envWhatsapp = typeof import.meta.env.PUBLIC_WHATSAPP_NUMBER === 'string'
  ? import.meta.env.PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, '')
  : '';

export const clinicContact = {
  /** Replace via PUBLIC_WHATSAPP_NUMBER or update this fallback when the clinic number is confirmed. */
  whatsappNumber: envWhatsapp || '966537633558',
  phoneDisplay: '+966 53 763 3558',
  email: 'info@beautycorner.sa',
  hours: 'السبت – الخميس · 10:00 ص – 10:00 م',
  branch: 'حفر الباطن',
  district: 'حي المحمدية',
  street: 'طريق الملك فيصل',
  city: 'حفر الباطن',
  location: 'حفر الباطن، حي المحمدية، طريق الملك فيصل',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${clinicContact.whatsappNumber}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(): string {
  return `tel:+${clinicContact.whatsappNumber}`;
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

export interface LeadWhatsAppFields {
  name: string;
  phone: string;
  service: string;
}

export function buildLeadWhatsAppMessage(fields: LeadWhatsAppFields): string {
  return [
    'طلب جديد من صفحة الحجز السريع — بيوتي كورنر',
    '',
    `الاسم: ${fields.name}`,
    `الجوال: ${fields.phone}`,
    `الخدمة: ${fields.service}`,
    `الفرع: ${clinicContact.branch}`,
  ].join('\n');
}
