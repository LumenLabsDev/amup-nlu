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
  BaseStemmer,
  Tokenizer,
  defaultContainer,
  containerBootstrap,
  DEFAULT_LOCALE,
  getLanguageSubtag,
  parseLocale,
} = require('@lumen-labs-dev/core-loader');
const { getClass, registerLanguage } = require('../language/language-loader');

class NlpUtil {
  /**
   * Given a locale, get the 2 character one.
   * @param {String} locale Locale of the language.
   * @returns {String} Locale in 2 character length.
   */
  static getTruncatedLocale(locale) {
    return locale ? getLanguageSubtag(locale) : undefined;
  }

  static getStemmer(locale) {
    if (!locale) {
      return new BaseStemmer();
    }
    registerLanguage(defaultContainer, locale);
    const Stemmer = getClass(locale, 'Stemmer');
    return Stemmer ? new Stemmer(defaultContainer) : new BaseStemmer();
  }

  static getTokenizer(locale) {
    if (!locale) {
      return new Tokenizer();
    }
    registerLanguage(defaultContainer, locale);
    const TokenizerClass = getClass(locale, 'Tokenizer');
    return TokenizerClass
      ? new TokenizerClass(defaultContainer, true)
      : new Tokenizer(undefined, true);
  }

  static getCulture(locale) {
    if (!locale) {
      return 'en-us';
    }
    return parseLocale(locale).packageKey;
  }
}

NlpUtil.useAutoStemmer = true;
NlpUtil.autoStemmers = {};

NlpUtil.useAlternative = {};

NlpUtil.useNoneFeature = {
  bn: false,
  el: true,
  en: true,
  hi: false,
  fa: false,
  fr: true,
  ru: true,
  es: true,
  gl: true,
  it: true,
  nl: true,
  no: true,
  pt: true,
  pl: true,
  sv: true,
  tl: true,
  id: true,
  ja: false,
  ar: false,
  hy: false,
  eu: true,
  ca: true,
  cs: true,
  da: true,
  fi: true,
  de: true,
  hu: true,
  ga: true,
  ro: true,
  sl: true,
  ta: false,
  th: false,
  tr: true,
  zh: false,
};

NlpUtil.tokenizers = {};

containerBootstrap({}, true, defaultContainer);
registerLanguage(defaultContainer, DEFAULT_LOCALE);

module.exports = NlpUtil;
