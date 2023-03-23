import type {RequestEvent} from "@sveltejs/kit";
import type {MessageHandlerCollection} from "./types";

export default async function handler(event: RequestEvent, handlers: MessageHandlerCollection) {
	if (!event.url.searchParams.has("message-id") || event.url.searchParams.get("message-id") === null) return new Response(null, {status: 400});
	let messageId = parseInt(event.url.searchParams.get("message-id")!);
	if (!handlers.hasOwnProperty(messageId)) return new Response(null, {status: 404});
	return handlers[messageId](event, await event.request.formData());
}