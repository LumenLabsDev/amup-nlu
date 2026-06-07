# Web Bundling

> **npm scope:** web bundles use the same `@lumen-labs-dev/*` packages as Node.js. The example below installs `@lumen-labs-dev/core`, `@lumen-labs-dev/nlp`, and `@lumen-labs-dev/lang-en-us`.

## Preparing to generate a bundle

NLP.js is developed as a Node.js project, but it can be compiled to run in web applications. The core libraries avoid APIs that cannot be executed on the web, such as direct file system access.
To generate the web bundle, install two development libraries: browserify and terser.

To do that run this in your project folder:
```bash
npm i -D browserify terser
```

Now you will need a script to generate the bundle. 
Open your _package.json_ and add this in the scripts section:
```json
    "browserdist": "browserify ./index.js | terser --compress --mangle > ./bundle.js"
```

From this moment, you can generate a file _bundle.js_ containing the browser bundle by executing this:
```bash
npm run browserdist
```

## Your first web NLP

You can download the code for this example here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples

Now you will need some HTML to run the code in the browser, we will start with this simple example:
```html
<html>
<head>
  <title>Test</title>
  <script src='./bundle.js'></script>
</head>
<body>
</body>
</html>
```

Install the libraries that will be needed to run the nlp:
```bash
npm i @lumen-labs-dev/core @lumen-labs-dev/lang-en-us @lumen-labs-dev/nlp
```

The @lumen-labs-dev/core is the one that installs the container system and basic architecture.
The @lumen-labs-dev/nlp installs the nlp related things,
and finally @lumen-labs-dev/lang-en-us installs the English language package.

Now create an _index.js_ with this content:
```javascript
const { containerBootstrap } = require('@lumen-labs-dev/core');
const { Nlp } = require('@lumen-labs-dev/nlp');
const { LangEn } = require('@lumen-labs-dev/lang-en-us');

(async () => {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('en-US');
  // Adds the utterances and intents for the NLP
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

This creates a model equal to the first example you can find in the quickstart.
This line is very important because by default the nlp plugin tries to save the model after training, but in case, this will generate an exception.
```javscript
nlp.settings.autoSave = false
```

Now you can generate the bundle running
```bash
npm run browserdist
```
The bundle size will be 111KB, compared to 3MB for older monolithic bundles, which is much better for the browser.
Open the index.html in a browser and take a look in the console.

## Creating a distributable version

You can download the source code for this example here: https://github.com/LumenLabsDev/amup-nlu/tree/main/examples

The problem with the previous example, is that every time that you have to modify your bot or build a new bot, you have to create the bundle again.
But, what if we can compile and expose the classes and functions of the NLP.js modules that we want? That way we can create a bundle that can be reusable between different bots, while separating what is NLP.js from our bot logic.

First modify the _index.js_ to not include our bot logic and to simply import everything from the NLP.js libraries and expose them using the window object:

```javascript
const core = require('@lumen-labs-dev/core');
const nlp = require('@lumen-labs-dev/nlp');
const langen = require('@lumen-labs-dev/lang-en-us');

window.nlpjs = { ...core, ...nlp, ...langen };
```

Second, compile the bundle:
```bash
npm run browserdist
```

Third, move your bot logic to the index.html:

```html
<html>
<head>
  <title>Test</title>
  <script src='./bundle.js'></script>
  <script>
  const { containerBootstrap, Nlp, LangEn } = window.nlpjs;

  (async () => {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('en-US');
    // Adds the utterances and intents for the NLP
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
  </script>
</head>
<body>
</body>
</html>
```

## Loading corpora

For browser bundles, load corpus JSON with your application fetch layer and pass the parsed object to `nlp.addCorpus(corpus)`. The request helper packages are no longer part of this library surface.
