import { connect } from 'mqtt';
import { EaseMqtt } from '../../../lib';

const getClient = () => {
  const broker = process.env.MQTT_TEST_BROKER || 'localhost';
  const client = connect(`mqtt://${broker}`);

  return new EaseMqtt(client, {
    subscribe: ['biggerworld', 'biggerworld.test'],
  });
};

test('should publish a message and return it\'s id: string', () => {
  const mqtt = getClient();

  mqtt.on('mqtt:connect', async () => {
    const id = await mqtt.publish('biggerworld', 'hello');
    mqtt.end();
    return expect(id).toBeDefined();
  });
});

test('should publish a message and return it\'s id: object', () => {
  const mqtt = getClient();

  mqtt.on('mqtt:connect', async () => {
    const id = await mqtt.publish('biggerworld', { hello: 'world' });
    mqtt.end();
    return expect(id).toBeDefined();
  });
});

test('should publish a message that\'s received', (done) => {
  const mqtt = getClient();

  mqtt.on('mqtt:connect', () => {
    mqtt.publish('biggerworld.test', 'hello');
  });

  mqtt.on('biggerworld.test', () => {
    mqtt.end();
    done();
  });
});

test('should publish a message that\'s received (object)', (done) => {
  const mqtt = getClient();

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld.test', { data: true }));
  mqtt.on('biggerworld.test', () => {
    mqtt.end();
    done();
  });
});

test('should publish a message to two topics (string)', (done) => {
  const mqtt = getClient();

  const topics = [
    'biggerworld',
    'biggerworld.test',
  ];

  const message = 'hello world';

  mqtt.on('mqtt:connect', () => mqtt.publish(topics, message));

  const callback = () => {
    mqtt.end();
    done();
  };

  mqtt.on('biggerworld', callback);
  mqtt.on('biggerworld.test', callback);
});
