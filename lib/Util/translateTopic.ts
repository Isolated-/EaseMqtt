import { isEmpty } from './isEmpty';
import { EaseError } from '..';
/**
 *  translate a topic name
 *  @param {string} topic the topic name (example: biggerworld/topic)
 *  @param {string} replace the delimiter character to find (default /)
 *  @param {string} delimiter the delimiter to replace with (default .)
 *  @return {string} the converted topic (example: biggerworld.topic)
 */

export const translateTopic =
(topic: string | string[], replace?: string, delimiter?: string): string | string[] => {
  if (isEmpty(topic)) {
    throw new EaseError('TopicNameInvalid', 'topic cannot be undefined, null or empty');
  }

  const regex = replace === '.' ? /\./g : new RegExp(replace || '/', 'g');
  const replaceWith = delimiter || '.';

  if (typeof (topic) === 'string') {
    return topic.replace(regex, replaceWith);
  }

  return topic.map(v => v.replace(regex, replaceWith));
};
