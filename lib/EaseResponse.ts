import { IEaseRequest, IEaseResponse, IEaseMsg, EaseError } from '.';
import { QoS } from 'mqtt';
import { isEmpty, translateTopic } from './Util';

export class EaseResponse implements IEaseResponse {
  /**
   *  @param {string} topic the topic the request was made on
   */
  public topic: string;

  /**
   *  @param {string} replyTo the topic the response is sent to
   */
  public replyTo?: string;

  /**
   *  Create a EaseResponse instance
   *  @param {IEaseRequest} request the request instance
   */
  constructor (public request: IEaseRequest) {
    if (!isEmpty(request)) {
      this.topic = request.topic;
      this.replyTo = request.replyTo;
    }
  }

  /**
   *  Send a response to the request
   *  @param {IEaseMsg} message the message content
   *  @param {QoS} qos override the default qos level
   */
  public reply (message: IEaseMsg, qos?: QoS): void {
    if (isEmpty(message)) {
      throw new EaseError('MessageContentEmpty', 'message content too short');
    }

    const replyTo = this.replyTo;
    const mqtt = this.request.mqtt;

    if (mqtt && replyTo) {
      mqtt.publish(replyTo, message, qos || mqtt.option.qos);
    }
  }
}
