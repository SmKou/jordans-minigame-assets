import { block, tile, half_tile, half, unit, rad } from 'data.js'

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

const deg = [0, 22.5, 45, 67.5]
const trans = [
	{ x: 0, y: 0 },
	{ x: -unit / 4, y: -unit / 8},
	{ x: -unit / 4, y: -unit / 4},
	{ x: -unit / 4, y: -unit / 16}
]

const method_1 = {
	init() {
		const ctn = document.createElement("div")
		ctn.style.width = block + 'px'
		ctn.style.height = block + 'px'
		const cvs = document.createElement("canvas")
		cvs.width = block * 4
		cvs.height = block
		cvs.style.position = 'absolute'
		const ctx = cvs.getContext("2d")

		const frame = (deg = 0) => {
			const cvs = new OffscreenCanvas(block, block)
			const ctx = cvs.getContext("2d")

			ctx.translate(2 * unit, 2 * unit)
			ctx.rotate(rad(deg))
			ctx.translate(-2 * unit, -2 * unit)

			switch (deg) {
				case deg[1]:
					ctx.translate(-unit / 4, -unit / 8)
					break;
				case deg[2]:
					ctx.translate(-unit / 4, -unit / 4)
					break;
				case deg[3]:
					ctx.translate(-unit / 4, -unit / 16)
					break;
			}

			ctx.fillStyle = '#000'
			ctx.fillRect(unit, unit, 2 * unit, 2 * unit)

			return cvs
		}

		for (let i = 0; i < deg.length; ++i)
			ctx.drawImage(frame(deg[0]), block * i, 0)

		ctn.append(cvs)
		return ctn
	},
	draw(ctn) {
		let frame = 0
		const change_frame = () => {
			ctn.style.left = -64 * frame + 'px'
			const delay = frame ? 300 : 900
			frame++
			if (frame > 3)
				frame = 0
			setTimeout(change_frame, delay)
		}
		return change_frame
	}
}

const method_2 = {
	init() {
		const [width, height] = [block, block]
		const ctn = document.createElement("div")
		ctx.style.width = width + 'px'
		ctn.style.height = height + 'px'
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		ctn.append(cvs)
		return ctn
	},
	draw(cvs, ctx = cvs.getContext("2d")) {
		const frames = (n) => {
			const cvs = new OffscreenCanvas(block, block)
			const ctx = cvs.getContext("2d")

			ctx.translate(2 * unit, 2 * unit)
			ctx.rotate(rad(deg[n]))
			ctx.translate(-2 * unit, -2 * unit)
			ctx.translate(trans[n].x, trans[n].y)

			ctx.fillStyle = '#000'
			ctx.fillRect(unit, unit, 2 * unit, 2 * unit)

			return cvs
		}

		let frame = 0
		const change_frame = function() {
			const cvs = frames(frame)
			ctx.clearRect(0, 0, block, block)
			ctx,drawImage(ctx, 0, 0)
			const delay = frame ? 300 : 900
			frame++
			if (frame > 3)
				frame = 0
			setTimeout(change_frame, delay)
		}
		return change_frame
	}
}

const method_3 = {
	init() {
		const [width, height] = [block, block]
		const div = document.createElement("div")
		div.style.width = width + 'px'
		div.style.height = height + 'px'

		for (let i = 0; i < deg.length; ++i) {
			const cvs = document.createElement("canvas")
			cvs.width = block * 2
			cvs.height = block * 2
		}
	},
	draw() {}
}

for (let i = 0; i < deg.length; ++i) {
	const cvs = document.createElement("canvas")
	cvs.width = 64
	cvs.height = 64
	cvs.className = "frame-" + i

	const ctx = cvs.getContext("2d")
	ctx.drawImage(frames(i), 0, 0)

	document.getElementById("exp-3").append(cvs)
}

let sframe = 0
let z = 1
const switch_frame = () => {
	document.querySelector("#exp-3 canvas.frame-" + sframe).style.zIndex = z
	const delay = sframe === 0 ? 900 : 300
	z++
	sframe++
	if (sframe > 3)
		sframe = 0
		setTimeout(switch_frame, delay)
}
switch_frame()


	/* Slow down requestAnimationFrame */

	const ui = {
		stop: false,
		fps: 60,
		then: Date.now(),
		elapsed: 0
	}

	ui.fps_interval = 1000 / ui.fps
	ui.start_time = ui.then

	const animate = () => {
		requestAnimationFrame(animate)
		ui.now = Date.now()
		ui.elapsed = ui.now - ui.then
		const { elapsed, now, fps_interval } = ui
		if (elapsed > fps_interval) {
			ui.then = now - (elapsed % fps_interval)
			// draw code
		}
	}
