<script>
	import { goto } from "$app/navigation"
	import "../app.css"
</script>

<nav class="navbar">
	<button on:click={() => goto("/")}>Home/Logo</button>
	<button on:click={() => goto("/explore")}>Explore</button>
	<button on:click={() => goto("/myexhibition")}>My Exhibition</button>
	<button on:click={() => goto("/random", { invalidateAll: true })}>Random</button>
	<button on:click={() => goto("/about")}>About</button>
</nav>

<slot />

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
	}
</style>
