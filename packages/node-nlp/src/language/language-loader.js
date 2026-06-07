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

const {
  DEFAULT_LOCALE,
  LocaleError,
  parseLocale,
} = require('@lumen-labs-dev/core');

const loadedContainers = new WeakMap();

const classSuffixes = {
  'ar-sa': 'Ar',
  'bn-bd': 'Bn',
  'ca-es': 'Ca',
  'cs-cz': 'Cs',
  'da-dk': 'Da',
  'de-de': 'De',
  'el-gr': 'El',
  'en-us': 'En',
  'es-es': 'Es',
  'eu-es': 'Eu',
  'fa-ir': 'Fa',
  'fi-fi': 'Fi',
  'fr-fr': 'Fr',
  'ga-ie': 'Ga',
  'gl-es': 'Gl',
  'hi-in': 'Hi',
  'hu-hu': 'Hu',
  'hy-am': 'Hy',
  'id-id': 'Id',
  'it-it': 'It',
  'ja-jp': 'Ja',
  'ko-kr': 'Ko',
  'lt-lt': 'Lt',
  'ms-my': 'Ms',
  'ne-np': 'Ne',
  'nl-nl': 'Nl',
  'no-no': 'No',
  'pl-pl': 'Pl',
  'pt-br': 'PtBr',
  'pt-pt': 'Pt',
  'ro-ro': 'Ro',
  'ru-ru': 'Ru',
  'sl-si': 'Sl',
  'sr-rs': 'Sr',
  'sv-se': 'Sv',
  'ta-in': 'Ta',
  'th-th': 'Th',
  'tl-ph': 'Tl',
  'tr-tr': 'Tr',
  'uk-ua': 'Uk',
  'zh-cn': 'Zh',
};

const languagePackages = {
  'ar-sa': () => require('@lumen-labs-dev/lang-ar-sa'),
  'bn-bd': () => require('@lumen-labs-dev/lang-bn-bd'),
  'ca-es': () => require('@lumen-labs-dev/lang-ca-es'),
  'cs-cz': () => require('@lumen-labs-dev/lang-cs-cz'),
  'da-dk': () => require('@lumen-labs-dev/lang-da-dk'),
  'de-de': () => require('@lumen-labs-dev/lang-de-de'),
  'el-gr': () => require('@lumen-labs-dev/lang-el-gr'),
  'en-us': () => require('@lumen-labs-dev/lang-en-us'),
  'es-es': () => require('@lumen-labs-dev/lang-es-es'),
  'eu-es': () => require('@lumen-labs-dev/lang-eu-es'),
  'fa-ir': () => require('@lumen-labs-dev/lang-fa-ir'),
  'fi-fi': () => require('@lumen-labs-dev/lang-fi-fi'),
  'fr-fr': () => require('@lumen-labs-dev/lang-fr-fr'),
  'ga-ie': () => require('@lumen-labs-dev/lang-ga-ie'),
  'gl-es': () => require('@lumen-labs-dev/lang-gl-es'),
  'hi-in': () => require('@lumen-labs-dev/lang-hi-in'),
  'hu-hu': () => require('@lumen-labs-dev/lang-hu-hu'),
  'hy-am': () => require('@lumen-labs-dev/lang-hy-am'),
  'id-id': () => require('@lumen-labs-dev/lang-id-id'),
  'it-it': () => require('@lumen-labs-dev/lang-it-it'),
  'ja-jp': () => require('@lumen-labs-dev/lang-ja-jp'),
  'ko-kr': () => require('@lumen-labs-dev/lang-ko-kr'),
  'lt-lt': () => require('@lumen-labs-dev/lang-lt-lt'),
  'ms-my': () => require('@lumen-labs-dev/lang-ms-my'),
  'ne-np': () => require('@lumen-labs-dev/lang-ne-np'),
  'nl-nl': () => require('@lumen-labs-dev/lang-nl-nl'),
  'no-no': () => require('@lumen-labs-dev/lang-no-no'),
  'pl-pl': () => require('@lumen-labs-dev/lang-pl-pl'),
  'pt-br': () => require('@lumen-labs-dev/lang-pt-br'),
  'pt-pt': () => require('@lumen-labs-dev/lang-pt-pt'),
  'ro-ro': () => require('@lumen-labs-dev/lang-ro-ro'),
  'ru-ru': () => require('@lumen-labs-dev/lang-ru-ru'),
  'sl-si': () => require('@lumen-labs-dev/lang-sl-si'),
  'sr-rs': () => require('@lumen-labs-dev/lang-sr-rs'),
  'sv-se': () => require('@lumen-labs-dev/lang-sv-se'),
  'ta-in': () => require('@lumen-labs-dev/lang-ta-in'),
  'th-th': () => require('@lumen-labs-dev/lang-th-th'),
  'tl-ph': () => require('@lumen-labs-dev/lang-tl-ph'),
  'tr-tr': () => require('@lumen-labs-dev/lang-tr-tr'),
  'uk-ua': () => require('@lumen-labs-dev/lang-uk-ua'),
  'zh-cn': () => require('@lumen-labs-dev/lang-zh-cn'),
};

function getPackageKey(locale) {
  if (typeof locale !== 'string') {
    return undefined;
  }
  return parseLocale(locale).packageKey;
}

function isPrivateUseLocale(locale) {
  if (typeof locale !== 'string') {
    return false;
  }
  try {
    const { canonical } = parseLocale(locale);
    return canonical.split('-')[0].toLowerCase() === 'x';
  } catch (error) {
    return false;
  }
}

function getLocale(locale) {
  if (typeof locale !== 'string') {
    return undefined;
  }
  const { canonical, packageKey } = parseLocale(locale);
  if (isPrivateUseLocale(locale)) {
    return canonical;
  }
  if (!languagePackages[packageKey]) {
    throw new LocaleError(
      `Language package @lumen-labs-dev/lang-${packageKey} is required for locale "${canonical}". ` +
        `Install it or install @lumen-labs-dev/lang-all for all bundled languages.`
    );
  }
  return canonical;
}

function getClassSuffix(locale) {
  const packageKey = getPackageKey(locale);
  if (classSuffixes[packageKey]) {
    return classSuffixes[packageKey];
  }
  return packageKey
    ? packageKey
        .split('-')
        .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
        .join('')
    : undefined;
}

function getLanguagePackage(locale) {
  const packageKey = getPackageKey(locale);
  const loader = languagePackages[packageKey];
  if (!loader) {
    return undefined;
  }
  try {
    return loader();
  } catch (error) {
    throw new Error(
      `Language package @lumen-labs-dev/lang-${packageKey} is required for locale "${getLocale(locale)}". ` +
        `Install it or install @lumen-labs-dev/lang-all for all bundled languages.`
    );
  }
}

function getLanguageClass(locale) {
  const languagePackage = getLanguagePackage(locale);
  const suffix = getClassSuffix(locale);
  return languagePackage && languagePackage[`Lang${suffix}`];
}

function registerLanguage(container, locale) {
  if (isPrivateUseLocale(locale)) {
    return true;
  }
  const packageKey = getPackageKey(locale);
  const LanguageClass = getLanguageClass(locale);
  if (!LanguageClass) {
    throw new LocaleError(
      `Language package @lumen-labs-dev/lang-${packageKey} is required for locale "${getLocale(locale)}". ` +
        `Install it or install @lumen-labs-dev/lang-all for all bundled languages.`
    );
  }
  let loaded = loadedContainers.get(container);
  if (!loaded) {
    loaded = new Set();
    loadedContainers.set(container, loaded);
  }
  if (!loaded.has(packageKey)) {
    container.use(LanguageClass);
    loaded.add(packageKey);
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
  registerLanguage(container, DEFAULT_LOCALE);
  registerLanguages(container, settings.languages);
  registerLanguages(container, settings.locales);
}

function getClass(locale, prefix) {
  const languagePackage = getLanguagePackage(locale);
  const suffix = getClassSuffix(locale);
  return languagePackage && languagePackage[`${prefix}${suffix}`];
}

module.exports = {
  getClass,
  getLocale,
  getPackageKey,
  registerDefaultLanguages,
  registerLanguage,
  registerLanguages,
};
