# Quick Start

> **npm scope:** install packages as `@lumen-labs-dev/*`. This guide uses `@lumen-labs-dev/basic` for v4 backend projects. For the v3-style `NlpManager` API, use `@lumen-labs-dev/node-nlp` instead (see [root README](../README.md#npm-packages-lumen-labs-dev)).

## Install the library
At the folder where is your node project, install the basic library, that will install the core and basic plugins for working in backend.

```bash
npm i @lumen-labs-dev/basic
```

## Create the code
The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/01-container
Then you can create a file called index.js with this content:

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  nlp.addLanguage('en');
  // Adds the utterances and intents for the NLP
  nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
  nlp.addDocument('en', 'okay see you later', 'greetings.bye');
  nlp.addDocument('en', 'bye for now', 'greetings.bye');
  nlp.addDocument('en', 'i must go', 'greetings.bye');
  nlp.addDocument('en', 'hello', 'greetings.hello');
  nlp.addDocument('en', 'hi', 'greetings.hello');
  nlp.addDocument('en', 'howdy', 'greetings.hello');
  
  // Train also the NLG
  nlp.addAnswer('en', 'greetings.bye', 'Till next time');
  nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
  nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
  nlp.addAnswer('en', 'greetings.hello', 'Greetings!');  
  await nlp.train();
  const response = await nlp.process('en', 'I should go now');
  console.log(response);
})();
```

## Extracting the corpus into a file
The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/13-languages/corpora
You can create the corpus as json files. The format of the json is:

```json
{
  "name": "Name of the corpus",
  "locale": "en-US",
  "data": [
    {
      "intent": "agent.birthday",
      "utterances": [
        "when is your birthday",
        "when do you celebrate your birthday",
        "when were you born",
        "when do you have birthday",
        "date of your birthday"
      ],
      "answers": [
        "Wait, are you planning a party for me? It's today! My birthday is today!",
        "I'm young. I'm not sure of my birth date",
        "I don't know my birth date. Most virtual agents are young, though, like me."
      ]
    },
    ...
  ]
}
```

So the new code will be: 

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./corpus-en.json');
  await nlp.train();
  const response = await nlp.process('en', 'Who are you');
  console.log(response);
})();
```

## Extracting the configuration into a file

The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/03-qna-pipelines
Now we can remove things that are configuration into a file. 

Add a _conf.json_ file with this content:

```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "./corpus-en.json"
      ]
    }
  },
  "use": ["Basic"]
}
```

And the new code will be:
```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const response = await nlp.process('en', 'Who are you');
  console.log(response);
})();
```

As you can see now we don't need to provide the plugins to dockStart, nor do we need to add the corpus manually.

## Creating your first pipeline

The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/06-huge-ner

Now create a _pipelines.md_ file with this content:
```markdown
# default

## main
nlp.train
```


And remove the nlp.train() from the code:
```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  const response = await nlp.process('en', 'Who are you');
  console.log(response);
})();
```

We are defining a pipeline called _main_ and it will be executed after loading the configuration and mounting the plugins, so the train process will be executed automatically in the dockStart process.

## Adding Multilanguage
The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/13-languages
Now we want to add a corpus in spanish. First at all we must install the spanish language plugin:
```bash
npm i @lumen-labs-dev/lang-es-es
```

Then add the _LangEs_ plugin in the configuration, and of course the corpus to the corpora:
```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "./corpus-en.json",
        "./corpus-es.json"
      ]
    }
  },
  "use": ["Basic", "LangEs"]
}
```

Add a Spanish corpus alongside the English corpus. The NLP process will automatically identify the language and send the utterance to the correct trained model.

## Adding logic to an intent
The code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/03-qna-pipelines

Suppose that you want to have an intent for telling jokes about Chuck Norris, and you know that a service that returns random Chuck Norris jokes exists: http://api.icndb.com/jokes/random

First you need to add the intent to the corpus:
```json
    {
      "intent": "joke.chucknorris",
      "utterances": [
        "tell me a chuck norris fact",
        "tell me a joke about chuck norris",
        "say a chuck norris joke",
        "some chuck norris fact"
      ]
    },
```

Then add this to the _pipelines.md_ in the default section:

```markdown
## onIntent(joke.chucknorris)
// compiler=javascript
const something = request.get('http://api.icndb.com/jokes/random');
if (something && something.value && something.value.joke) {
  input.answer = something.value.joke;
}
```

Explanation: the _onIntent(<intentname>)_ is called when an intent is recognized, so you can react to doing things and modifying the input as you want, from classifications, entities and of course the answer.
We set the compiler to JavaScript. 
We have a plugin _request_ that is for handling requests, then we call the API to retrieve an answer, and set it in the input.

<div align="center">
<img src="https://github.com/axa-group/nlp.js/raw/master/screenshots/chucknorris.png" width="auto" height="auto"/>
</div>
