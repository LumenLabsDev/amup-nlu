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

const { NlpManager, NlpExcelReader } = require('../../src');

describe('NLP Excel Reader', () => {
  describe('Constructor', () => {
    test('It should create an instance', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      expect(reader).toBeDefined();
    });
  });

  describe('Load excel', () => {
    test('It should read languages', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.nluManager.locales).toEqual(['en-US', 'es-ES']);
    });
    test('It should read excel without regex entities', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rulesnoregex.xls');
      expect(manager.nlp.nluManager.locales).toEqual(['en-US', 'es-ES']);
    });
    test('It should read named entities', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.ner.rules['en-US']).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES']).toBeDefined();
      expect(manager.nlp.ner.rules['en-US'].hero).toBeDefined();
      expect(manager.nlp.ner.rules['en-US'].food).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES'].hero).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES'].food).toBeDefined();
    });
    test('It should create the classifiers for the languages', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
    });
    test('The classifiers should contain the intent definition', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rules.xls');
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences
      ).toHaveLength(5);
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences[0].intent
      ).toEqual('whois');
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences[1].intent
      ).toEqual('whereis');
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences[2].intent
      ).toEqual('whereis');
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences[3].intent
      ).toEqual('whereis');
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences[4].intent
      ).toEqual('realname');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences
      ).toHaveLength(4);
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences[0].intent
      ).toEqual('whois');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences[1].intent
      ).toEqual('whereis');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences[2].intent
      ).toEqual('whereis');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences[3].intent
      ).toEqual('realname');
    });
    test('The NLG should be filled', () => {
      const manager = new NlpManager();
      const reader = new NlpExcelReader(manager);
      reader.load('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.nlgManager.responses['en-US']).toBeDefined();
      expect(manager.nlp.nlgManager.responses['en-US'].whois).toBeDefined();
      expect(manager.nlp.nlgManager.responses['en-US'].whereis).toBeDefined();
      expect(manager.nlp.nlgManager.responses['en-US'].realname).toBeDefined();
      expect(manager.nlp.nlgManager.responses['es-ES']).toBeDefined();
      expect(manager.nlp.nlgManager.responses['es-ES'].whois).toBeDefined();
      expect(manager.nlp.nlgManager.responses['es-ES'].whereis).toBeDefined();
      expect(manager.nlp.nlgManager.responses['es-ES'].realname).toBeDefined();
    });
  });
});
