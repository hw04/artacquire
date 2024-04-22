import { persisted } from "svelte-persisted-store"

const userExhibition = persisted([{ title: "test", artist: "Picasso" }])

export default userExhibition
