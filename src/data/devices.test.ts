import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { clinicDevices } from './devices.ts';
import { devicesEn } from '../lib/i18n/content-en.ts';

describe('clinic devices', () => {
  it('lists clinic devices with matching English overlays', () => {
    assert.ok(clinicDevices.length >= 6);
    assert.ok(clinicDevices.some((device) => device.id === 'curas-qswitched'));
    assert.ok(clinicDevices.some((device) => device.id === 'preime-dermafacial'));

    for (const device of clinicDevices) {
      assert.ok(devicesEn[device.id], `missing English overlay for ${device.id}`);
      assert.ok(device.name.trim().length > 0);
      assert.ok(device.description.trim().length > 0);
      assert.ok(device.image.startsWith('/assets/'));
      assert.ok(device.imageAlt.trim().length > 0);
    }
  });

  it('uses the Woodpecker PT-B image for gum treatment', () => {
    const gumDevice = clinicDevices.find((device) => device.id === 'woodpecker-ptb');
    assert.ok(gumDevice);
    assert.equal(gumDevice.image, '/assets/devices/woodpecker-ptb.png');
    assert.match(gumDevice.name, /قص|اللثة|Woodpecker/i);
  });
});
