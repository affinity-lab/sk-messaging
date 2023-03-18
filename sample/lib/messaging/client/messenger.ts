import {type MessageResult, Messenger} from "../../../../index";

// it's much easier to define a messenger factory function to create the Messengers
// with the default values, eg: url, defaultHandler
export const messenger = (data: any, messageId: number): Messenger => new Messenger(
	data,
	"/message",
	messageId,
	(res: MessageResult) => res.isHandled ? false : console.log(res)
);
