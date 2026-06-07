# @lumen-labs-dev/emoji

## Introduction

@lumen-labs-dev/emoji is the package that adds the function _removeEmojis_ which replaces emojis with their text equivalents.

## Installing

_removeEmojis_ is a function in the package _@lumen-labs-dev/emoji_, which you can install via NPM:

```bash
  npm install @lumen-labs-dev/emoji
```

## Example of use

```javascript
const { removeEmojis } = require('@lumen-labs-dev/emoji');

const actual = removeEmojis('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+');
console.log(actual);
// I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :thumbsup:+
```
