# Quick Start

> **npm scope:** install packages as `@lumen-labs-dev/*`. This guide uses `@lumen-labs-dev/basic` for v4 backend projects.

## Install the library
At the folder where is your node project, install the basic library, that will install the core and basic plugins for working in backend.

```bash
npm i @lumen-labs-dev/basic
```

## Create the code
The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/01-container

Create `index.js`:

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic'] });
  const nlp = dock.get('nlp');
  nlp.addLanguage('en-US');
  nlp.addDocument('en-US', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en-US', 'i must go', 'greetings.bye');
  nlp.addDocument('en-US', 'hello', 'greetings.hello');
  nlp.addDocument('en-US', 'hi', 'greetings.hello');
  nlp.addAnswer('en-US', 'greetings.bye', 'Till next time');
  nlp.addAnswer('en-US', 'greetings.hello', 'Hey there!');
  await nlp.train();
  const response = await nlp.process('en-US', 'I should go now');
  console.log(response);
})();
```

## Extracting the corpus into a file
Example: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/13-languages/corpora

Corpus JSON format:

```json
{
  "name": "Name of the corpus",
  "locale": "en-US",
  "data": [
    {
      "intent": "agent.birthday",
      "utterances": ["when is your birthday", "when were you born"],
      "answers": ["My birthday is today!", "I'm not sure of my birth date"]
    }
  ]
}
```

Replace inline training with:

```javascript
await nlp.addCorpus('./corpus-en.json');
await nlp.train();
const response = await nlp.process('en-US', 'Who are you');
```

## Extracting the configuration into a file

Example: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/03-qna-pipelines

Add `conf.json`:

```json
{
  "settings": {
    "nlp": {
      "corpora": ["./corpus-en.json"]
    }
  },
  "use": ["Basic"]
}
```

Simplify `index.js` — `dockStart()` loads config automatically:

```javascript
const dock = await dockStart();
const nlp = dock.get('nlp');
await nlp.train();
const response = await nlp.process('en-US', 'Who are you');
```

## Creating your first pipeline

Example: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/06-huge-ner

Add `pipelines.md`:

```markdown
# default

## main
nlp.train
```

Remove `nlp.train()` from code — training runs during `dockStart()`.

## Adding Multilanguage
Example: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/13-languages

```bash
npm i @lumen-labs-dev/lang-es-es
```

Update `conf.json`:

```json
{
  "settings": {
    "nlp": {
      "corpora": ["./corpus-en.json", "./corpus-es.json"]
    }
  },
  "use": ["Basic", "LangEs"]
}
```

## Adding logic to an intent
Example: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/03-qna-pipelines

Add to corpus:

```json
{
  "intent": "joke.chucknorris",
  "utterances": [
    "tell me a chuck norris fact",
    "tell me a joke about chuck norris"
  ]
}
```

Add to `pipelines.md`:

```markdown
## onIntent(joke.chucknorris)
// compiler=javascript
const something = request.get('http://api.icndb.com/jokes/random');
if (something && something.value && something.value.joke) {
  input.answer = something.value.joke;
}
```

The `onIntent(<intentname>)` hook runs when an intent is recognized, letting you modify the answer from an API call.

<div align="center">
<img src="https://github.com/axa-group/nlp.js/raw/master/screenshots/chucknorris.png" width="auto" height="auto"/>
</div>
