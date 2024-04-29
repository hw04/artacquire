<script>
	import { base } from "$app/paths"
	import { goto } from "$app/navigation"
	import "../app.css"
</script>

<div class="navbar bg-base-300">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><button on:click={() => goto(`${base}/explore`)}>Explore</button></li>
				<li><button on:click={() => goto(`${base}/gallery`)}>Gallery</button></li>
				<li>
					<button on:click={() => goto(`${base}/random`, { invalidateAll: true })}>Random</button>
				</li>
				<li><button on:click={() => goto(`${base}/about`)}>About</button></li>
			</ul>
		</div>
		<a class="btn btn-ghost text-xl" href="/">ArtAcquire</a>
	</div>
	<div class="navbar-end hidden lg:flex space-x-2">
		<button class="btn btn-primary" on:click={() => goto(`${base}/explore`)}>Explore</button>
		<button class="btn btn-primary" on:click={() => goto(`${base}/gallery`)}>Gallery</button>
		<button class="btn btn-primary" on:click={() => goto(`${base}/random`, { invalidateAll: true })}
			>Random</button
		>
		<button class="btn btn-primary" on:click={() => goto(`${base}/about`)}>About</button>
	</div>
</div>

<slot />

<style lang="postcss">
	.navbar {
		display: flex;
		justify-content: space-between;
	}
</style>
