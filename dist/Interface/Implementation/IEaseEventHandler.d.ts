import { IEaseMqtt } from '../../';
import { Packet } from 'mqtt';
export interface IEaseEventHandler {
    mqtt?: IEaseMqtt;
    prefix?: string;
    handleMessage(topic: string, msgbuf: Buffer, packet: Packet): any;
    handleError(error: Error): void;
    handlePacket(packet: Packet): void;
    handleConnect(): void;
    handleDisconnect(): void;
}
