<script>
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	let searchTerm = ""
	function sendSearchTerm() {
		dispatch("term", { searchTerm: searchTerm })
	}
</script>

<form class="parent">
	<select
		><option>Sort by artwork title (A-Z)</option>
		<option>Sort by artwork title (Z-A)</option>
		<option>Sort by artist name (A-Z)</option>
		<option>Sort by artist name (Z-A)</option></select
	>
	<input bind:value={searchTerm} placeholder="Search by artist name, period, style" /><button
		on:click={sendSearchTerm}>Search</button
	>
</form>

<style>
	.parent {
		display: grid;
		grid-template-columns: 1fr 4fr 1fr;
		grid-template-rows: 1fr;
		gap: 2em;
		margin-bottom: 2em;
	}
</style>
