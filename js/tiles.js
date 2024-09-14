const squares = (unit) => {
	const cvs = new OffscreenCanvas(unit * 8, unit * 8)
	const ctx = cvs.getContext("2d")

	ctx.strokeStyle = "#000"

	const x = []
	const y = []
	const size = []

	for (let i = 0; i < 5; ++i) {
		x.push(Math.random() * (cvs.width - unit * 2) + unit)
		y.push(Math.random() * (cvs.height - unit * 2) + unit)
		size.push(Math.random() * unit + (unit / 2))
	}

	for (let i = 0; i < x.length; ++i) {
		ctx.strokeRect(x[i], y[i], size[i], size[i])
	}
	return cvs
}

const tiles = {
	squares
}

export default tiles
