import { redirect } from "@sveltejs/kit"
export const load = async function load({ fetch, url }) {
	const { searchParams } = url
	const page = searchParams.get("page")
	const q = searchParams.get("q") ?? ""

	const sortBy = searchParams.get("sort") ?? ""
	const order = searchParams.get("order") ?? "desc"

	let chiSortValue = "_score"
	let vaSortValue = "fields_populated"

	if (!page || page <= 0) {
		redirect(303, "/explore?page=1")
	}

	switch (sortBy) {
		case "artist":
			chiSortValue = "artist_id"
			vaSortValue = "artist"
			break
		case "date":
			chiSortValue = "date_end"
			vaSortValue = "date"
			break
	}
	const fetchChiArt = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${q}&page=${page}&limit=4&sort[${chiSortValue}]=${order}&fields=title,artist_title,date_display,image_id,gallery_title,id&query[bool][must][][exists][field]=artist_title&query[bool][must][][exists][field]=image_id&query[bool][must][][exists][field]=title`)

	const chiData = await fetchChiArt.json()

	const fetchVaArt = await fetch(
		`https://api.vam.ac.uk/v2/objects/search?q=${q}&page=${page}&page_size=4&order_by=${vaSortValue}&order_sort=${order}&images_exist=true&images=true&on_display_at=all&data_restrict=descriptive_only`
	)

	const vaData = await fetchVaArt.json()

	return { chiData, vaData, page, q, sortBy, order }
}
