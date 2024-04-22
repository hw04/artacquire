export const load = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get("page") ?? 1)
	const q = url.searchParams.get("q") ?? ""
	const sortOrder = url.searchParams.get("sort")
	const fetchChiArt = await fetch(
		`https://api.artic.edu/api/v1/artworks/search?q=${q}&page=${page}&limit=4&fields=title,artist_title,date_display,image_id&query[bool][must][][exists][field]=artist_title&query[bool][must][][exists][field]=image_id&query[bool][must][][exists][field]=title`
	)

	const chiData = await fetchChiArt.json()

	const fetchVaArt = await fetch(
		`https://api.vam.ac.uk/v2/objects/search?q=${q}&images_exist=true&order_sort=asc&page=${page}&page_size=4&images=true&random=1&data_restrict=descriptive_only`
	)

	const vaData = await fetchVaArt.json()

	return { chiData, vaData }
}
