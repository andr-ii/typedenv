import * as fs from 'fs';
import { EnvTypes } from './type';

const getTyped = (value: string) => {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }

  const numb = Number(value);
  const isNaN = Number.isNaN(numb);

  return isNaN ? value : numb;
};

export const env: EnvTypes = makeTypes();

export function makeTypes(): EnvTypes {
  const env: EnvTypes = {};

  const stream = fs.createWriteStream('./env.d.ts');
  const newLineBreak = process.platform === 'win32' ? '\r\n' : '\n';
  const envFile = fs
    .readFileSync('./.env', { encoding: 'utf-8' })
    .split(newLineBreak);

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

  stream.write('export interface EnvTypes {\n');

  for (const [key, value] of envEntries) {
    if (value == null || value === '') {
      continue;
    }

    const typedValue = getTyped(value);

    stream.write(`  ${key}: ${typeof typedValue};\n`);

    env[key] = typedValue;
  }

  stream.write('}\n');

  return env;
}
