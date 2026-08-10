/** Canonical clinic facts used across UI copy and JSON-LD. Do not invent extras. */

export const CLINIC_TIMEZONE = 'Asia/Riyadh';

export const clinicFacts = {
  nameAr: 'بيوتي كورنر',
  nameEn: 'Beauty Corner',
  cityAr: 'حفر الباطن',
  cityEn: 'Hafr Al-Batin',
  districtAr: 'حي المحمدية',
  districtEn: 'Al Muhammadiyah',
  streetAr: 'طريق الملك فيصل',
  streetEn: 'King Faisal Road',
  regionAr: 'المنطقة الشرقية',
  regionEn: 'Eastern Province',
  email: 'info@beautycorner.sa',
  /** 24h clock used by Schema.org OpeningHoursSpecification. */
  opens: '10:00',
  closes: '22:00',
  openDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const,
  closedDays: ['Friday'] as const,
} as const;

export type ClinicLocale = 'ar' | 'en';

export function formatClinicLocation(locale: ClinicLocale = 'ar'): string {
  if (locale === 'en') {
    return `${clinicFacts.cityEn}, ${clinicFacts.districtEn}, ${clinicFacts.streetEn}`;
  }
  return `${clinicFacts.cityAr}، ${clinicFacts.districtAr}، ${clinicFacts.streetAr}`;
}

export function formatClinicHours(locale: ClinicLocale = 'ar'): string {
  if (locale === 'en') {
    return 'Saturday – Thursday · 10:00 AM – 10:00 PM';
  }
  return 'السبت – الخميس · 10:00 ص – 10:00 م';
}

export function formatClinicHoursFaq(locale: ClinicLocale = 'ar'): string {
  if (locale === 'en') {
    return 'Saturday to Thursday, 10:00 AM to 10:00 PM. Closed on Friday. Hours may change during Ramadan and official holidays.';
  }
  return 'نعمل من السبت إلى الخميس من الساعة 10:00 صباحًا حتى 10:00 مساءً، والجمعة مغلق. قد تختلف المواعيد خلال رمضان والإجازات الرسمية.';
}

export function clinicOpeningHoursRows(locale: ClinicLocale = 'ar'): ReadonlyArray<readonly [string, string]> {
  if (locale === 'en') {
    return [
      ['Saturday', '10:00 AM – 10:00 PM'],
      ['Sunday', '10:00 AM – 10:00 PM'],
      ['Monday', '10:00 AM – 10:00 PM'],
      ['Tuesday', '10:00 AM – 10:00 PM'],
      ['Wednesday', '10:00 AM – 10:00 PM'],
      ['Thursday', '10:00 AM – 10:00 PM'],
      ['Friday', 'Closed'],
    ] as const;
  }
  return [
    ['السبت', '10:00 ص – 10:00 م'],
    ['الأحد', '10:00 ص – 10:00 م'],
    ['الاثنين', '10:00 ص – 10:00 م'],
    ['الثلاثاء', '10:00 ص – 10:00 م'],
    ['الأربعاء', '10:00 ص – 10:00 م'],
    ['الخميس', '10:00 ص – 10:00 م'],
    ['الجمعة', 'مغلق'],
  ] as const;
}
