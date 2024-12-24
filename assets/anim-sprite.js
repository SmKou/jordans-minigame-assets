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
const ui = {
	stop: false,
	* fps: 60,
	* then: Date.now(),
	* elapsed: 0
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

/*
 * BUG Frames rotate off canvas
 *
 * Experiment: Performance(setTimeout, requestAnimationFrame)
 * 1. Player-like object: 7 side-frames, 7 back-frames, move(up, down, left, right)
 * 2. High quantity of moving objects: 100
 */

const { block, tile, half_tile, half } = units

const create_container = (caption, props) => function() {
	const container = document.createElement("div")
	container.title = caption
	container.style.position = "relative"
	container.style.width = block + 'px'
	container.style.height = block + 'px'
	for (const prop of Object.keys(props))
		container.style[prop] = props[prop]
	console.log(container)
	return container
}

const create_canvas = (qty, props, init) => function() {
	const { width, height, ...css_props } = props
	const create = (i) => {
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		for (const prop of Object.keys(css_props))
			cvs.style[prop] = css_props[prop]
		init(cvs, i)
		return cvs
	}

	const canvas = []
	for (let i = 0; i < qty; ++i)
		canvas.push(create(i))
	return canvas
}

const deg = [0, 22.5, 45, 67.5]
const trans = [
	{ x: 0, y: 0 },
	{ x: -half / 4, y: -half / 4},
	{ x: -half / 4, y: -half / 2},
	{ x: -half / 4, y: -half / 8}
]

const frames = function(n) {
	const cvs = new OffscreenCanvas(block, block)
	const ctx = cvs.getContext("2d")
	ctx.translate(half_tile, half_tile)
	ctx.rotate(rad(deg[n]))
	ctx.translate(-half_tile, -half_tile)
	ctx.translate(trans[n].x, trans[n].y)

	ctx.fillStyle = '#000'
	ctx.fillRect(half, half, tile, tile)

	return cvs
}

const sample = {
	container: create_container("View positions", { width: block * 4 + 'px' }),
	canvas: create_canvas(4, { width: block, height: block },
		function(cvs, i) { cvs.getContext("2d").drawImage(frames(i), 0, 0) }
	),
	draw: function() {
		return () => {}
	}
}

const contained_canvas_position = {
	container: create_container("Draw each frame to portion of canvas and each frame, move canvas with css position", { overflow: 'hidden' }),
	canvas: create_canvas(1, { width: block * 4, height: block, position: 'absolute' },
		function(cvs) {
			const ctx = cvs.getContext("2d")
			for (let i = 0; i < deg.length; ++i)
				ctx.drawImage(frames(i), block * i, 0)
		}
	),
	// draw: function(arr) {
	// 	const ui = {
	// 		fps_interval: 900,
	// 		frame: 0
	// 	}
 //
	// 	const cvs = arr[0]
 //
	// 	const draw = function() {
	// 		cvs.style.left = `${-block * ui.frame}px`
	// 		ui.fps_interval = ui.frame ? 300 : 900
	// 		ui.frame++
	// 		if (ui.frame >= deg.length)
	// 			ui.frame = 0
	// 			setTimeout(draw, ui.fps_interval)
	// 	}
	// 	return draw
	// }
	draw: function(arr) {
		const ui = {
			fps_interval: 900,
			frame: 0,
			then: Date.now(),
			elapsed: 0
		}

		const cvs = arr[0]

		const draw = function() {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				cvs.style.left = `${-block * ui.frame}px`
				ui.fps_interval = ui.frame ? 300 : 900
				ui.frame++
				if (ui.frame >= deg.length)
					ui.frame = 0
			}
		}
		return draw
	}
}

const canvas_redraw = {
	container: create_container("Draw each frame", {}),
	canvas: create_canvas(1, { width: block, height: block }, (cvs) => cvs),
	// draw: function(arr) {
	// 	const ui = {
	// 		fps_interval: 900,
	// 		frame: 0
	// 	}
 //
	// 	const ctx = arr[0].getContext("2d")
 //
	// 	const draw = () => {
	// 		ctx.clearRect(0, 0, block, block)
	// 		ctx.drawImage(frames(ui.frame), 0, 0)
	// 		ui.fps_interval = ui.frame ? 300 : 900
	// 		ui.frame++
	// 		if (ui.frame >= deg.length)
	// 			ui.frame = 0
	// 			setTimeout(draw, ui.fps_interval)
	// 	}
	// 	return draw
	// }
	draw: function(arr) {
		const ui = {
			fps_interval: 900,
			frame: 0,
			then: Date.now(),
			elapsed: 0
		}

		const ctx = arr[0].getContext("2d")

		const draw = () => {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				ctx.clearRect(0, 0, block, block)
				ctx.drawImage(frames(ui.frame), 0, 0)
				ui.fps_interval = ui.frame ? 300 : 900
				ui.frame++
				if (ui.frame >= deg.length)
					ui.frame = 0
			}
		}
		return draw
	}
}

const cycle_frame_layer = {
	container: create_container("Draw canvas for each frame, and each frame, change order with z-index", {}),
	canvas: create_canvas(deg.length, { width: block, height: block, position: 'absolute', background: 'white' },
		function(cvs, i) {
			const ctx = cvs.getContext("2d")
			ctx.drawImage(frames(i), 0, 0)
		}
	),
	// draw: function(arr) {
	// 	const ui = {
	// 		fps_interval: 900,
	// 		frame: 0,
	// 		z: 1
	// 	}
 //
	// 	const draw = () => {
	// 		arr[ui.frame].style.zIndex = ui.z
	// 		ui.fps_interval = ui.frame ? 300 : 900
	// 		ui.z++
	// 		ui.frame++
	// 		if (ui.frame >= deg.length)
	// 			ui.frame = 0
	// 		setTimeout(draw, ui.fps_interval)
	// 	}
	// 	return draw
	// }
	draw: function(arr) {
		const ui = {
			fps_interval: 900,
			frame: 0,
			then: Date.now(),
			elapsed: 0,
			z: 1
		}

		const draw = () => {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				arr[ui.frame].style.zIndex = ui.z
				ui.fps_interval = ui.frame ? 300 : 900
				ui.z++
				ui.frame++
				if (ui.frame >= deg.length)
					ui.frame = 0
			}
		}
		return draw
	}
}

const generate = (main) => {
	const grid = create_grid_container()
	const methods = [contained_canvas_position, canvas_redraw, cycle_frame_layer, sample]
	const run_proc = []
	for (const {container, canvas, draw} of methods) {
		const ctnr_elm = container()
		const cvs_elms = canvas()
		ctnr_elm.append(...cvs_elms)
		grid.append(ctnr_elm)
		run_proc.push(draw(cvs_elms))
	}
	main.append(grid)
	return run_proc
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
