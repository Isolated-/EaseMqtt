import { EventEmitter2 } from 'eventemitter2';
import { QoS, MqttClient } from 'mqtt';
import { IEaseMqtt, IEaseMsg, IEaseOption, IEaseEventHandler } from '.';
export declare class EaseMqtt extends EventEmitter2 implements IEaseMqtt {
    client: MqttClient;
    option: IEaseOption;
    eventHandler: IEaseEventHandler;
    constructor(client?: MqttClient, opt?: IEaseOption);
    getDefault(opt?: IEaseOption): IEaseOption;
    publish(topic: string | string[], message: IEaseMsg, qos?: QoS): Promise<number>;
    subscribe(topic: string | string[], qos?: QoS): Promise<void>;
    end(): void;
}
