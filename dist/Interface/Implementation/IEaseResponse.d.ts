import { IEaseMsg, IEaseRequest } from '../../';
import { QoS } from 'mqtt';
export interface IEaseResponse {
    request: IEaseRequest;
    topic: string;
    replyTo?: string;
    reply(message: IEaseMsg, qos?: QoS): void;
}
