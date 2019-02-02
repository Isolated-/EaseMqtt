import { EaseMqtt } from '../../lib';

const getHandler = () => {
  return new EaseMqtt;
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
