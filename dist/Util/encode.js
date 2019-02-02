"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const isEmpty_1 = require("./isEmpty");
exports.encode = (message) => {
    if (isEmpty_1.isEmpty(message)) {
        throw new __1.EaseError('EncodeInvalidMessage', 'the message content cannot be invalid or undefined');
    }
    if (typeof (message) === 'string') {
        return Buffer.from(message);
    }
    return Buffer.from(JSON.stringify(message));
};
