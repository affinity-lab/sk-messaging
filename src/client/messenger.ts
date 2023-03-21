import axios from "axios";
import MessageResult from "./message-result";
import DefaultResponseStatus from "../default-response-status";
import type {MessageResultHandler} from "./types";


export default class Messenger {

	private handlers: { [p: string | number]: MessageResultHandler } = {}
	private anyHandler?: MessageResultHandler;
	private otherHandler?: MessageResultHandler;

	constructor(private data: any, private url: string, private messageId: number, private defaultHandler?: (res: MessageResult) => void) {}

	private async call() {
		let response = await axios.post(this.url, this.data, {headers: {"content-type": "multipart/form-data"}, params: {"message-id": this.messageId}});
		return new MessageResult(response);
	}

	async send(upload?: () => void, download?: () => void) {
		return this.call().then(res => {
			if (res.httpStatus === 200 && this.handlers.hasOwnProperty(res.status)) {
				this.handlers[res.status](res);
				res.handled();
			} else if (this.handlers.hasOwnProperty(DefaultResponseStatus.ERROR)) {
				this.handlers[DefaultResponseStatus.ERROR](res);
			}
			if(!res.isHandled && this.otherHandler !== undefined) this.otherHandler(res);
			if(this.anyHandler !== undefined) this.anyHandler(res);
			if (this.defaultHandler !== undefined) this.defaultHandler(res);
			return res;
		})
	}

	on(status: string | number | Array<string | number>, handler: MessageResultHandler): this {
		if (!Array.isArray(status)) status = [status];
		status.forEach((status: string | number) => this.handlers[status] = handler);
		return this;
	}
	any(handler: MessageResultHandler):this{
		this.anyHandler = handler;
		return this;
	}
	other(handler: MessageResultHandler):this{
		this.otherHandler = handler;
		return this;
	}

}