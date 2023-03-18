export default function respond(status: string | number, message: any, headers: { [p: string]: string } = {}) {
	let response = {
		status: status,
		message: message
	}
	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			...headers,
			"Content-Type": "application/json"
		}
	})
}