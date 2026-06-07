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

const { NlpManager } = require('../../src');
const corpus = require('./corpus-en.json');

function addEntities(manager) {
  manager.addNamedEntityText(
    'hero',
    'spiderman',
    ['en-US'],
    ['Spiderman', 'Spider-man']
  );
  manager.addNamedEntityText(
    'hero',
    'iron man',
    ['en-US'],
    ['iron man', 'iron-man']
  );
  manager.addNamedEntityText('hero', 'thor', ['en-US'], ['Thor']);
  manager.addNamedEntityText(
    'food',
    'burguer',
    ['en-US'],
    ['Burguer', 'Hamburguer']
  );
  manager.addNamedEntityText('food', 'pizza', ['en-US'], ['pizza']);
  manager.addNamedEntityText(
    'food',
    'pasta',
    ['en-US'],
    ['Pasta', 'spaghetti']
  );
}

function addFrJp(manager) {
  manager.addLanguage(['fr-FR', 'ja-JP']);
  manager.addDocument('fr-FR', 'Bonjour', 'greet');
  manager.addDocument('fr-FR', 'bonne nuit', 'greet');
  manager.addDocument('fr-FR', 'Bonsoir', 'greet');
  manager.addDocument('fr-FR', "J'ai perdu mes clés", 'keys');
  manager.addDocument('fr-FR', 'Je ne trouve pas mes clés', 'keys');
  manager.addDocument(
    'fr-FR',
    'Je ne me souviens pas où sont mes clés',
    'keys'
  );
  manager.addDocument('ja-JP', 'おはようございます', 'greet');
  manager.addDocument('ja-JP', 'こんにちは', 'greet');
  manager.addDocument('ja-JP', 'おやすみ', 'greet');
  manager.addDocument('ja-JP', '私は私の鍵を紛失した', 'keys');
  manager.addDocument(
    'ja-JP',
    '私は私の鍵がどこにあるのか覚えていない',
    'keys'
  );
  manager.addDocument('ja-JP', '私は私の鍵が見つからない', 'keys');
}

function addEn(manager) {
  manager.addDocument('en-US', 'Hello', 'greet');
  manager.addDocument('en-US', 'Good evening', 'greet');
  manager.addDocument('en-US', 'Good morning', 'greet');
  manager.addDocument('en-US', "I've lost my keys", 'keys');
  manager.addDocument('en-US', "I don't find my keys", 'keys');
  manager.addDocument('en-US', "I don't know where are my keys", 'keys');
}

describe('NLP Manager', () => {
  describe('constructor', () => {
    test('Should create a new instance', () => {
      const manager = new NlpManager();
      expect(manager).toBeDefined();
    });
    test('Can create a new instance without neural', () => {
      const manager = new NlpManager({ useNeural: false });
      expect(manager.useNeural).toBeFalsy();
    });
    test('Can create a new instance without LRC', () => {
      const manager = new NlpManager({ useLRC: false });
      expect(manager.useLRC).toBeFalsy();
    });
    test('You can set options when creating', () => {
      const manager = new NlpManager({
        fullSearchWhenGuessed: true,
        useNlg: false,
      });
      expect(manager.settings.fullSearchWhenGuessed).toBeTruthy();
      expect(manager.settings.useNlg).toBeFalsy();
    });

    test('You can pass transformer function with options', () => {
      const transformer = (x) => x;
      const manager = new NlpManager({ processTransformer: transformer });
      expect(manager.settings.processTransformer).toEqual(transformer);
    });
  });

  describe('Add language', () => {
    test('Should add the language and the classifier', () => {
      const manager = new NlpManager();
      manager.addLanguage('en-US');
      expect(manager.nlp.nluManager.locales).toHaveLength(1);
      expect(manager.nlp.nluManager.locales).toContain('en-US');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
    });
    test('Should add several languages', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      expect(manager.nlp.nluManager.locales).toHaveLength(2);
      expect(manager.nlp.nluManager.locales).toContain('en-US');
      expect(manager.nlp.nluManager.locales).toContain('es-ES');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
    });
    test('Should not add already existing lenguages', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      manager.addLanguage(['en-US', 'en-US', 'es-ES', 'fr-FR']);
      expect(manager.nlp.nluManager.locales).toHaveLength(3);
      expect(manager.nlp.nluManager.locales).toContain('en-US');
      expect(manager.nlp.nluManager.locales).toContain('es-ES');
      expect(manager.nlp.nluManager.locales).toContain('fr-FR');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['fr-FR']).toBeDefined();
    });
  });

  describe('Remove language', () => {
    test('Should remove languages', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES', 'it-IT', 'fr-FR']);
      expect(manager.nlp.nluManager.locales).toHaveLength(4);
      expect(manager.nlp.nluManager.locales).toContain('en-US');
      expect(manager.nlp.nluManager.locales).toContain('es-ES');
      expect(manager.nlp.nluManager.locales).toContain('it-IT');
      expect(manager.nlp.nluManager.locales).toContain('fr-FR');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['it-IT']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['fr-FR']).toBeDefined();
      manager.removeLanguage(['en-US', 'fr-FR']);
      expect(manager.nlp.nluManager.locales).toHaveLength(2);
      expect(manager.nlp.nluManager.locales).not.toContain('en-US');
      expect(manager.nlp.nluManager.locales).toContain('es-ES');
      expect(manager.nlp.nluManager.locales).toContain('it-IT');
      expect(manager.nlp.nluManager.locales).not.toContain('fr-FR');
      expect(manager.nlp.nluManager.domainManagers['en-US']).not.toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['it-IT']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['fr-FR']).not.toBeDefined();
    });
  });

  describe('Guess language', () => {
    test('Should guess the language of an utterance', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      let language = manager.guessLanguage('what is?');
      expect(language).toEqual('en-US');
      language = manager.guessLanguage('¿Qué es?');
      expect(language).toEqual('es-ES');
    });
    test('Should return undefined if cannot be guessed', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      const language = manager.guessLanguage('');
      expect(language).toBeUndefined();
    });
  });

  describe('Add document', () => {
    test('If locale is not defined, then guess it', () => {
      const manager = new NlpManager({ nlu: { trainByDomain: true } });
      manager.addLanguage(['en-US', 'es-ES']);
      manager.addDocument(undefined, 'Dónde están las llaves', 'keys');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences
      ).toHaveLength(1);
      expect(
        manager.nlp.nluManager.domainManagers['en-US'].sentences
      ).toHaveLength(0);
    });
    test('If locale is not defined and cannot be guessed, throw an error', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      expect(() => manager.addDocument(undefined, '', 'keys')).toThrow(
        'Locale must be defined'
      );
    });
    test('Should check that there is a classifier for the locale', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      expect(() =>
        manager.addDocument('es-ES', 'Dónde están las llaves', 'keys')
      ).toThrow('Domain Manager not found for locale es-ES');
    });
    test('Should add the document to the classifier', () => {
      const manager = new NlpManager({ nlu: { trainByDomain: true } });
      manager.addLanguage(['en-US', 'es-ES']);
      manager.addDocument('es-ES', 'Dónde están las llaves', 'keys');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences
      ).toHaveLength(1);
    });
  });

  describe('Remove named entity text', () => {
    test('Should remove texts of named entity', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      addEntities(manager);
      manager.removeNamedEntityText('hero', 'iron man', 'en-US', 'iron-man');
      const ironman = manager.nlp.getRulesByName('en-US', 'hero');
      expect(ironman.rules[1].texts).toEqual(['iron man']);
    });
  });

  describe('Remove document', () => {
    test('If locale is not defined must be guessed', () => {
      const manager = new NlpManager({ nlu: { trainByDomain: true } });
      manager.addLanguage(['en-US', 'es-ES']);
      manager.addDocument('es-ES', 'Dónde están las llaves', 'keys');
      manager.removeDocument(undefined, 'Dónde están las llaves', 'keys');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences
      ).toHaveLength(0);
    });
    test('If locale is not defined and cannot be guessed, throw an error', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'es-ES']);
      expect(() => manager.removeDocument(undefined, '', 'keys')).toThrow(
        'Locale must be defined'
      );
    });
    test('Should check that there is a classifier for the locale', () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      expect(() =>
        manager.removeDocument('es-ES', 'Dónde están las llaves', 'keys')
      ).toThrow('Domain Manager not found for locale es-ES');
    });
    test('Should remove the document from the classifier', () => {
      const manager = new NlpManager({ nlu: { trainByDomain: true } });
      manager.addLanguage(['en-US', 'es-ES']);
      manager.addDocument('es-ES', 'Dónde están las llaves', 'keys');
      manager.removeDocument('es-ES', 'Dónde están las llaves', 'keys');
      expect(
        manager.nlp.nluManager.domainManagers['es-ES'].sentences
      ).toHaveLength(0);
    });
  });

  describe('Classify', () => {
    test('Should classify an utterance without None feature', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: false } });
      addFrJp(manager);
      await manager.train();
      const result = await manager.classify('fr-FR', 'où sont mes clés');
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('Should classify using allow list', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: false } });
      addFrJp(manager);
      await manager.train();
      const result = await manager.classify('fr-FR', 'où sont mes clés', {
        allowList: ['greet'],
      });
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('Should classify an utterance', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: true } });
      addFrJp(manager);
      await manager.train();
      const result = await manager.classify('fr-FR', 'où sont mes clés');
      expect(result.classifications).toHaveLength(3);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('Should return a empty classifications if there is not classifier for this language', async () => {
      const manager = new NlpManager();
      addFrJp(manager);
      await manager.train();
      const result = await manager.process('en-US', 'where are my keys?');
      const expected = {
        utterance: 'where are my keys?',
        locale: 'en-US',
        languageGuessed: false,
        localeIso2: 'en',
        language: 'English',
        classifications: [],
        domain: undefined,
        intent: 'None',
        score: 1,
        answer: undefined,
        answers: [],
        entities: [],
        sourceEntities: [],
        actions: [],
        sentiment: {
          average: 0.0625,
          locale: 'en-US',
          numHits: 1,
          numWords: 4,
          score: 0.25,
          type: 'senticon',
          vote: 'positive',
        },
      };
      expect(result).toEqual(expected);
    });
  });

  describe('Train', () => {
    test('You can train only a language', async () => {
      const manager = new NlpManager({
        nlu: { trainByDomain: true, useNoneFeature: true },
      });
      addFrJp(manager);
      await manager.train('fr-FR');
      let result = await manager.classify('où sont mes clés');
      expect(result.classifications).toHaveLength(3);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
      result = await manager.classify('私の鍵はどこにありますか');
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('You can train a set of languages', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: true } });
      addFrJp(manager);
      await manager.train(['fr-FR', 'ja-JP', 'es-ES']);
      let result = await manager.classify('où sont mes clés');
      expect(result.classifications).toHaveLength(3);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
      result = await manager.classify('私の鍵はどこにありますか');
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
  });

  describe('Extract Entities', () => {
    test('Should search for entities', async () => {
      const manager = new NlpManager({ ner: { builtins: [] } });
      manager.addLanguage(['en-US']);
      addEntities(manager);
      manager.addDocument('en-US', 'I saw %hero% eating %food%', 'sawhero');
      manager.addDocument(
        'en-US',
        'I have seen %hero%, he was eating %food%',
        'sawhero'
      );
      manager.addDocument('en-US', 'I want to eat %food%', 'wanteat');
      const result = await manager.extractEntities(
        'I saw spiderman eating spaghetti today in the city!'
      );
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].sourceText).toEqual('Spiderman');
      expect(result.entities[1].sourceText).toEqual('spaghetti');
    });
    test('Should search for entities if the language is specified', async () => {
      const manager = new NlpManager({ ner: { builtins: [] } });
      manager.addLanguage(['en-US']);
      addEntities(manager);
      manager.addDocument('en-US', 'I saw %hero% eating %food%', 'sawhero');
      manager.addDocument(
        'en-US',
        'I have seen %hero%, he was eating %food%',
        'sawhero'
      );
      manager.addDocument('en-US', 'I want to eat %food%', 'wanteat');
      const result = await manager.extractEntities(
        'en-US',
        'I saw spiderman eating spaghetti today in the city!'
      );
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].sourceText).toEqual('Spiderman');
      expect(result.entities[1].sourceText).toEqual('spaghetti');
    });
    test('If the locale is not provided, then guess language', async () => {
      const manager = new NlpManager({ ner: { builtins: [] } });
      manager.addLanguage(['en-US']);
      addEntities(manager);
      manager.addDocument('en-US', 'I saw %hero% eating %food%', 'sawhero');
      manager.addDocument(
        'en-US',
        'I have seen %hero%, he was eating %food%',
        'sawhero'
      );
      manager.addDocument('en-US', 'I want to eat %food%', 'wanteat');
      const result = await manager.extractEntities(
        'I saw spiderman eating spaghetti today in the city!'
      );
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].sourceText).toEqual('Spiderman');
      expect(result.entities[1].sourceText).toEqual('spaghetti');
    });
  });

  describe('Process', () => {
    test('Should classify an utterance without None feature', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: false } });
      manager.addLanguage(['en-US', 'ja-JP']);
      addEn(manager);
      await manager.train();
      const result = await manager.process('Where are my keys');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('en-US');
      expect(result.localeIso2).toEqual('en');
      expect(result.utterance).toEqual('Where are my keys');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('Should classify an utterance', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: true } });
      manager.addLanguage(['en-US', 'ja-JP']);
      addEn(manager);
      await manager.train();
      const result = await manager.process('Where are my keys');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('en-US');
      expect(result.localeIso2).toEqual('en');
      expect(result.utterance).toEqual('Where are my keys');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(3);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('Language can be specified', async () => {
      const manager = new NlpManager({ nlu: { useNoneFeature: true } });
      manager.addLanguage(['en-US', 'ja-JP']);
      addEn(manager);
      await manager.train();
      const result = await manager.process('en-US', 'where are my keys');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('en-US');
      expect(result.localeIso2).toEqual('en');
      expect(result.utterance).toEqual('where are my keys');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(3);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.7);
    });
    test('If a language not in the manager is passed, then return None classification', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'ja-JP']);
      addEn(manager);
      await manager.train();
      const result = await manager.process('es-ES', 'andestán mis llaves');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('es-ES');
      expect(result.localeIso2).toEqual('es');
      expect(result.language).toEqual('Spanish');
      expect(result.utterance).toEqual('andestán mis llaves');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(0);
      expect(result.intent).toEqual('None');
      expect(result.score).toEqual(1);
    });
    test('Languages with ISO code can be identified even without stemmer', async () => {
      const manager = new NlpManager({
        languages: ['en-US', 'ko-KR'],
        fullSearchWhenGuessed: true,
      });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
      manager.addDocument('en-US', 'bye for now', 'greetings.bye');
      manager.addDocument('en-US', 'i must go', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addDocument('en-US', 'howdy', 'greetings.hello');
      manager.addDocument('ko-KR', '여보세요', 'greetings.hello');
      manager.addDocument('ko-KR', '안녕하세요!', 'greetings.hello');
      manager.addDocument('ko-KR', '여보!', 'greetings.hello');
      manager.addDocument('ko-KR', '어이!', 'greetings.hello');
      manager.addDocument('ko-KR', '좋은 아침', 'greetings.hello');
      manager.addDocument('ko-KR', '안녕히 주무세요', 'greetings.hello');
      manager.addDocument('ko-KR', '안녕', 'greetings.bye');
      manager.addDocument('ko-KR', '친 공이 타자', 'greetings.bye');
      manager.addDocument('ko-KR', '상대가 없어 남는 사람', 'greetings.bye');
      manager.addDocument('ko-KR', '지엽적인 것', 'greetings.bye');
      await manager.train();
      const result = await manager.process('상대가 없어 남는 편');
      expect(result.language).toEqual('Korean');
      expect(result.intent).toEqual('greetings.bye');
      expect(result.score).toBeGreaterThan(0.9);
    });
    test('Should work with fantasy languages', async () => {
      const manager = new NlpManager({ languages: ['en-US', 'x-klingon'] });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
      manager.addDocument('en-US', 'bye for now', 'greetings.bye');
      manager.addDocument('en-US', 'i must go', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addDocument('en-US', 'howdy', 'greetings.hello');
      manager.describeLanguage('x-klingon', 'Klingon');
      manager.addDocument('x-klingon', 'nuqneH', 'hello');
      manager.addDocument('x-klingon', 'maj po', 'hello');
      manager.addDocument('x-klingon', 'maj choS', 'hello');
      manager.addDocument('x-klingon', 'maj ram', 'hello');
      manager.addDocument('x-klingon', `nuqDaq ghaH ngaQHa'moHwI'mey?`, 'keys');
      manager.addDocument('x-klingon', `ngaQHa'moHwI'mey lujta' jIH`, 'keys');
      await manager.train();
      const result = await manager.process(`ngaQHa'moHwI'mey nIH vay'`);
      expect(result.language).toEqual('Klingon');
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.9);
    });
    test('Should even guess the fantasy language', async () => {
      const manager = new NlpManager({ languages: ['en-US', 'x-klingon'] });
      manager.describeLanguage('x-klingon', 'Klingon');
      manager.addDocument('x-klingon', 'nuqneH', 'hello');
      manager.addDocument('x-klingon', 'maj po', 'hello');
      manager.addDocument('x-klingon', 'maj choS', 'hello');
      manager.addDocument('x-klingon', 'maj ram', 'hello');
      manager.addDocument('x-klingon', `nuqDaq ghaH ngaQHa'moHwI'mey?`, 'keys');
      manager.addDocument('x-klingon', `ngaQHa'moHwI'mey lujta' jIH`, 'keys');
      await manager.train();
      const result = await manager.process(
        'x-klingon',
        `ngaQHa'moHwI'mey nIH vay'`
      );
      expect(result.language).toEqual('Klingon');
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.9);
    });
    test('Should search for entities', async () => {
      const manager = new NlpManager({ ner: { builtins: [] } });
      manager.addLanguage(['en-US']);
      addEntities(manager);
      manager.addDocument('en-US', 'I saw %hero% eating %food%', 'sawhero');
      manager.addDocument(
        'en-US',
        'I have seen %hero%, he was eating %food%',
        'sawhero'
      );
      manager.addDocument('en-US', 'I want to eat %food%', 'wanteat');
      await manager.train();
      const result = await manager.process(
        'I saw spiderman eating spaghetti today in the city!'
      );
      expect(result.intent).toEqual('sawhero');
      expect(result.score).toBeGreaterThan(0.5);
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].sourceText).toEqual('Spiderman');
      expect(result.entities[1].sourceText).toEqual('spaghetti');
    });
    test('Should search for entities if the language is specified', async () => {
      const manager = new NlpManager({ ner: { builtins: [] } });
      manager.addLanguage(['en-US']);
      addEntities(manager);
      manager.addDocument('en-US', 'I saw %hero% eating %food%', 'sawhero');
      manager.addDocument(
        'en-US',
        'I have seen %hero%, he was eating %food%',
        'sawhero'
      );
      manager.addDocument('en-US', 'I want to eat %food%', 'wanteat');
      await manager.train();
      const result = await manager.process(
        'en-US',
        'I saw spiderman eating spaghetti today in the city!'
      );
      expect(result.intent).toEqual('sawhero');
      expect(result.score).toBeGreaterThan(0.5);
      expect(result.entities).toHaveLength(2);
      expect(result.entities[0].sourceText).toEqual('Spiderman');
      expect(result.entities[1].sourceText).toEqual('spaghetti');
    });
    test('Should give the sentiment even if NLP not trained', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      const result = await manager.process('I love cats');
      expect(result.sentiment).toBeDefined();
      expect(result.sentiment.vote).toEqual('positive');
    });
    test('Should return None with score 1 if the utterance cannot be classified', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      addEn(manager);
      await manager.train();
      const result = await manager.process('This should return none');
      expect(result.intent).toEqual('None');
      expect(result.score).toEqual(1);
    });
    test('If the NLG is trained, then return the answer', async () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
      manager.addDocument('en-US', 'bye for now', 'greetings.bye');
      manager.addDocument('en-US', 'i must go', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addDocument('en-US', 'howdy', 'greetings.hello');
      manager.addDocument('en-US', 'how is your day', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'how is your day going',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'how are you', 'greetings.howareyou');
      manager.addDocument('en-US', 'how are you doing', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'what about your day',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'are you alright', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'pleased to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'it was very nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'glad to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'nice meeting you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument('en-US', 'nice to see you', 'greetings.nicetoseeyou');
      manager.addDocument('en-US', 'good to see you', 'greetings.nicetoseeyou');
      manager.addDocument(
        'en-US',
        'great to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'lovely to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'nice to talk to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's nice to talk to you",
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        'nice talking to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's been nice talking to you",
        'greetings.nicetotalktoyou'
      );
      manager.addAnswer('en-US', 'greetings.bye', 'Till next time');
      manager.addAnswer('en-US', 'greetings.bye', 'See you soon!');
      manager.addAnswer('en-US', 'greetings.hello', 'Hey there!');
      manager.addAnswer('en-US', 'greetings.hello', 'Greetings!');
      manager.addAnswer('en-US', 'greetings.howareyou', 'Feeling wonderful!');
      manager.addAnswer(
        'en-US',
        'greetings.howareyou',
        'Wonderful! Thanks for asking'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "It's nice meeting you, too"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "Likewise. I'm looking forward to helping you out"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'Nice meeting you, as well'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'The pleasure is mine'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'Same here. I was starting to miss you'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'So glad we meet again'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'It sure was. We can chat again anytime'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'I enjoy talking to you, too'
      );
      await manager.train();
      let result = await manager.process('goodbye');
      expect(result.answer).toMatch(
        new RegExp(/(Till next time)|(See you soon!)/g)
      );
      result = await manager.process('It was nice to meet you');
      expect(result.answer).toMatch(
        new RegExp(
          /(It's nice meeting you, too)|(Likewise. I'm looking forward to helping you out)|(Nice meeting you, as well)|(The pleasure is mine)/g
        )
      );
    });
    test('If the intent has actions, then return also the actions', async () => {
      const manager = new NlpManager({
        languages: ['en-US'],
        action: {
          cleanSession: () => 'cleaned',
          beginDialog: () => 'started',
        },
      });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
      manager.addDocument('en-US', 'bye for now', 'greetings.bye');
      manager.addDocument('en-US', 'i must go', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addDocument('en-US', 'howdy', 'greetings.hello');
      manager.addDocument('en-US', 'how is your day', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'how is your day going',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'how are you', 'greetings.howareyou');
      manager.addDocument('en-US', 'how are you doing', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'what about your day',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'are you alright', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'pleased to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'it was very nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'glad to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'nice meeting you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument('en-US', 'nice to see you', 'greetings.nicetoseeyou');
      manager.addDocument('en-US', 'good to see you', 'greetings.nicetoseeyou');
      manager.addDocument(
        'en-US',
        'great to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'lovely to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'nice to talk to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's nice to talk to you",
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        'nice talking to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's been nice talking to you",
        'greetings.nicetotalktoyou'
      );
      manager.addAction('greetings.bye', 'cleanSession', ['true']);
      manager.addAction('greetings.bye', 'beginDialog', ['"/"']);
      manager.addAnswer('en-US', 'greetings.bye', 'Till next time');
      manager.addAnswer('en-US', 'greetings.bye', 'See you soon!');
      manager.addAnswer('en-US', 'greetings.hello', 'Hey there!');
      manager.addAnswer('en-US', 'greetings.hello', 'Greetings!');
      manager.addAnswer('en-US', 'greetings.howareyou', 'Feeling wonderful!');
      manager.addAnswer(
        'en-US',
        'greetings.howareyou',
        'Wonderful! Thanks for asking'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "It's nice meeting you, too"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "Likewise. I'm looking forward to helping you out"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'Nice meeting you, as well'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'The pleasure is mine'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'Same here. I was starting to miss you'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'So glad we meet again'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'It sure was. We can chat again anytime'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'I enjoy talking to you, too'
      );
      await manager.train();
      let result = await manager.process('goodbye');
      expect(result.actions).toHaveLength(2);
      expect(result.actions[0].action).toEqual('cleanSession');
      expect(result.actions[0].parameters).toEqual(['true']);
      expect(result.actions[1].action).toEqual('beginDialog');
      expect(result.actions[1].parameters).toEqual(['"/"']);
      result = await manager.process('It was nice to meet you');
      expect(result.answer).toMatch(
        new RegExp(
          /(It's nice meeting you, too)|(Likewise. I'm looking forward to helping you out)|(Nice meeting you, as well)|(The pleasure is mine)/g
        )
      );
    });
    test('If the intent has actions, then apply the actions to the answer', async () => {
      const manager = new NlpManager({
        languages: ['en-US'],
        action: {
          action1: (input, ...parameters) =>
            `(${input.answer}#${parameters.join(',')})`,
          action2: (input, ...parameters) =>
            `[${input.answer}#${parameters.join(',')}]`,
        },
      });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addAction('greetings.bye', 'action1', ['a', 'b']);
      manager.addAction('greetings.bye', 'action2', ['c', 'd']);
      manager.addAnswer('en-US', 'greetings.bye', 'See you soon!');
      manager.addAnswer('en-US', 'greetings.hello', 'Hey there!');
      await manager.train();
      const result = await manager.process('goodbye');
      expect(result.answer).toEqual('[(See you soon!#a,b)#c,d]');
    });

    test('If the NLG is trained, and the answer contains a template, replace with context variables', async () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
      manager.addDocument('en-US', 'bye for now', 'greetings.bye');
      manager.addDocument('en-US', 'i must go', 'greetings.bye');
      manager.addDocument('en-US', 'hello', 'greetings.hello');
      manager.addDocument('en-US', 'hi', 'greetings.hello');
      manager.addDocument('en-US', 'howdy', 'greetings.hello');
      manager.addDocument('en-US', 'how is your day', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'how is your day going',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'how are you', 'greetings.howareyou');
      manager.addDocument('en-US', 'how are you doing', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'what about your day',
        'greetings.howareyou'
      );
      manager.addDocument('en-US', 'are you alright', 'greetings.howareyou');
      manager.addDocument(
        'en-US',
        'nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'pleased to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'it was very nice to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'glad to meet you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument(
        'en-US',
        'nice meeting you',
        'greetings.nicetomeetyou'
      );
      manager.addDocument('en-US', 'nice to see you', 'greetings.nicetoseeyou');
      manager.addDocument('en-US', 'good to see you', 'greetings.nicetoseeyou');
      manager.addDocument(
        'en-US',
        'great to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'lovely to see you',
        'greetings.nicetoseeyou'
      );
      manager.addDocument(
        'en-US',
        'nice to talk to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's nice to talk to you",
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        'nice talking to you',
        'greetings.nicetotalktoyou'
      );
      manager.addDocument(
        'en-US',
        "it's been nice talking to you",
        'greetings.nicetotalktoyou'
      );
      manager.addAnswer('en-US', 'greetings.bye', 'Till next time');
      manager.addAnswer('en-US', 'greetings.bye', 'See you soon!');
      manager.addAnswer('en-US', 'greetings.hello', 'Hey there!');
      manager.addAnswer('en-US', 'greetings.hello', 'Greetings!');
      manager.addAnswer('en-US', 'greetings.howareyou', 'Feeling wonderful!');
      manager.addAnswer(
        'en-US',
        'greetings.howareyou',
        'Wonderful! Thanks for asking'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "It's nice meeting you, too {{name}}"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        "Likewise. I'm looking forward to helping you out {{name}}"
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'Nice meeting you, as well {{name}}'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetomeetyou',
        'The pleasure is mine {{name}}'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'Same here. I was starting to miss you'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetoseeyou',
        'So glad we meet again'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'It sure was. We can chat again anytime'
      );
      manager.addAnswer(
        'en-US',
        'greetings.nicetotalktoyou',
        'I enjoy talking to you, too'
      );
      await manager.train();
      const result = await manager.process('en-US', 'It was nice to meet you', {
        name: 'John',
      });
      expect(result.answer).toMatch(
        new RegExp(
          /(It's nice meeting you, too John)|(Likewise. I'm looking forward to helping you out John)|(Nice meeting you, as well John)|(The pleasure is mine John)/g
        )
      );
    });

    test('Should process Thai', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['th-TH']);
      manager.addDocument('th-TH', 'สวัสดี', 'greet');
      manager.addDocument('th-TH', 'สวัสดีตอนเช้าค่ะ', 'greet');
      manager.addDocument('th-TH', 'ราตรีสวัสดิ์', 'greet');
      manager.addDocument('th-TH', 'สวัสดีตอนเย็น', 'greet');
      manager.addDocument('th-TH', 'ฉันทำกุญแจของฉันหาย', 'keys');
      manager.addDocument('th-TH', 'กุญแจของฉันอยู่ที่ไหน', 'keys');
      manager.addDocument('th-TH', 'ฉันไม่พบกุญแจของฉัน', 'keys');
      await manager.train();
      const result = await manager.process(
        'th-TH',
        'ฉันไม่รู้ว่ากุญแจอยู่ที่ไหน'
      );
      expect(result).toBeDefined();
      expect(result.locale).toEqual('th-TH');
      expect(result.localeIso2).toEqual('th');
      expect(result.utterance).toEqual('ฉันไม่รู้ว่ากุญแจอยู่ที่ไหน');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.8);
    });

    test('Should process Hindi', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['hi-IN']);
      manager.addDocument('hi-IN', 'नमस्ते', 'greet');
      manager.addDocument('hi-IN', 'सुसंध्या', 'greet');
      manager.addDocument('hi-IN', 'शुभ प्रभात', 'greet');
      manager.addDocument('hi-IN', 'मैंने अपनी चाबी खो दी है', 'keys');
      manager.addDocument('hi-IN', 'मुझे अपनी चाबी नहीं मिली', 'keys');
      manager.addDocument(
        'hi-IN',
        'मुझे नहीं पता कि मेरी चाबियां कहां हैं',
        'keys'
      );
      await manager.train();
      const result = await manager.process('hi-IN', 'मेरी चाबियाँ कहाँ हैं');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('hi-IN');
      expect(result.localeIso2).toEqual('hi');
      expect(result.utterance).toEqual('मेरी चाबियाँ कहाँ हैं');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.8);
    });

    test('Should process Bengali', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['bn-BD']);
      manager.addDocument('bn-BD', 'হ্যালো', 'greet');
      manager.addDocument('bn-BD', 'শুভ সন্ধ্যা', 'greet');
      manager.addDocument('bn-BD', 'সুপ্রভাত', 'greet');
      manager.addDocument('bn-BD', 'আমি আমার চাবি হারিয়েছি', 'keys');
      manager.addDocument('bn-BD', 'আমি আমার চাবিগুলি পাই না', 'keys');
      manager.addDocument('bn-BD', 'আমি জানি না আমার চাবিগুলি কোথায়?', 'keys');
      await manager.train();
      const result = await manager.process('bn-BD', 'যেখানে আমার কি হয়');
      expect(result).toBeDefined();
      expect(result.locale).toEqual('bn-BD');
      expect(result.localeIso2).toEqual('bn');
      expect(result.utterance).toEqual('যেখানে আমার কি হয়');
      expect(result.classifications).toBeDefined();
      expect(result.classifications).toHaveLength(2);
      expect(result.intent).toEqual('keys');
      expect(result.score).toBeGreaterThan(0.8);
    });

    test('Should call transformer function if it is passed', async () => {
      const transformer = jest.fn((_) => _);
      const manager = new NlpManager({
        processTransformer: transformer,
      });
      manager.addLanguage(['en-US', 'ja-JP']);
      addEn(manager);
      await manager.train();

      expect(transformer).not.toHaveBeenCalled();

      await manager.process('where are my keys');

      expect(transformer).toHaveBeenCalled();
      expect(transformer.mock.calls[0][0]).toMatchObject({
        locale: 'en-US',
        localeIso2: 'en',
        utterance: 'where are my keys',
      });
    });

    test('Should return transformer function result if it is passed', async () => {
      const transformedValue = {
        transformed: 'VALUE',
      };
      const transformer = jest.fn().mockReturnValue(transformedValue);
      const manager = new NlpManager({
        processTransformer: transformer,
      });
      manager.addLanguage(['en-US', 'ja-JP']);
      manager.addDocument('en-US', 'Hello', 'greet');
      await manager.train();

      const result = await manager.process('where are my keys');

      expect(result).toEqual(transformedValue);
    });

    test('Should return async transformer function result if it is passed', async () => {
      const transformedValue = {
        transformed: 'VALUE',
      };
      const transformer = jest
        .fn()
        .mockReturnValue(Promise.resolve(transformedValue));
      const manager = new NlpManager({
        processTransformer: transformer,
      });
      manager.addLanguage(['en-US', 'ja-JP']);
      manager.addDocument('en-US', 'Hello', 'greet');
      await manager.train();

      const result = await manager.process('where are my keys');

      expect(result).toEqual(transformedValue);
    });
  });

  describe('Remove answer', () => {
    test('It should remove an answer from the NLG', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addAnswer('en-US', 'greetings.bye', 'Till next time');
      manager.addAnswer('en-US', 'greetings.bye', 'See you soon!');
      manager.removeAnswer('en-US', 'greetings.bye', 'See you soon!');
      const answers = manager.findAllAnswers('en-US', 'greetings.bye', {});
      expect(answers).toHaveLength(1);
    });
  });

  describe('Add action', () => {
    test('It should add an action for the given intent', () => {
      const manager = new NlpManager({
        languages: ['en-US'],
        action: {
          cleanSession: () => 'cleaned',
        },
      });
      manager.addAction('greetings.bye', 'cleanSession', ['true']);
      const actions = manager.getActions('greetings.bye');

      expect(actions).toHaveLength(1);
      expect(actions[0].action).toEqual('cleanSession');
      expect(actions[0].parameters).toEqual(['true']);
    });
  });

  describe('Remove action', () => {
    test('It should remove an action', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addAction('greetings.bye', 'cleanSession', ['true']);
      manager.removeAction('greetings.bye', 'cleanSession', ['true']);
      const actions = manager.getActions('greetings.bye');
      expect(actions).toHaveLength(0);
    });
  });

  describe('Remove actions', () => {
    test('It should remove all actions of an intent', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addAction('greetings.bye', 'cleanSession', ['true']);
      manager.removeActions('greetings.bye');
      const actions = manager.getActions('greetings.bye');
      expect(actions).toHaveLength(0);
    });
  });

  describe('Get Sentiment', () => {
    test('It should return the sentiment of an utterance', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      const sentiment = await manager.getSentiment('en-US', 'I love kitties');
      expect(sentiment.vote).toEqual('positive');
    });
    test('If the locale is not given, then guess it', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US']);
      const sentiment = await manager.getSentiment('I love kitties');
      expect(sentiment.vote).toEqual('positive');
    });
  });

  describe('Domain', () => {
    test('When adding a new intent, by default is assigned to the default domain', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addDocument('en-US', 'Good Morning', 'greet');
      manager.addDocument('en-US', 'Where are my keys', 'keys');
      const expected = 'default';
      let actual = manager.getIntentDomain('en-US', 'greet');
      expect(actual).toEqual(expected);
      actual = manager.getIntentDomain('en-US', 'keys');
      expect(actual).toEqual(expected);
    });
    test('The domain of a non existing intent should be default', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.addDocument('en-US', 'Good Morning', 'greet');
      manager.addDocument('en-US', 'Where are my keys', 'keys');
      const actual = manager.getIntentDomain('en-US', 'nope');
      const expected = 'default';
      expect(actual).toEqual(expected);
    });
    test('It should return the domain of the intent when processing', async () => {
      const manager = new NlpManager();
      manager.addLanguage(['en-US', 'ja-JP']);
      manager.assignDomain('greet', 'domain');
      manager.assignDomain('keys', 'domain');
      addEn(manager);
      await manager.train();
      const result = await manager.process('where are my keys');
      expect(result.domain).toEqual('domain');
    });
    test('It can provide a list of domains with the intents', () => {
      const manager = new NlpManager({ languages: ['en-US'] });
      manager.assignDomain('greet', 'domain1');
      manager.assignDomain('keys', 'domain2');
      manager.assignDomain('another', 'domain2');
      manager.addDocument('en-US', 'Good Morning', 'greet');
      manager.addDocument('en-US', 'Where are my keys', 'keys');
      manager.addDocument('en-US', 'This is another thing', 'another');
      const actual = manager.getDomains();
      const expected = {
        'en-US': {
          domain1: ['greet'],
          domain2: ['keys', 'another'],
        },
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('Spell Checking', () => {
    test('If spell checking is provided, can fix words', async () => {
      const manager = new NlpManager({
        languages: ['fr-FR'],
        nlu: { spellCheck: true },
        ner: { builtins: [] },
      });
      manager.addDocument('fr-FR', 'Bonjour!', 'greetings');
      manager.addDocument('fr-FR', 'bonjour', 'greetings');
      manager.addDocument('fr-FR', 'salut', 'greetings');
      manager.addDocument('fr-FR', 'au revoire', 'bye');
      await manager.train();
      const result1 = await manager.process('fr-FR', 'Bonjou');
      expect(result1.intent).toEqual('greetings');
      const result2 = await manager.process('fr-FR', 'Bonjourd');
      expect(result2.intent).toEqual('greetings');
    });
  });

  describe('Load excel', () => {
    test('It should read languages', () => {
      const manager = new NlpManager();
      manager.loadExcel('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.nluManager.locales).toEqual(['en-US', 'es-ES']);
    });
    test('It should read excel without regex entities', () => {
      const manager = new NlpManager();
      manager.loadExcel('./packages/node-nlp/test/nlp/rulesnoregex.xls');
      expect(manager.nlp.nluManager.locales).toEqual(['en-US', 'es-ES']);
    });
    test('It should read named entities', () => {
      const manager = new NlpManager();
      manager.loadExcel('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.ner.rules['en-US']).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES']).toBeDefined();
      expect(manager.nlp.ner.rules['en-US'].hero).toBeDefined();
      expect(manager.nlp.ner.rules['en-US'].food).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES'].hero).toBeDefined();
      expect(manager.nlp.ner.rules['es-ES'].food).toBeDefined();
    });
    test('It should create the classifiers for the languages', () => {
      const manager = new NlpManager();
      manager.loadExcel('./packages/node-nlp/test/nlp/rules.xls');
      expect(manager.nlp.nluManager.domainManagers['en-US']).toBeDefined();
      expect(manager.nlp.nluManager.domainManagers['es-ES']).toBeDefined();
    });
    test('The classifiers should contain the intent definition', () => {
      const manager = new NlpManager();
      manager.loadExcel('./packages/node-nlp/test/nlp/rules.xls');
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
      manager.loadExcel('./packages/node-nlp/test/nlp/rules.xls');
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

  describe('addBetweenCondition', () => {
    test('It should extract a between rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addBetweenCondition('en-US', 'entity', 'from', 'to');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid to Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          start: 18,
          end: 23,
          accuracy: 1,
          sourceText: 'Madrid',
          entity: 'entity',
          type: 'trim',
          subtype: 'between',
          utteranceText: 'Madrid',
          len: 6,
        },
      ]);
    });
  });

  describe('addBeforeCondition', () => {
    test('It should extract a before rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addBeforeCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'before',
          start: 0,
          end: 11,
          len: 12,
          accuracy: 0.99,
          sourceText: 'I have to go',
          utteranceText: 'I have to go',
          entity: 'entity',
          alias: 'entity_0',
        },
        {
          type: 'trim',
          subtype: 'before',
          start: 18,
          end: 23,
          len: 6,
          accuracy: 0.99,
          sourceText: 'Madrid',
          utteranceText: 'Madrid',
          entity: 'entity',
          alias: 'entity_1',
        },
      ]);
    });
  });

  describe('addBeforeLastCondition', () => {
    test('It should extract a before last rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addBeforeLastCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'beforeLast',
          start: 0,
          end: 23,
          len: 24,
          accuracy: 0.99,
          sourceText: 'I have to go from Madrid',
          utteranceText: 'I have to go from Madrid',
          entity: 'entity',
        },
      ]);
    });
  });

  describe('addBeforeFirstCondition', () => {
    test('It should extract a before first rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addBeforeFirstCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'beforeFirst',
          start: 0,
          end: 11,
          len: 12,
          accuracy: 0.99,
          sourceText: 'I have to go',
          utteranceText: 'I have to go',
          entity: 'entity',
        },
      ]);
    });
  });

  describe('addAfterCondition', () => {
    test('It should extract a get after rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addAfterCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'after',
          start: 18,
          end: 23,
          len: 6,
          accuracy: 0.99,
          sourceText: 'Madrid',
          utteranceText: 'Madrid',
          entity: 'entity',
          alias: 'entity_0',
        },
        {
          type: 'trim',
          subtype: 'after',
          start: 30,
          end: 38,
          len: 9,
          accuracy: 0.99,
          sourceText: 'Barcelona',
          utteranceText: 'Barcelona',
          entity: 'entity',
          alias: 'entity_1',
        },
      ]);
    });
  });

  describe('addAfterFirstCondition', () => {
    test('It should extract a get after first rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addAfterFirstCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'afterFirst',
          start: 18,
          end: 38,
          len: 21,
          accuracy: 0.99,
          sourceText: 'Madrid from Barcelona',
          utteranceText: 'Madrid from Barcelona',
          entity: 'entity',
        },
      ]);
    });
  });

  describe('addAfterLastCondition', () => {
    test('It should extract a get after last rule', async () => {
      const nlp = new NlpManager({ forceNER: true });
      nlp.addAfterLastCondition('en-US', 'entity', 'from');
      const input = {
        locale: 'en-US',
        text: 'I have to go from Madrid from Barcelona',
      };
      const actual = await nlp.process(input);
      expect(actual.entities).toEqual([
        {
          type: 'trim',
          subtype: 'afterLast',
          start: 30,
          end: 38,
          len: 9,
          accuracy: 0.99,
          sourceText: 'Barcelona',
          utteranceText: 'Barcelona',
          entity: 'entity',
        },
      ]);
    });
  });

  describe('Process corpus', () => {
    test('A corpus can be loaded and processed', async () => {
      const nlp = new NlpManager();
      nlp.addCorpus(corpus);
      await nlp.train();
      const actual = await nlp.process('who are you?');
      expect(actual.intent).toEqual('smalltalk.acquaintance');
    });
    test('An allow list can be provided', async () => {
      const nlp = new NlpManager();
      nlp.addCorpus(corpus);
      await nlp.train();
      let actual = await nlp.process('who are your?', undefined, undefined, {
        allowList: ['smalltalk.boss', 'smalltalk.boring'],
      });
      expect(actual.intent).toEqual('smalltalk.boss');
      actual = await nlp.process('who are your?', undefined, undefined, {
        allowList: ['support.developers', 'smalltalk.boring'],
      });
      expect(actual.intent).toEqual('support.developers');
    });
  });
});
