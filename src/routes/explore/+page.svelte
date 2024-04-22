<script>
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import ArtGrid from "$lib/ArtGrid.svelte"
	import SearchBar from "$lib/SearchBar.svelte"
	import { afterUpdate, onMount } from "svelte"
	export let data
	$: url = $page.url
	$: chiResults = data.chiData.data
	$: vaResults = data.vaData.records
	// $: console.log(vaResults)

	let query = new URLSearchParams($page.url.searchParams.toString())

	function handleSearchTerm(event) {
		searchTerm = event.detail.query.toString()
		goto(`/explore?q=${event.detail.query.toString()}&page=${currentPage}`)
	}
</script>

<h1>Explore artwork</h1>

<SearchBar/>

<div class="grid-parent">
	<div class="child1">
		<button disabled={Number(url.searchParams.get("page")) === 1} data-sveltekit-prefetch
			>Previous page</button
		>
	</div>
	<div class="child2">
		{#await { chiResults, vaResults }}
			<h3>Loading art...</h3>
		{:then art}
			<ArtGrid chiInfo={art.chiResults} vaInfo={art.vaResults} />
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
	<div class="child3">
		<button data-sveltekit-prefetch>Next page</button>
	</div>
</div>

<style>
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 4fr 1fr;
		grid-template-rows: 1fr;
	}

	.child1 {
		grid-area: 1 / 1 / 2 / 2;
		text-align: center;
	}
	.child2 {
		grid-area: 1 / 2 / 2 / 3;
	}
	.child3 {
		grid-area: 1 / 3 / 2 / 4;
		text-align: center;
	}
</style>
