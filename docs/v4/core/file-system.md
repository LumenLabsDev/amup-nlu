# File System

## Introduction

To work with files, a filesystem adapter should be registered in the container. A filesystem adapter should include these methods:

- `readFile(fileName)`: returns a promise that reads the file.
- `readFileSync(fileName)`: synchronously reads the file.
- `writeFile(fileName, data, format)`: returns a promise that writes the file.
- `existsSync(fileName)`: synchronously checks if a file exists.
- `lstatSync(fileName)`: synchronously returns file stats, used to check if a path is a directory or file.

## Mock File System

The core package mounts a mock filesystem by default so browser and restricted runtimes can use the container without OS file access.

- `readFile`: resolves to `undefined`.
- `writeFile`: rejects with an error.
- `existsSync`: returns `false`.
- `lstatSync`: returns `undefined`.
- `readFileSync`: returns `undefined`.

## Node File System

`@lumen-labs-dev/core-loader` registers a Node.js filesystem adapter by default. Use `containerBootstrap` from `@lumen-labs-dev/core-loader` when you want corpus loading, pipeline loading, or plugin loading from local files.

```javascript
const { containerBootstrap } = require('@lumen-labs-dev/core-loader');

async function main() {
  const container = await containerBootstrap();
  const fs = container.get('fs');
  const readme = await fs.readFile('./README.md');
  console.log(readme);
}

main();
```

For browser bundles, load remote files with your application fetch layer and pass parsed corpus objects directly to the NLP APIs.
