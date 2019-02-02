import { EaseError } from '../../../lib';

const createError = (name: string, message: string) => new EaseError(name, message);

test('should be an instance of Error', () => {
  const error = createError('SomeErrorName', 'SomeErrorMessage');
  expect(error).toBeInstanceOf(EaseError);
  expect(error).toBeInstanceOf(Error);
});

test('should have a `name`, `message` and `stack` property', () => {
  const error = createError('SomeErrorName', 'SomeErrorMessage');

  expect(error).toHaveProperty('name', 'SomeErrorName');
  expect(error).toHaveProperty('message', 'SomeErrorMessage');
  expect(error).toHaveProperty('stack');
});
