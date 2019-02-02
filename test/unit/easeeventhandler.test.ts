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
  const handler = getHandler();

  expect(handler.handlePacket).toBeDefined();
  expect(handler.handlePacket).toBeInstanceOf(Function);
});

test('should have a `handleMessage` method', () => {
  const handler = getHandler();

  expect(handler.handleMessage).toBeDefined();
  expect(handler.handleMessage).toBeInstanceOf(Function);
});

test('should have a `handleConnect` method', () => {
  const handler = getHandler();

  expect(handler.handleConnect).toBeDefined();
  expect(handler.handleConnect).toBeInstanceOf(Function);
});

test('should have a `handleDisconnect` method', () => {
  const handler = getHandler();

  expect(handler.handleDisconnect).toBeDefined();
  expect(handler.handleDisconnect).toBeInstanceOf(Function);
});

/**
 *  Test: handleConnect
 */
test('handleConnect: should not throw an error', () => {
  const handler = getHandler();
  expect(() => handler.handleConnect()).not.toThrow();
});

/**
 *  Test: handleDisconnect
 */
test('handleDisconnect: should not thrown an error', () => {
  const handler = getHandler();
  expect(() => handler.handleDisconnect()).not.toThrow();
});

/**
 *  Test: handleError
 */
test('handleError: should not throw an error (undefined)', () => {
  const handler = getHandler();
  expect(() => handler.handleError(undefined)).not.toThrow();
});

test('handleError: should not throw an error (null)', () => {
  const handler = getHandler();
  expect(() => handler.handleError(null)).not.toThrow();
});

test('handleError: should not throw an error (valid)', () => {
  const handler = getHandler();
  expect(() => handler.handleError(new Error('Message'))).not.toThrow();
});

/**
 *  Test: handleMessage
 */
test('handleMessage: should not throw error: undefined topic', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage(undefined, new Buffer('hello'))).not.toThrow();
});

test('handleMessage: should not throw error: null topic', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage(null, new Buffer('hello'))).not.toThrow();
});

test('handleMessage: should not throw error: empty topic', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage('', new Buffer('hello'))).not.toThrow();
});

test('handleMessage: should not throw error: undefined message', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage('topic', undefined)).not.toThrow();
});

test('handleMessage: should not throw error: null message', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage('topic', undefined)).not.toThrow();
});

test('handleMessage: should not throw error: empty message', () => {
  const handler = getHandler();
  expect(() => handler.handleMessage('topic', Buffer.from(''))).not.toThrow();
});

/**
 *  Test: handlePacket
 */
test('handlePacket: should not throw error: undefined packet', () => {
  const handler = getHandler();
  expect(() => handler.handlePacket(undefined)).not.toThrow();
});

test('handlePacket: should not throw error: null packet', () => {
  const handler = getHandler();
  expect(() => handler.handlePacket(null)).not.toThrow();
});
