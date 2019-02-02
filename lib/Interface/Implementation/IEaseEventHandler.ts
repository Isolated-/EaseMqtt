import { IEaseMqtt } from '../../';
import { Packet } from 'mqtt';

export interface IEaseEventHandler {
  mqtt?: IEaseMqtt;
  prefix?: string;

  /**
   *  Handle an incoming message
   *  @param {string} topic the topic the message came on
   *  @param {Buffer} msgbuf the encoded message content
   *  @param {Packet} packet the original message packet
   */
  handleMessage(topic: string, msgbuf: Buffer, packet: Packet);

  /**
   *  Handle an MQTT Error
   *  @param {Error} error the error object
   *  @return {void}
   */
  handleError(error: Error): void;

  /**
   *  Handle an incoming/outgoing packet
   *  @param {Packet} packet the incoming/outgoing packet
   *  @return {void}
   */
  handlePacket(packet: Packet): void;

  /**
   *  Handle the connection event
   *  @return {void}
   */
  handleConnect(): void;

  /**
   *  Handle the disconnect event
   *  @return {void}
   */
  handleDisconnect(): void;
}
