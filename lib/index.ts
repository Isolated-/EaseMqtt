/**
 *  EaseMqtt - A simplified approach to MQTT services
 *  @author   Michael Palmer
 *  @version  0.1.0
 *  @package  easemqtt
 *  @license  MIT
 */

export { connect } from 'mqtt';

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
  IEaseRequest,
  IEaseResponse,
} from './Interface';

export { EaseEventHandler } from './EaseEventHandler';
export { EaseMqtt } from './EaseMqtt';
export { EaseRequest } from './EaseRequest';
export { EaseResponse } from './EaseResponse';
