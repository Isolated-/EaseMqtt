import { EventEmitter2 } from 'eventemitter2';
import { QoS, MqttClient } from 'mqtt';

import { IEaseMqtt, IEaseMessage, IEaseOption } from './';

export class EaseMqtt extends EventEmitter2 implements IEaseMqtt {

  /**
   *  @param {MqttClient} client holds the configured MqttClient
   */
  public client: MqttClient;

  /**
   *  @param {IEaseOption} option holds the collection of options
   */
  public option: IEaseOption;

  /**
   *  Create the EaseMqtt instance
   *  @param {MqttClient} client a configured MqttClient
   *  @param {IEaseOption} opt optional option object
   */
  constructor (client?: MqttClient, opt?: IEaseOption) {
    super({
      wildcard: opt.wildcard || false,
      delimiter: opt.delimiter || '.',
    });

    if (client) {
      this.client = client;
    }

    this.option = this.getDefault(opt);
  }

  /**
   *  Return an object with default values
   *  @param {IEaseOption} opt an optional option object
   *  @return {IEaseOption} a defaulted object
   */
  public getDefault (opt?: IEaseOption): IEaseOption {
    const defaults: IEaseOption = {
      wildcard: false,
      delimiter: '.',
      subscribe: [],
      qos: 1,
    };

    return { ... defaults, ... opt };
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
