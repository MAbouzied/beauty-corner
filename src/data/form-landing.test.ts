import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { bookingDepartments } from './booking-departments.ts';
import { getFormLandingCopy } from './form-landing.ts';

describe('form landing copy', () => {
  it('keeps the Nagm-style landing bilingual and department-based', () => {
    const ar = getFormLandingCopy('ar');
    const en = getFormLandingCopy('en');

    assert.equal(ar.breadcrumbContact, 'تواصل معنا');
    assert.equal(en.breadcrumbContact, 'Contact');
    assert.equal(ar.goFullSite, 'الموقع الكامل');
    assert.equal(en.goFullSite, 'Full website');
    assert.equal(ar.homeHref, '/');
    assert.equal(en.homeHref, '/en');
    assert.equal(ar.formHref, '/form');
    assert.equal(en.formHref, '/en/form');
    assert.equal(ar.departments.length, bookingDepartments.length);
    assert.equal(en.departments[0]?.value, bookingDepartments[0]);
    assert.notEqual(en.departments[0]?.label, bookingDepartments[0]);
    assert.doesNotMatch(ar.pageTitle, /نجم/);
    assert.match(ar.pageTitle, /بيوتي كورنر/);
  });
});
