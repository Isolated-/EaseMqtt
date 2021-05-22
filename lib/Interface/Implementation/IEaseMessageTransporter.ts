import { QoS } from 'async-mqtt';

export interface IEaseMessageTransporter {
  publish<T = unknown>(
    topic: string | string[],
    message: T,
    qos?: QoS
  ): Promise<number>;
  subscribe(topic: string | string[], qos?: QoS): Promise<void>;
}
