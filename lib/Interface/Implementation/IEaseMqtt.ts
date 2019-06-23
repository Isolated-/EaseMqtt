import { IMqttClient, QoS } from 'async-mqtt';
import { EventEmitter2 } from 'eventemitter2';
import { IEaseMsg, IEaseEventHandler, IEaseOption } from '..';

export interface IEaseMqtt extends EventEmitter2 {

  /**
   *  @param {MqttClient} client holds the configured client
   */
  client: IMqttClient;

  /**
   *  @param {IEaseOption} option holds the option object
   */
  option: IEaseOption;

  /**
   *  @param {IEaseEventHandler} eventHandler handles conversion from mqtt events
   */
  eventHandler: IEaseEventHandler;

  /**
   *  Publish a message to topic(s) returning the message id.
   *  @param {string | string[]} topic the topic name(s)
   *  @param {IEaseMsg} message the unencoded message content
   *  @param {QoS} qos override the default qos
   */
  publish (topic: string, message: IEaseMsg, qos?: QoS): Promise<number>;

  /**
   *  Subscribe to topic(s) in order to receive published messages.
   *  @param {string | string[]} topic the topic(s) to listen for updates on
   *  @param {QoS} qos override the default qos
   */
  subscribe (topic: string | string[], qos?: QoS): Promise<void>;

  /**
   *  Terminate the connected client and handle clean up.
   */
  end(): void;
}
