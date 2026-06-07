const fs = require('fs');
const path = require('path');

const LEGACY_TO_BCP47 = {
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

const skipFiles = new Set([
  path.normalize('packages/core/test/locale.test.js'),
]);

function shouldSkip(file) {
  const relative = path.relative(process.cwd(), file);
  return skipFiles.has(path.normalize(relative));
}

const methodPatterns = [
  [/addLanguage\('en'\)/g, "addLanguage('en-US')"],
  [/addLanguage\('es'\)/g, "addLanguage('es-ES')"],
  [/addLanguage\('fr'\)/g, "addLanguage('fr-FR')"],
  [/addLanguage\('ko'\)/g, "addLanguage('ko-KR')"],
  [/addLanguage\('th'\)/g, "addLanguage('th-TH')"],
  [/addLanguage\('hi'\)/g, "addLanguage('hi-IN')"],
  [/addLanguage\('bn'\)/g, "addLanguage('bn-BD')"],
  [/addLanguage\('de'\)/g, "addLanguage('de-DE')"],
  [/addLanguage\('it'\)/g, "addLanguage('it-IT')"],
  [/addLanguage\('pt'\)/g, "addLanguage('pt-PT')"],
  [/addLanguage\('ja'\)/g, "addLanguage('ja-JP')"],
  [/addLanguage\('zh'\)/g, "addLanguage('zh-CN')"],
  [
    /addLanguage\(\['en', 'es', 'fr'\]\)/g,
    "addLanguage(['en-US', 'es-ES', 'fr-FR'])",
  ],
  [/addLanguage\(\['en', 'es'\]\)/g, "addLanguage(['en-US', 'es-ES'])"],
  [/addLanguage\(\['en'\]\)/g, "addLanguage(['en-US'])"],
  [/addLanguage\(\['es'\]\)/g, "addLanguage(['es-ES'])"],
  [/addDocument\('en',/g, "addDocument('en-US',"],
  [/addDocument\('es',/g, "addDocument('es-ES',"],
  [/addDocument\('fr',/g, "addDocument('fr-FR',"],
  [/addDocument\('ko',/g, "addDocument('ko-KR',"],
  [/removeDocument\('en',/g, "removeDocument('en-US',"],
  [/removeDocument\('es',/g, "removeDocument('es-ES',"],
  [/manager\.add\('en',/g, "manager.add('en-US',"],
  [/manager\.add\('es',/g, "manager.add('es-ES',"],
  [/manager\.remove\('en',/g, "manager.remove('en-US',"],
  [/manager\.remove\('es',/g, "manager.remove('es-ES',"],
  [/assignDomain\('en',/g, "assignDomain('en-US',"],
  [/assignDomain\('es',/g, "assignDomain('es-ES',"],
  [/getIntentDomain\('en',/g, "getIntentDomain('en-US',"],
  [/getIntentDomain\('es',/g, "getIntentDomain('es-ES',"],
  [/process\('en',/g, "process('en-US',"],
  [/process\('es',/g, "process('es-ES',"],
  [/process\('fr',/g, "process('fr-FR',"],
  [/process\('ko',/g, "process('ko-KR',"],
  [/process\('th',/g, "process('th-TH',"],
  [/process\('hi',/g, "process('hi-IN',"],
  [/process\('bn',/g, "process('bn-BD',"],
  [/locales: \['en', 'es'\]/g, "locales: ['en-US', 'es-ES']"],
  [/locales: \['en'\]/g, "locales: ['en-US']"],
  [/locale: 'en'/g, "locale: 'en-US'"],
  [/locale: 'es'/g, "locale: 'es-ES'"],
  [/locale: 'fr'/g, "locale: 'fr-FR'"],
  [/locale: 'de'/g, "locale: 'de-DE'"],
  [/locale: 'it'/g, "locale: 'it-IT'"],
  [/locale: 'pt'/g, "locale: 'pt-PT'"],
  [/locale: 'ko'/g, "locale: 'ko-KR'"],
  [/locale: 'ja'/g, "locale: 'ja-JP'"],
  [/locale: 'zh'/g, "locale: 'zh-CN'"],
  [/locale: 'th'/g, "locale: 'th-TH'"],
  [/locale: 'hi'/g, "locale: 'hi-IN'"],
  [/locale: 'bn'/g, "locale: 'bn-BD'"],
  [/locale: 'nl'/g, "locale: 'nl-NL'"],
  [/locale: 'ar'/g, "locale: 'ar-SA'"],
  [/locale: 'id'/g, "locale: 'id-ID'"],
  [/locale: 'ru'/g, "locale: 'ru-RU'"],
  [/toEqual\(\['en', 'es'\]\)/g, "toEqual(['en-US', 'es-ES'])"],
  [/toEqual\(\['en'\]\)/g, "toEqual(['en-US'])"],
  [/intentDomains\.en\./g, "intentDomains['en-US']."],
  [/intentDomains\.es\./g, "intentDomains['es-ES']."],
  [/domainManagers\.en/g, "domainManagers['en-US']"],
  [/domainManagers\.es/g, "domainManagers['es-ES']"],
  [/\.rules\.en/g, ".rules['en-US']"],
  [/\.rules\.es/g, ".rules['es-ES']"],
  [/addRule\('en',/g, "addRule('en-US',"],
  [/addRule\('es',/g, "addRule('es-ES',"],
  [/removeRule\('en',/g, "removeRule('en-US',"],
  [/removeRule\('es',/g, "removeRule('es-ES',"],
  [/addRuleOptionTexts\('en',/g, "addRuleOptionTexts('en-US',"],
  [/addRuleOptionTexts\('es',/g, "addRuleOptionTexts('es-ES',"],
  [/removeRuleOptionTexts\('en',/g, "removeRuleOptionTexts('en-US',"],
  [/removeRuleOptionTexts\('es',/g, "removeRuleOptionTexts('es-ES',"],
  [/addRegexRule\('en',/g, "addRegexRule('en-US',"],
  [/addRegexRule\('es',/g, "addRegexRule('es-ES',"],
  [/describeLanguage\('kl'/g, "describeLanguage('x-klingon'"],
  [/addLanguage\('kl'\)/g, "addLanguage('x-klingon')"],
  [/addDocument\('kl',/g, "addDocument('x-klingon',"],
  [/process\('kl'/g, "process('x-klingon'"],
  [/locale: 'kl'/g, "locale: 'x-klingon'"],
  [/expect\(language\)\.toEqual\('en'\)/g, "expect(language).toEqual('en-US')"],
  [/expect\(language\)\.toEqual\('es'\)/g, "expect(language).toEqual('es-ES')"],
  [
    /Object\.keys\(manager\.domainManagers\)\)\.toEqual\(\['en', 'es'\]\)/g,
    "Object.keys(manager.domainManagers)).toEqual(['en-US', 'es-ES'])",
  ],
  [
    /Object\.keys\(manager\.domainManagers\)\)\.toEqual\(\['en'\]\)/g,
    "Object.keys(manager.domainManagers)).toEqual(['en-US'])",
  ],
  [/settings\.locale\)\.toEqual\('en'\)/g, "settings.locale).toEqual('en-US')"],
  [/addAnswer\('en',/g, "addAnswer('en-US',"],
  [/addAnswer\('es',/g, "addAnswer('es-ES',"],
  [
    /addNamedEntityText\([^,]+,[^,]+,\s*\['en'\]/g,
    (m) => m.replace("'en'", "'en-US'"),
  ],
  [/addNerRegexRule\('en',/g, "addNerRegexRule('en-US',"],
  [/addNerRegexRule\('es',/g, "addNerRegexRule('es-ES',"],
  [/addBetweenCondition\('en',/g, "addBetweenCondition('en-US',"],
  [/addBeforeFirstCondition\('en',/g, "addBeforeFirstCondition('en-US',"],
  [/addAfterLastCondition\('en',/g, "addAfterLastCondition('en-US',"],
  [/addBeforeCondition\('en',/g, "addBeforeCondition('en-US',"],
  [/addBeforeLastCondition\('en',/g, "addBeforeLastCondition('en-US',"],
  [/addAfterCondition\('en',/g, "addAfterCondition('en-US',"],
  [/addAfterFirstCondition\('en',/g, "addAfterFirstCondition('en-US',"],
  [/addBetweenLastCondition\('en',/g, "addBetweenLastCondition('en-US',"],
  [/removeLanguage\('en'\)/g, "removeLanguage('en-US')"],
  [/removeLanguage\('es'\)/g, "removeLanguage('es-ES')"],
  [/removeLanguage\(\['en', 'es'\]\)/g, "removeLanguage(['en-US', 'es-ES'])"],
  [
    /removeLanguage\(\['en', 'en', 'es', 'fr'\]\)/g,
    "removeLanguage(['en-US', 'en-US', 'es-ES', 'fr-FR'])",
  ],
  [
    /removeLanguage\(\['en', 'en', 'es', 'es', 'fr'\]\)/g,
    "removeLanguage(['en-US', 'en-US', 'es-ES', 'es-ES', 'fr-FR'])",
  ],
  [
    /addLanguage\(\['en', 'en', 'es', 'fr'\]\)/g,
    "addLanguage(['en-US', 'en-US', 'es-ES', 'fr-FR'])",
  ],
  [/addLanguage\(\['en', 'ja'\]\)/g, "addLanguage(['en-US', 'ja-JP'])"],
  [/addLanguage\(\['en', 'ko'\]\)/g, "addLanguage(['en-US', 'ko-KR'])"],
  [/addLanguage\(\['en', 'kl'\]\)/g, "addLanguage(['en-US', 'x-klingon'])"],
  [/addLanguage\(\['fr', 'ja'\]\)/g, "addLanguage(['fr-FR', 'ja-JP'])"],
  [
    /addLanguage\(\['en', 'es', 'it', 'fr'\]\)/g,
    "addLanguage(['en-US', 'es-ES', 'it-IT', 'fr-FR'])",
  ],
  [/addLanguage\(\['en', 'fr'\]\)/g, "addLanguage(['en-US', 'fr-FR'])"],
  [/removeLanguage\(\['en', 'fr'\]\)/g, "removeLanguage(['en-US', 'fr-FR'])"],
  [/languages: \['en', 'ko'\]/g, "languages: ['en-US', 'ko-KR']"],
  [/languages: \['en', 'kl'\]/g, "languages: ['en-US', 'x-klingon']"],
  [/languages: \['fr'\]/g, "languages: ['fr-FR']"],
  [/languages: \['en', 'ja'\]/g, "languages: ['en-US', 'ja-JP']"],
  [/classify\('fr',/g, "classify('fr-FR',"],
  [/train\('fr'\)/g, "train('fr-FR')"],
  [/train\(\['fr', 'ja', 'es'\]\)/g, "train(['fr-FR', 'ja-JP', 'es-ES'])"],
  [/process\(\s*'es',/g, "process('es-ES',"],
  [/remove\('fr',/g, "remove('fr-FR',"],
  [/removeDocument\('fr',/g, "removeDocument('fr-FR',"],
  [/toContain\('fr'\)/g, "toContain('fr-FR')"],
  [/toContain\('it'\)/g, "toContain('it-IT')"],
  [/not\.toContain\('fr'\)/g, "not.toContain('fr-FR')"],
  [
    /addNerRuleOptionTexts\(\['en', 'es'\]/g,
    "addNerRuleOptionTexts(['en-US', 'es-ES']",
  ],
  [
    /removeNerRuleOptionTexts\(\['en', 'es'\]/g,
    "removeNerRuleOptionTexts(['en-US', 'es-ES']",
  ],
  [
    /addRuleOptionTexts\(\['en', 'es'\]/g,
    "addRuleOptionTexts(['en-US', 'es-ES']",
  ],
  [
    /removeRuleOptionTexts\(\['en', 'es'\]/g,
    "removeRuleOptionTexts(['en-US', 'es-ES']",
  ],
  [/locale: \['en', 'es'\]/g, "locale: ['en-US', 'es-ES']"],
  [/language: 'fr'/g, "language: 'fr-FR'"],
  [/BrainNLU\(\{ language: 'fr'/g, "BrainNLU({ language: 'fr-FR'"],
  [
    /toThrow\(\s*'Domain Manager not found for locale fr'/g,
    "toThrow('Domain Manager not found for locale fr-FR')",
  ],
  [
    /expect\(result\.localeIso2\)\.toEqual\('en-US'\)/g,
    "expect(result.localeIso2).toEqual('en')",
  ],
  [
    /expect\(result\.localeIso2\)\.toEqual\('es-ES'\)/g,
    "expect(result.localeIso2).toEqual('es')",
  ],
  [
    /expect\(result\.localeIso2\)\.toEqual\('fr-FR'\)/g,
    "expect(result.localeIso2).toEqual('fr')",
  ],
  [
    /expect\(result\.localeIso2\)\.toEqual\('ja-JP'\)/g,
    "expect(result.localeIso2).toEqual('ja')",
  ],
  [
    /expect\(actual\.localeIso2\)\.toEqual\('en-US'\)/g,
    "expect(actual.localeIso2).toEqual('en')",
  ],
  [
    /expect\(actual\.localeIso2\)\.toEqual\('es-ES'\)/g,
    "expect(actual.localeIso2).toEqual('es')",
  ],
];

for (const [legacy, bcp47] of Object.entries(LEGACY_TO_BCP47)) {
  methodPatterns.push([
    new RegExp(`getTokenizer\\('${legacy}'\\)`, 'g'),
    `getTokenizer('${bcp47}')`,
  ]);
  methodPatterns.push([
    new RegExp(`getStemmer\\('${legacy}'\\)`, 'g'),
    `getStemmer('${bcp47}')`,
  ]);
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory() && name !== 'node_modules') walk(p, files);
    else if (/\.(test|spec)\.js$/.test(name) || name === 'domains.js')
      files.push(p);
  }
  return files;
}

const roots = ['packages', 'examples'];
let count = 0;
for (const root of roots) {
  const full = path.join(process.cwd(), root);
  if (!fs.existsSync(full)) continue;
  for (const file of walk(full)) {
    if (shouldSkip(file)) {
      continue;
    }
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    for (const [re, rep] of methodPatterns) {
      content =
        typeof rep === 'function'
          ? content.replace(re, rep)
          : content.replace(re, rep);
    }
    if (content !== original) {
      fs.writeFileSync(file, content);
      count += 1;
    }
  }
}
console.log(`Updated ${count} files`);
