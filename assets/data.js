const block = 64
const tile = block / 2
const half_tile = tile / 2
const half = half_tile / 2
const unit = half / 2

export const units = { block, tile, half_tile, half, unit }

export const rad = (deg) => deg * Math.PI / 180

export const create_grid_container = () => {
	const container = document.createElement("section")
	container.style.width = "100%"
	container.style.marginBottom = `${tile}px`
	container.style.display = "flex"
	container.style.flexWrap = "wrap"
	container.style.alignItems = "center"
	return container
}

export const create_containers = (content) => {
	const frag = new DocumentFragment()
	for (const container of content)
		frag.append(container)
	return frag
}
