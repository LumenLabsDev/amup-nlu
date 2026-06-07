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

function addFoodDomain(manager) {
  manager.add('food', 'what do I have in my basket', 'order.check');
  manager.add('food', 'check my cart', 'order.check');
  manager.add('food', "show me what I've ordered", 'order.check');
  manager.add('food', "what's in my basket", 'order.check');
  manager.add('food', 'check my order', 'order.check');
  manager.add('food', 'check what I have ordered', 'order.check');
  manager.add('food', 'show my order', 'order.check');
  manager.add('food', 'check my basket', 'order.check');
  manager.add('food', 'how soon will it be delivered', 'order.check_status');
  manager.add('food', 'check the status of my delivery', 'order.check_status');
  manager.add('food', 'when should I expect delivery', 'order.check_status');
  manager.add(
    'food',
    'what is the status of my delivery',
    'order.check_status'
  );
  manager.add('food', 'check my order status', 'order.check_status');
  manager.add('food', 'where is my order', 'order.check_status');
  manager.add('food', 'where is my delivery', 'order.check_status');
  manager.add('food', 'status of my order', 'order.check_status');
}

function addPersonalityDomain(manager) {
  manager.add('personality', 'say about you', 'agent.acquaintance');
  manager.add('personality', 'why are you here', 'agent.acquaintance');
  manager.add('personality', 'what is your personality', 'agent.acquaintance');
  manager.add('personality', 'describe yourself', 'agent.acquaintance');
  manager.add('personality', 'tell me about yourself', 'agent.acquaintance');
  manager.add('personality', 'tell me about you', 'agent.acquaintance');
  manager.add('personality', 'what are you', 'agent.acquaintance');
  manager.add('personality', 'who are you', 'agent.acquaintance');
  manager.add('personality', 'talk about yourself', 'agent.acquaintance');
  manager.add('personality', 'your age', 'agent.age');
  manager.add('personality', 'how old is your platform', 'agent.age');
  manager.add('personality', 'how old are you', 'agent.age');
  manager.add('personality', "what's your age", 'agent.age');
  manager.add('personality', "I'd like to know your age", 'agent.age');
  manager.add('personality', 'tell me your age', 'agent.age');
  manager.add('personality', "you're annoying me", 'agent.annoying');
  manager.add('personality', 'you are such annoying', 'agent.annoying');
  manager.add('personality', 'you annoy me', 'agent.annoying');
  manager.add('personality', 'you are annoying', 'agent.annoying');
  manager.add('personality', 'you are irritating', 'agent.annoying');
  manager.add('personality', 'you are annoying me so much', 'agent.annoying');
  manager.add('personality', "you're bad", 'agent.bad');
  manager.add('personality', "you're horrible", 'agent.bad');
  manager.add('personality', "you're useless", 'agent.bad');
  manager.add('personality', "you're waste", 'agent.bad');
  manager.add('personality', "you're the worst", 'agent.bad');
  manager.add('personality', 'you are a lame', 'agent.bad');
  manager.add('personality', 'I hate you', 'agent.bad');
  manager.add('personality', 'be more clever', 'agent.beclever');
  manager.add('personality', 'can you get smarter', 'agent.beclever');
  manager.add('personality', 'you must learn', 'agent.beclever');
  manager.add('personality', 'you must study', 'agent.beclever');
  manager.add('personality', 'be clever', 'agent.beclever');
  manager.add('personality', 'be smart', 'agent.beclever');
  manager.add('personality', 'be smarter', 'agent.beclever');
  manager.add('personality', 'you are looking awesome', 'agent.beautiful');
  manager.add('personality', "you're looking good", 'agent.beautiful');
  manager.add('personality', "you're looking fantastic", 'agent.beautiful');
  manager.add('personality', 'you look greet today', 'agent.beautiful');
  manager.add('personality', "I think you're beautiful", 'agent.beautiful');
  manager.add('personality', 'you look amazing today', 'agent.beautiful');
  manager.add('personality', "you're so beautiful today", 'agent.beautiful');
  manager.add('personality', 'you look very pretty', 'agent.beautiful');
  manager.add('personality', 'you look pretty good', 'agent.beautiful');
  manager.add('personality', 'when is your birthday', 'agent.birthday');
  manager.add('personality', 'when were you born', 'agent.birthday');
  manager.add('personality', 'when do you have birthday', 'agent.birthday');
  manager.add('personality', 'date of your birthday', 'agent.birthday');
}

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

module.exports = {
  addFoodDomain,
  addPersonalityDomain,
  addFoodDomainEn,
  addFoodDomainEs,
  addPersonalityDomainEn,
  addPersonalityDomainEs,
};
