"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const isEmpty_1 = require("./isEmpty");
exports.decode = (msgbuf) => {
    if (isEmpty_1.isEmpty(msgbuf)) {
        throw new __1.EaseError('MsgBufferInvalid', 'msgbuf cannot be undefined or null');
    }
    let message = msgbuf.toString();
    try {
        message = JSON.parse(message);
    }
    catch (e) { }
    return message;
};
