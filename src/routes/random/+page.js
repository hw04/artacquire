export const load = async ({ fetch, url }) => {
	const fetchRandom = await fetch(
		`https://api.vam.ac.uk/v2/objects/search?images_exist=true&page_size=1&images=true&random=1`
	)
	const random = await fetchRandom.json()
	return random
}
