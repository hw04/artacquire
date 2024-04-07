<script>
	import ArtModal from './ArtModal.svelte'

	let showModal = false

	async function getArt() {
		const response = await fetch('https://api.artic.edu/api/v1/artworks')
		const artworks = await response.json()
		return artworks
	}
</script>

<h1>Explore artwork</h1>

<div>
	{#await getArt()}
		<p>Loading art...</p>
	{:then art}
		<div class="grid">
			{#each art.data as { image_id }}
				<ArtModal />
				<button
					on:click={() => {
						showModal = true
					}}
				>
					<img src="https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg" alt="test" />
				</button>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 100px;
	}
	img {
		height: 300px;
		width: 300px;
	}
	button {
		all: unset;
		cursor: pointer;
		height: 300px;
		width: 300px;
	}
</style>
