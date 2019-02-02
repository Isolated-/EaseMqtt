"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty_1 = require("./isEmpty");
const __1 = require("..");
exports.translateTopic = (topic, replace, delimiter) => {
    if (isEmpty_1.isEmpty(topic)) {
        throw new __1.EaseError('TopicNameInvalid', 'topic cannot be undefined, null or empty');
    }
    const regex = replace === '.' ? /\./g : new RegExp(replace || '/', 'g');
    const replaceWith = delimiter || '.';
    if (typeof (topic) === 'string') {
        return topic.replace(regex, replaceWith);
    }
    return topic.map(v => v.replace(regex, replaceWith));
};
