import { sizes, rad, canvas } from './rsc/canvas'

const { block, tile, half_tile, half, unit } = sizes
const axis = ctx => ctx.fillRect(tile - unit, tile, half, half_tile)
const rot = ctx => ctx.fillRect(tile - unit, half_tile, half, half_tile)

const initial = () => {
	const cvs = new OffscreenCanvas(block, block)
	const ctx = cvs.getContext("2d")
	ctx.fillStyle = "#000"
	axis(ctx)
	rot(ctx)
	return cvs
}

const move_x = [
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(tile - unit, tile)
		ctx.rotate(rad(45))
		ctx.translate(unit - tile, -tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(tile - unit, tile)
		ctx.rotate(rad(90))
		ctx.translate(unit - tile, -tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.translate(tile, tile)
		ctx.rotate(rad(45))
		ctx.translate(-tile, -tile)
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(tile - unit, tile)
		ctx.rotate(rad(90))
		ctx.translate(unit - tile, -tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(tile + unit, tile)
		ctx.rotate(rad(270))
		ctx.translate(-(tile + unit), -tile)
		rot(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		ctx.translate(tile + unit, tile)
		ctx.rotate(rad(315))
		ctx.translate(-(tile + unit), -tile)
		rot(ctx)
		return cvs
	}
]

const move_y = [
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		ctx.fillRect(tile - unit, half_tile + half, half, half + half_tile)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		axis(ctx)
		return cvs
	},
	() => {
		const cvs = new OffscreenCanvas(block, block)
		const ctx = cvs.getContext("2d")
		ctx.fillStyle = "#000"
		ctx.fillRect(tile - unit, half_tile + half, half, half_tile)
		return cvs
	}
]

export default function(main) {
	const frames_grid = canvas.section()
	const frames = [initial, ...move_x, initial, ...move_y]
	for (let i = 0; i < frames.length; ++i) {
		const container = canvas.container("Sample frame: " + i, {
			width: block + "px",
			height: block + "px",
			border: "1px solid black"
		})
		const cvs = document.createElement("canvas")
		cvs.width = block
		cvs.height = block
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
			width: block,
			height: block,
			border: "1px solid black",
			overflow: "hidden"
		})
		const cvs = document.createElement("canvas")
		cvs.width = block * dir[dx].length
		cvs.height = block
		cvs.style.position = "absolute"
		const ctx = cvs.getContext("2d")
		const dir_len = dir[dx].length
		for (let i = 0; i < dir_len; ++i) {
			ctx.drawImage(dir[dx][i](), block * i, 0)
		}
		container.append(cvs)
		movement_grid.append(container)
		procs.push(canvas.draw(
			[cvs],
			({ ipt, ui }) => {
				ipt.style.left = `${-block * ui.frame}px`
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
