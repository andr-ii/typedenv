# tyenv

[![NPM version][npm-img]][npm-url]
[![Package Build][build-img]][build-url]
[![Coverage Status][coverage-img]][coverage-url]

An utility for creation types for `process.env` variables and `.env` file.

## Installation

```bash
npm i tyenv
```

## Initial types generation

At the very first time you will have to create a `env.d.ts` file.
It will be located at `node_modules/tyenv/lib` directory
and will include all types for `process.env` and `.env` file.

> **Note**
>
> If `.env` file was updated - this script should be re-run manually
> to get all new variables with types for your development process.

Add following script to the `scripts` of your project's `package.json` file:

```json
"tyenv": "tyenv init"
```

Then run:

```bash
npm run tyenv
```

### Usage

Add import:

```ts
// ES6 or TypeScript
import env from 'tyenv';

// CommonJS
const { env } = require('tyenv');
```

All of the `process.env` and the `.env` file variables will be available with types:

<img src="https://github.com/andr-ii/tyenv/blob/master/assets/tyenv.png?raw=true"/>

### '.env' example

```env
# This value will have a 'number' type.
PORT=3000

# This value will have a 'string' type. Quotes ' or " will be removed.
PROJECT='foo-bar'

COMMENT=some-comment # This value will have a 'string' type and this comment will be removed.

# This value will have a 'boolean' type.
IS_JSON=true
```

[npm-img]: https://img.shields.io/npm/v/tyenv.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/tyenv
[build-img]: https://github.com/andr-ii/tyenv/actions/workflows/build.yml/badge.svg
[build-url]: https://github.com/andr-ii/tyenv/actions/workflows/build.yml
[coverage-img]: https://img.shields.io/coverallsCoverage/github/andr-ii/tyenv?label=coverage&logo=jest
[coverage-url]: https://coveralls.io/github/andr-ii/tyenv?branch=master
