<script>
	export let showModal // boolean
	export let clickedImageId
	export let artistName
	export let artTitle
	export let artYear

	let dialog // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<img src="https://www.artic.edu/iiif/2/{clickedImageId}/full/843,/0/default.jpg" alt="test" />
		<h2>Title: {artTitle}</h2>
		<p>Artist: {artistName}</p>
		<p>Year: {artYear}</p>
		<button>Add to my collection</button>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>Close</button>
	</div>
</dialog>

<style>
	img {
		width: 100%;
		height: auto;
	}
	dialog {
		max-width: 32em;
		border: none;
		padding: 0;
		height: auto;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
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
