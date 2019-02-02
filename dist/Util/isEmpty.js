"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = (value) => {
    if (!value)
        return true;
    if (typeof (value) === 'object') {
        return Object.keys(value).length === 0;
    }
    return value.length === 0;
};
