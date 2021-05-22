import { QoS } from 'mqtt';

export interface IEaseOption {
  /**
   *  @param {boolean} wildcard enable wildcard support? (default false)
   */
  wildcard?: boolean;

  /**
   *  @param {string} delimiter set the default delimiter (default .)
   */
  delimiter?: string;

  /**
   *  @param {string[]} subscribe subscribe to topic(s) on construct
   */
  subscribe?: string[];

  /**
   *  @param {QoS} qos set the default qos level (Default 1)
   */
  qos?: QoS;
}
