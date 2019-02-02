import { IEaseMsg, IEaseMqtt } from '../../';

export interface IEaseRequest {
  /**
   *  @param {string} topic the topic the request was made on
   */
  topic: string;

  /**
   *  @param {string} replyTo the topic(s) to send a response to
   */
  replyTo?: string;

  /**
   *  @param {IEaseMsg} body the message content
   */
  body?: any;

  /**
   *  @param {IEaseMqtt} mqtt the EaseMqtt instance
   */
  mqtt?: IEaseMqtt;
}
