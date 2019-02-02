import { QoS, MqttClient } from 'mqtt';
import { EventEmitter2 } from 'eventemitter2';
import { IEaseMsg, IEaseEventHandler, IEaseOption } from '..';
export interface IEaseMqtt extends EventEmitter2 {
    client: MqttClient;
    option: IEaseOption;
    eventHandler: IEaseEventHandler;
    publish(topic: string, message: IEaseMsg, qos?: QoS): Promise<number>;
    subscribe(topic: string | string[], qos?: QoS): Promise<void>;
    end(): void;
}
