import {messenger} from "./messenger";
import {Message} from "../message";

// you should organize your messenger factory calls in an object
export const authMessengers = {
	login: (login: string, password: string) => messenger({login, password}, Message.AUTH_LOGIN)
}