export interface IEaseMessage {
  messageId?: number;
  [key: string]:
    string | string[]
    | number | number[]
    | boolean | boolean[]
    | Date | Date[]
    | IEaseMessage | IEaseMessage[];
}

export type IEaseMsg = string | IEaseMessage | any[];
