const isManifest = (f) =>
  /(?:^|[\\/])package\.json$/.test(f) ||
  /(?:^|[\\/])lerna\.json$/.test(f) ||
  /(?:^|[\\/])package-lock\.json$/.test(f);

module.exports = {
  '*.{js,cjs,mjs,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.json': (files) => {
    const manifests = files.filter(isManifest);
    const data = files.filter((f) => !isManifest(f));
    const tasks = [];
    if (manifests.length) {
      tasks.push(`prettier --write ${manifests.join(' ')}`);
    }
    if (data.length) {
      tasks.push(`node scripts/format-json.js ${data.join(' ')}`);
    }
    return tasks;
  },
};
