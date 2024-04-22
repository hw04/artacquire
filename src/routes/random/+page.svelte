<script>
	import { page } from "$app/stores"

	export let data
	$: url = $page.url
	$: randomArt = data.records
</script>

<div class="random">
	{#await randomArt then data}
		{#each data as { _primaryImageId }}
			<img
				src="https://framemark.vam.ac.uk/collections/{_primaryImageId}/full/full/0/default.jpg"
			/>
		{/each}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.random {
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
		margin-top: 1rem;
		padding-top: 2%;
	}
	img {
		height: auto;
		width: 100%;
	}
	@media only screen and (min-width: 768px) {
		img {
			height: auto;
			width: 30%;
		}
	}
</style>
