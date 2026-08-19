/** Default Open Graph / Twitter social card (landscape preview). */
export const socialCard = {
  path: '/assets/social-card.png',
  width: 1536,
  height: 1024,
  type: 'image/png',
  altAr: 'بيوتي كورنر — عيادة أسنان وجلدية في حفر الباطن',
  altEn: 'Beauty Corner — dental and dermatology clinic in Hafr Al-Batin',
} as const;

/** Clinic pin from the official Beauty Corner Google Maps listing. */
export const clinicGeo = {
  latitude: 28.3967825,
  longitude: 45.9833191,
} as const;

export const clinicMapUrl = 'https://maps.app.goo.gl/ALNUFTzXzqctrbpM6';

export function imageMimeType(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}
