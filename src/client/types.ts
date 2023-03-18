import type Messenger from "./messenger";

export type MessageResultHandler = (res: any) => any;
export type MessengerFactory = (...args: any) => Messenger;
export type MessengerCollection = { [p: string]: MessengerCollection | MessengerFactory };
