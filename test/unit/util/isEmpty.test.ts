import { isEmpty } from '../../../lib/Util';

test('should not throw an error (undefined value)', () => {
  expect(() => isEmpty(undefined)).not.toThrow();
});

test('should not throw an error (null value)', () => {
  expect(() => isEmpty(null)).not.toThrow();
});

test('should return true as string is empty', () => {
  expect(isEmpty('')).toBeTruthy();
});

test('should return true as object is empty', () => {
  expect(isEmpty({})).toBeTruthy();
});

test('should return true as array is empty', () => {
  expect(isEmpty([])).toBeTruthy();
});

test('should return false as string isn\'t empty', () => {
  expect(isEmpty('not empty')).toBeFalsy();
});

test('should return false as array isn\'t empty', () => {
  expect(isEmpty(['item', 'item', 'item'])).toBeFalsy();
});

test('should return false as object isn\'t empty', () => {
  expect(isEmpty({ var: 1, etc: 2 })).toBeFalsy();
});