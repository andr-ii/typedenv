import * as fs from 'fs';
import nuti from 'nuti';
import { init } from '../src';

const ENV_TYPES_PATH = './src/env.d.ts';
const ENV_FILE_PATH = './.env';
const checkExists = () => fs.existsSync(ENV_TYPES_PATH);

const envMock = `# This value will have a 'number' type.
PORT=3000

# This value will have a 'string' type. Quotes ' or " will be removed.
PROJECT='foo-bar'
PROJECT_2="bar-foo"

COMMENT=some-comment # This value will have a 'string' type and this comment will be removed.

# This value will have a 'boolean' type.
IS_JSON=true
`;

beforeEach(async () => {
  if (checkExists()) {
    fs.rmSync(ENV_TYPES_PATH);
  }
});

afterAll(async () => {
  fs.rmSync(ENV_TYPES_PATH);
});

describe('tyenv module test', () => {
  it('creates "env.d.ts" file in the "lib" directory', async () => {
    expect.assertions(1);

    fs.writeFileSync(ENV_FILE_PATH, envMock);

    process.argv[2] = 'init';
    init();

    // to wait until stream is done with writing.
    await nuti.timeout(300, () => {
      expect(checkExists()).toBeTruthy();

      fs.rmSync(ENV_FILE_PATH);
    });
  });

  it('creates "env.d.ts" file even if ".env" file does not exist.', async () => {
    expect.assertions(1);

    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });

    process.argv[2] = 'init';
    init();

    // to wait until stream is done with writing.
    await nuti.timeout(300, () => {
      expect(checkExists()).toBeTruthy();
    });
  });
});
