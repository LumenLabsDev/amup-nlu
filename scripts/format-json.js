const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const MANIFEST_NAMES = new Set([
  'package.json',
  'lerna.json',
  'package-lock.json',
]);

const SKIP_DIRS = new Set(['node_modules', 'coverage', 'dist', '.git']);

function isManifestJson(file) {
  return MANIFEST_NAMES.has(path.basename(file));
}

function shouldSkipDir(name) {
  return SKIP_DIRS.has(name);
}

function walkJsonFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) {
        continue;
      }
      walkJsonFiles(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function compactJsonFile(file, checkOnly) {
  const content = fs.readFileSync(file, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error(`Invalid JSON in ${file}: ${err.message}`);
  }
  const compact = `${JSON.stringify(parsed)}\n`;
  if (content === compact) {
    return false;
  }
  if (!checkOnly) {
    fs.writeFileSync(file, compact);
  }
  return true;
}

function formatManifestsWithPrettier(files, checkOnly) {
  if (!files.length) {
    return false;
  }
  const args = checkOnly ? ['--check', ...files] : ['--write', ...files];
  const result = spawnSync('npx', ['prettier', ...args], {
    stdio: 'inherit',
    shell: true,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
  return checkOnly ? result.status !== 0 : false;
}

function formatFiles(files, checkOnly) {
  const manifests = files.filter(isManifestJson);
  const data = files.filter((file) => !isManifestJson(file));
  let changed = false;

  for (const file of data) {
    if (compactJsonFile(file, checkOnly)) {
      changed = true;
    }
  }

  if (manifests.length) {
    const manifestChanged = formatManifestsWithPrettier(manifests, checkOnly);
    changed = changed || manifestChanged;
  }

  return changed;
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const all = args.includes('--all');
  const files = args.filter((arg) => !arg.startsWith('--'));

  let targets = files;
  if (all) {
    targets = walkJsonFiles(process.cwd());
  }

  if (!targets.length) {
    return;
  }

  const changed = formatFiles(targets, checkOnly);
  if (checkOnly && changed) {
    process.exit(1);
  }
}

main();
