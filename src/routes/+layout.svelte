<script>
	import { goto } from '$app/navigation'
	import '../app.css'
</script>

<nav>
	<div>
		<button on:click={() => goto('/')}>Home/Logo</button>
		<button on:click={() => goto('/myexhibition')}>My Exhibition</button>
		<button on:click={() => goto('/explore')}>Explore</button>
		<button on:click={() => goto('/about')}>About</button>
	</div>
</nav>

<slot />
