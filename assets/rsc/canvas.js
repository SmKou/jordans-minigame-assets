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

const block = 32
const tile = block / 2
const half_tile = tile / 2
const half = half_tile / 2
const unit = half / 2
const point = unit / 2

export const sizes = { block, tile, half_tile, half, unit, point }

export const rad = (deg) => deg * Math.PI / 180

export const canvas = {
	section: (props = {}, is_grid = true) => {
		const section = document.createElement("section")
		section.style.width = "100%"
		section.style.marginBottom = tile + "px"
		if (is_grid) {
			section.style.display = "flex"
			section.style.flexWrap = "wrap"
			section.style.alignItems = "center"
		}
		if (props)
			for (const prop of Object.keys(props))
				section.style[prop] = props[prop]
		return section
	},
	container: (caption, props) => {
		const { width, height, ...cssprops } = props
		const container = document.createElement("div")
		container.title = caption
		container.style.position = "relative"
		container.style.width = width + "px"
		container.style.height = height + "px"
		for (const prop of Object.keys(cssprops))
			container.style[prop] = cssprops[prop]
		return container
	},
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

export default { ...sizes, ...canvas }
