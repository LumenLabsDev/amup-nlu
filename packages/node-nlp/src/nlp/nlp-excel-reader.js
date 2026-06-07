const { XDoc } = require('@lumen-labs-dev/xtables');

const { migrateLegacyLocale } = require('@lumen-labs-dev/core');

function migrateLocales(value) {
  if (!value) {
    return value;
  }
  return value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .map((locale) => migrateLegacyLocale(locale));
}

class NlpExcelReader {
  constructor(manager) {
    this.manager = manager;
    this.xdoc = new XDoc();
  }

  load(filename) {
    this.xdoc.read(filename);
    this.loadSettings();
    this.loadLanguages();
    this.loadNamedEntities();
    this.loadRegexEntities();
    this.loadIntents();
    this.loadResponses();
  }

  loadSettings() {}

  loadLanguages() {
    this.xdoc.getTable('Languages').data.forEach((row) => {
      const locale = row.locale || row.iso2;
      if (locale) {
        this.manager.addLanguage(migrateLegacyLocale(locale));
      }
    });
  }

  loadNamedEntities() {
    this.xdoc.getTable('Named Entities').data.forEach((row) => {
      const languages = migrateLocales(row.language);
      this.manager.addNamedEntityText(
        row.entity,
        row.option,
        languages,
        row.text
      );
    });
  }

  loadRegexEntities() {
    const table = this.xdoc.getTable('Regex Entities');
    if (table) {
      table.data.forEach((row) => {
        const languages = migrateLocales(row.language);
        this.manager.addRegexEntity(row.entity, languages, row.regex);
      });
    }
  }

  loadIntents() {
    this.xdoc.getTable('Intents').data.forEach((row) => {
      this.manager.addDocument(
        migrateLegacyLocale(row.language),
        row.utterance,
        row.intent
      );
    });
  }

  loadResponses() {
    this.xdoc.getTable('Responses').data.forEach((row) => {
      this.manager.addAnswer(
        migrateLegacyLocale(row.language),
        row.intent,
        row.response,
        row.condition,
        row.url
      );
    });
  }
}

module.exports = NlpExcelReader;
