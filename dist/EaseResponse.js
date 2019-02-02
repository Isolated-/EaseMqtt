"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Util_1 = require("./Util");
class EaseResponse {
    constructor(request) {
        this.request = request;
        if (!Util_1.isEmpty(request)) {
            this.topic = request.topic;
            this.replyTo = request.replyTo;
        }
    }
    reply(message, qos) {
        if (Util_1.isEmpty(message)) {
            throw new _1.EaseError('MessageContentEmpty', 'message content too short');
        }
        const replyTo = this.replyTo;
        const mqtt = this.request.mqtt;
        if (mqtt && replyTo) {
            mqtt.publish(replyTo, message, qos);
        }
    }
}
exports.EaseResponse = EaseResponse;
