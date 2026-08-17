import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
    assert.match(ar.saveFailed, /واتساب/);
    assert.match(en.saveFailed, /WhatsApp/);
    assert.equal(ar.whatsappAction, 'تواصل واتساب');
    assert.equal(ar.callAction, 'اتصال');
    assert.equal(ar.locationAction, 'الموقع');
    assert.equal(ar.offersAction, 'العروض');
    assert.equal(ar.offersHref, '/#services');
    assert.equal(en.offersHref, '/en#services');
  });

  it('posts landing leads to the customers API instead of GET /form', async () => {
    const source = await readFile(
      new URL('../components/contact/FormLandingPage.astro', import.meta.url),
      'utf8',
    );

    assert.match(source, /method="post"/);
    assert.match(source, /action="\/api\/customers"/);
    assert.match(source, /name="consent"/);
    assert.match(source, /name="locale"/);
    assert.match(source, /data-form-actions/);
    assert.match(source, /buildWhatsAppUrl/);
    assert.match(source, /buildPhoneUrl/);
    assert.match(source, /clinicMapUrl/);
    assert.match(source, /offersHref/);
  });
});
