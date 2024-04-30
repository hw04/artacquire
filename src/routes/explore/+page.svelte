<script>
	import { base } from "$app/paths"
	import { goto } from "$app/navigation"
	import ArtGrid from "$lib/ArtGrid.svelte"
	import SearchBar from "$lib/SearchBar.svelte"

	export let data

	$: searchTerm = data.q
	$: sortBy = data.sortBy
	$: order = data.order
	$: pageNumber = Number(data.page)
	$: chiResults = data.chiData.data
	$: vaResults = data.vaData.records

	function handleSearchTerm(event) {
		searchTerm = event.detail
		if (sortBy.length === 0) {
			goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}`)
		} else {
			goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}&sort=${sortBy}&order=${order}`)
		}
	}

	function handleSortBy(event) {
		switch (event.detail) {
			case "-desc":
				if (searchTerm.length != 0) {
					goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}`)
				} else {
					goto(`${base}/explore?page=${pageNumber}`)
				}
				break
			case "artist-asc":
				if (searchTerm.length != 0) {
					goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}&sort=artist&order=asc`)
				} else {
					goto(`${base}/explore?page=${pageNumber}&sort=artist&order=asc`)
				}
				break
			case "artist-desc":
				if (searchTerm.length != 0) {
					goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}&sort=artist&order=desc`)
				} else {
					goto(`${base}/explore?page=${pageNumber}&sort=artist&order=desc`)
				}
				break
			case "date-asc":
				if (searchTerm.length != 0) {
					goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}&sort=date&order=asc`)
				} else {
					goto(`${base}/explore?page=${pageNumber}&sort=date&order=asc`)
				}
				break
			case "date-desc":
				if (searchTerm.length != 0) {
					goto(`${base}/explore?q=${searchTerm}&page=${pageNumber}&sort=date&order=desc`)
				} else {
					goto(`${base}/explore?page=${pageNumber}&sort=date&order=desc`)
				}
				break
		}
	}
</script>

<h1 class="text-3xl font-bold text-center mt-6 mb-6">Explore Artwork</h1>

<SearchBar bind:sortBy bind:order on:term={handleSearchTerm} on:sort={handleSortBy} />

<div class="grid-parent">
	<div class="child1">
		{#if searchTerm.length === 0 && sortBy.length === 0 && pageNumber > 1}
			<a class="btn btn-primary" href="/explore?page={pageNumber - 1}" data-sveltekit-prefetch
				>Previous</a
			>
		{:else if searchTerm.length === 0 && sortBy.length != 0 && pageNumber > 1}
			<a
				class="btn btn-primary"
				href="/explore?page={pageNumber - 1}&sort={sortBy}&order={order}"
				data-sveltekit-prefetch>Previous</a
			>
		{:else if searchTerm.length != 0 && sortBy.length != 0 && pageNumber > 1}
			<a
				class="btn btn-primary"
				href="/explore?q={searchTerm}&page={pageNumber - 1}&sort={sortBy}&order={order}"
				data-sveltekit-prefetch>Previous</a
			>
		{:else if pageNumber > 1}
			<a
				class="btn btn-primary"
				href="/explore?q={searchTerm}&page={pageNumber - 1}"
				data-sveltekit-prefetch>Previous</a
			>
		{:else}
			<a class="btn btn-disabled" disabled href="#top">Previous</a>
		{/if}
	</div>
	<div class="child2">
		<ArtGrid chiInfo={chiResults} vaInfo={vaResults} />
	</div>
	<div class="child3">
		{#if searchTerm.length === 0 && sortBy.length === 0}
			{#if chiResults.length === 0 && vaResults.length === 0}
				<button class="btn" disabled>Next</button>
			{:else}
				<a class="btn btn-primary" href="/explore?page={pageNumber + 1}" data-sveltekit-prefetch
					>Next</a
				>
			{/if}
		{:else if searchTerm.length != 0 && sortBy.length != 0}
			{#if chiResults.length === 0 && vaResults.length === 0}
				<button class="btn" disabled>Next</button>
			{:else}
				<a
					class="btn btn-primary"
					href="/explore?q={searchTerm}&page={pageNumber + 1}&sort={sortBy}&order={order}"
					data-sveltekit-prefetch>Next</a
				>
			{/if}
		{:else if searchTerm.length === 0 && sortBy.length != 0}
			{#if chiResults.length === 0 && vaResults.length === 0}
				<button class="btn" disabled>Next</button>
			{:else}
				<a
					class="btn btn-primary"
					href="/explore?page={pageNumber + 1}&sort={sortBy}&order={order}"
					data-sveltekit-prefetch>Next</a
				>
			{/if}
		{:else if searchTerm.length != 0 && sortBy.length === 0}
			{#if chiResults.length === 0 && vaResults.length === 0}
				<button class="btn" disabled>Next</button>
			{:else}
				<a
					class="btn btn-primary"
					href="/explore?q={searchTerm}&page={pageNumber + 1}"
					data-sveltekit-prefetch>Next</a
				>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	.grid-parent {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 10fr 1fr;
		gap: 1em;
		justify-items: center;
	}

	.child2 {
		grid-area: 1 / 1 / 2 / 3;
	}
	.child1 {
		grid-area: 2 / 1 / 3 / 2;
	}
	.child3 {
		grid-area: 2 / 2 / 3 / 3;
	}

	@media only screen and (min-width: 768px) {
		.grid-parent {
			display: grid;
			grid-template-columns: 1fr 4fr 1fr;
			grid-template-rows: 1fr;
			gap: 1em;
			margin-left: 1em;
			margin-right: 1em;
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
	}
</style>
