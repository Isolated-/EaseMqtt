import { EaseMqtt, EaseRequest, EaseResponse, EaseError } from '../../lib/';

const createRequest = (topic: string, replyTo: string) => {
  const mqtt = new EaseMqtt();
  return new EaseRequest({
    mqtt,
    topic,
    replyTo,
  });
};

const createResponse = (topic: string, replyTo: string) => {
  return new EaseResponse(createRequest(topic, replyTo));
};

test('should be an instance of EaseResponse', () => {
  const response = new EaseResponse(createRequest('biggerworld', ''));

  expect(response).toBeInstanceOf(EaseResponse);
});

test('should not throw an error: undefined request', () => {
  expect(() => new EaseResponse(undefined)).not.toThrow();
});
test('should not throw an error: null request', () => {
  expect(() => new EaseResponse(null)).not.toThrow();
});

test('should create a EaseResponse object', () => {
  const response = new EaseResponse(createRequest('biggerworld', 'biggerworld.reply'));

  expect(response).toBeDefined();
  expect(response).toHaveProperty('request');
  expect(response.request).toBeInstanceOf(EaseRequest);

  expect(response.topic).toBeDefined();
  expect(response.topic).toBe('biggerworld');

  expect(response.topic).toBeDefined();
  expect(response.replyTo).toBe('biggerworld.reply');

  expect(response.reply).toBeDefined();
  expect(response.reply).toBeInstanceOf(Function);
});

/**
 *  Test: response.reply()
 */
test('should throw error: undefined message', () => {
  const response = createResponse('biggerworld', 'biggerworld.reply');
  expect(() => response.reply(undefined)).toThrowError(EaseError);
});

test('should throw error: null message', () => {
  const response = createResponse('biggerworld', 'biggerworld.reply');
  expect(() => response.reply(null)).toThrowError(EaseError);
});

test('should throw error: empty message (string)', () => {
  const response = createResponse('biggerworld', 'biggerworld.reply');
  expect(() => response.reply('')).toThrowError(EaseError);
});

test('should throw error: empty message (object)', () => {
  const response = createResponse('biggerworld', 'biggerworld.reply');
  expect(() => response.reply({})).toThrowError(EaseError);
});

test('should throw error: empty message (array)', () => {
  const response = createResponse('biggerworld', 'biggerworld.reply');
  expect(() => response.reply([])).toThrowError(EaseError);
});
