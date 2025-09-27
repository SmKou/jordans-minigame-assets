/*
 A *spritesheet is a graphic split into even rows and columns. Each row is a series of frames (columns) to depict an animation.
 @param props: {
 width: sprite width,
height: sprite height,
xoff: x-offset of sprite img,
yoff: y-offset for each sprite
}
@params frames: {
[state]: [ fn frame_1(), fn frame_2()..., fn frame_n() ]
}

Note: fn frame_n() returns offscreen canvas
Note: orientation
* | 2 | 1 |
* |-1 | 0 |
* 21: up / N
* 20: left / W
* 10: right / E
* -10: down / S
* based on: "blood types"
* |AB | B |
* | A | O |
* used for
* - gender
* | intersex | female |
* |   male   |  none  |
* - variants
* |   shiny  |  sweet |
* |  regular | legend |
* - path
* |  shadow  |  dark  |
* |   light  |  none  |
*/

class Canvas {
	static block = 32
	static tile = this.block / 2		// 16
	static half_tile = this.tile / 2	// 8
	static half = this.half_tile / 2	// 4
	static unit = this.half / 2			// 2
	static point = this.unit / 2		// 1

	constructor() {}

	static rad(deg) {
		return deg * Math.PI / 180
	}

	section(props = {}, is_grid = true) {
		const section = document.createElement("section")
		section.style.width = "100%"
		section.style.marginBottom = this.tile + "px"
		if (is_grid) {
			section.style.display = "flex"
			section.style.flexWrap = "wrap"
			section.style.alignItems = "center"
		}
		if (props)
			for (const prop of Object.keys(props))
				section.style[prop] = props[prop]
		return section
	}

	container(caption, props) {
		const { width, height, ...cssprops } = props
		const container = document.createElement("div")
		container.title = caption
		container.style.position = "relative"
		container.style.width = width + "px"
		container.style.height = height + "px"
		for (const prop of Object.keys(cssprops))
			container.style[prop] = cssprops[prop]
		return container
	}

	frame(props, draw) {
		const { width, height, ...cssprops } = props
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		if (Object.keys(cssprops).length)
			for (const prop of Object.keys(cssprops))
				cvs.style[prop] = cssprops[prop]
		draw(cvs.getContext("2d"))
		return [cvs]
	}

	frames(props, draw) {
		const { width, height, ...cssprops } = props
		const arr = []
		for (let i = 0; i < draw.length; ++i) {
			const cvs = document.createElement("canvas")
			cvs.width = width
			cvs.height = height
			if (Object.keys(cssprops).length)
				for (const prop of Object.keys(cssprops))
					cvs.style[prop] = cssprops[prop]
			draw[i](cvs.getContext("2d"), i)
			arr.push(cvs)
		}
		return arr
	}

	spritesheet(props, frames) {
		const { width, height, xoff, yoff, xmax } = props
		const states = Object.keys(frames)

		const cvs = document.createElement("canvas")
		cvs.width = (width + 2 * xoff) * xmax
		cvs.height = (height + 2 * yoff) * states.length

		const ctx = cvs.getContext("2d")
		for (let y = 0; y < states.length; ++y) {
			const cols = frames[states[y]]
			for (let x = 0; x < cols.length; ++x)
				ctx.drawImage(
					cols[x],
					(width + 2 * xoff) * x + xoff,
					(height + 2 * yoff) * y + yoff
				)
		}
		return [cvs]
	}

	draw(arr, run_proc, input, fps = 60) {
		let ui = {
			fps_interval: 1000 / fps,
			frame: 0,
			then: Date.now(),
			elapsed: 0
		}

		let ipt;
		if (input.includes('arr'))
			ipt = arr
		if (input.includes('cvs'))
			ipt = arr[0]
		if (input.includes('ctx'))
			ipt = cvs.getContext("2d")

		const draw = function() {
			requestAnimationFrame(draw)
			ui.now = Date.now()
			ui.elapsed = ui.now - ui.then
			if (ui.elapsed > ui.fps_interval) {
				ui.then = ui.now - (ui.elapsed % ui.fps_interval)
				ui = run_proc({ ipt, ui })
			}
		}
		return draw
	}
}

export default Canvas
