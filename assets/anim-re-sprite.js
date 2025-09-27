import Canvas from "./rsc/Canvas";

const canvas = new Canvas()
const deg = [0, 22.5, 45, 67.5]
const trans = [
	{ x: 0, y: 0 },
	{ x: Canvas.half, y: -Canvas.half }
]

const generate_frames = () => {
	const frames = []
	const width = Canvas.block
	const height = Canvas.block
	const three_quarter = Canvas.tile + Canvas.half
	for (let i = 0; i < deg.length; ++i) {
		const cvs = new OffscreenCanvas(width, height)
		const ctx = cvs.getContext("2d")
		ctx.beginPath()
		ctx.moveTo(Canvas.half, three_quarter)
		ctx.lineTo(three_quarter, three_quarter)
		ctx.strokeStyle = "#000"
		ctx.stroke()
		ctx.closePath()

		const x = idx > 0 ? trans[1].x : trans[0].x
		const y = idx > 0 ? trans[1].y : trans[0].y
		ctx.translate(x, y)
		ctx.translate(Canvas.half_tile, Canvas.half_tile)
		ctx.rotate(Canvas.rad(deg[idx]))
		ctx.translate(Canvas.half_tile, Canvas.half_tile)
		ctx.fillStyle = "#000"
		ctx.fillRect(Canvas.half, Canvas.half, Canvas.tile, Canvas.tile)
		frames.push(cvs)
	}
	return frames
}

const move_css_position = {
	container: {
		caption: "Draw each frame to portion of canvas and each frame, move canvas with css position",
		props: {
			width: Canvas.block + "px",
			height: Canvas.block + "px",
			overflow: "hidden"
		}
	},
	canvas: {
		qty: 1,
		props: {
			width: Canvas.block * 4,
			height: Canvas.block,
			position: "absolute"
		},
		draw: (frames, cvs) => {
			frames.forEach((frame, idx) => cvs.getContext("2d").drawImage(frame, Canvas.block * idx, 0))
		}
	},
	draw: {
		run_proc: ({ ipt, ui }) => {
			ipt.style.left = `${-Canvas.block * ui.frame}px`
			ui.fps_interval = ui.frame ? 300 : 900
			ui.frame++
			if (ui.frame >= deg.length)
				ui.frame = 0
			return ui
		},
		input: ["cvs"]
	}
}



export default function(main) {
	const frames = generate_frames()
	const grid = canvas.section()
	const container = canvas.container("View positions", {
		width: Canvas.block * 4 + "px",
		height: Canvas.block + "px"
	})
	for (let i = 0; i < deg.length; ++i) {
		const cvs = document.createElement("canvas")
		cvs.width = Canvas.block
		cvs.height = Canvas.block
		const ctx = cvs.getContext("2d")
		ctx.drawImage(frames[i], 0, 0)
		container.append(cvs)
	}
	grid.append(container)
	main.append(grid)

	const procs = []

	const load_grid = canvas.section()
	const methods = []
	for (const { container, canvas, draw } of methods) {
		const method_container = canvas.container(...container)
		const method_cvs = (function create(qty, props, draw) {
			const { width, height, ...cssprops } = props
			const arr = []
			for (let i = 0; i < qty; ++i) {
				const cvs = document.createElement("canvas")
				cvs.width = width
				cvs.height = height
				for (const prop of Object.keys(cssprops))
					cvs.style[prop] = cssprops[prop]
				const ctx = cvs.getContext("2d")
				draw(ctx)
			}
		})(...canvas)
	}
}
