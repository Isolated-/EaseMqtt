import { QoS } from 'mqtt';
import { IEaseMessage } from '..';

export interface IEaseMqtt {

  /**
   *  Publish a message to topic(s) returning the message id.
   *  @param {string | string[]} topic the topic name(s)
   *  @param {IEaseMessage} message the unencoded message content
   *  @param {QoS} qos override the default qos
   */
  publish (topic: string, message: IEaseMessage, qos?: QoS): Promise<number>;

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
