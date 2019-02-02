"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EaseError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
exports.EaseError = EaseError;
