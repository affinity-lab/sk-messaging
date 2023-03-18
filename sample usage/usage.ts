import {DefaultResponseStatus, MessageResult, Messenger, respond, ServerTypes} from "../index";


/*--- SHARED ---*/

// You need to create an enum to your messages to identify those both on server and client side
enum Message {
	AUTH_LOGIN
}

// You can extend the default response statuses by the statuses of your choice
enum MyResponseStatus {
	DUMMIES,
	DUMMY,
	BUNNY
}

const ResponseStatus = {
	...DefaultResponseStatus,
	...MyResponseStatus
}


/*---- SERVER SIDE ----*/

// you need to create a message handler collection
let messageHandlers: ServerTypes.MessageHandlerCollection = {};

// any you should add your message handlers to this collection
messageHandlers[Message.AUTH_LOGIN] = (event, data) => {
	// you should always return a 200 OK response, whith JSON {status:string, message:any}
	// the easiest way to use the respond function.
	let response = respond(ResponseStatus.OK, "hello");
	// you can write headers and cookies of the response
	response.headers.set("myheader", "myvalue");
	event.cookies.set("mycookie", "myvalue", {path: "/"})
	return response;
}

// in the route you wish to use for messaging create a +server.ts file, and export your handler
let  messageHandler = (event:RequestEvent)=>handler(event, messageHandlers)
export messageHandler as POST;


/*---- CLIENT SIDE ----*/

// you can define a default handler to catch every unhandled or common error (eg: unauthenticated) message
const defaultHandler = (res: MessageResult) => {};
// its much easier to create a factory function with the common arguments to create your messengers
const messenger = (data: any, messageId: number): Messenger => new Messenger(data, "/messaging", messageId, defaultHandler);

// create a set of messenger factories
let messengers = {
	auth: {
		login: (login: string, password: string) => messenger({login, password}, Message.AUTH_LOGIN)
	}
}

// in your svelte components you can send messages and handle the respones
// every result should send a json, with some ResponseStatus
// when some errors occured it will be sent with different http status code, the ResponseStatus.ERROR will catch these
messengers.auth.login("elvis", "presley")
	.on(ResponseStatus.OK, res => console.log(res))
	.on(ResponseStatus.UNAUTHENTICATED, res => console.log(res))
	.on(ResponseStatus.ERROR, res => console.log(res))
	.send()

