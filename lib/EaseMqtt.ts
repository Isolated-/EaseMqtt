import { EventEmitter2 } from 'eventemitter2';
import { QoS, MqttClient } from 'mqtt';

import { IEaseMqtt, IEaseMessage, IEaseOption } from './';

export class EaseMqtt extends EventEmitter2 implements IEaseMqtt {

  /**
   *  Create the EaseMqtt instance
   *  @param {MqttClient} client a configured MqttClient
   *  @param {IEaseOption} opt optional option object
   */
  constructor (public client?: MqttClient, opt?: IEaseOption) {
    super();
  }

  /**
   *  Publish a message to topic(s) returning the message id.
   *  @param {string | string[]} topic the topic name(s)
   *  @param {IEaseMessage} message the unencoded message content
   *  @param {QoS} qos override the default qos
   */
  public publish (topic: string | string[], message: IEaseMessage, qos?: QoS): Promise<number> {
    return null;
  }

  /**
   *  Subscribe to topic(s) in order to receive published messages.
   *  @param {string | string[]} topic the topic(s) to listen for updates on
   *  @param {QoS} qos override the default qos
   */
  public subscribe (topic: string | string[], qos?: QoS): Promise<void> {
    return;
  }

  /**
   *  Terminate the connected client and handle clean up.
   */
  public end(): void {}
}
