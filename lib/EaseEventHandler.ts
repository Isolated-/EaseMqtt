import { Packet } from 'mqtt';
import { IEaseMqtt, IEaseEventHandler } from '.';

export class EaseEventHandler implements IEaseEventHandler {
  constructor (public mqtt?: IEaseMqtt, public prefix?: string) {
    this.prefix = this.prefix || 'mqtt';

    if (mqtt && mqtt.client) {
      const client = mqtt.client;
      client.on('error', this.handleError);
    }
  }

  /**
   *  Handle an incoming message
   *  @param {string} topic the topic the message came on
   *  @param {Buffer} msgbuf the encoded message content
   *  @param {Packet} packet the original message packet
   */
  public handleMessage(topic: string, msgbuf: Buffer, packet?: Packet) {}

  /**
   *  Handle an MQTT Error
   *  @param {Error} error the error object
   *  @return {void}
   */
  public handleError(error: Error): void {}

  /**
   *  Handle an incoming/outgoing packet
   *  @param {Packet} packet the incoming/outgoing packet
   *  @return {void}
   */
  public handlePacket(packet: Packet): void {}

  /**
   *  Handle the connection event
   *  @return {void}
   */
  public handleConnect(): void {
    this.emit('connect');
  }

  /**
   *  Handle the disconnect event
   *  @return {void}
   */
  public handleDisconnect(): void {
    this.emit('disconnect');
  }

  protected emit(event: string, ... args: any[]): void {
    const mqtt = this.mqtt;
    const prefix = this.prefix;

    if (mqtt) {
      mqtt.emit(`${prefix}:${event}`, args);
    }
  }
}
