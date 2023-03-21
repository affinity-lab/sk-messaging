import type {RequestEvent} from "@sveltejs/kit";
import type {MaybePromise} from "@sveltejs/kit/types/private";

export type MessageResponder = (event: RequestEvent, data?: FormData) => MaybePromise<Response>;
export type MessageHandlerCollection = { [p: number]: MessageResponder };