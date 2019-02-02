import { Packet } from 'mqtt';
import { IEaseMqtt, IEaseEventHandler, IEaseRequest } from '.';
export declare class EaseEventHandler implements IEaseEventHandler {
    mqtt?: IEaseMqtt;
    prefix?: string;
    constructor(mqtt?: IEaseMqtt, prefix?: string);
    handleMessage(path: string, msgbuf: Buffer, packet?: Packet): IEaseRequest;
    handleError(error: Error): void;
    handlePacket(packet: Packet): void;
    handleConnect(): void;
    handleDisconnect(): void;
    protected emit(event: string, ...args: any[]): void;
}
