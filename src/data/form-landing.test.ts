import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import { clinicServices } from './services.ts';
import {
  acceptedLeadDepartments,
  getFormLandingCopy,
  getFormServiceGroups,
} from './form-landing.ts';
import { bookingDepartments } from './booking-departments.ts';

describe('form landing copy', () => {
  it('keeps the landing bilingual without chrome or WhatsApp CTA copy', () => {
    const ar = getFormLandingCopy('ar');
    const en = getFormLandingCopy('en');

    assert.equal(ar.formHref, '/form');
    assert.equal(en.formHref, '/en/form');
    assert.equal(ar.submit, 'أرسل الآن');
    assert.equal(en.submit, 'Send now');
    assert.doesNotMatch(ar.submit, /واتساب|WhatsApp/i);
    assert.doesNotMatch(en.submit, /واتساب|WhatsApp/i);
    assert.doesNotMatch(ar.pageTitle, /نجم/);
    assert.match(ar.pageTitle, /بيوتي كورنر/);
    assert.equal(ar.callAction, 'اتصال');
    assert.equal(ar.locationAction, 'الموقع');
  });

  it('groups services from the services page into dentistry then dermatology', () => {
    const arGroups = getFormServiceGroups('ar');
    const enGroups = getFormServiceGroups('en');
    const ar = getFormLandingCopy('ar');
    const en = getFormLandingCopy('en');

    assert.deepEqual(arGroups.map((group) => group.department), ['أسنان', 'جلدية']);
    assert.equal(arGroups[0]?.label, 'أسنان');
    assert.equal(enGroups[0]?.label, 'Dentistry');
    assert.equal(enGroups[1]?.label, 'Dermatology');

    const arValues = arGroups.flatMap((group) => group.services.map((service) => service.value));
    const serviceTitles = clinicServices.map((service) => service.title);
    assert.deepEqual(arValues.sort(), [...serviceTitles].sort());
    assert.equal(ar.departments.length, clinicServices.length);
    assert.notEqual(en.departments[0]?.label, en.departments[0]?.value);
    assert.ok(acceptedLeadDepartments.includes(bookingDepartments[0]));
    assert.ok(acceptedLeadDepartments.includes(clinicServices[0]!.title));
  });

  it('posts landing leads to the customers API without home chrome or extra message', async () => {
    const source = await readFile(
      new URL('../components/contact/FormLandingPage.astro', import.meta.url),
      'utf8',
    );

    assert.match(source, /method="post"/);
    assert.match(source, /action="\/api\/customers"/);
    assert.match(source, /name="consent"/);
    assert.match(source, /name="locale"/);
    assert.match(source, /<optgroup/);
    assert.match(source, /data-form-actions/);
    assert.match(source, /buildWhatsAppUrl/);
    assert.match(source, /buildPhoneUrl/);
    assert.match(source, /clinicMapUrl/);
    assert.doesNotMatch(source, /data-form-landing-crumb/);
    assert.doesNotMatch(source, /offersHref/);
    assert.doesNotMatch(source, /goFullSite/);
    assert.doesNotMatch(source, /name="message"/);
    assert.doesNotMatch(source, /href=\{copy\.homeHref\}/);
    assert.ok(source.indexOf('SocialLinks') < source.indexOf('data-form-actions'));
    assert.ok(source.indexOf('data-form-actions') < source.indexOf('id="contact-form"'));
  });
});
