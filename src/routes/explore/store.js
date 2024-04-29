import { persisted } from "svelte-persisted-store"

export const filters = persisted("filterOptions", "")
