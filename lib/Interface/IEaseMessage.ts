export interface IEaseMessage {
  messageId?: number;
  [key: string]: any;
}

export type IEaseMsg = string | IEaseMessage | any[];
