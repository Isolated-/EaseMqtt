import { IEaseRequest, IEaseMsg, IEaseMqtt } from '.';
export declare class EaseRequest implements IEaseRequest {
    topic: string;
    replyTo?: string;
    body?: IEaseMsg;
    mqtt?: IEaseMqtt;
    constructor(req: IEaseRequest);
}
