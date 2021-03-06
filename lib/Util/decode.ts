import { IEaseMsg, EaseError } from '..';
import { isEmpty } from './isEmpty';

/**
 *  Decode the content of an encoded message
 *  @param {Buffer} msgbuf the encoded message
 *  @return {IEaseMsg}
 */
export const decode = (msgbuf: Buffer): IEaseMsg => {
  if (isEmpty(msgbuf)) {
    throw new EaseError('MsgBufferInvalid', 'msgbuf cannot be undefined or null');
  }

  let message = msgbuf.toString();

  try {
    message = JSON.parse(message);
  } catch (e) {}

  return message;
};
