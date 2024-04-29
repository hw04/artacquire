<script>
	import { get } from "svelte/store"
	import { userStore } from "../routes/gallery/store.js"
	import ArtModal from "./ArtModal.svelte"

	let showModal = false

	let clickedImageId
	let artistName
	let artTitle
	let artYear
	let artLocation
	let isInCollection
	let furtherInfoCode
	export let chiInfo
	export let vaInfo

	// Check if art is in user store
	export const checkCollection = (id) => {
		const collection = get(userStore)
		if (collection.length === 0) {
			isInCollection = false
			return false
		}
		if (collection.filter((art) => art.imageId === id).length === 0) {
			isInCollection = false
			return false
		} else isInCollection = true
		return true
	}

	function handleChiClick(image_id, title, date_display, artist_title, gallery_title, id) {
		checkCollection(image_id)
		clickedImageId = image_id
		artTitle = title
		artYear = date_display
		artistName = artist_title
		artLocation = gallery_title
		furtherInfoCode = id
		showModal = true
	}

	function handleVaClick(
		_primaryImageId,
		_primaryTitle,
		_primaryDate,
		_primaryMaker,
		_currentLocation,
		systemNumber
	) {
		checkCollection(_primaryImageId)
		clickedImageId = _primaryImageId
		artTitle = _primaryTitle
		artYear = _primaryDate
		artistName = _primaryMaker.name
		artLocation = `${_currentLocation.displayName}, V & A Museum`
		furtherInfoCode = systemNumber
		showModal = true
	}
	$: console.log(chiInfo, vaInfo)
</script>

{#if chiInfo.length === 0 && vaInfo.length === 0}
	<div class="flex justify-center m-3 mt-20">
		<p class="text-xl font-bold text-center mt-6 mb-6">No results found...</p>
	</div>
{/if}
<div class="grid-parent">
	<ArtModal
		displayAddButton
		bind:showModal
		bind:clickedImageId
		bind:artistName
		bind:artTitle
		bind:artYear
		bind:artLocation
		bind:isInCollection
		bind:furtherInfoCode
	/>
	{#each chiInfo as { image_id, title, artist_title, date_display, gallery_title, id }, i (image_id)}
		<div class="grid-child hover:scale-105">
			<img
				class="rounded-lg"
				src="https://www.artic.edu/iiif/2/{image_id}/full/500,/0/default.jpg"
				alt="{title} by {artist_title}"
				usemap="#{image_id}"
			/>
			<map name={image_id}>
				<area
					class="hover:scale-105"
					tabindex="-1"
					role="button"
					alt="image"
					shape="default"
					on:click={() => {
						handleChiClick(image_id, title, date_display, artist_title, gallery_title, id)
					}}
					on:keydown={() => {
						handleChiClick(image_id, title, date_display, artist_title, gallery_title, id)
					}}
				/>
			</map>
		</div>
	{/each}
	{#each vaInfo as { _primaryImageId, _primaryTitle, _primaryMaker, _primaryDate, _currentLocation, systemNumber }, i (_primaryImageId)}
		<div class="grid-child hover:scale-105">
			<img
				class="rounded-lg"
				src="https://framemark.vam.ac.uk/collections/{_primaryImageId}/full/full/0/default.jpg"
				alt="{_primaryTitle} by {_primaryMaker.name}"
				usemap="#{_primaryImageId}"
			/>
			<map name={_primaryImageId}>
				<area
					class="hover:scale-105"
					tabindex="-1"
					role="button"
					alt="image"
					shape="default"
					on:click={() => {
						handleVaClick(
							_primaryImageId,
							_primaryTitle,
							_primaryDate,
							_primaryMaker,
							_currentLocation,
							systemNumber
						)
					}}
					on:keydown={() => {
						handleVaClick(
							_primaryImageId,
							_primaryTitle,
							_primaryDate,
							_primaryMaker,
							_currentLocation,
							systemNumber
						)
					}}
				/>
			</map>
		</div>
	{/each}
</div>

<style lang="postcss">
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 1em;
		align-content: start;
		align-items: stretch;
		margin: 1em 1em 5em 1em;
		justify-content: center;
		justify-items: stretch;
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

	@media only screen and (min-width: 768px) {
		.grid-parent {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr;
		}
	}
</style>
