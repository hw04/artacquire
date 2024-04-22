<h1>Your collection</h1>

<div class="grid-parent">
	<div class="grid-child">
		<button>Previous page</button>
	</div>
	<div class="grid-child"><slot /></div>

	<div class="grid-child">
		<button>Next page</button>
	</div>
</div>

<style>
	.grid-parent {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
	}
	.grid-child {
		text-align: center;
	}
</style>
