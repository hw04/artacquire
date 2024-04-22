<script>
	import ArtModal from "./ArtModal.svelte"

	let showModal = false

	let clickedImageId
	let artistName
	let artTitle
	let artYear

	export let chiInfo

	export let vaInfo
</script>

<div>
	<div class="grid-parent">
		<ArtModal bind:showModal bind:clickedImageId bind:artistName bind:artTitle bind:artYear />
		{#each chiInfo as { image_id, title, artist_title, date_display }}
			<div class="grid-child">
				<button
					on:mouseover={() => {
						clickedImageId = image_id
						artTitle = title
						artYear = date_display
						artistName = artist_title
					}}
					on:focus={() => {
						clickedImageId = image_id
						artTitle = title
						artYear = date_display
						artistName = artist_title
					}}
					on:click={() => {
						showModal = true
					}}
					data-sveltekit-prefetch
				>
					<img
						src="https://www.artic.edu/iiif/2/{image_id}/full/500,/0/default.jpg"
						alt="{title} by {artist_title}"
					/>
				</button>
			</div>
		{/each}
		{#each vaInfo as { _primaryImageId, _primaryTitle, _primaryMaker, _primaryDate, _currentLocation }}
			<div class="grid-child">
				<button
					on:mouseover={() => {
						clickedImageId = _primaryImageId
						artTitle = _primaryTitle
						artYear = _primaryDate
						artistName = _primaryMaker.name
					}}
					on:focus={() => {}}
					on:click={() => {
						showModal = true
					}}
					data-sveltekit-prefetch
				>
					<img
						src="https://framemark.vam.ac.uk/collections/{_primaryImageId}/full/full/0/default.jpg"
						alt="{_primaryTitle} by {_primaryMaker.name}"
					/>
				</button>
			</div>
		{/each}
		{#if vaInfo.length === 0}
			<p>No results from V&A</p>
		{/if}
	</div>
</div>

<style>
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 5px;
		height: 1em;
		align-content: start;
		align-items: stretch;
	}
	.grid-child {
		height: fit-content;
		width: fit-content;
	}
	img {
		height: 100%;
		width: 100%;
	}
	button {
		all: unset;
		cursor: pointer;
		height: fit-content;
		width: fit-content;
	}
	@media only screen and (min-width: 768px) {
		.grid-parent {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr;
			gap: 5px;
			height: 1em;
		}
	}
</style>
