import { block, tile, half_tile, half, unit } from 'data.js'

const jagged = [
	{ // Two left-edge
		right: () => 1,
		down: (r) => {
			if (r < .3) return 0
			if (r < .6) return 1
			if (r < .8) return 2
			return 3
		},
		draw(border = 0) {
			const cvs = new OffscreenCanvas(tile, tile)
			const ctx = cvs.getContext("2d", { alpha: false })
			if (border > 0)
				return cvs
			ctx.beginPath()
			ctx.moveTo(half, 0)
			ctx.lineTo(tile, half_tile)
			ctx.moveTo(half, half_tile)
			ctx.lineTo(tile, tile)
			ctx.strokeStyle = '#ddd'
			ctx.stroke()
			return cvs
		}
	},
	{ // Two right-edge
		right: () => 0,
		down: (r) => {
			if (r < .3) return 1
			if (r < .6) return 0
			if (r < .8) return 3
			return 2
		},
		draw(border = 0) {
			const cvs = new OffscreenCanvas(tile, tile)
			const ctx = cvs.getContext("2d", { alpha: false })
			if (border < 0)
				return cvs
			ctx.beginPath()
			ctx.moveTo(0, half_tile)
			ctx.lineTo(half_tile + half, 0)
			ctx.moveTo(0, tile)
			ctx.lineTo(half_tile + half, half_tile)
			ctx.strokeStyle = '#ddd'
			ctx.stroke()
			return cvs
		}
	},
	{ // Overlapping left-edge
		right: () => 3,
		down: (r) => {
			if (r < .3) return 2
			if (r < .6) return 3
			if (r < .8) return 0
			return 1
		},
		draw(border = 0) {
			const cvs = new OffscreenCanvas(tile, tile)
			const ctx = cvs.getContext("2d", { alpha: false })
			ctx.beginPath()
			if (border >= 0) {
				ctx.moveTo(0, half_tile)
				ctx.lineTo(half_tile + half, 0)
			}
			if (border <= 0) {
				ctx.moveTo(half, half_tile)
				ctx.lineTo(tile, tile)
			}
			ctx.strokeStyle = '#ddd'
			ctx.stroke()
			return cvs
		}
	},
	{ // Overlapping right-edge
		right: () => 2,
		down: (r) => {
			if (r < .3) return 3
			if (r < .6) return 2
			if (r < .8) return 1
			return 0
		},
		draw(border = 0) {
			const cvs = new OffscreenCanvas(tile, tile)
			const ctx = cvs.getContext("2d", { alpha: false })
			ctx.beginPath()
			if (border >= 0) {
				ctx.moveTo(0, tile)
				ctx.lineTo(half_tile + half, half_tile)
			}
			if (border <= 0) {
				ctx.moveTo(half, 0)
				ctx.lineTo(tile, half_tile)
			}
			ctx.strokeStyle = '#ddd'
			ctx.stroke()
			return cvs
		}
	}
]

const create_container = (repeat_size) => {
	const ctn = document.createElement("div")
	ctn.style.marginBottom = `${tile}px`
	ctn.style.display = 'grid'
	ctn.style.gridTemplateColumns = `repeat(auto-fit, ${repeat_size})`
	ctn.style.gap = `${tile}px`
	return ctn
}

const tiles = {
	walls: () => {
		const ctn = create_container(tile)
		for (let i = 0; i < jagged.length; ++i) {
			const cvs = document.createElement("canvas")
			cvs.width = tile
			cvs.height = tile
			cvs.getContext("2d").drawImage(jagged[i].draw(), 0, 0)
			ctn.append(cvs)
		}
		return ctn
	}
}

const mat_dim = (n) => block * n
const gen_right = (tiles, idx, width = 5) => {
	const ord = [idx]
	while (ord.length < width) {
		const last_idx = ord.length - 1
		curr = tiles[ord[last_idx]].right()
		ord.push(curr)
	}
	return ord
}

const gen_down = (tiles, ids, width = 5, height = 5) => {
	while (ids.length < height)
		ids.push(Math.floor(Math.random() * tiles.length))

	const ord = []
	for (let i = 0; i < ids.length; ++i)
		ord.push(...gen_right(tiles, ids[i], width))

	return ord
}

const gen_mat = (tiles, width, height) => {

}

const mats = {
	walls: (n) => {
		const ctn = create_container(`minmax(${mat_dim(n)}px, 1fr)`)
		return ctn
	}
}
