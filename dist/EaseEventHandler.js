"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Util_1 = require("./Util");
class EaseEventHandler {
    constructor(mqtt, prefix) {
        this.mqtt = mqtt;
        this.prefix = prefix;
        this.prefix = this.prefix || 'mqtt';
        if (mqtt && mqtt.client) {
            const client = mqtt.client;
            client.on('connect', () => this.handleConnect());
            client.on('error', error => this.handleError(error));
            client.on('packetreceive', packet => this.handlePacket(packet));
            client.on('packetsend', packet => this.handlePacket(packet));
            client.on('message', (t, p, pack) => this.handleMessage(t, p, pack));
        }
    }
    handleMessage(path, msgbuf, packet) {
        if (Util_1.isEmpty(path) || Util_1.isEmpty(msgbuf) || Util_1.isEmpty(packet))
            return;
        const delimiter = this.mqtt.option.delimiter;
        const topic = Util_1.translateTopic(path, '/', delimiter);
        const message = Util_1.decode(msgbuf);
        const request = {
            topic,
            body: message,
        };
        if (request.body.replyTo) {
            request.replyTo = Util_1.translateTopic(request.body.replyTo, '/', delimiter);
            delete request.body.replyTo;
        }
        request.mqtt = this.mqtt;
        const req = new _1.EaseRequest(request);
        const res = new _1.EaseResponse(req);
        this.mqtt.emit(topic, req, res);
        return req;
    }
    handleError(error) {
        this.emit('error', error);
    }
    handlePacket(packet) {
        if (Util_1.isEmpty(packet))
            return;
        if (packet.cmd === 'disconnect') {
            return this.handleDisconnect();
        }
        this.emit('packet', packet);
    }
    handleConnect() {
        this.emit('connect');
    }
    handleDisconnect() {
        this.emit('disconnect');
    }
    emit(event, ...args) {
        const mqtt = this.mqtt;
        const prefix = this.prefix;
        if (mqtt) {
            mqtt.emit(`${prefix}:${event}`, args);
        }
    }
}
exports.EaseEventHandler = EaseEventHandler;
