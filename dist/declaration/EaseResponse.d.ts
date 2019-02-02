import { IEaseRequest, IEaseResponse, IEaseMsg } from '.';
import { QoS } from 'mqtt';
export declare class EaseResponse implements IEaseResponse {
    request: IEaseRequest;
    topic: string;
    replyTo?: string;
    constructor(request: IEaseRequest);
    reply(message: IEaseMsg, qos?: QoS): void;
}
