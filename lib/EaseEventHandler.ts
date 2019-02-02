import { Packet } from 'mqtt';
import {
  IEaseMqtt,
  IEaseEventHandler,
  IEaseRequest,
  EaseRequest,
  EaseResponse } from '.';

import { isEmpty, translateTopic, decode } from './Util';

export class EaseEventHandler implements IEaseEventHandler {
  constructor (public mqtt?: IEaseMqtt, public prefix?: string) {
    this.prefix = this.prefix || 'mqtt';

    if (mqtt && mqtt.client) {
      const client = mqtt.client;

      client.on('connect', () => this.handleConnect());
      client.on('error', error => this.handleError(error));
      client.on('packetreceive', packet => this.handlePacket(packet));
      client.on('packetsend', packet => this.handlePacket(packet));
      client.on('message', (t, p, pack) => this.handleMessage(t, p, pack));
    }
  }

  /**
   *  Handle an incoming message
   *  @param {string} topic the topic the message came on
   *  @param {Buffer} msgbuf the encoded message content
   *  @param {Packet} packet the original message packet
   */
  public handleMessage(path: string, msgbuf: Buffer, packet?: Packet): IEaseRequest {
    if (isEmpty(path) || isEmpty(msgbuf) || isEmpty(packet)) return;

    const delimiter = this.mqtt.option.delimiter;
    const topic = translateTopic(path, '/', delimiter) as string;
    const message = decode(msgbuf);

    const request: IEaseRequest = {
      topic,
      body: message,
    };

    if (request.body.replyTo) {
      request.replyTo = translateTopic(request.body.replyTo, '/', delimiter) as string;
      delete request.body.replyTo;
    }

    request.mqtt = this.mqtt;

    const req = new EaseRequest(request);
    const res = new EaseResponse(req);

    this.mqtt.emit(topic, req, res);
    return req;
  }

  /**
   *  Handle an MQTT Error
   *  @param {Error} error the error object
   *  @return {void}
   */
  public handleError(error: Error): void {
    this.emit('error', error);
  }

  /**
   *  Handle an incoming/outgoing packet
   *  @param {Packet} packet the incoming/outgoing packet
   *  @return {void}
   */
  public handlePacket(packet: Packet): void {
    if (isEmpty(packet)) return;

    if (packet.cmd === 'disconnect') {
      return this.handleDisconnect();
    }

    this.emit('packet', packet);
  }

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
