import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { bookingDepartments } from './booking-departments.ts';
import { serviceGroups } from './landing.ts';
import { clinicServices } from './services.ts';

describe('dermatology catalog', () => {
  it('lists every booking department under جلدية', () => {
    const dermatologyTitles = clinicServices
      .filter((service) => service.department === 'جلدية')
      .map((service) => service.title);

    assert.deepEqual(dermatologyTitles, [...bookingDepartments]);
  });

  it('shows the same eight departments on the homepage جلدية card', () => {
    const dermatologyGroup = serviceGroups.find((group) => group.title === 'جلدية');
    assert.deepEqual(dermatologyGroup?.items, [...bookingDepartments]);
  });
});
