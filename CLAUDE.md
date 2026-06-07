# CLAUDE.md

Guidance for coding agents working in this repository.

## Project Shape

This is a JavaScript monorepo for NLP.js-derived packages published under the `@lumen-labs-dev/*` scope. Packages live under `packages/*` and are managed with npm workspaces plus Lerna metadata.

Supported Node.js runtimes are the even-major release lines `22`, `24`, and `26`.

Preserve attribution to the original NLP.js creators and AXA Group Operations Spain S.A. Keep existing MIT license notices intact unless the user explicitly asks for license/documentation changes.

## Working Rules

- Make surgical changes that directly support the user request.
- Match the existing CommonJS style and local package boundaries.
- Do not refactor adjacent code, reformat unrelated files, or remove unrelated dead code.
- Prefer existing package APIs and patterns over new abstractions.
- Keep public package names, exports, and constructor signatures stable unless a plan says otherwise.
- Treat generated files and lockfiles carefully; update them only when dependency metadata changes.

## Package Notes

- `@lumen-labs-dev/node-nlp` is the compatibility facade for the v3-style API.
- `@lumen-labs-dev/lang-en` is required by `node-nlp`; other language packages load on demand, and `@lumen-labs-dev/lang-all` is optional for all-language compatibility.
- `@lumen-labs-dev/open-question` uses optional `@tensorflow/tfjs-node`; avoid eager imports of TensorFlow native bindings.
- Keep individual package manifests aligned with the workspace version and internal `@lumen-labs-dev/*` dependency ranges.

## Validation

Run checks from the repository root:

```bash
npm run lint
npm run test:jest
```

For targeted validation, pass Jest paths after `npm run test:jest --`, for example:

```bash
npm run test:jest -- packages/node-nlp/test packages/lang-all/test
```

For documentation-only changes, full runtime tests are usually unnecessary; verify file structure and frontmatter instead.
