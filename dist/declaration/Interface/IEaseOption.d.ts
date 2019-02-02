import { QoS } from 'mqtt';
export interface IEaseOption {
    wildcard?: boolean;
    delimiter?: string;
    subscribe?: string[];
    qos?: QoS;
}
