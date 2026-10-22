import { describe, it, expect } from 'vitest';
import en from '../src/i18n/locales/en.json';
import tr from '../src/i18n/locales/tr.json';
import de from '../src/i18n/locales/de.json';

type JsonObj = Record<string, unknown>;

function getDeepKeys(obj: JsonObj, prefix = ''): string[] {
  return Object.keys(obj).flatMap((key) => {
    const val = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return getDeepKeys(val as JsonObj, fullKey);
    }
    return [fullKey];
  });
}

describe('i18n Locale Key Parity & Integrity', () => {
  const enKeys = getDeepKeys(en).sort();
  const trKeys = getDeepKeys(tr).sort();
  const deKeys = getDeepKeys(de).sort();

  it('should have identical translation keys across English and Turkish', () => {
    expect(trKeys).toEqual(enKeys);
  });

  it('should have identical translation keys across English and German', () => {
    expect(deKeys).toEqual(enKeys);
  });

  it('should not have any empty translation values', () => {
    const checkNoEmptyValues = (obj: JsonObj, localeName: string) => {
      getDeepKeys(obj).forEach((key) => {
        const parts = key.split('.');
        let curr: unknown = obj;
        for (const p of parts) {
          curr = (curr as JsonObj)[p];
        }
        expect(typeof curr, `${localeName} key "${key}" should be string`).toBe('string');
        expect((curr as string).trim().length, `${localeName} key "${key}" should not be empty`).toBeGreaterThan(0);
      });
    };

    checkNoEmptyValues(en, 'EN');
    checkNoEmptyValues(tr, 'TR');
    checkNoEmptyValues(de, 'DE');
  });
});
