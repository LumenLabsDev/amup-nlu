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
const { Container, LocaleError } = require('@lumen-labs-dev/core-loader');
const {
  getClass,
  getLocale,
  registerLanguage,
} = require('../../src/language/language-loader');

describe('Language loader', () => {
  describe('getLocale', () => {
    test('Should preserve Brazilian Portuguese locale', () => {
      expect(getLocale('pt-BR')).toEqual('pt-BR');
      expect(getLocale('pt_br')).toEqual('pt-BR');
      expect(getLocale('pt-br')).toEqual('pt-BR');
    });

    test('Should canonicalize Portugal Portuguese locale', () => {
      expect(getLocale('pt-PT')).toEqual('pt-PT');
      expect(getLocale('pt_PT')).toEqual('pt-PT');
    });

    test('Should canonicalize explicit locale packages', () => {
      expect(getLocale('en-US')).toEqual('en-US');
      expect(getLocale('es-ES')).toEqual('es-ES');
    });

    test('Should reject bare language codes', () => {
      expect(() => getLocale('en')).toThrow(LocaleError);
      expect(() => getLocale('pt')).toThrow(LocaleError);
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

    test('Should register Portugal Portuguese classes', () => {
      const container = new Container();
      const registered = registerLanguage(container, 'pt-PT');
      expect(registered).toEqual(true);
      expect(container.get('tokenizer-pt').constructor.name).toEqual(
        'TokenizerPt'
      );
    });
  });

  describe('getClass', () => {
    test('Should resolve Brazilian Portuguese class names', () => {
      expect(getClass('pt_BR', 'Tokenizer').name).toEqual('TokenizerPtBr');
      expect(getClass('pt-PT', 'Tokenizer').name).toEqual('TokenizerPt');
    });
  });
});
