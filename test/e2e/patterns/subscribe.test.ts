import { connect } from 'mqtt';
import { EaseMqtt } from '../../../lib';

const getClient = () => {
  const broker = process.env.MQTT_TEST_BROKER || 'localhost';
  const client = connect(`mqtt://${broker}`);
  return new EaseMqtt(client);
};

test('should subscribe to a topic and receive a message', (done) => {
  const mqtt = getClient();

  mqtt.on('mqtt:connect', () => {
    mqtt.subscribe('biggerworld');
    mqtt.publish('biggerworld', 'hello');
  });

  mqtt.on('biggerworld', () => {
    mqtt.end();
    done();
  });
});

test('should subscribe to a topic and receive a message (array)', (done) => {
  const mqtt = getClient();

  const topics = ['biggerworld', 'biggerworld.topic', 'biggerworld.test'];

  mqtt.on('mqtt:connect', () => {
    mqtt.subscribe(topics);
    mqtt.publish('biggerworld.test', 'hello');
  });

  mqtt.on('biggerworld.test', () => {
    mqtt.end();
    done();
  });
});
