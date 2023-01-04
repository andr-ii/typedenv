# typedenv

[![NPM version][npm-img]][npm-url]
[![Package Build][build-img]][build-url]

An utility for creation types for `process.env` variables and `.env` file.

## Installation

```bash
npm i typedenv
```

## Initial types generation

At the very first time you will have to create a `env.d.ts` file.

Add following script to the `scripts` of your project's `package.json` file:

```json
"typedenv": "typedenv init"
```

Then simply run:

```bash
npm run typedenv
```

The `env.d.ts` file should appear at your project's root directory.

It will include all types for `process.env` and `.env` file.

### Usage

Then all `process.env` and `.env` variables will be available with types:

<img src="https://github.com/andr-ii/typedenv/blob/master/assets/tenv.png?raw=true"/>

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

[npm-img]: https://img.shields.io/npm/v/typedenv.svg
[npm-url]: https://www.npmjs.com/package/typedenv
[build-img]: https://github.com/andr-ii/typedenv/actions/workflows/build.yml/badge.svg
[build-url]: https://github.com/andr-ii/typedenv/actions/workflows/build.yml
