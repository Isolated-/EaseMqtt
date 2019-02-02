import { EaseMqtt, EaseError } from '../../../lib';

test('should throw an error that client is not defined', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('biggerworld', 'hello')).rejects.toThrow(EaseError);
});

test('should throw an error that topic is too short', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('', 'hello')).rejects.toThrow(EaseError);
});

test('should throw an error that message is too short (string)', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('biggerworld', '')).rejects.toThrow(EaseError);
});

test('should throw an error that message is too short (object)', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('biggerworld', {})).rejects.toThrow(EaseError);
});

test('should throw an error on undefined topic', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish(undefined, 'hello')).rejects.toThrow(EaseError);
});

test('should throw an error on undefined message', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('biggerworld', undefined)).rejects.toThrow(EaseError);
});

test('should throw an error on null topic', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish(null, 'hello')).rejects.toThrow(EaseError);
});

test('should throw an error on null message', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish('biggerworld', null)).rejects.toThrow(EaseError);
});
