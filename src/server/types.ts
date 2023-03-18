import type {RequestEvent} from "@sveltejs/kit";

export type MessageResponder = (event: RequestEvent, data?: FormData) => Response;
export type MessageHandlerCollection = { [p: number]: MessageResponder };