<script>
	import { fade, scale, slide } from "svelte/transition"
	import { userStore } from "./store"
	import ArtModal from "../../lib/ArtModal.svelte"

	let showModal = false

	let clickedImageId
	let artistName
	let artTitle
	let artYear
	let artLocation
	let furtherInfoCode

	function handleClick(title, artist, year, imageId, location, forFurtherInfo) {
		clickedImageId = imageId
		artTitle = title
		artYear = year
		artistName = artist
		artLocation = location
		furtherInfoCode = forFurtherInfo
		showModal = true
	}
</script>

<h1 class="text-3xl font-bold text-center mt-6 mb-6">Your Gallery</h1>
{#if $userStore.length !== 0}
	<div class="grid-parent">
		<ArtModal
			bind:showModal
			bind:clickedImageId
			bind:artistName
			bind:artTitle
			bind:artYear
			bind:artLocation
			bind:furtherInfoCode
			displayAddButton={false}
			displayRemoveButton={true}
		/>
		{#each $userStore as { title, artist, year, imageId, location, forFurtherInfo }, i (imageId)}
			<div class="grid-child hover:scale-105" transition:scale>
				{#if imageId.length === 10}
					<img
						class="rounded-lg hover:scale-105"
						src="https://framemark.vam.ac.uk/collections/{imageId}/full/full/0/default.jpg"
						alt="{title} by {artist}"
						usemap="#{imageId}"
					/>
					<map name={imageId}>
						<area
							class="hover:scale-105"
							tabindex="-1"
							role="button"
							alt="image"
							shape="default"
							on:click={() => {
								handleClick(title, artist, year, imageId, location, forFurtherInfo)
							}}
							on:keydown={() => {
								handleClick(title, artist, year, imageId, location, forFurtherInfo)
							}}
						/>
					</map>
				{:else}
					<img
						class="rounded-lg hover:scale-105"
						src="https://www.artic.edu/iiif/2/{imageId}/full/843,/0/default.jpg"
						alt="{title} by {artist}"
						usemap="#{imageId}"
					/>
					<map name={imageId}>
						<area
							class="hover:scale-105"
							tabindex="-1"
							role="button"
							alt="image"
							shape="default"
							on:click={() => {
								handleClick(title, artist, year, imageId, location, forFurtherInfo)
							}}
							on:keydown={() => {
								handleClick(title, artist, year, imageId, location, forFurtherInfo)
							}}
						/>
					</map>
				{/if}
				<button class="button-image" data-sveltekit-prefetch> </button>
			</div>
		{/each}
	</div>
{:else}
	<h2 class="text-2xl font-bold text-center mt-6 mb-6">
		Your collection is empty. Why not add something?
	</h2>
{/if}

<style>
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 1em;
		align-content: start;
		align-items: stretch;
		margin: 1em 1em 1em 1em;
		justify-content: center;
		justify-items: center;
	}
	.grid-child {
		max-height: 95%;
		max-width: 95%;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	h2 {
		margin-top: 10em;
	}
	@media only screen and (min-width: 768px) {
		.grid-parent {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr;
			gap: 1em;
		}
	}
</style>
