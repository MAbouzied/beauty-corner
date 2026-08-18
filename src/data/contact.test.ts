import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildPhoneUrl,
  buildWhatsAppUrl,
  clinicLineFromDepartment,
  clinicLines,
  clinicSocialLinks,
  getClinicLine,
} from './contact.ts';

describe('clinic social links', () => {
  it('exposes Instagram, TikTok, and Snapchat profiles', () => {
    assert.deepEqual(
      clinicSocialLinks.map((link) => link.id),
      ['instagram', 'tiktok', 'snapchat'],
    );
    assert.equal(clinicSocialLinks[0]?.href, 'https://www.instagram.com/beauty_1_corner/');
    assert.equal(clinicSocialLinks[1]?.href, 'https://www.tiktok.com/@beauty.corner.sa');
    assert.equal(clinicSocialLinks[2]?.href, 'https://www.snapchat.com/@beauty.corner25');
  });

  it('uses https profile URLs with accessible bilingual labels', () => {
    for (const link of clinicSocialLinks) {
      assert.match(link.href, /^https:\/\//);
      assert.ok(link.labelAr.trim().length > 0);
      assert.ok(link.labelEn.trim().length > 0);
      assert.ok(link.icon.startsWith('/assets/'));
    }
  });
});

describe('clinic contact lines', () => {
  it('exposes dental and dermatology numbers', () => {
    assert.equal(clinicLines.length, 2);
    assert.equal(getClinicLine('dental').phoneDisplay, '055 295 9863');
    assert.equal(getClinicLine('dermatology').phoneDisplay, '055 952 3784');
    assert.equal(getClinicLine('dental').number, '966552959863');
    assert.equal(getClinicLine('dermatology').number, '966559523784');
  });

  it('keeps display text aligned with dialable numbers', () => {
    for (const line of clinicLines) {
      assert.equal(buildPhoneUrl(line.id), `tel:+${line.number}`);
      assert.equal(buildWhatsAppUrl(undefined, line.id), `https://wa.me/${line.number}`);
      assert.match(line.phoneDisplay, /^05\d \d{3} \d{4}$/);
    }
  });

  it('builds tel links for each clinic line', () => {
    assert.equal(buildPhoneUrl('dental'), 'tel:+966552959863');
    assert.equal(buildPhoneUrl('dermatology'), 'tel:+966559523784');
  });

  it('builds WhatsApp links for each clinic line', () => {
    assert.equal(buildWhatsAppUrl(undefined, 'dental'), 'https://wa.me/966552959863');
    assert.equal(
      buildWhatsAppUrl('Hello', 'dermatology'),
      `https://wa.me/966559523784?text=${encodeURIComponent('Hello')}`,
    );
  });

  it('maps departments to clinic lines', () => {
    assert.equal(clinicLineFromDepartment('أسنان'), 'dental');
    assert.equal(clinicLineFromDepartment('Dentistry'), 'dental');
    assert.equal(clinicLineFromDepartment('جلدية'), 'dermatology');
    assert.equal(clinicLineFromDepartment('Dermatology'), 'dermatology');
    assert.equal(clinicLineFromDepartment('قسم الفيلر'), 'dermatology');
    assert.equal(clinicLineFromDepartment('قسم الليزر'), 'dermatology');
    assert.equal(clinicLineFromDepartment('زراعة الأسنان'), 'dental');
    assert.equal(clinicLineFromDepartment('الليزر'), 'dermatology');
    assert.equal(clinicLineFromDepartment(''), 'dermatology');
  });
});
