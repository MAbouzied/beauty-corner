/** Default Open Graph / Twitter social card (landscape preview). */
export const socialCard = {
  path: '/assets/social-card.png',
  width: 1536,
  height: 1024,
  type: 'image/png',
  altAr: 'بيوتي كورنر — عيادة أسنان وجلدية في حفر الباطن',
  altEn: 'Beauty Corner — dental and dermatology clinic in Hafr Al-Batin',
} as const;

/** Approximate clinic coordinates for Al Muhammadiyah, King Faisal Road, Hafr Al-Batin. */
export const clinicGeo = {
  latitude: 28.43421,
  longitude: 45.97076,
} as const;

export const clinicMapUrl = 'https://maps.app.goo.gl/FzR9jF2ucx55xMAg9';

export function imageMimeType(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}
