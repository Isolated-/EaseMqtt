import { connect } from 'mqtt';
import { EaseMqtt } from '../../lib';

const getHandler = () => {
  return new EaseMqtt;
};

const getClient = (subscribe: string[]) => {
  const broker = process.env.MQTT_TEST_BROKER || 'localhost';
  const client = connect(`mqtt://${broker}`);

  return new EaseMqtt(client, {
    subscribe,
  });
};

/**
 *  Test: handleConnect
 */
test('should emit an event to mqtt:connect', (done) => {
  const mqtt = getHandler();
  const event = mqtt.eventHandler;

  mqtt.on('mqtt:connect', () => done());
  event.handleConnect();
});

/**
 *  Test: handleDisconnect
 */
test('should emit an event to mqtt:disconnect', (done) => {
  const mqtt = getHandler();
  const event = mqtt.eventHandler;

  mqtt.on('mqtt:disconnect', () => done());
  event.handleDisconnect();
});

/**
 *  Test: handlePacket
 */
test('should emit an event to mqtt:packet', (done) => {
  const mqtt = getHandler();
  const event = mqtt.eventHandler;

  mqtt.on('mqtt:packet', () => done());
  event.handlePacket({
    cmd: 'connack',
    returnCode: 1,
    sessionPresent: true,
  });
});

/**
 *  Test: handleError
 */
test('should emit an event to mqtt:error', (done) => {
  const mqtt = getHandler();
  const event = mqtt.eventHandler;

  mqtt.on('mqtt:error', () => done());
  event.handleError(new Error());
});

/**
 *  Test: handleMessage
 */
test('should emit an event on an incoming message', (done) => {
  const mqtt = getClient(['biggerworld']);

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld', 'hello world'));
  mqtt.on('biggerworld', () => {
    mqtt.end();
    done();
  });
});

test('should emit an event on an incoming message object', (done) => {
  const mqtt = getClient(['biggerworld']);
  const message = { data: true, date: new Date() };

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld', message));
  mqtt.on('biggerworld', () => {
    mqtt.end();
    done();
  });
});

test('should emit an event with a depth level of 2', (done) => {
  const mqtt = getClient(['biggerworld/topic']);

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld/topic', 'hello world'));
  mqtt.on('biggerworld.topic', () => {
    mqtt.end();
    done();
  });
});

test('should emit an event with a depth level of 3', (done) => {
  const mqtt = getClient(['biggerworld/topic/final']);

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld/topic/final', 'hello world'));
  mqtt.on('biggerworld.topic.final', () => {
    mqtt.end();
    done();
  });
});

// in depth reply() testing
test('incoming message event - reply with string', (done) => {
  const mqtt = getClient(['biggerworld', 'biggerworld/reply']);
  const message = { replyTo: 'biggerworld.reply', message: 'hello world' };

  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld', message));
  mqtt.on('biggerworld', (req, res) => {
    return res.reply('all done');
  });

  mqtt.on('biggerworld.reply', () => {
    mqtt.end();
    done();
  });
});

test('incoming message event - reply with object', (done) => {
  const mqtt = getClient(['biggerworld', 'biggerworld/reply/second']);

  const message = { replyTo: 'biggerworld.reply.second', message: 'hello world' };
  mqtt.on('mqtt:connect', () => mqtt.publish('biggerworld', message));

  mqtt.on('biggerworld', (req, res) => {
    return res.reply({ all: 'done' });
  });

  mqtt.on('biggerworld.reply.second', () => {
    mqtt.end();
    done();
  });
});
