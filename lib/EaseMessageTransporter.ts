import { QoS } from 'mqtt-packet';
import { IEaseMqtt } from './Interface/Implementation/IEaseMqtt';
import { IEaseMessageTransporter } from './Interface/Implementation/IEaseMessageTransporter';
import { IMqttClient } from 'async-mqtt';
import { encode, isEmpty, translateTopic } from './Util';
import { EaseError } from './Error';
import { IEaseMsg, IEaseOption } from './Interface';
import { EaseConstant } from './constant';

export class EaseMessageTransporter implements IEaseMessageTransporter {
  constructor(
    private readonly _client: IMqttClient,
    private readonly _option?: IEaseOption
  ) {}

  async publish(
    topic: string | string[],
    message: IEaseMsg,
    qos?: QoS
  ): Promise<number> {
    if (isEmpty(this._client)) {
      throw new EaseError(
        'MqttClientUndefined',
        'no mqtt client has been provided'
      );
    }

    if (isEmpty(topic)) {
      throw new EaseError('TopicNameEmpty', 'topic cannot be empty');
    }

    if (isEmpty(message)) {
      throw new EaseError(
        'MessageContentEmpty',
        'message content is empty or too short'
      );
    }

    const client = this._client;
    const delimiter = this._option.delimiter;
    const translatedTopic = translateTopic(
      topic,
      delimiter,
      EaseConstant.Slash
    ) as string;

    try {
      await client.publish(translatedTopic, encode(message), { qos });
      return client.getLastMessageId();
    } catch (error) {
      throw new EaseError(error.name, error.message);
    }
  }

  subscribe(topic: string | string[], qos?: QoS): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
