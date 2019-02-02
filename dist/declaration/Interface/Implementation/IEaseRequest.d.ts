import { IEaseMqtt } from '../../';
export interface IEaseRequest {
    topic: string;
    replyTo?: string;
    body?: any;
    mqtt?: IEaseMqtt;
}
