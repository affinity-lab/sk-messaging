import type {AxiosResponse} from "axios";

export default class MessageResult {

	#handled: boolean = false;

	get headers() {return this.result.headers}
	get httpStatus() {return this.result.status}
	get httpStatusText() {return this.result.statusText}
	get body() {return this.result.data}
	get status() {return typeof this.result.data === "object" && this.result.data.hasOwnProperty("status") ? this.result.data["status"] : undefined}
	get message() {return typeof this.result.data === "object" && this.result.data.hasOwnProperty("message") ? this.result.data["message"] : undefined}

	constructor(public result: AxiosResponse) {}

	get isHandled(): boolean {return this.#handled;}
	handled() {this.#handled = true;}
}