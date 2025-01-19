export const sizes = {
    block: 32,
    tile: 16,
    half_tile: 8,
    half: 4,
    unit: 2,
    point: 1
}

export const rad = (deg) => deg * Math.PI / 180

export const create_grid_container = (props) => {
	const container = document.createElement("section")
	container.style.width = "100%"
	container.style.marginBottom = `${sizes.tile}px`
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
	container.style.width = width ? width + 'px' : sizes.block + 'px'
	container.style.height = height ? height + 'px' : sizes.block + 'px'
	for (const prop of Object.keys(props))
		container.style[prop] = props[prop]
	return container
}

export const create_canvas = (qty, props, init) => function() {
	const { width, height, ...css_props } = props
	const canvas = []
	const create = idx => {
		const cvs = document.createElement("canvas")
		cvs.width = width ? width : sizes.block
		cvs.height = height ? height : sizes.block
		for (const prop of Object.keys(css_props))
			cvs.style[prop] = css_props[prop]
		init(cvs, idx)
		return cvs
	}
	for (let i = 0; i < qty; ++i)
		canvas.push(create(i))
	return canvas
}

export const eyes = {
    neutral: (ctx, xoff = 0, yoff = 0) => {},
    scared: (ctx, xoff = 0, yoff = 0) => {},
    panicked: (ctx, xoff = 0, yoff = 0) => {},
    ease: (ctx, xoff = 0, yoff = 0) => {}, // amused-content
    bothered: (ctx, xoff = 0, yoff = 0) => {},
    confused: (ctx, xoff = 0, yoff = 0) => {},
    down: (ctx, xoff = 0, yoff = 0) => {}, // sad-lonely
    happy: (ctx, xoff = 0, yoff = 0) => {},
    angry: (ctx, xoff = 0, yoff = 0) => {},
    tired: (ctx, xoff = 0, yoff = 0) => {}
}