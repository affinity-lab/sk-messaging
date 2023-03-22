import axios, {AxiosError} from "axios";
import MessageResult from "./message-result";
import type {MessageResultHandler} from "./types";

class HttpError {
	constructor(readonly error: any) {}
}

class UnknownError {
	constructor(readonly error: any) {}
}

export default class Messenger {

	private handlers: { [p: string | number]: MessageResultHandler } = {}
	private anyHandler?: MessageResultHandler;
	private otherHandler?: MessageResultHandler;
	private finallyHandler?: () => void;

	constructor(
		private data: any,
		private url: string,
		private messageId: number,
		private defaultHandler?: (res: MessageResult) => void,
		private errorHandler: (res: AxiosError) => void = (error: any) => console.warn(error),
		private catchHandler: (error: any) => void = (error: any) => console.error(error)
	) {}

	private async call(): Promise<UnknownError | MessageResult | HttpError> {
		let response;
		try {
			return new MessageResult(
				await axios.post(
					this.url,
					this.data,
					{
						headers: {"content-type": "multipart/form-data"},
						params: {"message-id": this.messageId}
					}
				)
			);
		} catch (error) {
			if (error instanceof AxiosError) return new HttpError(error);
			else return new UnknownError(error)
		}
	}

	async send(upload?: () => void, download?: () => void) {
		return this.call()
			.then(res => {
				if (res instanceof HttpError) {
					this.errorHandler(res.error);
				} else if (res instanceof UnknownError) {
					this.catchHandler(res.error);
				} else {
					if (this.handlers.hasOwnProperty(res.status)) {
						this.handlers[res.status](res);
						res.handled();
					}
					if (this.anyHandler !== undefined) this.anyHandler(res);
					if (!res.isHandled && this.otherHandler !== undefined) this.otherHandler(res);
					if (this.defaultHandler !== undefined) this.defaultHandler(res);
				}
				if (this.finallyHandler !== undefined) this.finallyHandler();
			})
	}

	on(status: string | number | Array<string | number>, handler: MessageResultHandler): this {
		if (!Array.isArray(status)) status = [status];
		status.forEach((status: string | number) => this.handlers[status] = handler);
		return this;
	}
	any(handler: MessageResultHandler): this {
		this.anyHandler = handler;
		return this;
	}
	other(handler: MessageResultHandler): this {
		this.otherHandler = handler;
		return this;
	}
	catch(handler: (error: any) => void): this {
		this.catchHandler = handler;
		return this;
	}
	error(handler: (res: AxiosError) => void): this {
		this.errorHandler = handler;
		return this;
	}
	finally(handler: () => void): this {
		this.finallyHandler = handler;
		return this;
	}

}