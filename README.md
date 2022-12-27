# @andr-ll/tenv

[![Node.js Package Release](https://github.com/andr-ll/tenv/actions/workflows/release.yml/badge.svg)](https://github.com/andr-ll/tenv/actions/workflows/release.yml)
[![Pull Request CI](https://github.com/andr-ll/tenv/actions/workflows/continuous_integration.yml/badge.svg)](https://github.com/andr-ll/tenv/actions/workflows/continuous_integration.yml)

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

Then all `process.env` and `.env` variables will be available with types:

<img src="https://github.com/andr-ll/tenv/blob/master/assets/tenv.png?raw=true"/>

### '.env' example

```env
# This value will have a 'number' type.
VERSION=2

# This value will have a 'string' type.
PROJECT='foo-bar'

COMMENT=some-comment # This value will have a 'string' type and this comment will be removed.

# This value will have a 'boolean' type.
IS_JSON=true
```
