import { EaseMqtt, EaseRequest } from '../../lib';

test('should not throw an error: undefined request', () => {
  expect(() => new EaseRequest(undefined)).not.toThrow();
});

test('should not throw an error: null request', () => {
  expect(() => new EaseRequest(null)).not.toThrow();
});

test('should create a request object', () => {
  const mqtt = new EaseMqtt();
  const request = new EaseRequest({ mqtt, topic: 'biggerworld' });

  expect(request).toHaveProperty('topic', 'biggerworld');
  expect(request).toHaveProperty('mqtt');
});

test('should create a request object with a replyTo', () => {
  const mqtt = new EaseMqtt();
  const request = new EaseRequest({ mqtt, topic: 'biggerworld', replyTo: 'biggerworld.reply' });

  expect(request).toHaveProperty('topic', 'biggerworld');
  expect(request).toHaveProperty('replyTo', 'biggerworld.reply');
  expect(request).toHaveProperty('mqtt', mqtt);
});
