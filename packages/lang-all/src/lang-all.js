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
const { LangAr } = require('@lumen-labs-dev/lang-ar-sa');
const { LangBn } = require('@lumen-labs-dev/lang-bn-bd');
const { LangCa } = require('@lumen-labs-dev/lang-ca-es');
const { LangCs } = require('@lumen-labs-dev/lang-cs-cz');
const { LangDa } = require('@lumen-labs-dev/lang-da-dk');
const { LangDe } = require('@lumen-labs-dev/lang-de-de');
const { LangEl } = require('@lumen-labs-dev/lang-el-gr');
const { LangEn } = require('@lumen-labs-dev/lang-en-us');
const { LangEs } = require('@lumen-labs-dev/lang-es-es');
const { LangEu } = require('@lumen-labs-dev/lang-eu-es');
const { LangFa } = require('@lumen-labs-dev/lang-fa-ir');
const { LangFi } = require('@lumen-labs-dev/lang-fi-fi');
const { LangFr } = require('@lumen-labs-dev/lang-fr-fr');
const { LangGa } = require('@lumen-labs-dev/lang-ga-ie');
const { LangGl } = require('@lumen-labs-dev/lang-gl-es');
const { LangHi } = require('@lumen-labs-dev/lang-hi-in');
const { LangHu } = require('@lumen-labs-dev/lang-hu-hu');
const { LangHy } = require('@lumen-labs-dev/lang-hy-am');
const { LangId } = require('@lumen-labs-dev/lang-id-id');
const { LangIt } = require('@lumen-labs-dev/lang-it-it');
const { LangJa } = require('@lumen-labs-dev/lang-ja-jp');
const { LangKo } = require('@lumen-labs-dev/lang-ko-kr');
const { LangLt } = require('@lumen-labs-dev/lang-lt-lt');
const { LangMs } = require('@lumen-labs-dev/lang-ms-my');
const { LangNe } = require('@lumen-labs-dev/lang-ne-np');
const { LangNl } = require('@lumen-labs-dev/lang-nl-nl');
const { LangNo } = require('@lumen-labs-dev/lang-no-no');
const { LangPl } = require('@lumen-labs-dev/lang-pl-pl');
const { LangPt } = require('@lumen-labs-dev/lang-pt-pt');
const { LangPtBr } = require('@lumen-labs-dev/lang-pt-br');
const { LangRo } = require('@lumen-labs-dev/lang-ro-ro');
const { LangRu } = require('@lumen-labs-dev/lang-ru-ru');
const { LangSl } = require('@lumen-labs-dev/lang-sl-si');
const { LangSr } = require('@lumen-labs-dev/lang-sr-rs');
const { LangSv } = require('@lumen-labs-dev/lang-sv-se');
const { LangTa } = require('@lumen-labs-dev/lang-ta-in');
const { LangTh } = require('@lumen-labs-dev/lang-th-th');
const { LangTl } = require('@lumen-labs-dev/lang-tl-ph');
const { LangTr } = require('@lumen-labs-dev/lang-tr-tr');
const { LangUk } = require('@lumen-labs-dev/lang-uk-ua');
const { LangZh } = require('@lumen-labs-dev/lang-zh-cn');

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
