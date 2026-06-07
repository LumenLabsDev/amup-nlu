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
  LangAr,
  NormalizerAr,
  SentimentAr,
  StemmerAr,
  StopwordsAr,
  TokenizerAr,
} = require('@lumen-labs-dev/lang-ar');
const {
  LangBn,
  NormalizerBn,
  SentimentBn,
  StemmerBn,
  StopwordsBn,
  TokenizerBn,
} = require('@lumen-labs-dev/lang-bn');
const {
  LangCa,
  NormalizerCa,
  SentimentCa,
  StemmerCa,
  StopwordsCa,
  TokenizerCa,
} = require('@lumen-labs-dev/lang-ca');
const {
  LangCs,
  NormalizerCs,
  SentimentCs,
  StemmerCs,
  StopwordsCs,
  TokenizerCs,
} = require('@lumen-labs-dev/lang-cs');
const {
  LangDa,
  NormalizerDa,
  SentimentDa,
  StemmerDa,
  StopwordsDa,
  TokenizerDa,
} = require('@lumen-labs-dev/lang-da');
const {
  LangDe,
  NormalizerDe,
  SentimentDe,
  StemmerDe,
  StopwordsDe,
  TokenizerDe,
} = require('@lumen-labs-dev/lang-de');
const {
  LangEl,
  NormalizerEl,
  SentimentEl,
  StemmerEl,
  StopwordsEl,
  TokenizerEl,
} = require('@lumen-labs-dev/lang-el');
const {
  LangEn,
  NormalizerEn,
  SentimentEn,
  StemmerEn,
  StopwordsEn,
  TokenizerEn,
} = require('@lumen-labs-dev/lang-en');
const {
  LangEs,
  NormalizerEs,
  SentimentEs,
  StemmerEs,
  StopwordsEs,
  TokenizerEs,
} = require('@lumen-labs-dev/lang-es');
const {
  LangEu,
  NormalizerEu,
  SentimentEu,
  StemmerEu,
  StopwordsEu,
  TokenizerEu,
} = require('@lumen-labs-dev/lang-eu');
const {
  LangFa,
  NormalizerFa,
  SentimentFa,
  StemmerFa,
  StopwordsFa,
  TokenizerFa,
} = require('@lumen-labs-dev/lang-fa');
const {
  LangFi,
  NormalizerFi,
  SentimentFi,
  StemmerFi,
  StopwordsFi,
  TokenizerFi,
} = require('@lumen-labs-dev/lang-fi');
const {
  LangFr,
  NormalizerFr,
  SentimentFr,
  StemmerFr,
  StopwordsFr,
  TokenizerFr,
} = require('@lumen-labs-dev/lang-fr');
const {
  LangGa,
  NormalizerGa,
  SentimentGa,
  StemmerGa,
  StopwordsGa,
  TokenizerGa,
} = require('@lumen-labs-dev/lang-ga');
const {
  LangGl,
  NormalizerGl,
  SentimentGl,
  StemmerGl,
  StopwordsGl,
  TokenizerGl,
} = require('@lumen-labs-dev/lang-gl');
const {
  LangHi,
  NormalizerHi,
  SentimentHi,
  StemmerHi,
  StopwordsHi,
  TokenizerHi,
} = require('@lumen-labs-dev/lang-hi');
const {
  LangHu,
  NormalizerHu,
  SentimentHu,
  StemmerHu,
  StopwordsHu,
  TokenizerHu,
} = require('@lumen-labs-dev/lang-hu');
const {
  LangHy,
  NormalizerHy,
  SentimentHy,
  StemmerHy,
  StopwordsHy,
  TokenizerHy,
} = require('@lumen-labs-dev/lang-hy');
const {
  LangId,
  NormalizerId,
  SentimentId,
  StemmerId,
  StopwordsId,
  TokenizerId,
} = require('@lumen-labs-dev/lang-id');
const {
  LangIt,
  NormalizerIt,
  SentimentIt,
  StemmerIt,
  StopwordsIt,
  TokenizerIt,
} = require('@lumen-labs-dev/lang-it');
const {
  LangJa,
  NormalizerJa,
  SentimentJa,
  StemmerJa,
  StopwordsJa,
  TokenizerJa,
} = require('@lumen-labs-dev/lang-ja');
const {
  LangKo,
  NormalizerKo,
  SentimentKo,
  StemmerKo,
  StopwordsKo,
  TokenizerKo,
} = require('@lumen-labs-dev/lang-ko');
const {
  LangLt,
  NormalizerLt,
  SentimentLt,
  StemmerLt,
  StopwordsLt,
  TokenizerLt,
} = require('@lumen-labs-dev/lang-lt');
const {
  LangMs,
  NormalizerMs,
  SentimentMs,
  StemmerMs,
  StopwordsMs,
  TokenizerMs,
} = require('@lumen-labs-dev/lang-ms');
const {
  LangNe,
  NormalizerNe,
  SentimentNe,
  StemmerNe,
  StopwordsNe,
  TokenizerNe,
} = require('@lumen-labs-dev/lang-ne');
const {
  LangNl,
  NormalizerNl,
  SentimentNl,
  StemmerNl,
  StopwordsNl,
  TokenizerNl,
} = require('@lumen-labs-dev/lang-nl');
const {
  LangNo,
  NormalizerNo,
  SentimentNo,
  StemmerNo,
  StopwordsNo,
  TokenizerNo,
} = require('@lumen-labs-dev/lang-no');
const {
  LangPl,
  NormalizerPl,
  SentimentPl,
  StemmerPl,
  StopwordsPl,
  TokenizerPl,
} = require('@lumen-labs-dev/lang-pl');
const {
  LangPt,
  NormalizerPt,
  SentimentPt,
  StemmerPt,
  StopwordsPt,
  TokenizerPt,
} = require('@lumen-labs-dev/lang-pt');
const {
  LangPtBr,
  NormalizerPtBr,
  SentimentPtBr,
  StemmerPtBr,
  StopwordsPtBr,
  TokenizerPtBr,
} = require('@lumen-labs-dev/lang-pt-br');
const {
  LangRo,
  NormalizerRo,
  SentimentRo,
  StemmerRo,
  StopwordsRo,
  TokenizerRo,
} = require('@lumen-labs-dev/lang-ro');
const {
  LangRu,
  NormalizerRu,
  SentimentRu,
  StemmerRu,
  StopwordsRu,
  TokenizerRu,
} = require('@lumen-labs-dev/lang-ru');
const {
  LangSl,
  NormalizerSl,
  SentimentSl,
  StemmerSl,
  StopwordsSl,
  TokenizerSl,
} = require('@lumen-labs-dev/lang-sl');
const {
  LangSr,
  NormalizerSr,
  SentimentSr,
  StemmerSr,
  StopwordsSr,
  TokenizerSr,
} = require('@lumen-labs-dev/lang-sr');
const {
  LangSv,
  NormalizerSv,
  SentimentSv,
  StemmerSv,
  StopwordsSv,
  TokenizerSv,
} = require('@lumen-labs-dev/lang-sv');
const {
  LangTa,
  NormalizerTa,
  SentimentTa,
  StemmerTa,
  StopwordsTa,
  TokenizerTa,
} = require('@lumen-labs-dev/lang-ta');
const {
  LangTh,
  NormalizerTh,
  SentimentTh,
  StemmerTh,
  StopwordsTh,
  TokenizerTh,
} = require('@lumen-labs-dev/lang-th');
const {
  LangTl,
  NormalizerTl,
  SentimentTl,
  StemmerTl,
  StopwordsTl,
  TokenizerTl,
} = require('@lumen-labs-dev/lang-tl');
const {
  LangTr,
  NormalizerTr,
  SentimentTr,
  StemmerTr,
  StopwordsTr,
  TokenizerTr,
} = require('@lumen-labs-dev/lang-tr');
const {
  LangUk,
  NormalizerUk,
  SentimentUk,
  StemmerUk,
  StopwordsUk,
  TokenizerUk,
} = require('@lumen-labs-dev/lang-uk');
const {
  LangZh,
  NormalizerZh,
  SentimentZh,
  StemmerZh,
  StopwordsZh,
  TokenizerZh,
} = require('@lumen-labs-dev/lang-zh');
const LangAll = require('./lang-all');

const {
  langDict,
  getNormalizer,
  getTokenizer,
  getStemmer,
  getStopwords,
  getSentiment,
  normalize,
  tokenize,
  stem,
  removeStopwords,
  dict,
  bow,
} = require('./lang-functions');

module.exports = {
  LangAll,

  LangAr,
  NormalizerAr,
  SentimentAr,
  StemmerAr,
  StopwordsAr,
  TokenizerAr,

  LangBn,
  NormalizerBn,
  SentimentBn,
  StemmerBn,
  StopwordsBn,
  TokenizerBn,

  LangCa,
  NormalizerCa,
  SentimentCa,
  StemmerCa,
  StopwordsCa,
  TokenizerCa,

  LangCs,
  NormalizerCs,
  SentimentCs,
  StemmerCs,
  StopwordsCs,
  TokenizerCs,

  LangDa,
  NormalizerDa,
  SentimentDa,
  StemmerDa,
  StopwordsDa,
  TokenizerDa,

  LangDe,
  NormalizerDe,
  SentimentDe,
  StemmerDe,
  StopwordsDe,
  TokenizerDe,

  LangEl,
  NormalizerEl,
  SentimentEl,
  StemmerEl,
  StopwordsEl,
  TokenizerEl,

  LangEn,
  NormalizerEn,
  SentimentEn,
  StemmerEn,
  StopwordsEn,
  TokenizerEn,

  LangEs,
  NormalizerEs,
  SentimentEs,
  StemmerEs,
  StopwordsEs,
  TokenizerEs,

  LangEu,
  NormalizerEu,
  SentimentEu,
  StemmerEu,
  StopwordsEu,
  TokenizerEu,

  LangFa,
  NormalizerFa,
  SentimentFa,
  StemmerFa,
  StopwordsFa,
  TokenizerFa,

  LangFi,
  NormalizerFi,
  SentimentFi,
  StemmerFi,
  StopwordsFi,
  TokenizerFi,

  LangFr,
  NormalizerFr,
  SentimentFr,
  StemmerFr,
  StopwordsFr,
  TokenizerFr,

  LangGa,
  NormalizerGa,
  SentimentGa,
  StemmerGa,
  StopwordsGa,
  TokenizerGa,

  LangGl,
  NormalizerGl,
  SentimentGl,
  StemmerGl,
  StopwordsGl,
  TokenizerGl,

  LangHi,
  NormalizerHi,
  SentimentHi,
  StemmerHi,
  StopwordsHi,
  TokenizerHi,

  LangHu,
  NormalizerHu,
  SentimentHu,
  StemmerHu,
  StopwordsHu,
  TokenizerHu,

  LangHy,
  NormalizerHy,
  SentimentHy,
  StemmerHy,
  StopwordsHy,
  TokenizerHy,

  LangIt,
  NormalizerIt,
  SentimentIt,
  StemmerIt,
  StopwordsIt,
  TokenizerIt,

  LangId,
  NormalizerId,
  SentimentId,
  StemmerId,
  StopwordsId,
  TokenizerId,

  LangJa,
  NormalizerJa,
  SentimentJa,
  StemmerJa,
  StopwordsJa,
  TokenizerJa,

  LangKo,
  NormalizerKo,
  SentimentKo,
  StemmerKo,
  StopwordsKo,
  TokenizerKo,

  LangLt,
  NormalizerLt,
  SentimentLt,
  StemmerLt,
  StopwordsLt,
  TokenizerLt,

  LangMs,
  NormalizerMs,
  SentimentMs,
  StemmerMs,
  StopwordsMs,
  TokenizerMs,

  LangNe,
  NormalizerNe,
  SentimentNe,
  StemmerNe,
  StopwordsNe,
  TokenizerNe,

  LangNl,
  NormalizerNl,
  SentimentNl,
  StemmerNl,
  StopwordsNl,
  TokenizerNl,

  LangNo,
  NormalizerNo,
  SentimentNo,
  StemmerNo,
  StopwordsNo,
  TokenizerNo,

  LangPl,
  NormalizerPl,
  SentimentPl,
  StemmerPl,
  StopwordsPl,
  TokenizerPl,

  LangPt,
  NormalizerPt,
  SentimentPt,
  StemmerPt,
  StopwordsPt,
  TokenizerPt,

  LangPtBr,
  NormalizerPtBr,
  SentimentPtBr,
  StemmerPtBr,
  StopwordsPtBr,
  TokenizerPtBr,

  LangRo,
  NormalizerRo,
  SentimentRo,
  StemmerRo,
  StopwordsRo,
  TokenizerRo,

  LangRu,
  NormalizerRu,
  SentimentRu,
  StemmerRu,
  StopwordsRu,
  TokenizerRu,

  LangSl,
  NormalizerSl,
  SentimentSl,
  StemmerSl,
  StopwordsSl,
  TokenizerSl,

  LangSr,
  NormalizerSr,
  SentimentSr,
  StemmerSr,
  StopwordsSr,
  TokenizerSr,

  LangSv,
  NormalizerSv,
  SentimentSv,
  StemmerSv,
  StopwordsSv,
  TokenizerSv,

  LangTa,
  NormalizerTa,
  SentimentTa,
  StemmerTa,
  StopwordsTa,
  TokenizerTa,

  LangTh,
  NormalizerTh,
  SentimentTh,
  StemmerTh,
  StopwordsTh,
  TokenizerTh,

  LangTl,
  NormalizerTl,
  SentimentTl,
  StemmerTl,
  StopwordsTl,
  TokenizerTl,

  LangTr,
  NormalizerTr,
  SentimentTr,
  StemmerTr,
  StopwordsTr,
  TokenizerTr,

  LangUk,
  NormalizerUk,
  SentimentUk,
  StemmerUk,
  StopwordsUk,
  TokenizerUk,

  LangZh,
  NormalizerZh,
  SentimentZh,
  StemmerZh,
  StopwordsZh,
  TokenizerZh,

  langDict,
  getNormalizer,
  getTokenizer,
  getStemmer,
  getStopwords,
  getSentiment,
  normalize,
  tokenize,
  stem,
  removeStopwords,
  dict,
  bow,
};
