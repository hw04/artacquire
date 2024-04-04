<script>
	import { page } from '$app/stores'
	console.log($page.params, 'page.params')
	const slugArray = $page.params.slug.split('/')
</script>

{#if slugArray.length === 1 && slugArray[0] !== ''}
	<h1>Viewing page for level A{slugArray[0]}</h1>
{:else if slugArray.length === 2}
	<h1>Viewing page for level A{slugArray[0]}, sub-level B{slugArray[1]}</h1>
{:else}
	<h1>Viewing base page</h1>
{/if}
