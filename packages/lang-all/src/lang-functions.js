const { Language } = require('@lumen-labs-dev/language');
const langAr = require('@lumen-labs-dev/lang-ar');
const langBr = require('@lumen-labs-dev/lang-bn');
const langCa = require('@lumen-labs-dev/lang-ca');
const langCs = require('@lumen-labs-dev/lang-cs');
const langDa = require('@lumen-labs-dev/lang-da');
const langDe = require('@lumen-labs-dev/lang-de');
const langEl = require('@lumen-labs-dev/lang-el');
const langEn = require('@lumen-labs-dev/lang-en');
const langEs = require('@lumen-labs-dev/lang-es');
const langEu = require('@lumen-labs-dev/lang-eu');
const langFa = require('@lumen-labs-dev/lang-fa');
const langFi = require('@lumen-labs-dev/lang-fi');
const langFr = require('@lumen-labs-dev/lang-fr');
const langGa = require('@lumen-labs-dev/lang-ga');
const langGl = require('@lumen-labs-dev/lang-gl');
const langHi = require('@lumen-labs-dev/lang-hi');
const langHu = require('@lumen-labs-dev/lang-hu');
const langHy = require('@lumen-labs-dev/lang-hy');
const langId = require('@lumen-labs-dev/lang-id');
const langIt = require('@lumen-labs-dev/lang-it');
const langJa = require('@lumen-labs-dev/lang-ja');
const langKo = require('@lumen-labs-dev/lang-ko');
const langLt = require('@lumen-labs-dev/lang-lt');
const langMs = require('@lumen-labs-dev/lang-ms');
const langNe = require('@lumen-labs-dev/lang-ne');
const langNl = require('@lumen-labs-dev/lang-nl');
const langNo = require('@lumen-labs-dev/lang-no');
const langPl = require('@lumen-labs-dev/lang-pl');
const langPt = require('@lumen-labs-dev/lang-pt');
const langRo = require('@lumen-labs-dev/lang-ro');
const langRu = require('@lumen-labs-dev/lang-ru');
const langSl = require('@lumen-labs-dev/lang-sl');
const langSr = require('@lumen-labs-dev/lang-sr');
const langSv = require('@lumen-labs-dev/lang-sv');
const langTa = require('@lumen-labs-dev/lang-ta');
const langTh = require('@lumen-labs-dev/lang-th');
const langTl = require('@lumen-labs-dev/lang-tl');
const langTr = require('@lumen-labs-dev/lang-tr');
const langUk = require('@lumen-labs-dev/lang-uk');
const langZh = require('@lumen-labs-dev/lang-zh');

const langs = {
  ar: langAr,
  br: langBr,
  ca: langCa,
  cs: langCs,
  da: langDa,
  de: langDe,
  el: langEl,
  en: langEn,
  es: langEs,
  eu: langEu,
  fa: langFa,
  fi: langFi,
  fr: langFr,
  ga: langGa,
  gl: langGl,
  hi: langHi,
  hu: langHu,
  hy: langHy,
  id: langId,
  it: langIt,
  ja: langJa,
  ko: langKo,
  lt: langLt,
  ms: langMs,
  ne: langNe,
  nl: langNl,
  no: langNo,
  pl: langPl,
  pt: langPt,
  ro: langRo,
  ru: langRu,
  sl: langSl,
  sr: langSr,
  sv: langSv,
  ta: langTa,
  th: langTh,
  tl: langTl,
  tr: langTr,
  uk: langUk,
  zh: langZh,
};

const language = new Language();
const langDict = {};
const keys = Object.keys(language.languagesAlpha2);

for (let i = 0; i < keys.length; i += 1) {
  const key = keys[i];
  const langData = language.languagesAlpha2[key];
  langDict[key] = key;
  langDict[langData.alpha3] = key;
  langDict[langData.name.toLowerCase()] = key;
}

function getLangClass(inputLanguage, className) {
  let locale = langDict[inputLanguage.toLowerCase()];
  if (!locale) {
    locale = langDict[inputLanguage.toLowerCase().slice(0, 2)] || 'en';
  }
  const lang = langs[locale];
  if (!lang) {
    throw new Error(
      `Language classes not found for language "${inputLanguage}"`
    );
  }
  const localeCapitalized = `${locale.charAt(0).toUpperCase()}${locale.slice(
    1
  )}`;
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
