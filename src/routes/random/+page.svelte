<script>
	import { page } from "$app/stores"
	import { base } from "$app/paths"
	import { goto } from "$app/navigation"
	import { get } from "svelte/store"
	import { userStore } from "../gallery/store.js"
	import ArtModal from "../../lib/ArtModal.svelte"

	export let data
	let showModal = false
	let isInCollection

	$: url = $page.url
	$: randomArt = data.records
	$: clickedImageId = data.records[0]._primaryImageId
	$: artistName = data.records[0]._primaryMaker.name
	$: artTitle = data.records[0]._primaryTitle
	$: artYear = data.records[0]._primaryDate
	$: artLocation = `${data.records[0]._currentLocation.displayName}, V&A museum`
	$: furtherInfoCode = data.records[0].systemNumber

	// Check if art is in store
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

	function handleClick(_primaryImageId) {
		checkCollection(_primaryImageId)
		showModal = true
	}
</script>

<h1 class="text-3xl font-bold text-center mt-6 mb-6">Random...</h1>

<div class="random-parent">
	<ArtModal
		displayAddButton
		bind:showModal
		bind:artTitle
		bind:clickedImageId
		bind:artistName
		bind:artYear
		bind:artLocation
		bind:isInCollection
		bind:furtherInfoCode
	/>
	{#each randomArt as { _primaryImageId, _primaryTitle, _primaryMaker, _primaryDate, _currentLocation, systemNumber }}
		<img
			class="rounded-lg hover:scale-105"
			src="https://framemark.vam.ac.uk/collections/{_primaryImageId}/full/full/0/default.jpg"
			alt="{artTitle} by {artistName}"
			usemap="#random"
		/>
		<map name="random"
			><area
				class="hover:scale-105"
				tabindex="-1"
				role="button"
				alt="image"
				shape="default"
				on:click={() => {
					handleClick(_primaryImageId)
				}}
				on:keydown={() => {
					handleClick(_primaryImageId)
				}}
			/></map
		>
		<button class="btn btn-primary" on:click={() => goto(`${base}/random`, { invalidateAll: true })}
			>Random?</button
		>
	{/each}
</div>

<style>
	.random-parent {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		gap: 5px;
		margin-top: 1em;
		justify-items: center;
		justify-content: center;
	}
	img {
		height: auto;
		width: 80%;
	}
	@media only screen and (min-width: 768px) {
		img {
			height: auto;
			width: 20%;
		}
	}
</style>
