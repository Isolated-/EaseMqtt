import { IEaseMsg, IEaseRequest } from '../../';
import { QoS } from 'mqtt';

export interface IEaseResponse {
  /**
   *  @param {IEaseRequest} request the request instance and properties
   */
  request: IEaseRequest;

  /**
   *  @param {string} topic the topic the request was made on
   */
  topic: string;

  /**
   *  @param {string} replyTo the topic to send the response to
   */
  replyTo?: string;

  /**
   *  Send a response as a reply
   *  @param {IEaseMsg} message the message to respond with
   */
  reply (message: IEaseMsg, qos?: QoS): void;
}
