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

const { NlpUtil } = require('../../src/nlp');

describe('NLP Util', () => {
  describe('Get truncated locale', () => {
    test('Should return undefined if no locale provided', () => {
      expect(NlpUtil.getTruncatedLocale()).toBeUndefined();
      expect(NlpUtil.getTruncatedLocale(null)).toBeUndefined();
      expect(NlpUtil.getTruncatedLocale('')).toBeUndefined();
    });
    test('Should return the language subtag for valid BCP 47 locales', () => {
      expect(NlpUtil.getTruncatedLocale('es-ES')).toEqual('es');
      expect(NlpUtil.getTruncatedLocale('en-US')).toEqual('en');
    });
    test('Should reject bare or invalid locales', () => {
      expect(() => NlpUtil.getTruncatedLocale('e')).toThrow();
      expect(() => NlpUtil.getTruncatedLocale('es')).toThrow();
      expect(() => NlpUtil.getTruncatedLocale('ESP')).toThrow();
    });
  });

  describe('Get Stemmer', () => {
    test('Should return correct stemmer for the locale', () => {
      expect(NlpUtil.getStemmer('en-US').constructor.name).toEqual('StemmerEn'); // english
      expect(NlpUtil.getStemmer('fa-IR').constructor.name).toEqual('StemmerFa'); // farsi
      expect(NlpUtil.getStemmer('fr-FR').constructor.name).toEqual('StemmerFr'); // french
      expect(NlpUtil.getStemmer('ru-RU').constructor.name).toEqual('StemmerRu'); // russian
      expect(NlpUtil.getStemmer('it-IT').constructor.name).toEqual('StemmerIt'); // italian
      expect(NlpUtil.getStemmer('no-NO').constructor.name).toEqual('StemmerNo'); // norwegian
      expect(NlpUtil.getStemmer('pt-PT').constructor.name).toEqual('StemmerPt'); // portugese
      expect(NlpUtil.getStemmer('sv-SE').constructor.name).toEqual('StemmerSv'); // swedish
      expect(NlpUtil.getStemmer('nl-NL').constructor.name).toEqual('StemmerNl'); // Dutch
      expect(NlpUtil.getStemmer('id-ID').constructor.name).toEqual('StemmerId'); // Indonesian
      expect(NlpUtil.getStemmer('ms-MY').constructor.name).toEqual('StemmerMs'); // Malay
      expect(NlpUtil.getStemmer('ja-JP').constructor.name).toEqual('StemmerJa'); // Japanese
      expect(NlpUtil.getStemmer('es-ES').constructor.name).toEqual('StemmerEs'); // Spanish
      expect(NlpUtil.getStemmer('ar-SA').constructor.name).toEqual('StemmerAr'); // Arabic
      expect(NlpUtil.getStemmer('hy-AM').constructor.name).toEqual('StemmerHy'); // Armenian
      expect(NlpUtil.getStemmer('eu-ES').constructor.name).toEqual('StemmerEu'); // Basque
      expect(NlpUtil.getStemmer('cs-CZ').constructor.name).toEqual('StemmerCs'); // Czech
      expect(NlpUtil.getStemmer('da-DK').constructor.name).toEqual('StemmerDa'); // Danish
      expect(NlpUtil.getStemmer('fi-FI').constructor.name).toEqual('StemmerFi'); // Finnish
      expect(NlpUtil.getStemmer('de-DE').constructor.name).toEqual('StemmerDe'); // German
      expect(NlpUtil.getStemmer('hu-HU').constructor.name).toEqual('StemmerHu'); // Hungarian
      expect(NlpUtil.getStemmer('ga-IE').constructor.name).toEqual('StemmerGa'); // Irish
      expect(NlpUtil.getStemmer('ro-RO').constructor.name).toEqual('StemmerRo'); // Romanian
      expect(NlpUtil.getStemmer('sl-SI').constructor.name).toEqual('StemmerSl'); // Slovene
      expect(NlpUtil.getStemmer('ta-IN').constructor.name).toEqual('StemmerTa'); // Tamil
      expect(NlpUtil.getStemmer('tr-TR').constructor.name).toEqual('StemmerTr'); // Turkish
    });
    test('Should reject unknown locales if AutoStemmer is deactivated', () => {
      NlpUtil.useAutoStemmer = false;
      try {
        expect(() => NlpUtil.getStemmer('aa-AA')).toThrow();
        expect(NlpUtil.getStemmer('').constructor.name).toEqual('BaseStemmer');
        expect(NlpUtil.getStemmer().constructor.name).toEqual('BaseStemmer');
      } finally {
        NlpUtil.useAutoStemmer = true;
      }
    });
  });

  describe('Get tokenizer', () => {
    test('Should return correct tokenizer for the locale', () => {
      const tk = 'Tokenizer';
      expect(NlpUtil.getTokenizer('en-US').constructor.name).toEqual(`${tk}En`); // english
      expect(NlpUtil.getTokenizer('fa-IR').constructor.name).toEqual(`${tk}Fa`); // farsi
      expect(NlpUtil.getTokenizer('fr-FR').constructor.name).toEqual(`${tk}Fr`); // french
      expect(NlpUtil.getTokenizer('ru-RU').constructor.name).toEqual(`${tk}Ru`); // russian
      expect(NlpUtil.getTokenizer('es-ES').constructor.name).toEqual(`${tk}Es`); // spansih
      expect(NlpUtil.getTokenizer('it-IT').constructor.name).toEqual(`${tk}It`); // italian
      expect(NlpUtil.getTokenizer('nl-NL').constructor.name).toEqual(`${tk}Nl`); // dutch
      expect(NlpUtil.getTokenizer('no-NO').constructor.name).toEqual(`${tk}No`); // norwegian
      expect(NlpUtil.getTokenizer('pt-PT').constructor.name).toEqual(`${tk}Pt`); // portuguese
      expect(NlpUtil.getTokenizer('sv-SE').constructor.name).toEqual(`${tk}Sv`); // swedish
      expect(NlpUtil.getTokenizer('id-ID').constructor.name).toEqual(`${tk}Id`); // indonesian
      expect(NlpUtil.getTokenizer('ms-MY').constructor.name).toEqual(`${tk}Ms`); // indonesian
      expect(NlpUtil.getTokenizer('ja-JP').constructor.name).toEqual(`${tk}Ja`); // japanese
      expect(NlpUtil.getTokenizer('ar-SA').constructor.name).toEqual(`${tk}Ar`); // arabic
      expect(NlpUtil.getTokenizer('hy-AM').constructor.name).toEqual(`${tk}Hy`); // armenian
      expect(NlpUtil.getTokenizer('eu-ES').constructor.name).toEqual(`${tk}Eu`); // basque
      expect(NlpUtil.getTokenizer('cs-CZ').constructor.name).toEqual(`${tk}Cs`); // czech
      expect(NlpUtil.getTokenizer('da-DK').constructor.name).toEqual(`${tk}Da`); // danish
      expect(NlpUtil.getTokenizer('fi-FI').constructor.name).toEqual(`${tk}Fi`); // finish
      expect(NlpUtil.getTokenizer('de-DE').constructor.name).toEqual(`${tk}De`); // german
      expect(NlpUtil.getTokenizer('hu-HU').constructor.name).toEqual(`${tk}Hu`); // hungarian
      expect(NlpUtil.getTokenizer('ga-IE').constructor.name).toEqual(`${tk}Ga`); // irish
      expect(NlpUtil.getTokenizer('ro-RO').constructor.name).toEqual(`${tk}Ro`); // romanian
      expect(NlpUtil.getTokenizer('sl-SI').constructor.name).toEqual(`${tk}Sl`); // slovene
      expect(NlpUtil.getTokenizer('ta-IN').constructor.name).toEqual(`${tk}Ta`); // tamil
      expect(NlpUtil.getTokenizer('tr-TR').constructor.name).toEqual(`${tk}Tr`); // turkish
    });
    test('Should reject unknown locales', () => {
      expect(() => NlpUtil.getTokenizer('aa-AA')).toThrow();
      expect(NlpUtil.getTokenizer('').constructor.name).toEqual('Tokenizer');
      expect(NlpUtil.getTokenizer().constructor.name).toEqual('Tokenizer');
    });
  });

  describe('Get culture', () => {
    test('Should return correct culture for the locale', () => {
      expect(NlpUtil.getCulture('en-US')).toEqual('en-us'); // english
      expect(NlpUtil.getCulture('fa-IR')).toEqual('fa-ir'); // farsi
      expect(NlpUtil.getCulture('fr-FR')).toEqual('fr-fr'); // french
      expect(NlpUtil.getCulture('ru-RU')).toEqual('ru-ru'); // russian
      expect(NlpUtil.getCulture('es-ES')).toEqual('es-es'); // spanish
      expect(NlpUtil.getCulture('it-IT')).toEqual('it-it'); // italian
      expect(NlpUtil.getCulture('nl-NL')).toEqual('nl-nl'); // dutch
      expect(NlpUtil.getCulture('no-NO')).toEqual('no-no'); // norwegian
      expect(NlpUtil.getCulture('pt-BR')).toEqual('pt-br'); // portuguese
      expect(NlpUtil.getCulture('pl-PL')).toEqual('pl-pl'); // polish
      expect(NlpUtil.getCulture('sv-SE')).toEqual('sv-se'); // swedish
      expect(NlpUtil.getCulture('id-ID')).toEqual('id-id'); // indonesian
      expect(NlpUtil.getCulture('ms-MY')).toEqual('ms-my'); // malay
      expect(NlpUtil.getCulture('ja-JP')).toEqual('ja-jp'); // japanese
      expect(NlpUtil.getCulture('ar-SA')).toEqual('ar-sa'); // arabic
      expect(NlpUtil.getCulture('hy-AM')).toEqual('hy-am'); // armenian
      expect(NlpUtil.getCulture('eu-ES')).toEqual('eu-es'); // basque
      expect(NlpUtil.getCulture('ca-ES')).toEqual('ca-es'); // catalan
      expect(NlpUtil.getCulture('cs-CZ')).toEqual('cs-cz'); // czech
      expect(NlpUtil.getCulture('da-DK')).toEqual('da-dk'); // danish
      expect(NlpUtil.getCulture('fi-FI')).toEqual('fi-fi'); // finnish
      expect(NlpUtil.getCulture('de-DE')).toEqual('de-de'); // german
      expect(NlpUtil.getCulture('hu-HU')).toEqual('hu-hu'); // hungarian
      expect(NlpUtil.getCulture('ga-IE')).toEqual('ga-ie'); // irish
      expect(NlpUtil.getCulture('ro-RO')).toEqual('ro-ro'); // romanian
      expect(NlpUtil.getCulture('sl-SI')).toEqual('sl-si'); // slovene
      expect(NlpUtil.getCulture('ta-IN')).toEqual('ta-in'); // tamil
      expect(NlpUtil.getCulture('th-TH')).toEqual('th-th'); // thai
      expect(NlpUtil.getCulture('tr-TR')).toEqual('tr-tr'); // turkish
      expect(NlpUtil.getCulture('zh-CN')).toEqual('zh-cn'); // Chinese
      expect(NlpUtil.getCulture('gl-ES')).toEqual('gl-es'); // Galician
      expect(NlpUtil.getCulture('tl-PH')).toEqual('tl-ph'); // Tagalog
    });
    test('If the locale is not recognized return default is built from locale', () => {
      expect(NlpUtil.getCulture('aa-AA')).toEqual('aa-aa');
    });
    test('If no locale is provided return en-us', () => {
      expect(NlpUtil.getCulture()).toEqual('en-us'); // english
    });
  });
});
