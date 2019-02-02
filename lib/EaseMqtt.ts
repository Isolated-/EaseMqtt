import { EventEmitter2 } from 'eventemitter2';
import { QoS, MqttClient } from 'mqtt';

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
   *  @param {MqttClient} client holds the configured MqttClient
   */
  public client: MqttClient;

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
  constructor (client?: MqttClient, opt?: IEaseOption) {
    const option = opt || {};
    super({
      wildcard: option.wildcard || false,
      delimiter: option.delimiter || '.',
    });

    this.option = this.getDefault(option);

    if (client) {
      this.client = client;

      const subscribe = this.option.subscribe;

      if (subscribe.length > 0) {
        this.subscribe(subscribe);
      }
    }

    this.eventHandler = new EaseEventHandler(this);
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
  public publish (topic: string | string[], message: IEaseMsg, qos?: QoS): Promise<number> {
    return new Promise((resolve, reject) => {
      if (isEmpty(topic) || isEmpty(message)) {
        const errorName = isEmpty(topic) ? 'TopicNameEmpty' : 'MessageContentEmpty';
        const errorMessage = isEmpty(topic) ? 'topic name too short' : 'message content too short';
        return reject(new EaseError(errorName, errorMessage));
      }

      const mqtt = this.client;
      if (isEmpty(mqtt)) {
        return reject(new EaseError('MqttClientUndefined', 'No mqtt client has been provided'));
      }

      const topics = typeof (topic) === 'string' ? [topic] : topic;
      const delimiter = this.option.delimiter;
      const encoded = encode(message);
      const opt = { qos };

      topics.forEach((chan, idx) => {
        const topic = translateTopic(chan, delimiter, '/') as string;

        const callback = (error, packet) => {
          if (error) return reject(error);
          if (idx > topics.length) return resolve(packet.messageId);
        };

        mqtt.publish(topic, encoded, opt, callback);
      });
    });
  }

  /**
   *  Subscribe to topic(s) in order to receive published messages.
   *  @param {string | string[]} topic the topic(s) to listen for updates on
   *  @param {QoS} qos override the default qos
   */
  public subscribe (topic: string | string[], qos?: QoS): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isEmpty(topic)) {
        return reject(new EaseError('TopicNameEmpty', 'topic name too short'));
      }

      const mqtt = this.client;
      if (isEmpty(mqtt)) {
        return reject(new EaseError('MqttClientUndefined', 'No mqtt client has been provided'));
      }

      const quality = qos || this.option.qos;
      const opt = { qos: quality };
      const delimiter = this.option.delimiter;
      const channel = translateTopic(topic, delimiter, '/');

      const callback = (err) => {
        if (err) return reject(err);
        return resolve();
      };

      mqtt.subscribe(channel, opt, callback);
    });
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
