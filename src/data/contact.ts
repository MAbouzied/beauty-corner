/** Clinic WhatsApp number in international format, digits only (no +). */
const envWhatsapp = typeof import.meta.env.PUBLIC_WHATSAPP_NUMBER === 'string'
  ? import.meta.env.PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, '')
  : '';

export const clinicContact = {
  /** Replace via PUBLIC_WHATSAPP_NUMBER or update this fallback when the clinic number is confirmed. */
  whatsappNumber: envWhatsapp || '201007995921',
  phoneDisplay: '+20 100 799 5921',
  email: 'info@beautycorner.sa',
  hours: 'السبت – الخميس · 10:00 ص – 10:00 م',
  location: '[المدينة، المملكة العربية السعودية]',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${clinicContact.whatsappNumber}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export interface BookingWhatsAppFields {
  name: string;
  phone: string;
  specialty: string;
  service?: string;
  branch: string;
  date: string;
  time?: string;
  message?: string;
}

export function buildBookingWhatsAppMessage(fields: BookingWhatsAppFields): string {
  const lines = [
    'طلب حجز جديد من موقع بيوتي كورنر',
    '',
    `الاسم: ${fields.name}`,
    `الجوال: ${fields.phone}`,
    `التخصص: ${fields.specialty}`,
  ];

  if (fields.service?.trim()) lines.push(`الخدمة: ${fields.service}`);
  lines.push(`الفرع: ${fields.branch}`);
  lines.push(`التاريخ المفضل: ${fields.date}`);
  if (fields.time?.trim()) lines.push(`الوقت المفضل: ${fields.time}`);
  if (fields.message?.trim()) {
    lines.push('');
    lines.push(`ملاحظات: ${fields.message}`);
  }

  return lines.join('\n');
}
