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

  /**
   *  Create the EaseMqtt instance
   *  @param {MqttClient} client a configured MqttClient
   *  @param {IEaseOption} opt optional option object
   */
  constructor (client?: IMqttClient, opt?: IEaseOption) {
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

    const easeMqtt = this;
    this.eventHandler = new EaseEventHandler(easeMqtt);
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
  public async publish (topic: string | string[], message: IEaseMsg, qos?: QoS): Promise<number> {
    if (isEmpty(this.client)) {
      throw new EaseError('MqttClientUndefined', 'no mqtt client has been provided');
    }

    if (isEmpty(topic)) {
      throw new EaseError('TopicNameEmpty', 'topic name is empty or too short');
    }

    if (isEmpty(message)) {
      throw new EaseError('MessageContentEmpty', 'message content is empty or too short');
    }

    const mqtt = this.client;
    const delimiter = this.option.delimiter;
    const translatedTopic = translateTopic(topic, delimiter, '/') as string;

    try {
      await mqtt.publish(translatedTopic, encode(message), { qos });
      return mqtt.getLastMessageId();
    } catch (error) {
      throw new EaseError(error.name, error.message);
    }
  }

  /**
   *  Subscribe to topic(s) in order to receive published messages.
   *  @param {string | string[]} topic the topic(s) to listen for updates on
   *  @param {QoS} qos override the default qos
   */
  public async subscribe (topic: string | string[], qos?: QoS): Promise<void> {
    if (isEmpty(this.client)) {
      throw new EaseError('MqttClientUndefined', 'no mqtt client has been provided');
    }

    if (isEmpty(topic)) {
      throw new EaseError('TopicNameEmpty', 'topic name is empty or too short');
    }

    const mqtt = this.client;
    const delimiter = this.option.delimiter;
    const opt = { qos: qos || this.option.qos };
    const translatedTopic = translateTopic(topic, delimiter, '/');

    try {
      await mqtt.subscribe(translatedTopic, opt);
    } catch (error) {
      throw new EaseError(error.name, error.message);
    }
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
