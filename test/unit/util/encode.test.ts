import { encode } from '../../../lib/Util';
import { EaseError } from '../../../lib';

test('should throw an error on undefined', () => {
  expect(() => encode(undefined)).toThrowError(EaseError);
});

test('should throw an error on null', () => {
  expect(() => encode(null)).toThrowError(EaseError);
});

test('should return an encoded message (string)', () => {
  expect(encode('hello world')).toBeInstanceOf(Buffer);
});

test('should return an encoded message (object)', () => {
  expect(encode({ data: true })).toBeInstanceOf(Buffer);
});

test('should return an encoded message (array)', () => {
  expect(encode(['item', 'item'])).toBeInstanceOf(Buffer);
});
