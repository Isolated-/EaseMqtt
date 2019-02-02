import { IEaseMsg, EaseError } from '..';
import { isEmpty } from './isEmpty';

export const encode = (message: IEaseMsg): Buffer => {
  if (isEmpty(message)) {
    throw new EaseError(
      'EncodeInvalidMessage',
      'the message content cannot be invalid or undefined');
  }

  if (typeof (message) === 'string') {
    return Buffer.from(message);
  }

  return Buffer.from(JSON.stringify(message));
};
