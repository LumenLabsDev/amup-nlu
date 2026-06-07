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

const DEFAULT_LOCALE = 'en-US';

const LEGACY_LOCALE_MAP = {
  ar: 'ar-SA',
  bn: 'bn-BD',
  ca: 'ca-ES',
  cs: 'cs-CZ',
  da: 'da-DK',
  de: 'de-DE',
  el: 'el-GR',
  en: 'en-US',
  es: 'es-ES',
  eu: 'eu-ES',
  fa: 'fa-IR',
  fi: 'fi-FI',
  fr: 'fr-FR',
  ga: 'ga-IE',
  gl: 'gl-ES',
  hi: 'hi-IN',
  hu: 'hu-HU',
  hy: 'hy-AM',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  lt: 'lt-LT',
  ms: 'ms-MY',
  ne: 'ne-NP',
  nl: 'nl-NL',
  no: 'no-NO',
  pl: 'pl-PL',
  pt: 'pt-PT',
  ro: 'ro-RO',
  ru: 'ru-RU',
  sl: 'sl-SI',
  sr: 'sr-SR',
  sv: 'sv-SE',
  ta: 'ta-IN',
  th: 'th-TH',
  tl: 'tl-PH',
  tr: 'tr-TR',
  uk: 'uk-UA',
  zh: 'zh-CN',
};

const CONTAINER_KEY_OVERRIDES = {
  'pt-BR': 'pt-br',
  'pt-PT': 'pt',
};

class LocaleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LocaleError';
  }
}

function isPrivateUseTag(parts) {
  return parts.length > 0 && parts[0].toLowerCase() === 'x';
}

function isLanguageOnlyTag(tag) {
  if (typeof tag !== 'string' || !tag) {
    return false;
  }
  const normalized = tag.replace(/_/g, '-');
  const parts = normalized.split('-').filter(Boolean);
  if (isPrivateUseTag(parts)) {
    return false;
  }
  return parts.length === 1;
}

function canonicalizeSubtag(subtag, index) {
  if (index === 0) {
    return subtag.toLowerCase();
  }
  if (subtag.length === 2) {
    return subtag.toUpperCase();
  }
  if (subtag.length === 4) {
    return `${subtag.charAt(0).toUpperCase()}${subtag.slice(1).toLowerCase()}`;
  }
  if (subtag.length === 3 && /^\d{3}$/.test(subtag)) {
    return subtag;
  }
  if (subtag.length === 3) {
    return subtag.toUpperCase();
  }
  return subtag.toLowerCase();
}

function canonicalizeTag(parts) {
  if (isPrivateUseTag(parts)) {
    return parts
      .map((part, index) =>
        index === 0 ? part.toLowerCase() : part.toLowerCase()
      )
      .join('-');
  }
  return parts.map((part, index) => canonicalizeSubtag(part, index)).join('-');
}

function parseLocale(input, options = {}) {
  if (typeof input !== 'string' || !input.trim()) {
    throw new LocaleError('Locale must be a non-empty string');
  }
  const normalized = input.trim().replace(/_/g, '-');
  const parts = normalized.split('-').filter(Boolean);
  if (parts.length === 0) {
    throw new LocaleError('Locale must be a valid BCP 47 tag');
  }

  if (isPrivateUseTag(parts)) {
    const canonical = canonicalizeTag(parts);
    return { canonical, packageKey: canonical.toLowerCase() };
  }

  if (parts.length === 1) {
    const legacy = LEGACY_LOCALE_MAP[parts[0].toLowerCase()];
    if (legacy && options.allowLegacy) {
      return parseLocale(legacy);
    }
    throw new LocaleError(
      `Locale must be a BCP 47 tag with a region (e.g. en-US). Bare language codes like '${parts[0]}' are not supported.`
    );
  }

  const canonical = canonicalizeTag(parts);
  const packageKey = canonical
    .split('-')
    .map((part, index) =>
      index === 0 ? part.toLowerCase() : part.toLowerCase()
    )
    .join('-');

  return { canonical, packageKey };
}

function assertLocale(input, options = {}) {
  return parseLocale(input, options).canonical;
}

function getLanguageSubtag(locale) {
  const { canonical } = parseLocale(locale);
  if (isPrivateUseTag(canonical.split('-'))) {
    return canonical.toLowerCase();
  }
  return canonical.split('-')[0].toLowerCase();
}

function resolveContainerKey(locale) {
  const { canonical } = parseLocale(locale);
  if (CONTAINER_KEY_OVERRIDES[canonical]) {
    return CONTAINER_KEY_OVERRIDES[canonical];
  }
  if (isPrivateUseTag(canonical.split('-'))) {
    return canonical.toLowerCase();
  }
  return getLanguageSubtag(canonical);
}

function migrateLegacyLocale(locale) {
  if (typeof locale !== 'string' || !locale) {
    return locale;
  }
  const trimmed = locale.trim();
  if (trimmed.includes('-') || trimmed.includes('_')) {
    return parseLocale(trimmed).canonical;
  }
  const mapped = LEGACY_LOCALE_MAP[trimmed.toLowerCase()];
  if (mapped) {
    return mapped;
  }
  return parseLocale(trimmed).canonical;
}

function resolveLocaleFromGuess(alpha2, configuredLocales) {
  if (!alpha2 || !configuredLocales || configuredLocales.length === 0) {
    return undefined;
  }
  const normalized = configuredLocales.map(
    (locale) => parseLocale(locale).canonical
  );
  const matches = normalized.filter(
    (locale) => getLanguageSubtag(locale) === alpha2.toLowerCase()
  );
  if (matches.length === 1) {
    return matches[0];
  }
  if (matches.length > 1) {
    throw new LocaleError(
      `Ambiguous language guess '${alpha2}' matches multiple configured locales: ${matches.join(', ')}`
    );
  }
  return undefined;
}

function getLocaleTag(locale) {
  return parseLocale(locale).packageKey;
}

module.exports = {
  DEFAULT_LOCALE,
  LEGACY_LOCALE_MAP,
  LocaleError,
  assertLocale,
  getLanguageSubtag,
  getLocaleTag,
  isLanguageOnlyTag,
  migrateLegacyLocale,
  parseLocale,
  resolveContainerKey,
  resolveLocaleFromGuess,
};
