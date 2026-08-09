import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { bookingDepartments, isBookingDepartment } from './booking-departments.ts';

describe('bookingDepartments', () => {
  it('lists the eight clinic departments used in booking forms', () => {
    assert.deepEqual([...bookingDepartments], [
      'قسم النحت و الاذابة',
      'قسم الفيلر',
      'قسم البوتكس',
      'قسم النضارة',
      'قسم الهيدرافيشل',
      'قسم اللايت',
      'قسم علاج البشرة و الشعر',
      'قسم الليزر',
    ]);
  });

  it('recognizes known departments and rejects unknown values', () => {
    assert.equal(isBookingDepartment('قسم الفيلر'), true);
    assert.equal(isBookingDepartment('أسنان'), false);
    assert.equal(isBookingDepartment(''), false);
  });
});
