/**
 * @description The main file of the `tyenv` package.
 * Exports function for initial creation of `env.d.ts` file
 * and typed `env` variable.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as fs from 'fs';
import * as path from 'path';
import { EnvTypes } from './types';

export const env: EnvTypes = makeTypes();
export default env;

export function init() {
  const arg = process.argv[2];
  if (arg !== 'init') {
    throw new Error(`Unsupported or missing argument: "${arg}".`);
  }

  makeTypes();
}

function getTyped(value: string) {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }

  const numb = Number(value);
  const isNaN = Number.isNaN(numb);

  return isNaN ? value : numb;
}

function makeTypes(): EnvTypes {
  const env: EnvTypes = {};

  const stream = fs.createWriteStream(path.join(__dirname, 'env.d.ts'));

  const newLine = process.platform === 'win32' ? '\r\n' : '\n';

  const envFile = fs.existsSync('./.env')
    ? fs.readFileSync('./.env', { encoding: 'utf-8' }).split(newLine)
    : [];

  const envEntries: Array<[string, string | undefined]> = [
    ...Object.entries(process.env),
  ];

  for (const line of envFile) {
    if (line[0] === '#' || line.trim().length === 0) {
      continue;
    }

    const [key, value] = line
      .split('=')
      .slice(0, 2)
      .map((str) =>
        str
          .replace(/^["'](.+(?=["']$))["']$/, '$1')
          .replace(/#.*/, '')
          .trim(),
      );

    if (key != null && value != null) {
      envEntries.push([key, value]);
    }
  }

  stream.write(`export interface EnvTypes {${newLine}`);

  for (const [key, value] of envEntries) {
    if (value == null || value === '') {
      continue;
    }

    const typedValue = getTyped(value);

    stream.write(`  ${key}: ${typeof typedValue};${newLine}`);

    env[key] = typedValue;
  }

  stream.write(`}${newLine}`);

  return env;
}
