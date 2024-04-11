<script>
	import { goto } from "$app/navigation"
	import DisplayArt from "$lib/DisplayArt.svelte"
	import SearchBar from "$lib/SearchBar.svelte"
	export let data
	let currentPage = 1

	$: artData = data.data

	function handleNextButtonClick() {
		currentPage++
		goto(`/explore?page=${currentPage}`, { invalidateAll: true })
	}

	function handleBackButtonClick() {
		currentPage--
		goto(`/explore?page=${currentPage}`, { invalidateAll: true })
	}
</script>

<h1>Explore artwork</h1>

<SearchBar />

<div class="parent">
	<div class="child">
		<button disabled={currentPage === 1} on:click={handleBackButtonClick}>Previous page</button>
	</div>
	{#await artData}
		<p>Loading art...</p>
	{:then art}
		<div class="child"><DisplayArt bind:artInfo={artData} /></div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
	<div class="child">
		<button on:click={handleNextButtonClick}>Next page</button>
	</div>
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
