"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
class EaseRequest {
    constructor(req) {
        if (!Util_1.isEmpty(req)) {
            this.topic = req.topic;
            this.replyTo = req.replyTo;
            this.body = req.body;
            this.mqtt = req.mqtt;
        }
    }
}
exports.EaseRequest = EaseRequest;
