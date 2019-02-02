"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
const _1 = require(".");
const Util_1 = require("./Util");
class EaseMqtt extends eventemitter2_1.EventEmitter2 {
    constructor(client, opt) {
        const option = opt || {};
        super({
            wildcard: option.wildcard || false,
            delimiter: option.delimiter || '.',
        });
        this.option = this.getDefault(option);
        if (client) {
            this.client = client;
            const subscribe = this.option.subscribe;
            if (subscribe.length > 0) {
                this.subscribe(subscribe);
            }
        }
        this.eventHandler = new _1.EaseEventHandler(this);
    }
    getDefault(opt) {
        const defaults = {
            wildcard: false,
            delimiter: '.',
            subscribe: [],
            qos: 1,
        };
        return Object.assign({}, defaults, opt);
    }
    publish(topic, message, qos) {
        return new Promise((resolve, reject) => {
            if (Util_1.isEmpty(topic) || Util_1.isEmpty(message)) {
                const errorName = Util_1.isEmpty(topic) ? 'TopicNameEmpty' : 'MessageContentEmpty';
                const errorMessage = Util_1.isEmpty(topic) ? 'topic name too short' : 'message content too short';
                return reject(new _1.EaseError(errorName, errorMessage));
            }
            const mqtt = this.client;
            if (Util_1.isEmpty(mqtt)) {
                return reject(new _1.EaseError('MqttClientUndefined', 'No mqtt client has been provided'));
            }
            const topics = typeof (topic) === 'string' ? [topic] : topic;
            const delimiter = this.option.delimiter;
            const encoded = Util_1.encode(message);
            const opt = { qos };
            topics.forEach((chan, idx) => {
                const topic = Util_1.translateTopic(chan, delimiter, '/');
                const callback = (error, packet) => {
                    if (error)
                        return reject(error);
                    if (idx > topics.length)
                        return resolve(packet.messageId);
                };
                mqtt.publish(topic, encoded, opt, callback);
            });
        });
    }
    subscribe(topic, qos) {
        return new Promise((resolve, reject) => {
            if (Util_1.isEmpty(topic)) {
                return reject(new _1.EaseError('TopicNameEmpty', 'topic name too short'));
            }
            const mqtt = this.client;
            if (Util_1.isEmpty(mqtt)) {
                return reject(new _1.EaseError('MqttClientUndefined', 'No mqtt client has been provided'));
            }
            const quality = qos || this.option.qos;
            const opt = { qos: quality };
            const delimiter = this.option.delimiter;
            const channel = Util_1.translateTopic(topic, delimiter, '/');
            const callback = (err) => {
                if (err)
                    return reject(err);
                return resolve();
            };
            mqtt.subscribe(channel, opt, callback);
        });
    }
    end() {
        const mqtt = this.client;
        if (mqtt) {
            mqtt.end();
        }
    }
}
exports.EaseMqtt = EaseMqtt;
