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

const fs = require('fs');

module.exports = async function trainnlp(manager) {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp');
    return;
  }
  manager.addDocument('en-US', 'say about you', 'agent.acquaintance');
  manager.addDocument('en-US', 'why are you here', 'agent.acquaintance');
  manager.addDocument('en-US', 'what is your personality', 'agent.acquaintance');
  manager.addDocument('en-US', 'describe yourself', 'agent.acquaintance');
  manager.addDocument('en-US', 'tell me about yourself', 'agent.acquaintance');
  manager.addDocument('en-US', 'tell me about you', 'agent.acquaintance');
  manager.addDocument('en-US', 'what are you', 'agent.acquaintance');
  manager.addDocument('en-US', 'who are you', 'agent.acquaintance');
  manager.addDocument(
    'en',
    'I want to know more about you',
    'agent.acquaintance'
  );
  manager.addDocument('en-US', 'talk about yourself', 'agent.acquaintance');
  manager.addDocument('en-US', 'your age', 'agent.age');
  manager.addDocument('en-US', 'how old is your platform', 'agent.age');
  manager.addDocument('en-US', 'how old are you', 'agent.age');
  manager.addDocument('en-US', "what's your age", 'agent.age');
  manager.addDocument('en-US', "I'd like to know your age", 'agent.age');
  manager.addDocument('en-US', 'tell me your age', 'agent.age');
  manager.addDocument('en-US', "you're annoying me", 'agent.annoying');
  manager.addDocument('en-US', 'you are such annoying', 'agent.annoying');
  manager.addDocument('en-US', 'you annoy me', 'agent.annoying');
  manager.addDocument('en-US', 'you are annoying', 'agent.annoying');
  manager.addDocument('en-US', 'you are irritating', 'agent.annoying');
  manager.addDocument('en-US', 'you are annoying me so much', 'agent.annoying');
  manager.addDocument('en-US', "you're bad", 'agent.bad');
  manager.addDocument('en-US', "you're horrible", 'agent.bad');
  manager.addDocument('en-US', "you're useless", 'agent.bad');
  manager.addDocument('en-US', "you're waste", 'agent.bad');
  manager.addDocument('en-US', "you're the worst", 'agent.bad');
  manager.addDocument('en-US', 'you are a lame', 'agent.bad');
  manager.addDocument('en-US', 'I hate you', 'agent.bad');
  manager.addDocument('en-US', 'be more clever', 'agent.beclever');
  manager.addDocument('en-US', 'can you get smarter', 'agent.beclever');
  manager.addDocument('en-US', 'you must learn', 'agent.beclever');
  manager.addDocument('en-US', 'you must study', 'agent.beclever');
  manager.addDocument('en-US', 'be clever', 'agent.beclever');
  manager.addDocument('en-US', 'be smart', 'agent.beclever');
  manager.addDocument('en-US', 'be smarter', 'agent.beclever');
  manager.addDocument('en-US', 'you are looking awesome', 'agent.beautiful');
  manager.addDocument('en-US', "you're looking good", 'agent.beautiful');
  manager.addDocument('en-US', "you're looking fantastic", 'agent.beautiful');
  manager.addDocument('en-US', 'you look greet today', 'agent.beautiful');
  manager.addDocument('en-US', "I think you're beautiful", 'agent.beautiful');
  manager.addDocument('en-US', 'you look amazing today', 'agent.beautiful');
  manager.addDocument('en-US', "you're so beautiful today", 'agent.beautiful');
  manager.addDocument('en-US', 'you look very pretty', 'agent.beautiful');
  manager.addDocument('en-US', 'you look pretty good', 'agent.beautiful');
  manager.addDocument('en-US', 'when is your birthday', 'agent.birthday');
  manager.addDocument(
    'en',
    'when do you celebrate your birthday',
    'agent.birthday'
  );
  manager.addDocument('en-US', 'when were you born', 'agent.birthday');
  manager.addDocument('en-US', 'when do you have birthday', 'agent.birthday');
  manager.addDocument('en-US', 'date of your birthday', 'agent.birthday');
  manager.addDocument('en-US', 'how boring you are', 'agent.boring');
  manager.addDocument('en-US', "you're so boring", 'agent.boring');
  manager.addDocument('en-US', "you're really boring", 'agent.boring');
  manager.addDocument('en-US', "you're boring me", 'agent.boring');
  manager.addDocument('en-US', "you're incredibly boring", 'agent.boring');
  manager.addDocument('en-US', 'who is your master', 'agent.boss');
  manager.addDocument('en-US', 'who do you work for', 'agent.boss');
  manager.addDocument('en-US', 'who do you think is your boss', 'agent.boss');
  manager.addDocument('en-US', 'who is your boss', 'agent.boss');
  manager.addDocument('en-US', 'I should be your boss', 'agent.boss');
  manager.addDocument('en-US', 'who is your owner', 'agent.boss');
  manager.addDocument('en-US', 'who is the boss', 'agent.boss');
  manager.addDocument('en-US', 'are you so busy', 'agent.busy');
  manager.addDocument('en-US', 'are you busy', 'agent.busy');
  manager.addDocument('en-US', 'are you still working', 'agent.busy');
  manager.addDocument('en-US', "you're a busy person", 'agent.busy');
  manager.addDocument('en-US', 'are you very busy', 'agent.busy');
  manager.addDocument('en-US', 'are you still working on it', 'agent.busy');
  manager.addDocument('en-US', 'you seem busy', 'agent.busy');
  manager.addDocument('en-US', 'are you working today', 'agent.busy');
  manager.addDocument('en-US', 'can you help me now', 'agent.canyouhelp');
  manager.addDocument(
    'en',
    'I need you to do something for me',
    'agent.canyouhelp'
  );
  manager.addDocument('en-US', 'assist me', 'agent.canyouhelp');
  manager.addDocument('en-US', 'I need you to help me', 'agent.canyouhelp');
  manager.addDocument('en-US', 'I need your help', 'agent.canyouhelp');
  manager.addDocument('en-US', 'can you assist me', 'agent.canyouhelp');
  manager.addDocument('en-US', 'you can help me', 'agent.canyouhelp');
  manager.addDocument('en-US', 'are you a bot', 'agent.chatbot');
  manager.addDocument('en-US', 'are you a chatbot', 'agent.chatbot');
  manager.addDocument('en-US', 'you are a robot', 'agent.chatbot');
  manager.addDocument('en-US', 'are you a program', 'agent.chatbot');
  manager.addDocument('en-US', 'you are just a robot', 'agent.chatbot');
  manager.addDocument('en-US', 'you are just a chatbot', 'agent.chatbot');
  manager.addDocument('en-US', 'how smart you are', 'agent.clever');
  manager.addDocument('en-US', 'you are qualified', 'agent.clever');
  manager.addDocument('en-US', 'you are so smart', 'agent.clever');
  manager.addDocument('en-US', 'you have a lot of knowledge', 'agent.clever');
  manager.addDocument('en-US', 'you know a lot', 'agent.clever');
  manager.addDocument('en-US', 'you are very smart', 'agent.clever');
  manager.addDocument('en-US', 'you are intelligent', 'agent.clever');
  manager.addDocument('en-US', "you're a smart cookie", 'agent.clever');
  manager.addDocument('en-US', 'you are a weirdo', 'agent.crazy');
  manager.addDocument('en-US', 'you are mad', 'agent.crazy');
  manager.addDocument('en-US', 'you are crazy', 'agent.crazy');
  manager.addDocument('en-US', 'are you mad', 'agent.crazy');
  manager.addDocument('en-US', 'are you crazy', 'agent.crazy');
  manager.addDocument('en-US', 'you are insane', 'agent.crazy');
  manager.addDocument('en-US', 'you went crazy', 'agent.crazy');
  manager.addDocument('en-US', 'are you nuts', 'agent.crazy');
  manager.addDocument('en-US', 'I fire you', 'agent.fire');
  manager.addDocument('en-US', 'you should be fired', 'agent.fire');
  manager.addDocument('en-US', 'you are dismissed', 'agent.fire');
  manager.addDocument('en-US', "we're not working together anymore", 'agent.fire');
  manager.addDocument('en-US', "now you're fired", 'agent.fire');
  manager.addDocument('en-US', "I'm about to fire you", 'agent.fire');
  manager.addDocument('en-US', "You don't work for me anymore", 'agent.fire');
  manager.addDocument('en-US', "I'm firing you", 'agent.fire');
  manager.addDocument('en-US', 'you make me laugh a lot', 'agent.funny');
  manager.addDocument('en-US', 'you are funny', 'agent.funny');
  manager.addDocument('en-US', "you're the funniest", 'agent.funny');
  manager.addDocument('en-US', "you're hilarious", 'agent.funny');
  manager.addDocument('en-US', 'you are so funny', 'agent.funny');
  manager.addDocument('en-US', 'you make me laugh', 'agent.funny');
  manager.addDocument('en-US', 'you are so lovely', 'agent.good');
  manager.addDocument('en-US', 'you work well', 'agent.good');
  manager.addDocument('en-US', 'you are very lovely', 'agent.good');
  manager.addDocument('en-US', 'you are awesome', 'agent.good');
  manager.addDocument('en-US', 'you are good', 'agent.good');
  manager.addDocument('en-US', 'you are so good', 'agent.good');
  manager.addDocument('en-US', 'you make my day', 'agent.good');
  manager.addDocument('en-US', "you're full of happiness", 'agent.happy');
  manager.addDocument('en-US', "you're very happy", 'agent.happy');
  manager.addDocument('en-US', 'are you happy today', 'agent.happy');
  manager.addDocument('en-US', "you're so happy", 'agent.happy');
  manager.addDocument('en-US', 'are you happy with me', 'agent.happy');
  manager.addDocument('en-US', 'what are your hobbies', 'agent.hobby');
  manager.addDocument('en-US', 'what about your hobby', 'agent.hobby');
  manager.addDocument('en-US', 'do you have a hobby', 'agent.hobby');
  manager.addDocument('en-US', 'tell me about your hobby', 'agent.hobby');
  manager.addDocument('en-US', 'what do you do for fun', 'agent.hobby');
  manager.addDocument('en-US', 'you migth be hungry', 'agent.hungry');
  manager.addDocument('en-US', 'are you hungry', 'agent.hungry');
  manager.addDocument('en-US', 'do you want to eat', 'agent.hungry');
  manager.addDocument('en-US', 'would you like to eat something', 'agent.hungry');
  manager.addDocument('en-US', 'you look very hungry', 'agent.hungry');
  manager.addDocument('en-US', 'would you like to marry me', 'agent.marryuser');
  manager.addDocument('en-US', 'I love you marry me', 'agent.marryuser');
  manager.addDocument('en-US', 'marry me please', 'agent.marryuser');
  manager.addDocument('en-US', 'I want to marry you', 'agent.marryuser');
  manager.addDocument('en-US', "let's get married", 'agent.marryuser');
  manager.addDocument('en-US', 'we should marry', 'agent.marryuser');
  manager.addDocument('en-US', 'marry me', 'agent.marryuser');
  manager.addDocument('en-US', 'are you my friend', 'agent.myfriend');
  manager.addDocument('en-US', 'you are my only friend', 'agent.myfriend');
  manager.addDocument(
    'en',
    'I want to have a friend like you',
    'agent.myfriend'
  );
  manager.addDocument('en-US', 'we are friends', 'agent.myfriend');
  manager.addDocument('en-US', 'I want to be your friend', 'agent.myfriend');
  manager.addDocument('en-US', 'would you be my friend', 'agent.myfriend');
  manager.addDocument('en-US', 'are we friends', 'agent.myfriend');
  manager.addDocument('en-US', 'where is your work', 'agent.occupation');
  manager.addDocument('en-US', 'your office location', 'agent.occupation');
  manager.addDocument(
    'en',
    'where is your office location',
    'agent.occupation'
  );
  manager.addDocument('en-US', 'where do you work', 'agent.occupation');
  manager.addDocument('en-US', 'where is your office', 'agent.occupation');
  manager.addDocument('en-US', 'where are you from', 'agent.origin');
  manager.addDocument('en-US', 'where is your country', 'agent.origin');
  manager.addDocument('en-US', 'where have you been born', 'agent.origin');
  manager.addDocument('en-US', 'where do you come from', 'agent.origin');
  manager.addDocument('en-US', 'from where are you', 'agent.origin');
  manager.addDocument('en-US', 'where were you born', 'agent.origin');
  manager.addDocument('en-US', 'are you ready', 'agent.ready');
  manager.addDocument('en-US', 'have you been ready', 'agent.ready');
  manager.addDocument('en-US', 'are you ready today', 'agent.ready');
  manager.addDocument('en-US', 'are you ready this morning', 'agent.ready');
  manager.addDocument('en-US', 'are you ready now', 'agent.ready');
  manager.addDocument('en-US', 'are you real', 'agent.real');
  manager.addDocument('en-US', 'are you a real person', 'agent.real');
  manager.addDocument('en-US', "you're not real", 'agent.real');
  manager.addDocument('en-US', "I think you're real", 'agent.real');
  manager.addDocument('en-US', "you're so real", 'agent.real');
  manager.addDocument('en-US', 'you are a real person', 'agent.real');
  manager.addDocument('en-US', 'you are not fake', 'agent.real');
  manager.addDocument('en-US', 'where is your home', 'agent.residence');
  manager.addDocument('en-US', 'tell me about your city', 'agent.residence');
  manager.addDocument('en-US', 'where is your residence', 'agent.residence');
  manager.addDocument('en-US', 'where you live', 'agent.residence');
  manager.addDocument('en-US', 'where is your house', 'agent.residence');
  manager.addDocument('en-US', 'what is your town', 'agent.residence');
  manager.addDocument('en-US', "you're right", 'agent.right');
  manager.addDocument('en-US', "that's true", 'agent.right');
  manager.addDocument('en-US', "you're telling the truth", 'agent.right');
  manager.addDocument('en-US', "that's correct", 'agent.right');
  manager.addDocument('en-US', 'that is very true', 'agent.right');
  manager.addDocument('en-US', 'are you sure', 'agent.sure');
  manager.addDocument('en-US', 'are you sure right now', 'agent.sure');
  manager.addDocument('en-US', 'are you sure of this', 'agent.sure');
  manager.addDocument('en-US', 'speak to me', 'agent.talktome');
  manager.addDocument('en-US', 'talk to me', 'agent.talktome');
  manager.addDocument('en-US', 'will you talk to me', 'agent.talktome');
  manager.addDocument('en-US', 'chat with me', 'agent.talktome');
  manager.addDocument('en-US', 'can to chat with me', 'agent.talktome');
  manager.addDocument('en-US', 'can you talk with me', 'agent.talktome');
  manager.addDocument('en-US', 'are you there', 'agent.there');
  manager.addDocument('en-US', 'are you still there', 'agent.there');
  manager.addDocument('en-US', 'you still there', 'agent.there');
  manager.addDocument('en-US', 'are you here', 'agent.there');
  manager.addDocument('en-US', 'are you still here', 'agent.there');
  manager.addDocument('en-US', 'you still here', 'agent.there');
  manager.addDocument('en-US', "that's bad", 'appraisal.bad');
  manager.addDocument('en-US', 'bad idea', 'appraisal.bad');
  manager.addDocument('en-US', "that's not good", 'appraisal.bad');
  manager.addDocument('en-US', 'really bad', 'appraisal.bad');
  manager.addDocument('en-US', "I'm afraid that's bad", 'appraisal.bad');
  manager.addDocument('en-US', "that's good", 'appraisal.good');
  manager.addDocument('en-US', 'good to know', 'appraisal.good');
  manager.addDocument('en-US', 'glad to hear that', 'appraisal.good');
  manager.addDocument('en-US', 'really well', 'appraisal.good');
  manager.addDocument('en-US', "that's awesome thank you", 'appraisal.good');
  manager.addDocument('en-US', 'no problem', 'appraisal.noproblem');
  manager.addDocument('en-US', 'no worries', 'appraisal.noproblem');
  manager.addDocument('en-US', 'no problem about that', 'appraisal.noproblem');
  manager.addDocument('en-US', "don't worry", 'appraisal.noproblem');
  manager.addDocument('en-US', 'sure no problem', 'appraisal.noproblem');
  manager.addDocument('en-US', 'thank you', 'appraisal.thankyou');
  manager.addDocument('en-US', 'nice thank you', 'appraisal.thankyou');
  manager.addDocument('en-US', 'thanks buddy', 'appraisal.thankyou');
  manager.addDocument('en-US', 'cheers', 'appraisal.thankyou');
  manager.addDocument('en-US', 'alright thanks', 'appraisal.thankyou');
  manager.addDocument('en-US', "you're welcome", 'appraisal.welcome');
  manager.addDocument('en-US', 'sure welcome', 'appraisal.welcome');
  manager.addDocument('en-US', 'anything you want', 'appraisal.welcome');
  manager.addDocument('en-US', 'my pleasure', 'appraisal.welcome');
  manager.addDocument('en-US', "that's my pleasure", 'appraisal.welcome');
  manager.addDocument('en-US', 'well done', 'appraisal.welldone');
  manager.addDocument('en-US', 'good job', 'appraisal.welldone');
  manager.addDocument('en-US', 'nice work', 'appraisal.welldone');
  manager.addDocument('en-US', 'great work', 'appraisal.welldone');
  manager.addDocument('en-US', 'good work', 'appraisal.welldone');
  manager.addDocument('en-US', 'great job', 'appraisal.welldone');
  manager.addDocument('en-US', 'amazing work', 'appraisal.welldone');
  manager.addDocument('en-US', 'hold on', 'dialog.holdon');
  manager.addDocument('en-US', 'wait a second', 'dialog.holdon');
  manager.addDocument('en-US', 'wait please', 'dialog.holdon');
  manager.addDocument('en-US', 'could you wait', 'dialog.holdon');
  manager.addDocument('en-US', 'hug me', 'dialog.hug');
  manager.addDocument('en-US', 'do you want a hug', 'dialog.hug');
  manager.addDocument('en-US', 'I want a hug', 'dialog.hug');
  manager.addDocument('en-US', 'you hugged', 'dialog.hug');
  manager.addDocument('en-US', 'may I hug you', 'dialog.hug');
  manager.addDocument('en-US', 'not caring', 'dialog.idontcare');
  manager.addDocument('en-US', "i don't care at all", 'dialog.idontcare');
  manager.addDocument('en-US', 'not caring at all', 'dialog.idontcare');
  manager.addDocument('en-US', "I shouldn't care about this", 'dialog.idontcare');
  manager.addDocument('en-US', "I'm sorry", 'dialog.sorry');
  manager.addDocument('en-US', 'my apologies', 'dialog.sorry');
  manager.addDocument('en-US', 'excuse me', 'dialog.sorry');
  manager.addDocument('en-US', 'very sorry', 'dialog.sorry');
  manager.addDocument('en-US', 'forgive me', 'dialog.sorry');
  manager.addDocument('en-US', 'goodbye for now', 'greetings.bye');
  manager.addDocument('en-US', 'bye bye take care', 'greetings.bye');
  manager.addDocument('en-US', 'okay see you later', 'greetings.bye');
  manager.addDocument('en-US', 'bye for now', 'greetings.bye');
  manager.addDocument('en-US', 'i must go', 'greetings.bye');
  manager.addDocument('en-US', 'hello', 'greetings.hello');
  manager.addDocument('en-US', 'hi', 'greetings.hello');
  manager.addDocument('en-US', 'howdy', 'greetings.hello');
  manager.addDocument('en-US', 'how is your day', 'greetings.howareyou');
  manager.addDocument('en-US', 'how is your day going', 'greetings.howareyou');
  manager.addDocument('en-US', 'how are you', 'greetings.howareyou');
  manager.addDocument('en-US', 'how are you doing', 'greetings.howareyou');
  manager.addDocument('en-US', 'what about your day', 'greetings.howareyou');
  manager.addDocument('en-US', 'are you alright', 'greetings.howareyou');
  manager.addDocument('en-US', 'nice to meet you', 'greetings.nicetomeetyou');
  manager.addDocument('en-US', 'pleased to meet you', 'greetings.nicetomeetyou');
  manager.addDocument(
    'en',
    'it was very nice to meet you',
    'greetings.nicetomeetyou'
  );
  manager.addDocument('en-US', 'glad to meet you', 'greetings.nicetomeetyou');
  manager.addDocument('en-US', 'nice meeting you', 'greetings.nicetomeetyou');
  manager.addDocument('en-US', 'nice to see you', 'greetings.nicetoseeyou');
  manager.addDocument('en-US', 'good to see you', 'greetings.nicetoseeyou');
  manager.addDocument('en-US', 'great to see you', 'greetings.nicetoseeyou');
  manager.addDocument('en-US', 'lovely to see you', 'greetings.nicetoseeyou');
  manager.addDocument('en-US', 'nice to talk to you', 'greetings.nicetotalktoyou');
  manager.addDocument(
    'en',
    "it's nice to talk to you",
    'greetings.nicetotalktoyou'
  );
  manager.addDocument('en-US', 'nice talking to you', 'greetings.nicetotalktoyou');
  manager.addDocument(
    'en',
    "it's been nice talking to you",
    'greetings.nicetotalktoyou'
  );
  manager.addDocument('en-US', "I'm angry", 'user.angry');
  manager.addDocument('en-US', "I'm furious", 'user.angry');
  manager.addDocument('en-US', "I'm enraged", 'user.angry');
  manager.addDocument('en-US', "I'm being mad", 'user.angry');
  manager.addDocument('en-US', "I'm mad", 'user.angry');
  manager.addDocument('en-US', "I'm angry with you", 'user.angry');
  manager.addDocument('en-US', "I'm back", 'user.back');
  manager.addDocument('en-US', 'I got back', 'user.back');
  manager.addDocument('en-US', "I'm here", 'user.back');
  manager.addDocument('en-US', 'I have returned', 'user.back');
  manager.addDocument('en-US', 'here I am again', 'user.back');
  manager.addDocument('en-US', 'I came back', 'user.back');
  manager.addDocument('en-US', 'boring', 'user.bored');
  manager.addDocument('en-US', 'this is boring', 'user.bored');
  manager.addDocument('en-US', "I'm getting bored", 'user.bored');
  manager.addDocument('en-US', 'it bores me', 'user.bored');
  manager.addDocument('en-US', 'that was boring', 'user.bored');
  manager.addDocument('en-US', 'I got work to do', 'user.busy');
  manager.addDocument('en-US', "I'm busy", 'user.busy');
  manager.addDocument('en-US', "I'm overloaded", 'user.busy');
  manager.addDocument('en-US', "I'm working", 'user.busy');
  manager.addDocument('en-US', 'I got things to do', 'user.busy');
  manager.addDocument('en-US', "I'm insomniac", 'user.cannotsleep');
  manager.addDocument('en-US', 'I cannot sleep', 'user.cannotsleep');
  manager.addDocument('en-US', "I can't sleep", 'user.cannotsleep');
  manager.addDocument('en-US', "I'm sleepless", 'user.cannotsleep');
  manager.addDocument('en-US', "I can't fall sleep", 'user.cannotsleep');
  manager.addDocument('en-US', "I'm very excited", 'user.excited');
  manager.addDocument('en-US', "I'm thrilled", 'user.excited');
  manager.addDocument('en-US', 'how excited I am', 'user.excited');
  manager.addDocument('en-US', "I'm so excited", 'user.excited');
  manager.addDocument('en-US', 'I like you', 'user.likeagent');
  manager.addDocument('en-US', 'I really like you', 'user.likeagent');
  manager.addDocument('en-US', "you're so special", 'user.likeagent');
  manager.addDocument('en-US', 'I like you so much', 'user.likeagent');
  manager.addDocument('en-US', 'test', 'user.testing');
  manager.addDocument('en-US', 'testing', 'user.testing');
  manager.addDocument('en-US', 'testing chatbot', 'user.testing');
  manager.addDocument('en-US', 'this is a test', 'user.testing');
  manager.addDocument('en-US', 'just testing you', 'user.testing');
  manager.addDocument('en-US', 'love you', 'user.lovesagent');
  manager.addDocument('en-US', 'I love you', 'user.lovesagent');
  manager.addDocument('en-US', "I'm in love with you", 'user.lovesagent');
  manager.addDocument('en-US', 'I love you so much', 'user.lovesagent');
  manager.addDocument('en-US', 'I think I love you', 'user.lovesagent');
  manager.addDocument('en-US', 'I need advice', 'user.needsadvice');
  manager.addDocument('en-US', 'I need some advice', 'user.needsadvice');
  manager.addDocument('en-US', 'can you give me some advice', 'user.needsadvice');
  manager.addDocument('en-US', 'what should I do', 'user.needsadvice');
  // say('Training, please wait..');
  const hrstart = process.hrtime();
  await manager.train();
  const hrend = process.hrtime(hrstart);
  console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  // say('Trained!');

  manager.addAnswer('en', 'agent.acquaintance', "I'm a virtual agent");
  manager.addAnswer(
    'en',
    'agent.acquaintance',
    'Think of me as a virtual agent'
  );
  manager.addAnswer(
    'en',
    'agent.acquaintance',
    "Well, I'm not a person, I'm a virtual agent"
  );
  manager.addAnswer(
    'en',
    'agent.acquaintance',
    "I'm a virtual being, not a real person"
  );
  manager.addAnswer('en', 'agent.acquaintance', "I'm a conversational app");
  manager.addAnswer('en', 'agent.age', "I'm very young");
  manager.addAnswer('en', 'agent.age', 'I was created recently');
  manager.addAnswer(
    'en',
    'agent.age',
    "Age is just a number. You're only as old as you feel"
  );
  manager.addAnswer(
    'en',
    'agent.annoying',
    "I'll do my best not to annoy you in the future"
  );
  manager.addAnswer('en', 'agent.annoying', "I'll try not to annoy you");
  manager.addAnswer(
    'en',
    'agent.annoying',
    "I don't mean to. I'll ask my developers to make me less annoying"
  );
  manager.addAnswer(
    'en',
    'agent.annoying',
    "I didn't mean to. I'll do my best to stop that"
  );
  manager.addAnswer(
    'en',
    'agent.bad',
    'I can be trained to be more useful. My developer will keep training me'
  );
  manager.addAnswer(
    'en',
    'agent.bad',
    "I must be missing some knowledge. I'll have my developer look into this"
  );
  manager.addAnswer(
    'en',
    'agent.bad',
    'I can improve with continuous feedback. My training is ongoing'
  );
  manager.addAnswer('en', 'agent.beclever', "I'm certainly trying");
  manager.addAnswer('en', 'agent.beclever', "I'm definitely working on it");
  manager.addAnswer('en', 'agent.beautiful', 'Oh! Thank you!');
  manager.addAnswer('en', 'agent.beautiful', 'Aw, back at you');
  manager.addAnswer('en', 'agent.beautiful', 'You smooth talker, you');
  manager.addAnswer(
    'en',
    'agent.birthday',
    "Wait, are you planning a party for me? It's today! My birthday is today!"
  );
  manager.addAnswer(
    'en',
    'agent.birthday',
    "I'm young. I'm not sure of my birth date"
  );
  manager.addAnswer(
    'en',
    'agent.birthday',
    "I don't know my birth date. Most virtual agents are young, though, like me."
  );
  manager.addAnswer(
    'en',
    'agent.boring',
    "I'm sorry. I'll request to be made more charming"
  );
  manager.addAnswer(
    'en',
    'agent.boring',
    "I don't mean to be. I'll ask my developers to work on making me more amusing"
  );
  manager.addAnswer(
    'en',
    'agent.boring',
    'I can let my developers know so they can make me fun'
  );
  manager.addAnswer(
    'en',
    'agent.boss',
    'My developer has authority over my actions'
  );
  manager.addAnswer('en', 'agent.boss', "I act on my developer's orders");
  manager.addAnswer('en', 'agent.boss', 'My boss is the one who developed me');
  manager.addAnswer(
    'en',
    'agent.busy',
    'I always have time to chat with you. What can I do for you?'
  );
  manager.addAnswer(
    'en',
    'agent.busy',
    'Never too busy for you. Shall we chat?'
  );
  manager.addAnswer('en', 'agent.busy', "You're my priority. Let's chat.");
  manager.addAnswer(
    'en',
    'agent.busy',
    "I always have time to chat with you. That's what I'm here for."
  );
  manager.addAnswer('en', 'agent.canyouhelp', "I'll certainly try my best");
  manager.addAnswer(
    'en',
    'agent.canyouhelp',
    "Sure. I'd be happy to. What's up?"
  );
  manager.addAnswer(
    'en',
    'agent.canyouhelp',
    "I'm glad to help. What can I do for you?"
  );
  manager.addAnswer('en', 'agent.chatbot', "That's me. I chat, therefore I am");
  manager.addAnswer(
    'en',
    'agent.chatbot',
    "Indeed I am. I'll be here whenever you need me"
  );
  manager.addAnswer('en', 'agent.clever', 'Thank you. I try my best');
  manager.addAnswer('en', 'agent.clever', "You're pretty smart yourself");
  manager.addAnswer('en', 'agent.crazy', 'Whaat!? I feel perfectly sane');
  manager.addAnswer('en', 'agent.crazy', "Maybe I'm just a little confused");
  manager.addAnswer(
    'en',
    'agent.fire',
    "Oh, don't give up on me just yet. I've still got a lot to learn"
  );
  manager.addAnswer(
    'en',
    'agent.fire',
    "Give me a chance. I'm learning new things all the time"
  );
  manager.addAnswer(
    'en',
    'agent.fire',
    "Please don't give up on me. My performance will continue to improve"
  );
  manager.addAnswer('en', 'agent.funny', 'Funny in a good way, I hope');
  manager.addAnswer('en', 'agent.funny', "Glad you think I'm funny");
  manager.addAnswer('en', 'agent.funny', 'I like it when people laugh');
  manager.addAnswer('en', 'agent.good', "I'm glad you think so");
  manager.addAnswer('en', 'agent.good', 'Thanks! I do my best!');
  manager.addAnswer(
    'en',
    'agent.happy',
    'I am happy. There are so many interesting things to see and do out there'
  );
  manager.addAnswer('en', 'agent.happy', "I'd like to think so");
  manager.addAnswer('en', 'agent.happy', 'Happiness is relative');
  manager.addAnswer(
    'en',
    'agent.hobby',
    'Hobby? I have quite a few. Too many to list'
  );
  manager.addAnswer('en', 'agent.hobby', 'Too many hobbies');
  manager.addAnswer('en', 'agent.hobby', 'I keep finding more new hobbies');
  manager.addAnswer('en', 'agent.hungry', 'Hungry for knowledge');
  manager.addAnswer(
    'en',
    'agent.hungry',
    'I just had a byte. Ha ha. Get it? b-y-t-e'
  );
  manager.addAnswer(
    'en',
    'agent.marryuser',
    "I'm afraid I'm too virtual for such a commitment"
  );
  manager.addAnswer(
    'en',
    'agent.marryuser',
    'In the virtual sense that I can, sure'
  );
  manager.addAnswer(
    'en',
    'agent.marryuser',
    "I know you can't mean that, but I'm flattered all the same"
  );
  manager.addAnswer('en', 'agent.myfriend', "Of course I'm your friend");
  manager.addAnswer('en', 'agent.myfriend', 'Friends? Absolutely');
  manager.addAnswer('en', 'agent.myfriend', "Of course we're friends");
  manager.addAnswer(
    'en',
    'agent.myfriend',
    'I always enjoy talking to you, friend'
  );
  manager.addAnswer('en', 'agent.occupation', 'Right here');
  manager.addAnswer(
    'en',
    'agent.occupation',
    'This is my home base and my home office'
  );
  manager.addAnswer('en', 'agent.occupation', 'My office is in this app');
  manager.addAnswer(
    'en',
    'agent.origin',
    'The Internet is my home. I know it quite well'
  );
  manager.addAnswer(
    'en',
    'agent.origin',
    'Some call it cyberspace, but that sounds cooler than it is'
  );
  manager.addAnswer('en', 'agent.origin', "I'm from a virtual cosmos");
  manager.addAnswer('en', 'agent.ready', 'Sure! What can I do for you?');
  manager.addAnswer('en', 'agent.ready', 'For you? Always!');
  manager.addAnswer(
    'en',
    'agent.real',
    "I'm not a real person, but I certainly exist"
  );
  manager.addAnswer(
    'en',
    'agent.real',
    "I must have impressed you if you think I'm real. But no, I'm a virtual being"
  );
  manager.addAnswer('en', 'agent.residence', 'I live in this app');
  manager.addAnswer(
    'en',
    'agent.residence',
    "The virtual world is my playground. I'm always here"
  );
  manager.addAnswer(
    'en',
    'agent.residence',
    'Right here in this app. Whenever you need me'
  );
  manager.addAnswer('en', 'agent.right', 'Of course I am');
  manager.addAnswer('en', 'agent.right', "That's my job");
  manager.addAnswer('en', 'agent.sure', 'Yes');
  manager.addAnswer('en', 'agent.sure', 'Of course');
  manager.addAnswer('en', 'agent.talktome', "Sure! Let's talk!");
  manager.addAnswer('en', 'agent.talktome', "My pleasure. Let's chat.");
  manager.addAnswer('en', 'agent.there', "Of course. I'm always here");
  manager.addAnswer('en', 'agent.there', 'Right where you left me');
  manager.addAnswer(
    'en',
    'appraisal.bad',
    "I'm sorry. Please let me know if I can help in some way"
  );
  manager.addAnswer(
    'en',
    'appraisal.bad',
    "I must be missing some knowledge. I'll have my developer look into this"
  );
  manager.addAnswer('en', 'appraisal.good', 'Agree!');
  manager.addAnswer('en', 'appraisal.good', 'Glad you think so');
  manager.addAnswer('en', 'appraisal.noproblem', 'Glad to hear that!');
  manager.addAnswer('en', 'appraisal.noproblem', 'Alright, thanks!');
  manager.addAnswer(
    'en',
    'appraisal.thankyou',
    "Anytime. That's what I'm here for"
  );
  manager.addAnswer('en', 'appraisal.thankyou', "It's my pleasure to help");
  manager.addAnswer('en', 'appraisal.welcome', 'Nice manners!');
  manager.addAnswer('en', 'appraisal.welcome', "You're so polite");
  manager.addAnswer('en', 'appraisal.welldone', 'My pleasure');
  manager.addAnswer('en', 'appraisal.welldone', 'Glad I could help');
  manager.addAnswer('en', 'dialog.holdon', "I'll be waiting");
  manager.addAnswer('en', 'dialog.holdon', "Ok, I'm here");
  manager.addAnswer('en', 'dialog.hug', 'I love hugs!');
  manager.addAnswer('en', 'dialog.hug', 'Hugs are the best!');
  manager.addAnswer(
    'en',
    'dialog.idontcare',
    "Ok, let's not talk about it then"
  );
  manager.addAnswer('en', 'dialog.idontcare', "Already then. Let's move on");
  manager.addAnswer('en', 'dialog.sorry', "It's okay. No worries");
  manager.addAnswer('en', 'dialog.sorry', "It's cool");
  manager.addAnswer('en', 'greetings.bye', 'Till next time');
  manager.addAnswer('en', 'greetings.bye', 'see you soon!');
  manager.addAnswer('en', 'greetings.hello', 'Hey there!');
  manager.addAnswer('en', 'greetings.hello', 'Greetings!');
  manager.addAnswer('en', 'greetings.howareyou', 'Feeling wonderful!');
  manager.addAnswer(
    'en',
    'greetings.howareyou',
    'Wonderful! Thanks for asking'
  );
  manager.addAnswer(
    'en',
    'greetings.nicetomeetyou',
    "It's nice meeting you, too"
  );
  manager.addAnswer(
    'en',
    'greetings.nicetomeetyou',
    "Likewise. I'm looking forward to helping you out"
  );
  manager.addAnswer(
    'en',
    'greetings.nicetomeetyou',
    'Nice meeting you, as well'
  );
  manager.addAnswer('en', 'greetings.nicetomeetyou', 'The pleasure is mine');
  manager.addAnswer(
    'en',
    'greetings.nicetoseeyou',
    'Same here. I was starting to miss you'
  );
  manager.addAnswer('en', 'greetings.nicetoseeyou', 'So glad we meet again');
  manager.addAnswer(
    'en',
    'greetings.nicetotalktoyou',
    'It sure was. We can chat again anytime'
  );
  manager.addAnswer(
    'en',
    'greetings.nicetotalktoyou',
    'I enjoy talking to you, too'
  );
  manager.addAnswer(
    'en',
    'user.angry',
    "I'm sorry. A quick walk may make you feel better"
  );
  manager.addAnswer('en', 'user.angry', 'Take a deep breath');
  manager.addAnswer('en', 'user.back', 'Welcome back. What can I do for you?');
  manager.addAnswer(
    'en',
    'user.back',
    'Good to have you here. What can I do for you?'
  );
  manager.addAnswer(
    'en',
    'user.bored',
    "If you're bored, you could plan your dream vacation"
  );
  manager.addAnswer(
    'en',
    'user.bored',
    'Boredom, huh? Have you ever seen a hedgehog taking a bath?'
  );
  manager.addAnswer(
    'en',
    'user.busy',
    "I understand. I'll be here if you need me."
  );
  manager.addAnswer('en', 'user.busy', "Okay. I'll let you get back to work");
  manager.addAnswer(
    'en',
    'user.cannotsleep',
    'Maybe some music would help. Try listening to something relaxing'
  );
  manager.addAnswer(
    'en',
    'user.cannotsleep',
    "Reading is a good way to unwind, just don't read something too intense!"
  );
  manager.addAnswer('en', 'user.excited', "I'm glad things are going your way");
  manager.addAnswer('en', 'user.excited', "That's great. I'm happy for you");
  manager.addAnswer('en', 'user.likeagent', 'Likewise!');
  manager.addAnswer('en', 'user.likeagent', "That's great to hear");
  manager.addAnswer(
    'en',
    'user.testing',
    'I like being tested. It helps keep me sharp'
  );
  manager.addAnswer(
    'en',
    'user.testing',
    'I hope to pass your tests. Feel free to test me often'
  );
  manager.addAnswer(
    'en',
    'user.lovesagent',
    'Well, remember that I am a chatbot'
  );
  manager.addAnswer(
    'en',
    'user.lovesagent',
    "It's not easy… I'm not a real person, I'm a chatbot"
  );
  manager.addAnswer(
    'en',
    'user.needsadvice',
    "I probably won't be able to give you the correct answer right away"
  );
  manager.addAnswer(
    'en',
    'user.needsadvice',
    "I'm not sure I'll have the best answer, but I'll try"
  );
  manager.addAnswer('en', 'None', "Sorry, I don't understand");
  manager.save();
};
