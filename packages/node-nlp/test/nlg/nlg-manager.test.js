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

const { NlgManager } = require('../../src');

describe('NLG Manager', () => {
  describe('constructor', () => {
    test('Should create an instance', () => {
      const manager = new NlgManager();
      expect(manager).toBeDefined();
    });
  });

  describe('Is valid', () => {
    test('Should return true if the condition is valid', () => {
      const manager = new NlgManager();
      const result = manager.isValid('7 * 2 === 14');
      expect(result).toBeTruthy();
    });
    test('Should return false if the condition is not valid', () => {
      const manager = new NlgManager();
      const result = manager.isValid('7 * 2 !== 14');
      expect(result).toBeFalsy();
    });
    test('Should use the context if provided', () => {
      const manager = new NlgManager();
      const result = manager.isValid('a * 2 === 14', { a: 7 });
      expect(result).toBeTruthy();
    });
  });

  describe('Add answer', () => {
    test('Should add an answer with no condition', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      expect(manager.responses['en-US'].greet).toHaveLength(1);
      expect(manager.responses['en-US'].greet[0].answer).toEqual('Hello');
      expect(manager.responses['en-US'].greet[0].opts).toBeUndefined();
    });
    test('Should add an answer with condition', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(1);
      expect(manager.responses['en-US'].greet[0].answer).toEqual('Hello');
      expect(manager.responses['en-US'].greet[0].opts).toEqual('a === 1');
    });
    test('Should not add a duplicate entry', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(1);
    });
    test('Should be able to create several responses for the same intent and locale', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Greetings', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hi', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(3);
    });
    test('Should be able to create responses for different intents of a locale', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Greetings', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hi', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Goodbye', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Bye', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(3);
      expect(manager.responses['en-US'].bye).toHaveLength(2);
    });
    test('Should be able to create responses for different intents and locales', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Greetings', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hi', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Goodbye', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Bye', 'a === 1');
      manager.addAnswer('es-ES', 'greet', 'Hola', 'a === 1');
      manager.addAnswer('es-ES', 'greet', 'Holi!', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Hasta luego', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Hasta otra', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Nos vemos!', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(3);
      expect(manager.responses['en-US'].bye).toHaveLength(2);
      expect(manager.responses['es-ES'].greet).toHaveLength(2);
      expect(manager.responses['es-ES'].bye).toHaveLength(3);
    });
  });

  describe('Remove Answer', () => {
    test('I can remove an added response', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Greetings', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hi', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Goodbye', 'a === 1');
      manager.addAnswer('en-US', 'bye', 'Bye', 'a === 1');
      manager.addAnswer('es-ES', 'greet', 'Hola', 'a === 1');
      manager.addAnswer('es-ES', 'greet', 'Holi!', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Hasta luego', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Hasta otra', 'a === 1');
      manager.addAnswer('es-ES', 'bye', 'Nos vemos!', 'a === 1');
      manager.removeAnswer('es-ES', 'greet', 'Holi!', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(3);
      expect(manager.responses['en-US'].bye).toHaveLength(2);
      expect(manager.responses['es-ES'].greet).toHaveLength(1);
      expect(manager.responses['es-ES'].bye).toHaveLength(3);
    });
    test('If the answer does not exists, do nothing', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.removeAnswer('en-US', 'greet', 'Hell', 'a === 1');
      expect(manager.responses['en-US'].greet).toHaveLength(1);
    });
  });

  describe('Find all answers', () => {
    test('It should return all answers from intent and locale with no condition', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      manager.addAnswer('en-US', 'greet', 'Greetings');
      manager.addAnswer('en-US', 'greet', 'Hi');
      const result = manager.findAllAnswers('en-US', 'greet', {});
      expect(result).toHaveLength(3);
    });
    test('It should return all answers with true condition or no condition', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Greetings', 'a === 1');
      manager.addAnswer('en-US', 'greet', 'Hi', 'a === 2');
      manager.addAnswer('en-US', 'greet', 'Good day');
      const result = manager.findAllAnswers('en-US', 'greet', { a: 1 });
      expect(result).toHaveLength(3);
      expect(result[0].response).toEqual('Hello');
      expect(result[1].response).toEqual('Greetings');
      expect(result[2].response).toEqual('Good day');
    });
    test('It should return an empty array if location does not have answers', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      const result = manager.findAllAnswers('es-ES', 'greet', {});
      expect(result).toHaveLength(0);
    });
    test('It should return an empty array if intent does not exists', () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      const result = manager.findAllAnswers('en-US', 'bye', {});
      expect(result).toHaveLength(0);
    });
  });

  describe('Find answer', () => {
    test('It should return one answer from intent and locale with no condition', async () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      manager.addAnswer('en-US', 'greet', 'Greetings');
      manager.addAnswer('en-US', 'greet', 'Hi');
      const result = await manager.findAnswer('en-US', 'greet', {});
      expect(result).toBeDefined();
    });
    test('It should return undefined if there is no answer', async () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      manager.addAnswer('en-US', 'greet', 'Greetings');
      manager.addAnswer('en-US', 'greet', 'Hi');
      const result = await manager.findAnswer('en-US', 'bye', {});
      expect(result).toBeUndefined();
    });
    test('It should return the existing answer if there is only 1', async () => {
      const manager = new NlgManager();
      manager.addAnswer('en-US', 'greet', 'Hello');
      const result = await manager.findAnswer('en-US', 'greet', {});
      expect(result.response).toEqual('Hello');
    });
  });
});
