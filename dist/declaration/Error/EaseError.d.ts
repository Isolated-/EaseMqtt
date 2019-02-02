import { IEaseError } from '..';
export declare class EaseError extends Error implements IEaseError {
    name: string;
    message: string;
    stack: string;
    constructor(name: string, message: string);
}
