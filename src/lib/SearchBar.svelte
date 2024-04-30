<script>
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()

	let searchTerm = ""
	export let sortBy
	export let order
	$: sortValue = `${sortBy}-${order}`

	const sendSearchTerm = () => {
		dispatch("term", searchTerm)
	}
	const sendSortBy = () => {
		dispatch("sort", sortValue)
	}
</script>

<form on:submit|preventDefault={sendSearchTerm} class="parent">
	<label for="sortBy" class="badge">Sort</label>
	<select
		bind:value={sortValue}
		class="select select-bordered w-full mb-1"
		name="sort"
		on:change={sendSortBy}
		><option selected value="-desc">Relevance (default)</option>
		<option value="artist-asc">Artist name (A-Z)</option>
		<option value="artist-desc">Artist name (Z-A)</option>
		<option value="date-asc">Date (asc)</option>
		<option value="date-desc">Date (desc)</option>
	</select>
	<input
		type="text"
		class="input input-bordered w-full mb-1"
		bind:value={searchTerm}
		placeholder="Search by artist name, period, style"
	/><button class="btn btn-primary w-full" type="submit">Search</button>
</form>

<style>
	[class*="parent"] {
		margin: 1em 1em 1em 1em;
	}
	@media only screen and (min-width: 768px) {
		.parent {
			display: grid;
			grid-template-columns: 0.1fr 0.7fr 4fr 1fr;
			grid-template-rows: 1fr;
			gap: 2em;
			margin: 1em 1em 1em 1em;
		}
	}
</style>
