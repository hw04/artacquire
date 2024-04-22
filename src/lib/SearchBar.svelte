<script>
	import { page } from "$app/stores"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	let query
	let searchTerm = ""
	function sendSearchTerm() {
		$page.query = searchTerm
	}
</script>

<form on:submit|preventDefault={sendSearchTerm} class="parent">
	<select class="sort"
		><option>Sort by artwork title (A-Z)</option>
		<option>Sort by artwork title (Z-A)</option>
		<option>Sort by artist name (A-Z)</option>
		<option>Sort by artist name (Z-A)</option></select
	>
	<input
		type="text"
		class="searchbar"
		bind:value={searchTerm}
		placeholder="Search by artist name, period, style"
	/><button type="submit" class="searchbutton">Search</button>
</form>

<style>
	[class*="sort"] {
		width: 100%;
	}
	[class*="searchbar"] {
		width: 100%;
	}
	[class*="searchbutton"] {
		width: 100%;
	}
	[class*="parent"] {
		margin-bottom: 1em;
	}
	@media only screen and (min-width: 768px) {
		.parent {
			display: grid;
			grid-template-columns: 1fr 4fr 1fr;
			grid-template-rows: 1fr;
			gap: 2em;
			margin-bottom: 2em;
		}
	}
</style>
