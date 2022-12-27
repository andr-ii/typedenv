import * as fs from 'fs';
import { EnvTypes } from './type';

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

    const isNaN = Number.isNaN(Number(value));

    stream.write(`  ${key}: ${isNaN ? 'string' : 'number'};\n`);

    env[key] = value;
  }

  stream.write('}\n');

  return env;
}
