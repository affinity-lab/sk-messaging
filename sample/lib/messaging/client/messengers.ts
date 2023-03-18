import {authMessengers} from "./auth-messengers";

// finally you can collect all messenger factories in one place
export const messengers = {
	auth: {...authMessengers}
};