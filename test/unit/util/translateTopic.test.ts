import { translateTopic } from '../../../lib/Util';
import { EaseError } from '../../../lib';

test('should throw an error on undefined', () => {
  expect(() => translateTopic(undefined)).toThrowError(EaseError);
});

test('should throw an error on null', () => {
  expect(() => translateTopic(null)).toThrowError(EaseError);
});

test('should throw an error if value is empty (string)', () => {
  expect(() => translateTopic('')).toThrowError(EaseError);
});

test('should throw an error if value is empty (array)', () => {
  expect(() => translateTopic([])).toThrowError(EaseError);
});

test('should convert biggerworld/topic to biggerworld.topic', () => {
  expect(translateTopic('biggerworld/topic')).toBe('biggerworld.topic');
});

test('should convert biggerworld/topic/topic to biggerworld.topic.topic', () => {
  expect(translateTopic('biggerworld/topic/topic')).toBe('biggerworld.topic.topic');
});

test('should convert biggerworld.topic to biggerworld/topic', () => {
  expect(translateTopic('biggerworld.topic', '.', '/')).toBe('biggerworld/topic');
});

test('should convert biggerworld.topic.topic to biggerworld/topic/topic', () => {
  expect(translateTopic('biggerworld.topic.topic', '.', '/')).toBe('biggerworld/topic/topic');
});

test('should convert [biggerworld/topic, biggerworld/topic/topic]', () => {
  const topics = ['biggerworld/topic', 'biggerworld/topic/topic'];
  const expected = ['biggerworld.topic', 'biggerworld.topic.topic'];

  expect(translateTopic(topics)).toEqual(expected);
});

test('should convert [biggerworld.topic, biggerworld.topic.topic]', () => {
  const topics = ['biggerworld.topic', 'biggerworld.topic.topic'];
  const expected = ['biggerworld/topic', 'biggerworld/topic/topic'];

  expect(translateTopic(topics, '.', '/')).toEqual(expected);
});
