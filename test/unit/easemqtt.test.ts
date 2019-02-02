import { EaseMqtt } from '../../lib';
import { EventEmitter2 } from 'eventemitter2';
import { QoS } from 'mqtt';

test('should be an EventEmitter2', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt).toBeInstanceOf(EaseMqtt);
  expect(easemqtt).toBeInstanceOf(EventEmitter2);
});

test('should have a `publish` method', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.publish).toBeDefined();
  expect(easemqtt.publish).toBeInstanceOf(Function);
});

test('should have a `subscribe` method', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.subscribe).toBeDefined();
  expect(easemqtt.subscribe).toBeInstanceOf(Function);
});

test('should have an `end` method', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.end).toBeDefined();
  expect(easemqtt.end).toBeInstanceOf(Function);
});

test('end() should not throw error with no client', () => {
  const easemqtt = new EaseMqtt();
  expect(() => easemqtt.end()).not.toThrow();
});

/**
 *  Test: getDefault
 */
test('should have a `getDefault` method', () => {
  const easemqtt = new EaseMqtt();
  expect(easemqtt.getDefault).toBeDefined();
  expect(easemqtt.getDefault).toBeInstanceOf(Function);
});

test('should not throw an error (undefined)', () => {
  const easemqtt = new EaseMqtt();
  expect(() => easemqtt.getDefault(undefined)).not.toThrow();
});

test('should not throw an error (null)', () => {
  const easemqtt = new EaseMqtt();
  expect(() => easemqtt.getDefault(null)).not.toThrow();
});

test('should return a default object', () => {
  const easemqtt = new EaseMqtt();
  const defaults = easemqtt.getDefault();

  expect(defaults).toHaveProperty('wildcard', false);
  expect(defaults).toHaveProperty('delimiter', '.');
  expect(defaults).toHaveProperty('subscribe', []);
  expect(defaults).toHaveProperty('qos', 1);
});

test('should override `wildcard` default', () => {
  const easemqtt = new EaseMqtt();
  const defaults = easemqtt.getDefault({ wildcard: true });

  expect(defaults).toHaveProperty('wildcard', true);
  expect(defaults).toHaveProperty('delimiter', '.');
  expect(defaults).toHaveProperty('subscribe', []);
  expect(defaults).toHaveProperty('qos', 1);
});

test('should override `delimiter` default', () => {
  const easemqtt = new EaseMqtt();
  const defaults = easemqtt.getDefault({ delimiter: '/' });

  expect(defaults).toHaveProperty('delimiter', '/');
  expect(defaults).toHaveProperty('wildcard', false);
  expect(defaults).toHaveProperty('subscribe', []);
  expect(defaults).toHaveProperty('qos', 1);
});

test('should override the `subscribe` default', () => {
  const easemqtt = new EaseMqtt();
  const defaults = easemqtt.getDefault({ subscribe: ['biggerworld'] });

  expect(defaults).toHaveProperty('subscribe', ['biggerworld']);
  expect(defaults).toHaveProperty('wildcard', false);
  expect(defaults).toHaveProperty('delimiter', '.');
  expect(defaults).toHaveProperty('qos', 1);
});

test('should override the `qos` default', () => {
  const easemqtt = new EaseMqtt();
  const defaults = easemqtt.getDefault({ qos: 2 });

  expect(defaults).toHaveProperty('qos', 2);
  expect(defaults).toHaveProperty('wildcard', false);
  expect(defaults).toHaveProperty('delimiter', '.');
  expect(defaults).toHaveProperty('subscribe', []);
});

test('should override all defaults', () => {
  const easemqtt = new EaseMqtt();
  const opt = {
    wildcard: true,
    delimiter: '$',
    qos: 2 as QoS,
    subscribe: ['biggerworld'],
  };

  const defaults = easemqtt.getDefault(opt);
  expect(defaults).toEqual(opt);
});
