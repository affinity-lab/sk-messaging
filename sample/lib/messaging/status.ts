import {DefaultResponseStatus} from "../../../index";

// there are some default response statuses deinfed in "DefaultResponseStatus" enum,
// but you can extend those if needed. Both server and client side uses these statuses

enum MyResponseStatus {
	SUCCESS,
	FAILURE
}

export const Status = {
	...DefaultResponseStatus,
	...MyResponseStatus
}