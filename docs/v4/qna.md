# QnA

> **npm scope:** install `@lumen-labs-dev/basic` and `@lumen-labs-dev/qna-importer` (not unscoped package names).

This will guide you through the process of creating a bot using a QnA tsv file instead of a corpus with intents.
The format of the file is a text file where each line is a question and an answer, separated by a tabulator.
You have an example of file here: https://github.com/LumenLabsDev/amup-nlu/blob/main/packages/qna-importer/test/qna.tsv

The process is exactly the same as having a bot with a chatbot, so we strongly recommend to do the quickstart: https://github.com/axa-group/nlp.js/blob/master/docs/v4/quickstart.md

## Install the library and the qna plugin

In your node project folder, install the basic library and the qna importer, that will install the core and basic plugins for working in the backend, and also the plugin for converting qna files to your corpus.

```sh
npm i @lumen-labs-dev/basic @lumen-labs-dev/qna-importer
```

## Train and test a QnA file

The source code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/02-qna-classic

Add the corpus file to your folder, and then create this index.js:
```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic', 'Qna'] });
  const nlp = dock.get('nlp');
  await nlp.addCorpus({ filename: './qna.tsv', importer: 'qna', locale: 'en' });
  await nlp.train();
  const response = await nlp.process('en', 'Who are you');
  console.log(response);
})();
```

Replace the filename './qna.tsv' with the path to your qna file, and the locale with the locale of your file (remember that if it's not English, you should install the language plugin for your language).

Now you can execute this, and you'll see that the qna is trained and it resolves the answer to the question.

## Extracting the configuration into a file

The source code for this example is here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples/03-qna-pipelines

Now we can remove code that is configuration related into a separate file. Add a conf.json file with this content:

```javascript
{
  "settings": {
    "nlp": {
      "corpora": [
        { "filename": "qna.tsv", "importer": "qna", "locale": "en" }
      ]
    }
  },
  "use": ["Basic", "Qna"]
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
