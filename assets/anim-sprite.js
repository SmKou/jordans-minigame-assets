import { units, rad, create_grid_container as container } from 'data.js'

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

const create_fig = () => {
	const container = document.createElement("figure")
	container.style.position = "relative"
	container.style.width = `${units.block * 2}px`
	container.style.height = `${units.block * 2}px`
	return container
}

const add_caption = (fig, txt, mode = true) => {
	const figcaption = document.createElement("figcaption")
	const mode = mode ? "settimeout" : "requestanimationframe"
	figcaption.append(document.createTextNode(`${txt}: ${mode}`))
	fig.append(figcaption)
	return fig
}

// "Draw each frame to portion of canvas and each frame, move canvas with css position: "
const contained_canvas_position = () => {

	const create_fig = (is_st = true) => {


		const cvs = document.createElement("canvas")
		cvs.width = units.block * 8
		cvs.height = units.block * 2
		cvs.style.position = "absolute"

		const ctx = cvs.getContext("2d")

		const frame = (deg) => {
			const unit = units.unit
			const cvs = new OffscreenCanvas(units.block, units.block)
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
			ctx.fillStyle = "#000"
			ctx.fillRect(unit, unit, 2 * unit, 2 * unit)
			return cvs
		}

		for (let i = 0; i < deg.length; ++i)
			ctx.drawImage(frame(deg[0]), units.block * i, 0)
		container.append(cvs)



		return container
	}

	const draw_st = () => {
		let frame = 0
		const change_frame = () => {
			cvs.style.left = `${-(units.block * 2) * frame}px`
			const delay = frame ? 300 : 900
			frame++
			if (frame >= deg.length)
				frame = 0
			setTimeout(change_frame, delay)
		}
		return change_frame
	}

	const ui = { fps: 60, then: Date.now(), elapsed: 0, frame: 0 }
	ui.fps_interval = 900 // norm: 1000 / ui.fps
	ui.start_time = ui.then

	const draw_raf = () => {
		requestAnimationFrame(draw_raf)
		ui.now = Date.now()
		ui.elapsed = ui.now - ui.then
		if (ui.elapsed > ui.fps_interval) {
			ui.then = ui.now - (ui.elapsed % ui.fps_interval)
			cvs.style.left = `${-(units.block * 2) * frame}px`
			ui.fps_interval = ui.frame ? 300 : 900
			ui.frame++
			if (ui.frame >= deg.length)
				ui.frame = 0
		}
	}

	return { container: create_fig, draw: { st: draw_st, raf: draw_raf } }
}

const canvas_redraw = () => {
	const create_fig = (is_st = true) => {

	}
	const container = document.createElement("figure")
	container.style.width = `${units.block * 2}px`
	container.style.height = `${units.block * 2}px`

	const cvs = document.createElement("canvas")
	cvs.width = units.block * 2
	cvs.height = units.block * 2
	container.append(cvs)

	const figcaption = document.createElement("figcaption")
	figcaption.append(document.createTextNode("Draw each frame"))
}


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

const method_2 = {
	init() {
		const dim = block * 2
		const ctn = document.createElement("div")
		ctx.style.width = dim + 'px'
		ctn.style.height = dim + 'px'
		const cvs = document.createElement("canvas")
		cvs.width = dim
		cvs.height = dim
		ctn.append(cvs)
		return ctn
	},
	draw(cvs, ctx = cvs.getContext("2d")) {
		let frame = 0
		const change_frame = function() {
			const cvs = frames(frame)
			ctx.clearRect(0, 0, block, block)
			ctx,drawImage(ctx, 0, 0)
			const delay = frame ? 300 : 900
			frame++
			if (frame >= deg.length)
				frame = 0
			setTimeout(change_frame, delay)
		}
		return change_frame
	}
}

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

const method_3 = {
	init() {
		const dim = block * 2
		const ctn = document.createElement("div")
		ctn.style.width = dim + 'px'
		ctn.style.height = dim + 'px'
		ctn.id = "anim-exp-3"

		for (let i = 0; i < deg.length; ++i) {
			const cvs = document.createElement("canvas")
			cvs.width = dim
			cvs.height = dim
			cvs.className = 'frame-' + i

			const ctx = cvs.getContext("2d")
			ctx.drawImage(frames(i), 0, 0)

			ctn.append(cvs)
		}
	},
	draw() {
		let frame = 0
		let z = 1
		const change_frame = () => {
			document.querySelector("#anim-exp-3 canvas.frame-" + frame).style.zIndex = z
			const delay = frame ? 300 : 900
			z++
			frame++
			if (frame >= deg.length)
				frame = 0
			setTimeout(change_frame, delay)
		}
		return change_frame
	}
}

export default const methods = [
	method_1,
	method_2,
	method_3
]

/*
 * Slow down requestAnimationFrame
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

 * Issues with requestAnimationFrame:
	Unknown frame rate
	Because the callback is synced to the display refresh rate the frame rate will vary from device to device. You should use the time argument to determine the rate and adjust your animation as needed.

	Forced Pause
	Like other timers requestAnimationFrame will stop calling the callback when the page is hidden. Eg client switches Tabs, another window hides the browser window.

	Unsynced
	It is possible for the client to setup the GPU drivers and browser to ignore the display refresh rate. You can not detect this directly.

	Render time
	requestAnimationFrame assumes the time the callback returns is the frame that is being animated. It will not call next frame until after the next vSync

	Taking too long to render a frame will cause requestAnimationFrame to skip frames resulting in Jank.

 * 60 fps = 16.66...ms (1000 / 60)
 */
