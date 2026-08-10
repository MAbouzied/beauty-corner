import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  clinicFacts,
  clinicOpeningHoursRows,
  formatClinicHours,
  formatClinicHoursFaq,
  formatClinicLocation,
} from './clinic-facts.ts';
import { faqItems } from './faq.ts';

describe('clinicFacts', () => {
  it('keeps the locked clinic hours used by Schema.org', () => {
    assert.equal(clinicFacts.opens, '10:00');
    assert.equal(clinicFacts.closes, '22:00');
    assert.deepEqual([...clinicFacts.openDays], [
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
    ]);
    assert.deepEqual([...clinicFacts.closedDays], ['Friday']);
  });

  it('formats Arabic and English hours and location', () => {
    assert.equal(formatClinicHours('ar'), 'السبت – الخميس · 10:00 ص – 10:00 م');
    assert.equal(formatClinicHours('en'), 'Saturday – Thursday · 10:00 AM – 10:00 PM');
    assert.match(formatClinicLocation('ar'), /حفر الباطن/);
    assert.match(formatClinicLocation('en'), /Hafr Al-Batin/);
  });

  it('keeps FAQ hours copy aligned with clinic facts', () => {
    const hoursFaq = faqItems.find((item) => item.question.includes('أوقات العمل'));
    assert.ok(hoursFaq);
    assert.equal(hoursFaq!.answer, formatClinicHoursFaq('ar'));
  });

  it('lists seven opening-hour rows including Friday closed', () => {
    const rows = clinicOpeningHoursRows('ar');
    assert.equal(rows.length, 7);
    assert.equal(rows[6]?.[1], 'مغلق');
  });
});
