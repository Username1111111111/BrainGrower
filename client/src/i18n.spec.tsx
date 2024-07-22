import i18n from './i18n';
import en from './translations/en.json';
import { describe, it, expect } from 'vitest';

describe('i18n', () => {
  it('should initialize with English translations', () => {
    expect(i18n.isInitialized).toBeTruthy();
    expect(i18n.hasResourceBundle('en', 'translation')).toBeTruthy();
    expect(i18n.getResourceBundle('en', 'translation')).toEqual(en);
    expect(i18n.language).toBe('en');
    expect(i18n.languages).toEqual(['en']);
  });

  it('should have interpolation set to not escape HTML values', () => {
    const expectedInterpolationConfig = {
      escapeValue: false,
      format: expect.any(Function),
      formatSeparator: ',',
      maxReplaces: 1000,
      nestingOptionsSeparator: ',',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      prefix: '{{',
      skipOnVariables: true,
      suffix: '}}',
      unescapePrefix: '-',
    };

    expect(i18n.options.interpolation).toEqual(expectedInterpolationConfig);
  });
});
