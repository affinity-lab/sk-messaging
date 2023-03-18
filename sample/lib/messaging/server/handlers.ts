import authHandlers from "./auth-handlers";
import type {RequestEvent} from "@sveltejs/kit";
import {handler} from "../../../../index";

// You need to create a message handler function with all prevously defined handlers you defined
export const messageHandler = (event: RequestEvent) => handler(event, {...authHandlers})