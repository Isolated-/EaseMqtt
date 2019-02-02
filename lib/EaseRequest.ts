import { IEaseRequest, IEaseMsg, IEaseMqtt } from '.';
import { isEmpty } from './Util';

export class EaseRequest implements IEaseRequest {

  /**
   *  @param {string} topic the topic the request was made on
   */
  public topic: string;

  /**
   *  @param {string} replyTo the topic(s) to send a response to
   */
  public replyTo?: string;

  /**
   *  @param {IEaseMsg} body the message content
   */
  public body?: IEaseMsg;

  /**
   *  @param {IEaseMqtt} mqtt the EaseMqtt instance
   */
  public mqtt?: IEaseMqtt;

  /**
   *  Create a new EaseRequest instance
   *  @param {IEaseRequest} req the request object
   */
  constructor (req: IEaseRequest) {
    if (!isEmpty(req)) {
      this.topic = req.topic;
      this.replyTo = req.replyTo;
      this.body = req.body;
      this.mqtt = req.mqtt;
    }
  }
}
