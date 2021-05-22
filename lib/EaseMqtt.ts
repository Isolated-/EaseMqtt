import { EventEmitter2 } from 'eventemitter2';
import { AsyncClient, IMqttClient, QoS } from 'async-mqtt';

import {
  IEaseMqtt,
  IEaseMsg,
  IEaseOption,
  IEaseEventHandler,
  EaseError,
  EaseEventHandler,
} from '.';

import { isEmpty, translateTopic, encode } from './Util';
import { IEaseMessageTransporter } from './Interface/Implementation/IEaseMessageTransporter';
import { EaseMessageTransporter } from './EaseMessageTransporter';

export class EaseMqtt extends EventEmitter2 implements IEaseMqtt {
  /**
   *  @param {AsyncClient} client holds the configured MqttClient
   */
  public client: AsyncClient;
  /**
   *  @param {IEaseOption} option holds the collection of options
   */
  public option: IEaseOption;

  /**
   *  @param {IEaseEventHandler} eventHandler handles conversion from mqtt events
   */
  eventHandler: IEaseEventHandler;

  transporter: IEaseMessageTransporter;

  /**
   *  Create the EaseMqtt instance
   *  @param {MqttClient} client a configured MqttClient
   *  @param {IEaseOption} opt optional option object
   */
  constructor(client?: IMqttClient, opt?: IEaseOption) {
    const option = opt || {};
    super({
      wildcard: option.wildcard || false,
      delimiter: option.delimiter || '.',
    });

    this.option = this.getDefault(option);

    if (client) {
      this.client = new AsyncClient(client);

      const subscribe = this.option.subscribe;

      if (subscribe.length > 0) {
        this.subscribe(subscribe);
      }
    }

    this.eventHandler = new EaseEventHandler(this);
    this.transporter = new EaseMessageTransporter(this.client);
  }

  /**
   *  Return an object with default values
   *  @param {IEaseOption} opt an optional option object
   *  @return {IEaseOption} a defaulted object
   */
  public getDefault(opt?: IEaseOption): IEaseOption {
    const defaults: IEaseOption = {
      wildcard: false,
      delimiter: '.',
      subscribe: [],
      qos: 1,
    };

    return { ...defaults, ...opt };
  }

  /**
   *  Publish a message to topic(s) returning the message id.
   *  @param {string | string[]} topic the topic name(s)
   *  @param {IEaseMessage} message the unencoded message content
   *  @param {QoS} qos override the default qos
   */
  public async publish(
    topic: string | string[],
    message: IEaseMsg,
    qos?: QoS
  ): Promise<number> {
    return this.transporter.publish(topic, message, qos);
  }

  /**
   *  Subscribe to topic(s) in order to receive published messages.
   *  @param {string | string[]} topic the topic(s) to listen for updates on
   *  @param {QoS} qos override the default qos
   */
  public async subscribe(topic: string | string[], qos?: QoS): Promise<void> {
    return this.transporter.subscribe(topic, qos);
  }

  /**
   *  Terminate the connected client and handle clean up.
   */
  public end(): void {
    const mqtt = this.client;

    if (mqtt) {
      mqtt.end();
    }
  }
}
