# @andr-ll/tenv

An utility for creation types for `process.env` variables and `.env` file.

## Installation

Make sure you have added registry configuration to `~/.npmrc` file before installation.

```bash
echo '@andr-ll:registry=https://npm.pkg.github.com' >> ~/.npmrc
```

Then install the package:

```bash
npm i @andr-ll/tenv
```

## Initial types generation

At the very first time you will have to create a `env.d.ts` file.

Add following line to `scripts` at your project `package.json`:

```json
"tenv": "tenv"
```

Then simply run:

```bash
npm run tenv
```

The `env.d.ts` file should appear at your package root directory.

It will include all types for `process.env` and `.env` file.

### Usage

```ts
import { env } from '@andr-ll/tenv';
```
