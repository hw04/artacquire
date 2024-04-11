export const load = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get("page") ?? 1)
	const fetchArt = async () => {
		const response = await fetch(
			`https://api.artic.edu/api/v1/artworks/search?page=${page}&limit=12&fields=title,artist_title,date_display,image_id&query[bool][must][][exists][field]=artist_title&query[bool][must][][exists][field]=image_id&query[bool][must][][exists][field]=title`
		)
		const artworkData = await response.json()
		return artworkData
	}

	//&query[exists][image_id]=true[term][image_id]=false
	return fetchArt()
}
