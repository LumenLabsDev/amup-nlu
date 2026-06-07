/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const {
  NormalizerIt,
  TokenizerIt,
  StopwordsIt,
  StemmerIt,
} = require('../../../packages/lang-it-it/src');
// const { NormalizerIt, TokenizerIt, StopwordsIt, StemmerIt } = require('@lumen-labs-dev/lang-it-it');

const input = 'Questo dovrebbe essere tokenizzato';
const normalizer = new NormalizerIt();
const tokenizer = new TokenizerIt();
const stopwords = new StopwordsIt();
const stemmer = new StemmerIt();
stemmer.stopwords = stopwords;

// Normalize
console.log('normalize:', normalizer.normalize('Questo dòvrebbe essere normalizzato'));

// Tokenize
console.log('tokenize:', tokenizer.tokenize(input));
console.log('tokenize normalized:', tokenizer.tokenize(input, true));

// Stopwords
console.log('isStopword:', stopwords.isStopword('ho'));
console.log('removeStopwords:', stopwords.removeStopwords(['ho', 'visto', 'uno', 'sviluppatore']));

// Stem
console.log('stemWord:', stemmer.stemWord('sviluppatore'));
console.log('stem pipeline:', stemmer.tokenizeAndStem('Ho visto uno sviluppatore', false));
