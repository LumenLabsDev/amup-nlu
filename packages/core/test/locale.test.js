/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const {
  LocaleError,
  assertLocale,
  getLanguageSubtag,
  isLanguageOnlyTag,
  migrateLegacyLocale,
  parseLocale,
  resolveContainerKey,
  resolveLocaleFromGuess,
} = require('../src/locale');

describe('locale', () => {
  describe('parseLocale', () => {
    test('Should canonicalize BCP 47 tags', () => {
      expect(parseLocale('en-US').canonical).toEqual('en-US');
      expect(parseLocale('en_us').canonical).toEqual('en-US');
      expect(parseLocale('pt-BR').canonical).toEqual('pt-BR');
      expect(parseLocale('pt-br').packageKey).toEqual('pt-br');
    });

    test('Should accept private-use tags', () => {
      expect(parseLocale('x-klingon').canonical).toEqual('x-klingon');
    });

    test('Should reject bare language codes', () => {
      expect(() => parseLocale('en')).toThrow(LocaleError);
      expect(() => parseLocale('es')).toThrow(LocaleError);
    });

    test('Should allow legacy codes when allowLegacy is set', () => {
      expect(parseLocale('en', { allowLegacy: true }).canonical).toEqual(
        'en-US'
      );
    });
  });

  describe('assertLocale', () => {
    test('Should return canonical locale', () => {
      expect(assertLocale('en-US')).toEqual('en-US');
    });
  });

  describe('isLanguageOnlyTag', () => {
    test('Should detect bare language tags', () => {
      expect(isLanguageOnlyTag('en')).toEqual(true);
      expect(isLanguageOnlyTag('en-US')).toEqual(false);
      expect(isLanguageOnlyTag('x-klingon')).toEqual(false);
    });
  });

  describe('getLanguageSubtag', () => {
    test('Should extract language subtag', () => {
      expect(getLanguageSubtag('en-US')).toEqual('en');
      expect(getLanguageSubtag('pt-BR')).toEqual('pt');
    });
  });

  describe('resolveContainerKey', () => {
    test('Should map BCP 47 tags to container keys', () => {
      expect(resolveContainerKey('en-US')).toEqual('en');
      expect(resolveContainerKey('es-ES')).toEqual('es');
      expect(resolveContainerKey('pt-BR')).toEqual('pt-br');
      expect(resolveContainerKey('pt-PT')).toEqual('pt');
      expect(resolveContainerKey('x-klingon')).toEqual('x-klingon');
    });
  });

  describe('migrateLegacyLocale', () => {
    test('Should migrate 2-letter locales to BCP 47', () => {
      expect(migrateLegacyLocale('en')).toEqual('en-US');
      expect(migrateLegacyLocale('es')).toEqual('es-ES');
    });

    test('Should keep canonical locales', () => {
      expect(migrateLegacyLocale('en-US')).toEqual('en-US');
    });
  });

  describe('resolveLocaleFromGuess', () => {
    test('Should map alpha2 guess to configured locale', () => {
      expect(resolveLocaleFromGuess('en', ['en-US', 'es-ES'])).toEqual('en-US');
    });

    test('Should throw when guess is ambiguous', () => {
      expect(() => resolveLocaleFromGuess('en', ['en-US', 'en-GB'])).toThrow(
        LocaleError
      );
    });
  });
});
