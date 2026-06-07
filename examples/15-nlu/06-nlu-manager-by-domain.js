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

const { containerBootstrap } = require('../../packages/core/src');
const { NluManager, NluNeural } = require('../../packages/nlu/src');
const { LangEn } = require('../../packages/lang-en-us/src');
const { LangEs } = require('../../packages/lang-es-es/src');
// const { containerBootstrap } = require('@lumen-labs-dev/core');
// const { NluManager, NluNeural } = require('@lumen-labs-dev/nlu');
// const { LangEn } = require('@lumen-labs-dev/lang-en-us');
// const { LangEs } = require('@lumen-labs-dev/lang-es-es');

function addFoodDomainEn(manager) {
  manager.assignDomain('en-US', 'order.check', 'food');
  manager.add('en-US', 'what do I have in my basket', 'order.check');
  manager.add('en-US', 'check my cart', 'order.check');
  manager.add('en-US', "show me what I've ordered", 'order.check');
  manager.add('en-US', "what's in my basket", 'order.check');
  manager.add('en-US', 'check my order', 'order.check');
  manager.add('en-US', 'check what I have ordered', 'order.check');
  manager.add('en-US', 'show my order', 'order.check');
  manager.add('en-US', 'check my basket', 'order.check');

  manager.assignDomain('en-US', 'order.check_status', 'food');
  manager.add('en-US', 'how soon will it be delivered', 'order.check_status');
  manager.add('en-US', 'check the status of my delivery', 'order.check_status');
  manager.add('en-US', 'when should I expect delivery', 'order.check_status');
  manager.add('en-US', 'check my order status', 'order.check_status');
  manager.add('en-US', 'where is my order', 'order.check_status');
  manager.add('en-US', 'where is my delivery', 'order.check_status');
  manager.add('en-US', 'status of my order', 'order.check_status');
}

function addFoodDomainEs(manager) {
  manager.assignDomain('es-ES', 'order.check', 'food');
  manager.add('es-ES', 'qué tengo en mi cesta', 'order.check');
  manager.add('es-ES', 'comprueba mi carrito', 'order.check');
  manager.add('es-ES', 'enséñame qué he pedido', 'order.check');
  manager.add('es-ES', 'qué hay en mi carrito?', 'order.check');
  manager.add('es-ES', 'comprueba mi compra', 'order.check');
  manager.add('es-ES', 'comprueba qué he comprado', 'order.check');
  manager.add('es-ES', 'muéstrame mi compra', 'order.check');

  manager.assignDomain('es-ES', 'order.check_status', 'food');
  manager.add('es-ES', 'cuándo me lo van a traer?', 'order.check_status');
  manager.add('es-ES', 'cómo va la entrega?', 'order.check_status');
  manager.add('es-ES', 'cuándo me traerán mi pedido?', 'order.check_status');
  manager.add('es-ES', 'en qué estado está mi pedido?', 'order.check_status');
  manager.add('es-ES', 'dónde está mi compra?', 'order.check_status');
  manager.add('es-ES', 'dónde está mi pedido?', 'order.check_status');
  manager.add('es-ES', 'estado de mi compra', 'order.check_status');
}

function addPersonalityDomainEn(manager) {
  manager.assignDomain('en-US', 'agent.acquaintance', 'personality');
  manager.add('en-US', 'say about you', 'agent.acquaintance');
  manager.add('en-US', 'why are you here', 'agent.acquaintance');
  manager.add('en-US', 'what is your personality', 'agent.acquaintance');
  manager.add('en-US', 'describe yourself', 'agent.acquaintance');
  manager.add('en-US', 'tell me about yourself', 'agent.acquaintance');
  manager.add('en-US', 'tell me about you', 'agent.acquaintance');
  manager.add('en-US', 'what are you', 'agent.acquaintance');
  manager.add('en-US', 'who are you', 'agent.acquaintance');
  manager.add('en-US', 'talk about yourself', 'agent.acquaintance');

  manager.assignDomain('en-US', 'agent.age', 'personality');
  manager.add('en-US', 'your age', 'agent.age');
  manager.add('en-US', 'how old is your platform', 'agent.age');
  manager.add('en-US', 'how old are you', 'agent.age');
  manager.add('en-US', "what's your age", 'agent.age');
  manager.add('en-US', "I'd like to know your age", 'agent.age');
  manager.add('en-US', 'tell me your age', 'agent.age');
}

function addPersonalityDomainEs(manager) {
  manager.assignDomain('es-ES', 'agent.acquaintance', 'personality');
  manager.add('es-ES', 'cuéntame sobre ti', 'agent.acquaintance');
  manager.add('es-ES', 'qué haces aquí?', 'agent.acquaintance');
  manager.add('es-ES', 'cómo es tu personalidad?', 'agent.acquaintance');
  manager.add('es-ES', 'descríbete', 'agent.acquaintance');
  manager.add('es-ES', 'quién eres?', 'agent.acquaintance');
  manager.add('es-ES', 'qué eres?', 'agent.acquaintance');
  manager.add('es-ES', 'háblame de ti', 'agent.acquaintance');

  manager.assignDomain('es-ES', 'agent.age', 'personality');
  manager.add('es-ES', 'qué edad tienes?', 'agent.age');
  manager.add('es-ES', 'cuántos años tienes?', 'agent.age');
  manager.add('es-ES', 'cuál es tu edad?', 'agent.age');
  manager.add('es-ES', 'quiero saber tu edad', 'agent.age');
  manager.add('es-ES', 'dime tu edad', 'agent.age');
}

(async () => {
  const container = await containerBootstrap();
  container.use(LangEn);
  container.use(LangEs);
  container.use(NluNeural);
  // we set trainByDomain to true
  const manager = new NluManager({
    container,
    locales: ['en-US', 'es-ES'],
    trainByDomain: true,
  });
  addFoodDomainEn(manager);
  addFoodDomainEs(manager);
  addPersonalityDomainEn(manager);
  addPersonalityDomainEs(manager);
  await manager.train();
  // You can provide the locale of the language
  let actual = await manager.process('es-ES', 'dime quién eres tú');
  console.log(actual);
  // If the locale is not provided, then the language is guessed
  actual = await manager.process('dime quién eres tú');
  console.log(actual);
  // {
  //   locale: 'es',
  //   utterance: 'dime quién eres tú',
  //   domain: 'personality',
  //   languageGuessed: true,
  //   localeIso2: 'es',
  //   language: 'Spanish',
  //   nluAnswer: {
  //     classifications: [ [Object], [Object] ],
  //     entities: undefined,
  //     explanation: undefined
  //   },
  //   classifications: [
  //     { intent: 'agent.acquaintance', score: 0.8546458520495468 },
  //     { intent: 'agent.age', score: 0.14535414795045312 }
  //   ],
  //   intent: 'agent.acquaintance',
  //   score: 0.8546458520495468
  // }
})();
