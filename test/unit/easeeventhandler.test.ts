import { EaseMqtt, EaseEventHandler } from '../../lib';

const getHandler = () => {
  const easeMqtt = new EaseMqtt();
  return new EaseEventHandler(easeMqtt);
};

test('should have a `handleError` method', () => {
  const handler = getHandler();

  expect(handler.handleError).toBeDefined();
  expect(handler.handleError).toBeInstanceOf(Function);
});

test('should have a `handlePacket` method', () => {
  const easeMqtt = new EaseMqtt();
  const easeEventHandler = new EaseEventHandler(easeMqtt);

  expect(easeEventHandler.handlePacket).toBeDefined();
  expect(easeEventHandler.handlePacket).toBeInstanceOf(Function);
});
