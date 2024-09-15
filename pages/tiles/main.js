const dim = 64
const tile = dim / 2
const unit = tile / 8

const square = () => {
	const squ = document.getElementById("squares")
	const ctx = squ.getContext("2d")

	ctx.strokeStyle("#000")

	const size = [unit, unit / 2, unit /4, unit / 2]

	for (const s of size) {
		const x = Math.random() * (dim - unit * 2) + unit
		const y = Math.random() * (dim - unit * 2) + unit
		ctx.strokeRect(x, y, s, s)
	}
}

square()
