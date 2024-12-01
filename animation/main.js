/*
 * Animation: rolling square
 * 32 x 32
 *
 * How to animate:
 *
 * 1. Contained canvas positioning
 * Draw each frame to portion of canvas
 * Move canvas with transform each frame
 *
 * 2. Canvas redraw
 * Draw each frame
 *
 * 3. Cycle frames visibility
 * Draw canvas for each frame
 * Change order with z-index each frame
 */

const block = 64
const unit = block / 4

const init = (ctn) => {
	const cvs = document.createElement("canvas")
	cvs.width = ctn.clientWidth * 4
	cvs.height = ctn.clientHeight
	cvs.style.position = "absolute"

	const ctx = cvs.getContext("2d")

	const rad = (deg) => deg * Math.PI / 180

	const frame = (deg = 0) => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")

		// ctx.fillStyle = '#666'
		// ctx.fillRect(unit, 3 * unit - unit / 4, 2 * unit, unit / 4)

		ctx.translate(2 * unit, 2 * unit)
		ctx.rotate(rad(deg))
		ctx.translate(-2 * unit, -2 * unit)

		if (deg === 22.5)
			ctx.translate(-unit / 4, -unit / 8)

		if (deg === 45)
			ctx.translate(-unit / 4, -unit / 4)

		if (deg === 67.5)
			ctx.translate(-unit / 4, -unit / 16)

		ctx.fillStyle = '#000'
		ctx.fillRect(unit, unit, 2 * unit, 2 * unit)

		return cvs
	}

	ctx.drawImage(frame(0), 0, 0)
	ctx.drawImage(frame(22.5), block, 0)
	ctx.drawImage(frame(45), block * 2, 0)
	ctx.drawImage(frame(67.5), block * 3, 0)

	ctn.append(cvs)
	return cvs
}

const exp_1 = init(document.getElementById("exp-1"))

let frame = 0
const change_frame = () => {
	exp_1.style.left = -1 * 64 * frame + "px"
	const delay = frame ? 300 : 900
	frame++
	if (frame > 3)
		frame = 0
	setTimeout(change_frame, delay)
}
change_frame()


