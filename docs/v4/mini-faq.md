# Mini-FAQ

> **npm scope:** all packages install from `@lumen-labs-dev/*` on npm. There is no unscoped `node-nlp` package in this fork. See the [package overview](../../README.md#npm-packages-lumen-labs-dev) for common entry points.

This is a mini FAQ for some v4 topics:

Hi,

I will put here a FAQ with the links to different interesting parts to documentation or examples. If there is something that you want to cover that is not here, just ask, and I will update the documentation with it. Also, there are 1800 unit tests that can help to understand classes and functions that are not intended to be the API for the developer. For new projects, start with `@lumen-labs-dev/basic` and the `nlp` plugin from the container (`dock.get('nlp')`).

**- What is `@lumen-labs-dev`?** This repository publishes NLP.js packages under the `@lumen-labs-dev` npm scope. Install `@lumen-labs-dev/basic` for new projects, and `@lumen-labs-dev/lang-es-es` instead of legacy `lang-es`. See [README — npm packages](../../README.md#npm-packages-lumen-labs-dev).

**- Where do I find an example of use of v4?** See [Quick Start](./quickstart.md) and the [root README example of use](../../README.md#example-of-use).

**- How do I start with v4?** There is a quickstart here: [docs/v4/quickstart.md](./quickstart.md)

**- But this is for backend... I want this bundle to work in my browser** You have the quickstart for browser bundles here: [docs/v4/webandreact.md](./webandreact.md)

**- This thing of intents is hard to understand, I just want to do a Questions and Answers bot** You have a quickstart for simple QnA here: [docs/v4/qna.md](./qna.md)

**- How I do a multilanguage chatbot?** Installing the package for the language and adding it as a plugin [docs/v4/quickstart.md#adding-multilanguage](./quickstart.md#adding-multilanguage)

**- Do you have some example of a chatbot running in several languages?** You can remix this project in glitch, you'll see that it only haves one line of source code, but with only one line it creates a backend with API and exposes a react frontend with the bot, and it's multi-language. To see the frontend click on the button "show" and then "next to the code". https://glitch.com/edit/?utm_content=project_nlpjs-multi&utm_source=remix_this&utm_medium=button&utm_campaign=glitchButton#!/remix/nlpjs-multi

**- Do I need to install languages separately?** English is included by default with `@lumen-labs-dev/basic`. For other languages, install the matching language package such as `@lumen-labs-dev/lang-es-es`, or install `@lumen-labs-dev/lang-all` and enable it in your dock configuration.

**- Where I can see the languages and their locales to find the correct package to install?** See [Language Support](./language-support.md#supported-languages).

**- When an intent is triggered I want to get the answer from an API call and I'm not using any chatbot orchestrating SDK** You can with pipelines that react to your intent; see [Adding logic to an intent](./quickstart.md#adding-logic-to-an-intent).

**- How nlp guesses the language from an utterance in a multi-language bot?** The language is guessed automatically using the most common 3-grams from the language, but also with the 3-grams from the corpus training it, so that way you can use even languages that does not exists, or get a better guessing based on your corpus.

**- And how I guess a language from a sentence, not integrated with the NLP?** Use `@lumen-labs-dev/language` directly for a smaller install. See [Language Support](./language-support.md).

**- Ok, what about the NER?** Use the v4 container with `forceNER: true`. See [NER quickstart](./ner-quickstart.md) and [NER Manager](./ner-manager.md).

```js
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({
    settings: { nlp: { forceNER: true, languages: ['en'] } },
    use: ['Basic', 'LangEn'],
  });
  const nlp = dock.get('nlp');
  nlp.addNamedEntityText('hero', 'spiderman', ['en'], ['Spiderman', 'Spider-man']);
  await nlp.train();
  const result = await nlp.process('en', 'I saw spiderman eating spaghetti');
  console.log(result);
})();
```

**- This is not extracting the entities...** Set `forceNER: true` in your dock `nlp` settings. This activates the NER even if you don't have entities associated to intents.

```js
settings: { nlp: { forceNER: true, languages: ['en'] } }
```

**- The enum entity extraction is slow** By default the NER threshold is 0.8, that allows users to have "mistakes" when they write, but also makes the problem to identify the entities to be heavier. Right now, until this process performance is improved, the way to do that is to set the threshold to 1:

```js
settings: { nlp: { forceNER: true, languages: ['en'], ner: { threshold: 1 } } }
```

With threshold set to 1, the exact match of entities is done by searching words in a dictionary, so the process is able to search over millions of posible values in miliseconds.

**- The builtin entity extraction is slow or crash the process** By default this extraction is done with Microsoft Recognizers: https://github.com/microsoft/Recognizers-Text This do the search using complex regular expressions that are computationally very slow. In windows we detected that some sentences can cause it to crash, mostly when using french. One option is to use Duckling instead; see [Built-in entities](./ner-manager.md#built-in-entities).

**- How I use enum entities** [NER Manager — Enum entities](./ner-manager.md#enum-entities)

**- How I search entities by regular expressions** [NER Manager — Regex entities](./ner-manager.md#regex-entities)

**- What builtin (golden) entities I can extract** See [Language Support](./language-support.md) and [Built-in entities](./ner-manager.md#built-in-entities).

**- I want to extract builtin (golden) entities but it only works in a few languages** You can use Duckling instead; see [Built-in entities](./ner-manager.md#built-in-entities).

**- I want to go "lowlevel" to use only the Neural Network for classifying** Here you'll find the example code if you want only to tokenize: ../../examples/15-nlu/01-neural-nlu.js Here you'll find the example code if you also want stemming: ../../examples/15-nlu/02-brain-nlu.js

**- I want to use NGrams** Use `NGrams` from `@lumen-labs-dev/utils` — `getNGrams(text, n)` for char or word n-grams, `getNGramsFreqs()` for frequency counts. See [packages/utils](../../packages/utils/README.md).

**- I want a pattern corpus** Use `composeFromPattern()` and `composeCorpus()` from `@lumen-labs-dev/utils` to expand patterns like `I [am having|have] a [problem|question]` into all combinations. See [packages/utils](../../packages/utils/README.md).

**- I want to calculate the levenshtein distance of two strings** Use `similarity(a, b, normalize)` from `@lumen-labs-dev/similarity`. Pass `true` as the third argument to normalize before comparing. See [docs/v4/similarity.md](similarity.md).

**- Given a text I want to calculate the best substring that match an string** Use `ExtractorEnum.getBestSubstring(text, pattern)` from `@lumen-labs-dev/ner`. See [examples/12-similarity](../../examples/12-similarity/).

