<script>
	import { goto } from "$app/navigation"
	import FetchArt from "$lib/FetchArt.svelte"
	import SearchBar from "$lib/SearchBar.svelte"
	export let data
	let currentPage = 1
	const { pagination } = data
	let artData = data.data
	let currentSearchTerm
	async function handleSearch(event) {
		currentSearchTerm = term.searchTerm
		const searchResponse = await fetch(
			`https://api.artic.edu/api/v1/artworks?q="${currentSearchTerm}"&fields=title,artist_display,date_display,image_id`
		)
		artData = searchResponse
	}

	function handleNextButtonClick() {
		currentPage++
		goto(`/explore?page=${currentPage}`, { invalidateAll: true })
	}
</script>

<h1>Explore artwork</h1>

<SearchBar on:term={handleSearch} />

<div class="parent">
	<div class="child"><button>Back</button></div>
	{#await artData}
		<p>Loading art...</p>
	{:then art}
		<div class="child"><FetchArt bind:artInfo={artData} /></div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
	<div class="child"><button on:click={handleNextButtonClick}>Next</button></div>
</div>

<style>
	.parent {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
	}
	.child {
		text-align: center;
	}
</style>
