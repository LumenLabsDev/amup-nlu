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
const { Container } = require('@lumen-labs-dev/core-loader');
const {
  getClass,
  getLocale,
  registerLanguage,
} = require('../../src/language/language-loader');

describe('Language loader', () => {
  describe('getLocale', () => {
    test('Should preserve Brazilian Portuguese locale', () => {
      expect(getLocale('pt-BR')).toEqual('pt-br');
      expect(getLocale('pt_br')).toEqual('pt-br');
      expect(getLocale('pt-br')).toEqual('pt-br');
    });

    test('Should keep plain Portuguese behavior', () => {
      expect(getLocale('pt')).toEqual('pt');
      expect(getLocale('pt-PT')).toEqual('pt');
    });
  });

  describe('registerLanguage', () => {
    test('Should register Brazilian Portuguese classes', () => {
      const container = new Container();
      const registered = registerLanguage(container, 'pt-BR');
      expect(registered).toEqual(true);
      expect(container.get('tokenizer-pt-br').constructor.name).toEqual(
        'TokenizerPtBr'
      );
    });

    test('Should register plain Portuguese classes', () => {
      const container = new Container();
      const registered = registerLanguage(container, 'pt');
      expect(registered).toEqual(true);
      expect(container.get('tokenizer-pt').constructor.name).toEqual(
        'TokenizerPt'
      );
    });
  });

  describe('getClass', () => {
    test('Should resolve Brazilian Portuguese class names', () => {
      expect(getClass('pt_BR', 'Tokenizer').name).toEqual('TokenizerPtBr');
      expect(getClass('pt', 'Tokenizer').name).toEqual('TokenizerPt');
    });
  });
});
