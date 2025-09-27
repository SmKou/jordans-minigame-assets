import Canvas from './rsc/Canvas'

const canvas = new Canvas()

const axis = ctx => ctx.fillRect(Canvas.tile - Canvas.unit, Canvas.tile, Canvas.half, Canvas.half_tile)
const rot = ctx => ctx.fillRect(Canvas.tile - Canvas.unit, Canvas.half_tile, Canvas.half, Canvas.half_tile)

const initial = () => {
	const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
	const ctx = cvs.getContext("2d")
	ctx.fillStyle = "#000"
	axis(ctx)
	rot(ctx)
	return cvs
}

const move_x = [
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(Canvas.tile - Canvas.unit, Canvas.tile)
		ctx.rotate(Canvas.rad(45))
		ctx.translate(Canvas.unit - Canvas.tile, -Canvas.tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(Canvas.tile - Canvas.unit, Canvas.tile)
		ctx.rotate(Canvas.rad(90))
		ctx.translate(Canvas.unit - Canvas.tile, -Canvas.tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.translate(Canvas.tile, Canvas.tile)
		ctx.rotate(Canvas.rad(45))
		ctx.translate(-Canvas.tile, -Canvas.tile)
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(Canvas.tile - Canvas.unit, Canvas.tile)
		ctx.rotate(Canvas.rad(90))
		ctx.translate(Canvas.unit - Canvas.tile, -Canvas.tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(Canvas.tile + Canvas.unit, Canvas.tile)
		ctx.rotate(Canvas.rad(270))
		ctx.translate(-(Canvas.tile + Canvas.unit), -Canvas.tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(Canvas.tile + Canvas.unit, Canvas.tile)
		ctx.rotate(Canvas.rad(315))
		ctx.translate(-(Canvas.tile + Canvas.unit), -Canvas.tile)
		rot(ctx)
		return cvs
	}
]

const move_y = [
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		ctx.fillRect(Canvas.tile - Canvas.unit, Canvas.half_tile + Canvas.half, Canvas.half, Canvas.half + Canvas.half_tile)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(Canvas.block, Canvas.block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		ctx.fillRect(Canvas.tile - Canvas.unit, Canvas.half_tile + Canvas.half, Canvas.half, Canvas.half_tile)
		return cvs
	}
]

export default function(main) {
	const frames_grid = canvas.section()
	const frames = [initial, ...move_x, initial, ...move_y]
	for (let i = 0; i < frames.length; ++i) {
		const container = canvas.container("Sample frame: " + i, {
			width: Canvas.block + "px",
			height: Canvas.block + "px",
			border: "1px solid black"
		})
		const cvs = document.createElement("canvas")
		cvs.width = Canvas.block
		cvs.height = Canvas.block
		const ctx = cvs.getContext("2d")
		ctx.drawImage(frames[i](), 0, 0)
		container.append(cvs)
		frames_grid.append(container)
	}
	main.append(frames_grid)

	const procs = []

	const movement_grid = canvas.section()
	const dir = {
		right: move_x,
		left: [...move_x].reverse(),
		up_down: move_y
	}
	const directions = Object.keys(dir)
	for (const dx of directions) {
		const container = canvas.container("Animation: " + dx, {
			width: Canvas.block,
			height: Canvas.block,
			border: "1px solid black",
			overflow: "hidden"
		})
		const cvs = document.createElement("canvas")
		cvs.width = Canvas.block * dir[dx].length
		cvs.height = Canvas.block
		cvs.style.position = "absolute"
		const ctx = cvs.getContext("2d")
		const dir_len = dir[dx].length
		for (let i = 0; i < dir_len; ++i) {
			ctx.drawImage(dir[dx][i](), Canvas.block * i, 0)
		}
		container.append(cvs)
		movement_grid.append(container)
		procs.push(canvas.draw(
			[cvs],
			({ ipt, ui }) => {
				ipt.style.left = `${-Canvas.block * ui.frame}px`
				ui.frame++
				if (ui.frame >= dir[dx].length)
					ui.frame = 0
				return ui
			},
			["cvs"],
			5
		))
	}
	main.append(movement_grid)
	return procs
}
