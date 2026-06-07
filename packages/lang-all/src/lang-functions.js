const { Language } = require('@lumen-labs-dev/language');
const langAr = require('@lumen-labs-dev/lang-ar-sa');
const langBr = require('@lumen-labs-dev/lang-bn-bd');
const langCa = require('@lumen-labs-dev/lang-ca-es');
const langCs = require('@lumen-labs-dev/lang-cs-cz');
const langDa = require('@lumen-labs-dev/lang-da-dk');
const langDe = require('@lumen-labs-dev/lang-de-de');
const langEl = require('@lumen-labs-dev/lang-el-gr');
const langEn = require('@lumen-labs-dev/lang-en-us');
const langEs = require('@lumen-labs-dev/lang-es-es');
const langEu = require('@lumen-labs-dev/lang-eu-es');
const langFa = require('@lumen-labs-dev/lang-fa-ir');
const langFi = require('@lumen-labs-dev/lang-fi-fi');
const langFr = require('@lumen-labs-dev/lang-fr-fr');
const langGa = require('@lumen-labs-dev/lang-ga-ie');
const langGl = require('@lumen-labs-dev/lang-gl-es');
const langHi = require('@lumen-labs-dev/lang-hi-in');
const langHu = require('@lumen-labs-dev/lang-hu-hu');
const langHy = require('@lumen-labs-dev/lang-hy-am');
const langId = require('@lumen-labs-dev/lang-id-id');
const langIt = require('@lumen-labs-dev/lang-it-it');
const langJa = require('@lumen-labs-dev/lang-ja-jp');
const langKo = require('@lumen-labs-dev/lang-ko-kr');
const langLt = require('@lumen-labs-dev/lang-lt-lt');
const langMs = require('@lumen-labs-dev/lang-ms-my');
const langNe = require('@lumen-labs-dev/lang-ne-np');
const langNl = require('@lumen-labs-dev/lang-nl-nl');
const langNo = require('@lumen-labs-dev/lang-no-no');
const langPl = require('@lumen-labs-dev/lang-pl-pl');
const langPt = require('@lumen-labs-dev/lang-pt-pt');
const langPtBr = require('@lumen-labs-dev/lang-pt-br');
const langRo = require('@lumen-labs-dev/lang-ro-ro');
const langRu = require('@lumen-labs-dev/lang-ru-ru');
const langSl = require('@lumen-labs-dev/lang-sl-si');
const langSr = require('@lumen-labs-dev/lang-sr-rs');
const langSv = require('@lumen-labs-dev/lang-sv-se');
const langTa = require('@lumen-labs-dev/lang-ta-in');
const langTh = require('@lumen-labs-dev/lang-th-th');
const langTl = require('@lumen-labs-dev/lang-tl-ph');
const langTr = require('@lumen-labs-dev/lang-tr-tr');
const langUk = require('@lumen-labs-dev/lang-uk-ua');
const langZh = require('@lumen-labs-dev/lang-zh-cn');

const defaultLocales = {
  ar: 'ar-sa',
  bn: 'bn-bd',
  ca: 'ca-es',
  cs: 'cs-cz',
  da: 'da-dk',
  de: 'de-de',
  el: 'el-gr',
  en: 'en-us',
  es: 'es-es',
  eu: 'eu-es',
  fa: 'fa-ir',
  fi: 'fi-fi',
  fr: 'fr-fr',
  ga: 'ga-ie',
  gl: 'gl-es',
  hi: 'hi-in',
  hu: 'hu-hu',
  hy: 'hy-am',
  id: 'id-id',
  it: 'it-it',
  ja: 'ja-jp',
  ko: 'ko-kr',
  lt: 'lt-lt',
  ms: 'ms-my',
  ne: 'ne-np',
  nl: 'nl-nl',
  no: 'no-no',
  pl: 'pl-pl',
  pt: 'pt-pt',
  ro: 'ro-ro',
  ru: 'ru-ru',
  sl: 'sl-si',
  sr: 'sr-rs',
  sv: 'sv-se',
  ta: 'ta-in',
  th: 'th-th',
  tl: 'tl-ph',
  tr: 'tr-tr',
  uk: 'uk-ua',
  zh: 'zh-cn',
};

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

const langs = {
  'ar-sa': langAr,
  'bn-bd': langBr,
  'ca-es': langCa,
  'cs-cz': langCs,
  'da-dk': langDa,
  'de-de': langDe,
  'el-gr': langEl,
  'en-us': langEn,
  'es-es': langEs,
  'eu-es': langEu,
  'fa-ir': langFa,
  'fi-fi': langFi,
  'fr-fr': langFr,
  'ga-ie': langGa,
  'gl-es': langGl,
  'hi-in': langHi,
  'hu-hu': langHu,
  'hy-am': langHy,
  'id-id': langId,
  'it-it': langIt,
  'ja-jp': langJa,
  'ko-kr': langKo,
  'lt-lt': langLt,
  'ms-my': langMs,
  'ne-np': langNe,
  'nl-nl': langNl,
  'no-no': langNo,
  'pl-pl': langPl,
  'pt-br': langPtBr,
  'pt-pt': langPt,
  'ro-ro': langRo,
  'ru-ru': langRu,
  'sl-si': langSl,
  'sr-rs': langSr,
  'sv-se': langSv,
  'ta-in': langTa,
  'th-th': langTh,
  'tl-ph': langTl,
  'tr-tr': langTr,
  'uk-ua': langUk,
  'zh-cn': langZh,
};

const language = new Language();
const langDict = {};
const keys = Object.keys(language.languagesAlpha2);

for (let i = 0; i < keys.length; i += 1) {
  const key = keys[i];
  const langData = language.languagesAlpha2[key];
  const locale = defaultLocales[key] || key;
  langDict[key] = locale;
  langDict[langData.alpha3] = locale;
  langDict[langData.name.toLowerCase()] = locale;
}

langDict['pt-br'] = 'pt-br';
langDict.pt_br = 'pt-br';
langDict['brazilian portuguese'] = 'pt-br';
langDict['pt-pt'] = 'pt-pt';
langDict.pt_pt = 'pt-pt';
langDict['portuguese portugal'] = 'pt-pt';

function getLangClass(inputLanguage, className) {
  const normalized = inputLanguage.toLowerCase().replace('_', '-');
  let locale = langDict[normalized];
  if (!locale) {
    locale = langDict[normalized.slice(0, 2)] || defaultLocales.en;
  }
  const lang = langs[locale];
  if (!lang) {
    throw new Error(
      `Language classes not found for language "${inputLanguage}"`
    );
  }
  const localeCapitalized =
    classSuffixes[locale] ||
    locale
      .split('-')
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join('');
  return lang[`${className}${localeCapitalized}`];
}

function getNormalizer(inputLanguage = 'en') {
  const Clazz = getLangClass(inputLanguage, 'Normalizer');
  if (Clazz) {
    return new Clazz();
  }
  return undefined;
}

function getTokenizer(inputLanguage = 'en') {
  const Clazz = getLangClass(inputLanguage, 'Tokenizer');
  if (Clazz) {
    return new Clazz();
  }
  return undefined;
}

function getStemmer(inputLanguage = 'en') {
  const Clazz = getLangClass(inputLanguage, 'Stemmer');
  if (Clazz) {
    return new Clazz();
  }
  return undefined;
}

function getStopwords(inputLanguage = 'en') {
  const Clazz = getLangClass(inputLanguage, 'Stopwords');
  if (Clazz) {
    return new Clazz();
  }
  return undefined;
}

function getSentiment(inputLanguage = 'en') {
  const Clazz = getLangClass(inputLanguage, 'Sentiment');
  if (Clazz) {
    return new Clazz();
  }
  return undefined;
}

function normalize(text, locale = 'en') {
  const normalizer = getNormalizer(locale);
  return normalizer.normalize(text);
}

function tokenize(text, locale = 'en', shouldNormalize = false) {
  const tokenizer = getTokenizer(locale);
  return tokenizer.tokenize(text, shouldNormalize);
}

function stem(text, locale = 'en') {
  const stemmer = getStemmer(locale);
  if (Array.isArray(text)) {
    return stemmer.stem(text);
  }
  const normalizer = getNormalizer(locale);
  const tokenizer = getTokenizer(locale);
  return stemmer.stem(tokenizer.tokenize(normalizer.normalize(text)));
}

function removeStopwords(tokens, locale = 'en') {
  const stopwords = getStopwords(locale);
  return stopwords.removeStopwords(tokens);
}

function dict(sentences, locale = 'en', useStemmer = false) {
  const freqs = {};
  for (let i = 0; i < sentences.length; i += 1) {
    const current = useStemmer
      ? stem(sentences[i], locale)
      : tokenize(sentences[i], locale).map((x) => x.toLowerCase());
    for (let j = 0; j < current.length; j += 1) {
      freqs[current[j]] = (freqs[current[j]] || 0) + 1;
    }
  }
  const positions = {};
  const words = Object.keys(freqs);
  for (let i = 0; i < words.length; i += 1) {
    positions[words[i]] = i;
  }
  return {
    locale,
    useStemmer,
    freqs,
    positions,
    keys: words,
    length: words.length,
  };
}

function bow(sentence, voc) {
  const current = voc.useStemmer
    ? stem(sentence, voc.locale)
    : tokenize(sentence, voc.locale).map((x) => x.toLowerCase());
  const result = new Array(voc.length).fill(0);
  for (let i = 0; i < current.length; i += 1) {
    const index = voc.positions[current[i]];
    if (index !== undefined) {
      result[index] = 1;
    }
  }
  return result;
}

module.exports = {
  langs,
  language,
  langDict,
  getNormalizer,
  getTokenizer,
  getStemmer,
  getStopwords,
  getSentiment,
  normalize,
  tokenize,
  stem,
  removeStopwords,
  dict,
  bow,
};
