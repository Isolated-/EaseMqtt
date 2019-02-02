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
   *  Handle an MQTT Error
   *  @param {Error} error the error object
   *  @return {void}
   */
  handleError(error: Error): void {}

  /**
   *  Handle an incoming/outgoing packet
   *  @param {Packet} packet the incoming/outgoing packet
   *  @return {void}
   */
  handlePacket(packet: Packet): void {}

  /**
   *  Handle the connection event
   *  @return {void}
   */
  handleConnect(): void {}

  /**
   *  Handle the disconnect event
   *  @return {void}
   */
  handleDisconnect(): void {}
}
