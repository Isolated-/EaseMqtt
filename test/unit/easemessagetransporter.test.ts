import { IMqttClient } from 'async-mqtt';
import { EaseError, IEaseMqtt } from '../../lib';
import { EaseMessageTransporter } from '../../lib/EaseMessageTransporter';
import { encode } from '../../lib/Util';

describe('EaseMessageTransporter', () => {
  let client: IMqttClient;
  let instance: EaseMessageTransporter;
  beforeEach(() => {
    client = {
      publish: () => undefined,
      subscribe: () => undefined,
    } as any;

    instance = new EaseMessageTransporter(client);
  });

  test('should be defined', () => {
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(EaseMessageTransporter);
  });

  describe('when publishing a message ...', () => {
    test('throw an error if client is empty', () => {
      let transport;

      transport = new EaseMessageTransporter(undefined);
      expect(
        transport.publish('some.topic', 'hello world')
      ).rejects.toThrowError();

      transport = new EaseMessageTransporter(null);
      expect(
        transport.publish('some.topic', 'hello world')
      ).rejects.toThrowError();
    });

    test('throw an error if topic is empty', () => {
      expect(instance.publish('', 'hello world')).rejects.toThrowError();
      expect(instance.publish(undefined, 'hello world')).rejects.toThrowError();
      expect(instance.publish(null, 'hello world')).rejects.toThrowError();
    });

    test('throw an error if message is empty', () => {
      expect(instance.publish('some.topic', '')).rejects.toThrowError();
      expect(instance.publish('some.topic', undefined)).rejects.toThrowError();
      expect(instance.publish('some.topic', null)).rejects.toThrowError();
    });

    test('call _client.publish with correct params', async () => {
      const mock = {
        publish: jest.fn(async () => undefined),
        getLastMessageId: jest.fn(async () => 5),
      };

      const transport = new EaseMessageTransporter(mock as any, {
        delimiter: '.',
      });

      await transport.publish('some.topic', 'hello world');

      expect(mock.publish).toHaveBeenCalled();
      expect(mock.publish).toHaveBeenCalledWith(
        'some/topic',
        encode('hello world'),
        {
          qos: undefined,
        }
      );
    });

    test('call _client.getLastMessageId()', async () => {
      const mock = {
        publish: jest.fn(async () => undefined),
        getLastMessageId: jest.fn(async () => 5),
      };

      const transport = new EaseMessageTransporter(mock as any, {
        delimiter: '.',
      });

      await transport.publish('some.topic', 'hello world');

      expect(mock.getLastMessageId).toHaveBeenCalled();
    });

    test('should return the last message id', async () => {
      const mock = {
        publish: jest.fn(async () => undefined),
        getLastMessageId: jest.fn(async () => 5),
      };

      const transport = new EaseMessageTransporter(mock as any, {
        delimiter: '.',
      });

      expect(await transport.publish('some.topic', 'hello world')).toBe(5);
    });

    test('should throw EaseError on failure', async () => {
      const mqtt = {
        publish: jest.fn(async () => {
          throw new Error();
        }),
      };

      const transport = new EaseMessageTransporter(mqtt as any, {
        delimiter: '.',
      });

      expect(
        transport.publish('some.topic', 'hello world')
      ).rejects.toBeInstanceOf(EaseError);

      expect(
        transport.publish('some.topic', 'hello world')
      ).rejects.toThrowError();
    });
  });

  describe('when subscribing to a topic ...', () => {
    test('throw an error if client is empty', () => {
      let transport;

      transport = new EaseMessageTransporter(undefined);
      expect(transport.subscribe('some.topic')).rejects.toThrowError();

      transport = new EaseMessageTransporter(null);
      expect(transport.subscribe('some.topic')).rejects.toThrowError();
    });

    test('throw an error if topic is empty', () => {
      expect(instance.subscribe('')).rejects.toThrowError();
      expect(instance.subscribe(undefined)).rejects.toThrowError();
      expect(instance.subscribe(null)).rejects.toThrowError();
    });

    test('should call _client.subscribe with correct params', async () => {
      const mqtt = {
        subscribe: jest.fn(async () => undefined),
      };

      const transport = new EaseMessageTransporter(mqtt as any, {
        delimiter: '.',
      });

      await transport.subscribe('some.topic');
      expect(mqtt.subscribe).toHaveBeenCalled();
      expect(mqtt.subscribe).toHaveBeenCalledWith('some/topic', {
        qos: undefined,
      });
    });

    test('should throw EaseError on failure', async () => {
      const mqtt = {
        subscribe: jest.fn(async () => {
          throw new Error();
        }),
      };

      const transport = new EaseMessageTransporter(mqtt as any, {
        delimiter: '.',
      });

      expect(transport.subscribe('some.topic')).rejects.toBeInstanceOf(
        EaseError
      );
      expect(transport.subscribe('some.topic')).rejects.toThrowError();
    });
  });
});
