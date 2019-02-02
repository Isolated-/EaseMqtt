import { EaseError } from '../../../lib';
import { decode } from '../../../lib/Util';

test('should throw an error if message is undefined', () => {
  expect(() => decode(undefined)).toThrowError(EaseError);
});

test('should throw an error if message is null', () => {
  expect(() => decode(null)).toThrowError(EaseError);
});

test('should return a decoded message (string)', () => {
  const msgbuf = Buffer.from('hello world');

  expect(decode(msgbuf)).toBe('hello world');
});

test('should return a decoded message (object)', () => {
  const message = JSON.stringify({ data: true });
  const msgbuf = Buffer.from(message);

  expect(decode(msgbuf)).toHaveProperty('data', true);
});

test('should return a decoded message (array)', () => {
  const message = JSON.stringify(['one', 'two', 'three']);
  const msgbuf = Buffer.from(message);

  expect(decode(msgbuf)).toHaveLength(3);
});
