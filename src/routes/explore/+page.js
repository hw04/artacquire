export const load = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get("page") ?? 1)
	console.log(page)
	const fetchArt = async () => {
		const response = await fetch(
			`https://api.artic.edu/api/v1/artworks?page=${page}&fields=title,artist_display,date_display,image_id`
		)
		const artworkData = await response.json()
		return artworkData
	}

	//&query[exists][image_id]=true[term][image_id]=false
	return fetchArt()
}
