/** Departments offered in booking / contact forms (Arabic canonical values). */
export const bookingDepartments = [
  'قسم النحت و الاذابة',
  'قسم الفيلر',
  'قسم البوتكس',
  'قسم النضارة',
  'قسم الهيدرافيشل',
  'قسم اللايت',
  'قسم علاج البشرة و الشعر',
  'قسم الليزر',
] as const;

export type BookingDepartment = (typeof bookingDepartments)[number];

export function isBookingDepartment(value: string): value is BookingDepartment {
  return (bookingDepartments as readonly string[]).includes(value);
}
