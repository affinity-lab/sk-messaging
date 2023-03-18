<script lang="ts">
	import {messengers} from "../lib/messaging/client/messengers";
	import {Status} from "../lib/messaging/status";

	function login() {
		// you can send a message through the message factory set you have created, with the defined arguments
		messengers.auth.login("elvis", "presley")
			// you can add handlers for each status
			.on(Status.OK, (res) => console.log(res.message))
			// you can add a single handler for more than one statuses
			.on([Status.UNAUTHENTICATED, Status.UNAUTHORIZED], (res) => console.log(res.message))
			// you can handle the errors (when something went really wrong)
			.on(Status.ERROR, (res) => console.log(res.message))
			// finally you need to send the message.
			// here you can define upload, and download progress tracker methods
			.send();
	}
</script>

<button on:click={login}>Login</button>