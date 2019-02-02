/**
 *  EaseMqtt - A simplified approach to MQTT services
 *  @author   Michael Palmer
 *  @version  0.1.0
 *  @package  easemqtt
 *  @license  MIT
 */

// errors
export { EaseError } from './Error';

// interfaces
export {
  IEaseError,
  IEaseEventHandler,
  IEaseMqtt,
  IEaseMessage,
  IEaseMsg,
  IEaseOption,
} from './Interface';

export { EaseEventHandler } from './EaseEventHandler';
export { EaseMqtt } from './EaseMqtt';
