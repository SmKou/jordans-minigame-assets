export const units = {
	block: 64,
	tile: this.block / 2,
	half_tile: this.tile / 2,
	half: this.half_tile / 2,
	unit: this.half / 2
}

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
