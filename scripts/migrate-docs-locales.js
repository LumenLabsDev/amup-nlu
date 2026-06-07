const fs = require('fs');
const path = require('path');

const replacements = [
  [/languages: \['en'\]/g, "languages: ['en-US']"],
  [/locales: \['en', 'es'\]/g, "locales: ['en-US', 'es-ES']"],
  [/\['en'\]/g, "['en-US']"],
  [/process\('en',/g, "process('en-US',"],
  [/process\('es',/g, "process('es-ES',"],
  [/manager\.add\('en',/g, "manager.add('en-US',"],
  [/manager\.add\('es',/g, "manager.add('es-ES',"],
  [/manager\.assignDomain\('en',/g, "manager.assignDomain('en-US',"],
  [/manager\.assignDomain\('es',/g, "manager.assignDomain('es-ES',"],
  [/nlp\.addLanguage\('en'\)/g, "nlp.addLanguage('en-US')"],
  [/nlp\.addLanguage\('es'\)/g, "nlp.addLanguage('es-ES')"],
  [/nlp\.addLanguage\('ko'\)/g, "nlp.addLanguage('ko-KR')"],
  [/nlp\.addDocument\('en',/g, "nlp.addDocument('en-US',"],
  [/nlp\.addDocument\('es',/g, "nlp.addDocument('es-ES',"],
  [/nlp\.addDocument\('ko',/g, "nlp.addDocument('ko-KR',"],
  [/nlp\.addAnswer\('en',/g, "nlp.addAnswer('en-US',"],
  [/nlp\.addAnswer\('es',/g, "nlp.addAnswer('es-ES',"],
  [/manager\.addDocument\('en',/g, "manager.addDocument('en-US',"],
  [/manager\.addLanguage\('en'\)/g, "manager.addLanguage('en-US')"],
  [/locale: `en`, `en-US`/g, 'locale: `en-US`'],
  [/locale: `en`/g, 'locale: `en-US`'],
  [/\| `en`, `en-US` \|/g, '| `en-US` |'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory() && name !== 'node_modules') walk(p, files);
    else if (/\.(md|js)$/.test(name)) files.push(p);
  }
  return files;
}

const roots = [
  'docs/v4',
  'README.md',
  'packages/nlp/README.md',
  'packages/nlu/README.md',
  'packages/ner/README.md',
  'packages/lang-en-us/README.md',
  'packages/lang-en-us-min/README.md',
  'packages/lang-id-id/README.md',
  'examples',
];
let count = 0;
for (const root of roots) {
  const full = path.join(process.cwd(), root);
  if (!fs.existsSync(full)) {
    if (root.endsWith('.md') && fs.existsSync(full)) {
      // single file
    } else continue;
  }
  const files = fs.statSync(full).isFile() ? [full] : walk(full);
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    for (const [re, rep] of replacements) content = content.replace(re, rep);
    if (content !== original) {
      fs.writeFileSync(file, content);
      count += 1;
    }
  }
}
console.log(`Updated ${count} doc/example files`);
