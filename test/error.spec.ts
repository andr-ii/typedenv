import { init } from '../src';

describe('error handling', () => {
  it('throws an error ', async () => {
    expect.assertions(1);

    try {
      init();
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Unsupported or missing argument: "undefined".',
      );
    }
  });
});
