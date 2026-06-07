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

/* eslint-disable global-require, import/no-extraneous-dependencies */

const loadedContainers = new WeakMap();

const languagePackages = {
  ar: () => require('@lumen-labs-dev/lang-ar'),
  bn: () => require('@lumen-labs-dev/lang-bn'),
  ca: () => require('@lumen-labs-dev/lang-ca'),
  cs: () => require('@lumen-labs-dev/lang-cs'),
  da: () => require('@lumen-labs-dev/lang-da'),
  de: () => require('@lumen-labs-dev/lang-de'),
  el: () => require('@lumen-labs-dev/lang-el'),
  en: () => require('@lumen-labs-dev/lang-en'),
  es: () => require('@lumen-labs-dev/lang-es'),
  eu: () => require('@lumen-labs-dev/lang-eu'),
  fa: () => require('@lumen-labs-dev/lang-fa'),
  fi: () => require('@lumen-labs-dev/lang-fi'),
  fr: () => require('@lumen-labs-dev/lang-fr'),
  ga: () => require('@lumen-labs-dev/lang-ga'),
  gl: () => require('@lumen-labs-dev/lang-gl'),
  hi: () => require('@lumen-labs-dev/lang-hi'),
  hu: () => require('@lumen-labs-dev/lang-hu'),
  hy: () => require('@lumen-labs-dev/lang-hy'),
  id: () => require('@lumen-labs-dev/lang-id'),
  it: () => require('@lumen-labs-dev/lang-it'),
  ja: () => require('@lumen-labs-dev/lang-ja'),
  ko: () => require('@lumen-labs-dev/lang-ko'),
  lt: () => require('@lumen-labs-dev/lang-lt'),
  ms: () => require('@lumen-labs-dev/lang-ms'),
  ne: () => require('@lumen-labs-dev/lang-ne'),
  nl: () => require('@lumen-labs-dev/lang-nl'),
  no: () => require('@lumen-labs-dev/lang-no'),
  pl: () => require('@lumen-labs-dev/lang-pl'),
  pt: () => require('@lumen-labs-dev/lang-pt'),
  'pt-br': () => require('@lumen-labs-dev/lang-pt-br'),
  ro: () => require('@lumen-labs-dev/lang-ro'),
  ru: () => require('@lumen-labs-dev/lang-ru'),
  sl: () => require('@lumen-labs-dev/lang-sl'),
  sr: () => require('@lumen-labs-dev/lang-sr'),
  sv: () => require('@lumen-labs-dev/lang-sv'),
  ta: () => require('@lumen-labs-dev/lang-ta'),
  th: () => require('@lumen-labs-dev/lang-th'),
  tl: () => require('@lumen-labs-dev/lang-tl'),
  tr: () => require('@lumen-labs-dev/lang-tr'),
  uk: () => require('@lumen-labs-dev/lang-uk'),
  zh: () => require('@lumen-labs-dev/lang-zh'),
};

function getLocale(locale) {
  if (typeof locale !== 'string') {
    return undefined;
  }
  const normalized = locale.toLowerCase().replace('_', '-');
  return normalized === 'pt-br' ? normalized : normalized.substr(0, 2);
}

function getClassSuffix(locale) {
  return locale
    ? locale
        .split('-')
        .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
        .join('')
    : undefined;
}

function getLanguagePackage(locale) {
  const truncated = getLocale(locale);
  const loader = languagePackages[truncated];
  if (!loader) {
    return undefined;
  }
  try {
    return loader();
  } catch (error) {
    throw new Error(
      `Language package @lumen-labs-dev/lang-${truncated} is required for locale "${truncated}". ` +
        `Install it or install @lumen-labs-dev/lang-all for all bundled languages.`
    );
  }
}

function getLanguageClass(locale) {
  const truncated = getLocale(locale);
  const languagePackage = getLanguagePackage(truncated);
  const suffix = getClassSuffix(truncated);
  return languagePackage && languagePackage[`Lang${suffix}`];
}

function registerLanguage(container, locale) {
  const truncated = getLocale(locale);
  const LanguageClass = getLanguageClass(truncated);
  if (!LanguageClass) {
    return false;
  }
  let loaded = loadedContainers.get(container);
  if (!loaded) {
    loaded = new Set();
    loadedContainers.set(container, loaded);
  }
  if (!loaded.has(truncated)) {
    container.use(LanguageClass);
    loaded.add(truncated);
  }
  return true;
}

function registerLanguages(container, locales) {
  if (!locales) {
    return;
  }
  const list = Array.isArray(locales) ? locales : [locales];
  list.forEach((locale) => registerLanguage(container, locale));
}

function registerDefaultLanguages(container, settings = {}) {
  if (settings.useLangAll) {
    try {
      const { LangAll } = require('@lumen-labs-dev/lang-all');
      container.use(LangAll);
      return;
    } catch (error) {
      throw new Error(
        'settings.useLangAll requires @lumen-labs-dev/lang-all to be installed.'
      );
    }
  }
  registerLanguage(container, 'en');
  registerLanguages(container, settings.languages);
  registerLanguages(container, settings.locales);
}

function getClass(locale, prefix) {
  const truncated = getLocale(locale);
  const languagePackage = getLanguagePackage(truncated);
  const suffix = getClassSuffix(truncated);
  return languagePackage && languagePackage[`${prefix}${suffix}`];
}

module.exports = {
  getClass,
  getLocale,
  registerDefaultLanguages,
  registerLanguage,
  registerLanguages,
};
