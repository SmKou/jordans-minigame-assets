const block = 64
const tile = block / 2
const half_tile = tile / 2
const half = half_tile / 2
const unit = half / 2

export const units = { block, tile, half_tile, half, unit }

export const rad = (deg) => deg * Math.PI / 180

export const create_grid_container = (props) => {
	const container = document.createElement("section")
	container.style.width = "100%"
	container.style.marginBottom = `${tile}px`
	container.style.display = "flex"
	container.style.flexWrap = "wrap"
	container.style.alignItems = "center"
    if (props)
        for (const prop of Object.keys(props))
            container.style[prop] = props[prop]
	return container
}

export const create_container = (caption, props) => function() {
	const { width, height, ...css_props } = props
	const container = document.createElement("div")
	container.title = caption
	container.style.position = "relative"
	container.style.width = width ? width + 'px' : block + 'px'
	container.style.height = height ? height + 'px' : block + 'px'
	for (const prop of Object.keys(props))
		container.style[prop] = props[prop]
	return container
}

export const create_canvas = (qty, props, init) => function() {
	const { width, height, ...css_props } = props
	const canvas = []
	const create = idx => {
		const cvs = document.createElement("canvas")
		cvs.width = width ? width : block
		cvs.height = height ? height : block
		for (const prop of Object.keys(css_props))
			cvs.style[prop] = css_props[prop]
		init(cvs, idx)
		return cvs
	}
	for (let i = 0; i < qty; ++i)
		canvas.push(create(i))
	return canvas
}
