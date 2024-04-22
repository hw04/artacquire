<script>
	export let showModal // boolean
	export let clickedImageId
	export let artistName
	export let artTitle
	export let artYear

	let dialog // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal()

	function addToCollection() {}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => {
		dialog.close()
	}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div>
		{#if clickedImageId && clickedImageId.length === 10}
			<img
				src="https://framemark.vam.ac.uk/collections/{clickedImageId}/full/full/0/default.jpg"
				alt="{artTitle} by {artistName}"
			/>
		{:else if clickedImageId}
			<img
				src="https://www.artic.edu/iiif/2/{clickedImageId}/full/843,/0/default.jpg"
				alt="{artTitle} by {artistName}"
			/>{/if}

		<h2>{artTitle}</h2>
		<h3>{artistName}</h3>
		<h4>{artYear}</h4>
		<button>Add to my collection</button>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>Close</button>
	</div>
</dialog>

<style>
	img {
		width: 90%;
	}
	dialog {
		border: none;
		padding: 0;
		max-width: 32em;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	div {
		padding: 1em;
		text-align: center;
	}
	dialog[open] {
		animation: zoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: inline-block;
		vertical-align: baseline;
	}
</style>
