import { QoS, MqttClient } from 'mqtt';
import { IEaseOption } from '../IEaseOption';
import { EventEmitter2 } from 'eventemitter2';
import { IEaseMsg } from '..';

export interface IEaseMqtt extends EventEmitter2 {

  /**
   *  @param {MqttClient} client holds the configured client
   */
  client: MqttClient;

  /**
   *  @param {IEaseOption} option holds the option object
   */
  option: IEaseOption;

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
