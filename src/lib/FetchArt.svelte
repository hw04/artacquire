<script>
	import ArtModal from "./ArtModal.svelte"

	let showModal = false

	let clickedImageId
	let artistName
	let artTitle
	let artYear

	export let artInfo
</script>

<div>
	<div class="grid-parent">
		{#each artInfo as { image_id, title, artist_title, date_display }}
			<div class="grid-child">
				<button
					on:click={() => {
						showModal = true
						clickedImageId = image_id
						artTitle = title
						artYear = date_display
						artistName = artist_title
					}}
				>
					<img src="https://www.artic.edu/iiif/2/{image_id}/full/500,/0/default.jpg" alt="test" />
				</button>
			</div>
		{/each}
		<ArtModal bind:showModal bind:clickedImageId bind:artistName bind:artTitle bind:artYear />
	</div>
</div>

<style>
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 20px;
		justify-items: center;
		overflow: hidden;
	}
	img {
		height: auto;
		width: 100%;
	}
	button {
		all: unset;
		cursor: pointer;
		height: 300px;
		width: 300px;
	}
</style>
