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
const { LangAr } = require('@lumen-labs-dev/lang-ar');
const { LangBn } = require('@lumen-labs-dev/lang-bn');
const { LangCa } = require('@lumen-labs-dev/lang-ca');
const { LangCs } = require('@lumen-labs-dev/lang-cs');
const { LangDa } = require('@lumen-labs-dev/lang-da');
const { LangDe } = require('@lumen-labs-dev/lang-de');
const { LangEl } = require('@lumen-labs-dev/lang-el');
const { LangEn } = require('@lumen-labs-dev/lang-en');
const { LangEs } = require('@lumen-labs-dev/lang-es');
const { LangEu } = require('@lumen-labs-dev/lang-eu');
const { LangFa } = require('@lumen-labs-dev/lang-fa');
const { LangFi } = require('@lumen-labs-dev/lang-fi');
const { LangFr } = require('@lumen-labs-dev/lang-fr');
const { LangGa } = require('@lumen-labs-dev/lang-ga');
const { LangGl } = require('@lumen-labs-dev/lang-gl');
const { LangHi } = require('@lumen-labs-dev/lang-hi');
const { LangHu } = require('@lumen-labs-dev/lang-hu');
const { LangHy } = require('@lumen-labs-dev/lang-hy');
const { LangId } = require('@lumen-labs-dev/lang-id');
const { LangIt } = require('@lumen-labs-dev/lang-it');
const { LangJa } = require('@lumen-labs-dev/lang-ja');
const { LangKo } = require('@lumen-labs-dev/lang-ko');
const { LangLt } = require('@lumen-labs-dev/lang-lt');
const { LangMs } = require('@lumen-labs-dev/lang-ms');
const { LangNe } = require('@lumen-labs-dev/lang-ne');
const { LangNl } = require('@lumen-labs-dev/lang-nl');
const { LangNo } = require('@lumen-labs-dev/lang-no');
const { LangPl } = require('@lumen-labs-dev/lang-pl');
const { LangPt } = require('@lumen-labs-dev/lang-pt');
const { LangPtBr } = require('@lumen-labs-dev/lang-pt-br');
const { LangRo } = require('@lumen-labs-dev/lang-ro');
const { LangRu } = require('@lumen-labs-dev/lang-ru');
const { LangSl } = require('@lumen-labs-dev/lang-sl');
const { LangSr } = require('@lumen-labs-dev/lang-sr');
const { LangSv } = require('@lumen-labs-dev/lang-sv');
const { LangTa } = require('@lumen-labs-dev/lang-ta');
const { LangTh } = require('@lumen-labs-dev/lang-th');
const { LangTl } = require('@lumen-labs-dev/lang-tl');
const { LangTr } = require('@lumen-labs-dev/lang-tr');
const { LangUk } = require('@lumen-labs-dev/lang-uk');
const { LangZh } = require('@lumen-labs-dev/lang-zh');

class LangAll {
  register(container) {
    container.use(LangAr);
    container.use(LangBn);
    container.use(LangCa);
    container.use(LangCs);
    container.use(LangDa);
    container.use(LangDe);
    container.use(LangEl);
    container.use(LangEn);
    container.use(LangEs);
    container.use(LangEu);
    container.use(LangFa);
    container.use(LangFi);
    container.use(LangFr);
    container.use(LangGa);
    container.use(LangGl);
    container.use(LangHi);
    container.use(LangHu);
    container.use(LangHy);
    container.use(LangId);
    container.use(LangIt);
    container.use(LangJa);
    container.use(LangKo);
    container.use(LangLt);
    container.use(LangMs);
    container.use(LangNe);
    container.use(LangNl);
    container.use(LangNo);
    container.use(LangPl);
    container.use(LangPt);
    container.use(LangPtBr);
    container.use(LangRo);
    container.use(LangRu);
    container.use(LangSl);
    container.use(LangSr);
    container.use(LangSv);
    container.use(LangTa);
    container.use(LangTh);
    container.use(LangTl);
    container.use(LangTr);
    container.use(LangUk);
    container.use(LangZh);
  }
}

module.exports = LangAll;
