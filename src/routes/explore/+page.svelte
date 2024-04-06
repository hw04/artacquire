<script>
	async function getArt() {
		const response = await fetch('https://api.artic.edu/api/v1/artworks')
		const artworks = await response.json()
		return artworks
	}
</script>

<h1>Explore artwork</h1>

<div class="container">
	{#await getArt()}
		<p>Loading art...</p>
	{:then art}
		<div class="grid">
			{#each art.data as { image_id }}
				<div>
					<img src="https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg" alt="test" />
				</div>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<!-- // import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
const art = await fetch(
 		'https://api.vam.ac.uk/v2/objects/search?images_exist=true&order_by=artist'
 	)
 	return json(art)
 } -->

<!-- 'https://api.vam.ac.uk/v2/objects/search?images_exist=true&order_by=artist' -->

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	img {
		height: 300px;
		width: 300px;
	}
</style>
