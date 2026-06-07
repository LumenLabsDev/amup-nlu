# Language Support

> **npm scope:** native language packages are published as `@lumen-labs-dev/lang-{language}-{region}`. Examples: `@lumen-labs-dev/lang-en-us`, `@lumen-labs-dev/lang-es-es`, `@lumen-labs-dev/lang-pt-pt`, `@lumen-labs-dev/lang-pt-br`. Install `@lumen-labs-dev/lang-all` to pull in every locale package, or install only the locales you need.

## Locale packages

| Runtime locale | npm package |
|----------------|-------------|
| `en-US` | `@lumen-labs-dev/lang-en-us` |
| `es`, `es-ES` | `@lumen-labs-dev/lang-es-es` |
| `fr`, `fr-FR` | `@lumen-labs-dev/lang-fr-fr` |
| `pt`, `pt-PT` | `@lumen-labs-dev/lang-pt-pt` |
| `pt-BR` | `@lumen-labs-dev/lang-pt-br` |
| `zh`, `zh-CN` | `@lumen-labs-dev/lang-zh-cn` |
| all native locales | `@lumen-labs-dev/lang-all` |

## Supported languages

Native support means that the tokenizer and stemmer are included in JavaScript in this library. Languages not included in this list can still be used with explicit locale handling and generic tokenization, but without language-specific stemming.

| Locale | Language | Native Support | Sentiment |
|--------|----------|----------------|-----------|
| ar | Arabic | X | X |
| bn | Bengali | X | X |
| ca | Catalan | X | X |
| cs | Czech | X | X |
| da | Danish | X | X |
| de | German | X | X |
| el | Greek | X | X |
| en | English | X | X |
| es | Spanish | X | X |
| eu | Basque | X | X |
| fa | Persian (Farsi) | X | X |
| fi | Finnish | X | X |
| fr | French | X | X |
| ga | Irish | X | X |
| gl | Galician | X | X |
| hi | Hindi | X | X |
| hu | Hungarian | X | X |
| hy | Armenian | X | X |
| id | Indonesian | X | X |
| it | Italian | X | X |
| ja | Japanese | X |  |
| ko | Korean | X | X |
| lt | Lithuanian | X | X |
| ms | Malay | X |  |
| nb | Norwegian (Bokmal) | X | X |
| ne | Nepali | X | X |
| nl | Dutch | X | X |
| pl | Polish | X | X |
| pt | Portuguese | X | X |
| ro | Romanian | X | X |
| ru | Russian | X | X |
| sl | Slovenian | X | X |
| sr | Serbian | X | X |
| sv | Swedish | X | X |
| ta | Tamil | X | X |
| th | Thai | X | X |
| tl | Tagalog | X | X |
| tr | Turkish | X | X |
| uk | Ukrainian | X | X |
| zh | Chinese (Simplified) | X |  |

## Example with several languages

English and Korean are auto-detected; fantasy languages (for example Klingon via `describeLanguage`) work with tokenization only. Pass the locale explicitly when processing unsupported languages.

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic', 'LangEn', 'LangKo'] });
  const nlp = dock.get('nlp');
  nlp.addLanguage('en-US');
  nlp.addLanguage('ko-KR');
  nlp.addDocument('en-US', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en-US', 'hello', 'greetings.hello');
  nlp.addDocument('ko-KR', '안녕', 'greetings.bye');
  nlp.addDocument('ko-KR', '여보세요', 'greetings.hello');
  nlp.addAnswer('en-US', 'greetings.bye', 'Till next time');
  nlp.addAnswer('en-US', 'greetings.hello', 'Hey there!');

  await nlp.train();
  nlp.process('I have to go').then(console.log);
  nlp.process('상대가 없어 남는 편').then(console.log);
})();
```
