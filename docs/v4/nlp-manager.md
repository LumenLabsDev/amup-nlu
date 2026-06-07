# NLP plugin

The v4 `nlp` plugin (from `@lumen-labs-dev/nlp`, loaded via `@lumen-labs-dev/basic`) manages several languages. It manages named entities and trains the NLP classifier for each language. Once trained, it is ready to process utterances. It will try to guess the language if one is not provided when processing an utterance. During processing, the NLP plugin will:

- Identify the language
- Classify the utterance, using Machine Learning (ML)
- Find named, and/or default entities in the utterance
- Limit entities to those described with variables in the highest scoring intent, _if present_ (variable syntax for intents uses wildcard operators `%entity_name%`)
- Replace variables in the best answer with matched entities (variable syntax for answers uses handlebars: `{{entity_name}}`)
- Analyze sentiment
- Return the intent, entities, classifications, associated score(s), answer, and sentiment

> Note that periods are not supported in the entity names when using them as variables. Don't use `{{entity.name}}`. Use `{{entity_name}}` instead. The intent variable names must match the answer variable names.

## With Corpus file

```json
{
    "name": "Corpus",
    "locale": "en-US",
    "entities": {
        "hero": {
            "options": {
                "spiderman": ["Spider-man", "spiderman"],
                "iron man": ["iron man", "ironman", "iron-man"],
                "thor": ["thor"]
            }
        },
        "food": {
            "options": {
                "burguer": ["Burguer"],
                "pizza": ["Pizza"],
                "pasta": ["Spaghetti", "Pasta"]
            }
        }
    },
    "data": [
        {
            "intent": "sawhero",
            "utterances": [
                "I saw @hero eating @food",
                "I have seen @hero, he was eating @food"
            ]
        },
        {
            "intent": "wanteat",
            "utterances": [
                "I want to eat @food"
            ]
        }
    ]
}
```

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true,
        languages: ['en-US'],
        corpora: [
          "./corpus.json"
        ]
      }
    },
    use: ['Basic', 'LangEn'],
  });

  const manager = dock.get('nlp');

  // Train the network
  await manager.train();

  const result = await manager.process('en-US', 'I saw spiderman eating spaghetti today in the city!');
  console.log(JSON.stringify(result, null, 2));

// Output:
// {
//   "locale": "en",
//   "utterance": "I saw spiderman eating spaghetti today in the city!",
//   "languageGuessed": false,
//   "localeIso2": "en",
//   "language": "English",
//   "nluAnswer": {
//     "classifications": [
//       {
//         "intent": "sawhero",
//         "score": 0.9999886119117264
//       },
//       {
//         "intent": "wanteat",
//         "score": 0.000011388088273636744
//       }
//     ]
//   },
//   "classifications": [
//     {
//       "intent": "sawhero",
//       "score": 0.9999886119117264
//     },
//     {
//       "intent": "wanteat",
//       "score": 0.000011388088273636744
//     }
//   ],
//   "intent": "sawhero",
//   "score": 0.9999886119117264,
//   "domain": "default",
//   "optionalUtterance": "I saw @hero eating @food today in the city!",
//   "sourceEntities": [],
//   "entities": [
//     {
//       "start": 6,
//       "end": 14,
//       "len": 9,
//       "levenshtein": 0,
//       "accuracy": 1,
//       "entity": "hero",
//       "type": "enum",
//       "option": "spiderman",
//       "sourceText": "spiderman",
//       "utteranceText": "spiderman",
//       "alias": "hero_0"
//     },
//     {
//       "start": 23,
//       "end": 31,
//       "len": 9,
//       "levenshtein": 0,
//       "accuracy": 1,
//       "entity": "food",
//       "type": "enum",
//       "option": "pasta",
//       "sourceText": "Spaghetti",
//       "utteranceText": "spaghetti",
//       "alias": "food_0"
//     }
//   ],
//   "answers": [],
//   "actions": [],
//   "sentiment": {
//     "score": 0.708,
//     "numWords": 9,
//     "numHits": 2,
//     "average": 0.07866666666666666,
//     "type": "senticon",
//     "locale": "en",
//     "vote": "positive"
//   }
// }    
})();
```

## Without Coprpus file

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true,
        languages: ['en-US'],
        corpora: [
          "./corpus.json"
        ],
      }
    },
    use: ['Basic', 'LangEn'],
  });

  const manager = dock.get('nlp');

    manager.addNerRuleOptionTexts(
        'en',
        'hero',
        'spiderman',
        ['Spiderman', 'Spider-man'],
    );
    manager.addNerRuleOptionTexts(
        'en',
        'hero',
        'iron man',
        ['iron man', 'iron-man'],
    );
    manager.addNamedEntityText('en', 'hero', 'thor', ['Thor']);
    manager.addNamedEntityText(
        'en',
        'food',
        'burguer',
        ['Burguer', 'Hamburguer'],
    );
    manager.addNamedEntityText('en', 'food', 'pizza', ['pizza']);
    manager.addNamedEntityText('en', 'food', 'pasta', ['Pasta', 'spaghetti']);
    
    manager.addDocument('en-US', 'I saw @hero eating @food', 'sawhero');
    manager.addDocument(
        'en',
        'I have seen @hero, he was eating @food',
        'sawhero',
    );
    manager.addDocument('en-US', 'I want to eat @food', 'wanteat');
    
  // Train the network
  await manager.train();

  const result = await manager.process('en-US', 'I saw spiderman eating spaghetti today in the city!');
  console.log(JSON.stringify(result, null, 2));
})();
```

## Saving and Loading Models

The `nlp` plugin supports saving and loading trained models. These models include the thetas produced by the ML algorithms, so they can be loaded without training again.

In addition to reducing startup time, this can be useful when a system doesn't have write permissions to local disk, or in cases where we benefit from deterministic results, such as A/B testing (or testing in general).

There are two approaches to saving and loading models: [using files](#saveload-using-files), and [using JSON](#importexport-using-json).

### Save/Load Using Files

`manager.save` writes a model file to disk, and `manager.load` reads a model file from disk.

By default, models are saved into the filename specified by settings property `modelFileName` after training:

```javascript
const dock = await dockStart({
    settings: {
        nlp: {
            languages: ['en-US'],
            modelFileName: './model.nlp',
        }
    },
});
const manager = dock.get('nlp');

await manager.train();
```

Saving can also be done manually with `manager.save()`:

```javascript
const dock = await dockStart({
    settings: {
        nlp: {
            languages: ['en-US'],
            autoSave: false,
        }
    },
});
await manager.train();

manager.save(filename);
```

Loading a model file:

```javascript
manager.load(filename);
```

> Note that if no filename is provided, './model.nlp' will be used by default.

### Import/Export Using JSON

`manager.export` returns a model in JSON format, and `manager.import` reads a model in JSON format. When exporting a model, you can choose whether to minify it.

Exporting a model:

```javascript
const dock = await dockStart({
    settings: {
        nlp: {
            languages: ['en-US'],
        }
    },
});
await manager.train();

const minified = true;
const data = manager.export(minified);
```

Importing a model:

```javascript
const fs = require('fs');
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic'] });
  const manager = dock.get('nlp');
  const data = fs.readFileSync('model.nlp', 'utf8');
  manager.import(data);
  // ...
})();
```

## Context

You can also provide a context to `manager.process` so the NLG changes its behaviour based on the context.

In this example, the manager chooses, "Till next time, {{name}}!" as the answer, and is able to use the `@name` in the answer because context from the greeting is provided. The final result is, "Till next time, John!".

```javascript
const { dockStart } = require('@lumen-labs-dev/basic');

(async () => {
    const dock = await dockStart({
        settings: {
            nlp: {
                forceNER: true,
                languages: ['en-US'],
            }
        },
        use: ['Basic', 'LangEn'],
    });

    const manager = dock.get('nlp');

    // Train the network
    await manager.train();

    manager.addDocument('en-US', 'Hello my name is @name', 'greeting.hello');
    manager.addDocument('en-US', 'Hello I\'m @name', 'greeting.hello');
    manager.addNerAfterLastCondition('en', 'name', ['is', 'I\'m']);

    manager.addDocument('en-US', 'I have to go', 'greeting.bye');
    manager.addAnswer('en', 'greeting.hello', 'Hey there!');
    manager.addAnswer('en', 'greeting.bye', 'Till next time, {{name}}!');

    await manager.train();

    const context = {};
    const result1 = await manager.process('en-US', 'Hello my name is John', context);
    const result2 = await manager.process('en-US', 'I have to go', context);
    console.log(result2.answer);
})();

```

## Execute Logic during processing

Processing is possible with Actions and Pipelines. Detailed information can be found in [Intent Logics](./nlp-intent-logics.md).

## The "optional utterance"

When using entities to extract information from the user utterance the process function als generates an additional utterance by replacing all matched entity words with the relevant  entity-names and checks if this has a higher accuracy for a match then the found one. If yes then this match is used as response.

If this optional utterance was using as the better match, the key "optionalUtterance" is set in the result object returned from process method.

## Forcing NER Processing

By default entities are only processed when there is at least one intent has at least one entity reference. YOu can set the setting forceNER to true to force the NER processing.

```javascript
    const dock = await dockStart({
        settings: {
            nlp: {
                forceNER: true,
                languages: ['en-US'],
            }
        },
        use: ['Basic', 'LangEn'],
    });
```
