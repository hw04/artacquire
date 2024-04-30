<script>
	import { userStore } from "../routes/gallery/store"

	export let showModal // boolean
	export let clickedImageId
	export let artistName
	export let artTitle
	export let artYear
	export let artLocation
	export let furtherInfoCode
	export let displayAddButton = false
	export let displayRemoveButton = false
	export let isInCollection = false
	let dialog // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal()

	// Adding art to personal collection
	const addToCollection = () => {
		const selectedArt = {
			title: artTitle,
			artist: artistName,
			year: artYear,
			imageId: clickedImageId,
			location: artLocation,
			forFurtherInfo: furtherInfoCode
		}
		userStore.update((currentArt) => {
			return [selectedArt, ...currentArt]
		})
		isInCollection = true
	}

	// Removing art from personal collection
	const removeFromCollection = (clickedImageId) => {
		userStore.update((currentArt) => {
			return currentArt.filter((artwork) => artwork.imageId != clickedImageId)
		})
		dialog.close()
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class="modal" bind:this={dialog} on:close={() => (showModal = false)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal-box">
		{#if clickedImageId && clickedImageId.length === 10}
			<img
				class="relative top-0 right-0 bottom-0 left-0"
				src="https://framemark.vam.ac.uk/collections/{clickedImageId}/full/full/0/default.jpg"
				alt="{artTitle} by {artistName}"
			/>
		{:else if clickedImageId}
			<img
				src="https://www.artic.edu/iiif/2/{clickedImageId}/full/843,/0/default.jpg"
				alt="{artTitle} by {artistName}"
			/>
		{/if}

		<h2 class="font-bold text-lg text-center mb-5">{artTitle || "Unknown title"}</h2>
		<ul>
			<li class="text-center">
				<h3 class="font-bold text-md text-center">
					{artistName === "Unknown" ? "Unknown artist" : artistName || "Unknown artist"}
				</h3>
			</li>
			<li class="text-center">{artYear || "Unknown year"}</li>
			{#if artLocation && clickedImageId && clickedImageId.length != 10}
				<li class="text-center mb-5">{artLocation}, Art Institute of Chicago</li>
			{:else if !artLocation && clickedImageId && clickedImageId.length != 10}
				<li class="text-center mb-5">Art Institute of Chicago</li>
			{:else if artLocation && clickedImageId}
				<li class="text-center mb-5">{artLocation}</li>
			{/if}
		</ul>
		{#if displayAddButton}
			<button
				class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
				disabled={isInCollection}
				on:click={addToCollection}>Add to collection</button
			>
		{:else if displayRemoveButton}
			<button
				class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
				on:click={() => removeFromCollection(clickedImageId)}>Remove?</button
			>
		{/if}

		{#if furtherInfoCode}
			{#if clickedImageId && clickedImageId.length === 10}
				<a
					class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
					target="_blank"
					rel="noopener noreferrer"
					href="https://collections.vam.ac.uk/item/{furtherInfoCode}">Find out more</a
				>
			{:else if clickedImageId && clickedImageId.length != 10}
				<a
					class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.artic.edu/artworks/{furtherInfoCode}">Find out more</a
				>
			{/if}
		{/if}
		<!-- svelte-ignore a11y-autofocus -->
		<button
			class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg float-right"
			autofocus
			on:click={() => dialog.close()}>Close</button
		>
	</div>
</dialog>

<style lang="postcss">
	img {
		width: 100%;
	}
</style>
