/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

const fs = require('fs');

// const { NlpManager } = require('@lumen-labs-dev/node-nlp');
const { NlpManager } = require('../../../../packages/node-nlp/src');

const DEFAULT_PHRASE = 'Hi';

const MODEL_FILEPATH = '/tmp/model.nlp';

const manager = new NlpManager({
  languages: ['en-US'],
  autoSave: false,
  autoLoad: false,
});

if (fs.existsSync(MODEL_FILEPATH)) {
  manager.load(MODEL_FILEPATH);
} else {
  // Adds the utterances and intents for the NLP
  manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
  manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
  manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
  manager.addDocument('en-US', 'bye for now', 'greetings.bye');
  manager.addDocument('en-US', 'i must go', 'greetings.bye');
  manager.addDocument('en-US', 'hello', 'greetings.hello');
  manager.addDocument('en-US', DEFAULT_PHRASE, 'greetings.hello');
  manager.addDocument('en-US', 'howdy', 'greetings.hello');

  // Train also the NLG
  manager.addAnswer('en', 'greetings.bye', 'Till next time');
  manager.addAnswer('en', 'greetings.bye', 'see you soon!');
  manager.addAnswer('en', 'greetings.hello', 'Hey there!');
  manager.addAnswer('en', 'greetings.hello', 'Greetings!');

  // Train and save the model.
  (async () => {
    await manager.train();
    manager.save(MODEL_FILEPATH);
  })();
}

exports.engine = {
  default_phrase: DEFAULT_PHRASE,
  process: (phrase) => manager.process('en-US', phrase),
};
