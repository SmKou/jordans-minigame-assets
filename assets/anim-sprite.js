import { units, rad, create_grid_container } from './data.js'

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
 *
 * Achieve 60 fps with requestAnimationFrame: fps_interval = 1000 / fps
 *
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
 */

const deg = [0, 22.5, 45, 67.5]

const { block, unit } = units
const trans = [
	{ x: 0, y: 0 },
	{ x: -unit / 4, y: -unit / 8},
	{ x: -unit / 4, y: -unit / 4},
	{ x: -unit / 4, y: -unit / 16}
]

const create_container = (txt) => {
	const container = document.createElement("div")
	container.title = txt
	container.style.position = "relative"
	container.style.width = `${units.block * 2}px`
	container.style.height = `${units.block * 2}px`
	container.style.overflow = "hidden"
	return container
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

const contained_canvas_position = () => {
	const container = create_container("Draw each frame to portion of canvas and each frame, move canvas with css position")



	const add_canvas = (fig) => {
		const cvs = document.createElement("canvas")
		cvs.width = units.block * 8
		cvs.height = units.block * 2
		cvs.style.position = "absolute"

		const ctx = cvs.getContext("2d")

		const frame = (deg) => {

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
			ctx.fillStyle = "#000"
			ctx.fillRect(unit, unit, 2 * unit, 2 * unit)
			return cvs
		}

		for (let i = 0; i < deg.length; ++i)
			ctx.drawImage(frame(deg[0]), block * i, 0)

		fig.append(cvs)
		return { fig, cvs }
	}

	const add_draw = (cvs, mode) => {
		const ui = {
			fps_interval: 900,
			frame: 0
		}

		const draw_proc = () => {
			cvs.style.left = `${-(units.block * 2) * ui.frame}px`
			ui.fps_interval = ui.frame ? 300 : 900
			ui.frame++
			if (ui.frame >= deg.length)
				ui.frame = 0
		}

		if (mode) {
			const draw = () => {
				draw_proc()
				setTimeout(draw, delay)
			}
			return draw
		}

		ui.then = Date.now()
		ui.elapsed = 0

		const draw = () => {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				draw_proc()
			}
		}
		return draw
	}

	const st = add_canvas(create_container())
	const raf = add_canvas(create_container())

	return [
		{ container: add_caption(st.fig, caption), draw: add_draw(st.cvs) },
		{ container: add_caption(raf.fig, caption, false), draw: add_draw(raf.cvs, false) }
	]
}

const canvas_redraw = () => {
	const caption = "Draw each frame"

	const add_canvas = (fig) => {
		const cvs = document.createElement("canvas")
		cvs.width = units.block * 2
		cvs.height = units.block * 2
		fig.append(cvs)
		return { fig, cvs }
	}

	const add_draw = (cvs, mode = true) => {

		const ctx = cvs.getContext("2d")

		const ui = {
			fps_interval: 900,
			frame: 0
		}

		const draw_proc = () => {
			const next_frame = frames(ui.frame)
			ctx.clearRect(0, 0, block, block)
			ctx.drawImage(next_frame, 0, 0)
			ui.fps_interval = ui.frame ? 300 : 900
			ui.frame++
			if (ui.frame >= deg.length)
				ui.frame = 0
		}

		if (mode) {
			const draw = () => {
				draw_proc()
				setTimeout(draw, ui.fps_interval)
			}
			return draw
		}

		ui.then = Date.now()
		ui.elapsed = 0

		const draw = () => {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				draw_proc()
			}
		}
		return draw
	}

	const st = add_canvas(create_container())
	const raf = add_canvas(create_container())

	return [
		{ container: add_caption(st.fig, caption), draw: add_draw(st.cvs) },
		{ container: add_caption(raf.fig, caption, false), draw: add_draw(raf.cvs, false) }
	]
}

const cycle_frame_layer = () => {
	const caption = "Draw canvas for each frame, and each frame, change order with z-index"

	const add_canvas = (fig, mode = true) => {
		const z_frames = []
		for (let i = 0; i < deg.length; ++i) {
			const cvs = document.createElement("canvas")
			cvs.width = units.block * 2
			cvs.height = units.block * 2
			cvs.className = `frame-${i}`

			const ctx = cvs.getContext("2d")
			ctx.drawImage(frames(i), 0, 0)

			z_frames.push(cvs)
			fig.append(cvs)
		}
		return { fig, z_frames }
	}

	const add_draw = (z_frames, mode = true) => {
		const ui = {
			fps_interval: 900,
			frame: 0,
			z: 1
		}

		const draw_proc = () => {
			z_frames[ui.frame].style.zIndex = ui.z
			ui.fps_interval = ui.frame ? 300 : 900
			ui.z++
			ui.frame++
			if (ui.frame >= deg.length)
				ui.frame = 0
		}

		if (mode) {
			const draw = () => {
				draw_proc()
				setTimeout(draw, ui.fps_interval)
			}
			return draw
		}

		ui.then = Date.now()
		ui.elapsed = 0

		const draw = () => {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				draw_proc()
			}
		}
		return draw
	}

	const st = add_canvas(create_container())
	const raf = add_canvas(create_container(), false)

	return [
		{ container: add_caption(st.fig, caption), draw: add_draw(st.z_frames) },
		{ container: add_caption(raf.fig, caption, false), draw: add_draw(raf.z_frames, false) }
	]
}

const generate = () => {
	const grid = create_grid_container()
	const elms = [
		...contained_canvas_position(),
		...canvas_redraw(),
		...cycle_frame_layer()
	]
	for (const e of elms) {
		const { container, draw } = e
		grid.append(container)
		draw()
	}
	return grid
}

export default generate



 /* Issues with requestAnimationFrame:
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
