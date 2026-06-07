# @lumen-labs-dev/console-connector

## Installation

You can install the console connector @lumen-labs-dev/console-connector using:

```bash
    npm install @lumen-labs-dev/console-connector
```

## Example of use inside NLP.js

This is a little bit special component. 
It allows you to manage scenarios where the main interface is the console. You can find an example of use on **`examples/02-qna-classic`**.

## Example of use of the package

```javascript
const { ConsoleConnector } = require('@lumen-labs-dev/console-connector');

const connector = new ConsoleConnector();
connector.onHear = (self, text) => {
  self.say(`You said "${text}"`);
};
connector.say('Say something!');
```

## Example of use with @lumen-labs-dev/basic

You must have a file _corpus.json_ in the source code folder:

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dockConfiguration = {
    settings: {
      nlp: { corpora: ['./corpus.json'] },
    },
    use: ['Nlp', 'ConsoleConnector']
  };
  const dock = await dockStart(dockConfiguration);
  const nlp = dock.get('nlp');
  await nlp.train();
  const connector = dock.get('console');
  connector.say('Say something!');
})();
```
