<div class="exhibition">
	<aside>
		<nav>
			<ul>
				<li>One</li>
				<li>Two</li>
			</ul>
		</nav>
	</aside>

	<main>
		<slot />
	</main>
</div>

<style>
	.exhibition {
		display: grid;
		gap: 2rem;
		grid-template-columns: 200px 60ch;
		margin-top: 2rem;
		margin-left: 1rem;
	}
</style>
