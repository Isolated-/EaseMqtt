import { EaseMqtt, EaseError } from '../../../lib';

test('should throw an error that client is not defined', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.subscribe('topic')).rejects.toThrow(EaseError);
});

test('should throw an error that topic is too short (string)', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.subscribe('')).rejects.toThrow(EaseError);
});

test('should throw an error that topic is too short (array)', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.subscribe([])).rejects.toThrow(EaseError);
});
