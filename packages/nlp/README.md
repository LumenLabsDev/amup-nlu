![NLPjs logo](../../screenshots/nlplogo.gif)

# @lumen-labs-dev/nlp

**npm:** [`@lumen-labs-dev/nlp`](https://www.npmjs.com/package/@lumen-labs-dev/nlp) — v4 NLP manager plugin. Requires `@lumen-labs-dev/core` and a language package such as `@lumen-labs-dev/lang-en-us`.

[![](https://github.com/axa-group/nlp.js/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/axa-group/nlp.js/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/axa-group/nlp.js/badge.svg?branch=master)](https://coveralls.io/github/axa-group/nlp.js?branch=master)
[![NPM version](https://img.shields.io/npm/v/@lumen-labs-dev/nlp.svg?style=flat)](https://www.npmjs.com/package/@lumen-labs-dev/nlp)
[![NPM downloads](https://img.shields.io/npm/dm/@lumen-labs-dev/nlp.svg?style=flat)](https://www.npmjs.com/package/@lumen-labs-dev/nlp)

## TABLE OF CONTENTS

<!--ts-->

- [Installation](#installation)
- [Example of use](#example-of-use)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [Code of Conduct](#code-of-conduct)
- [Who is behind it](#who-is-behind-it)
- [License](#license.md)
  <!--te-->

## Installation

You can install @lumen-labs-dev/nlp:

```bash
    npm install @lumen-labs-dev/nlp
```

## Example of Usage

Full v4 walkthrough: [docs/v4/quickstart.md](../../docs/v4/quickstart.md).

```javascript
const { containerBootstrap } = require('@lumen-labs-dev/core');
const { Nlp } = require('@lumen-labs-dev/nlp');
const { LangEn } = require('@lumen-labs-dev/lang-en-us-min');

const container = await containerBootstrap();
container.use(Nlp);
container.use(LangEn);
const nlp = container.get('nlp');
nlp.addLanguage('en');
nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
nlp.addDocument('en', 'hello', 'greetings.hello');
await nlp.train();
const response = await nlp.process('en', 'I should go now');
```

## Contributing

You can read the guide of how to contribute at [Contributing](../../CONTRIBUTING.md).

## Contributors

[![Contributors](https://contributors-img.firebaseapp.com/image?repo=axa-group/nlp.js)](https://github.com/axa-group/nlp.js/graphs/contributors)

Made with [contributors-img](https://contributors-img.firebaseapp.com).

## Code of Conduct

You can read the Code of Conduct at [Code of Conduct](../../CODE_OF_CONDUCT.md).

## Who is behind it`?`

This project is developed by AXA Group Operations Spain S.A.

Maintained by [Lumen Labs Dev](https://github.com/LumenLabsDev) under the `@lumen-labs-dev` npm scope.

## License

Copyright (c) AXA Group Operations Spain S.A.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
