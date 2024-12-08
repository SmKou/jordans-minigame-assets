import { block, tile, half_tile, half, unit } from './data.js'
import { create_container, mat_dim, gen_mats } from './fn.js'

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

const tiles = {
	walls: () => {
		const ctn = create_container(tile + 'px')
		for (let idx = 0; idx < jagged.length; ++idx) {
			const cvs = document.createElement("canvas")
			cvs.width = tile
			cvs.height = tile
			cvs.getContext("2d").drawImage(jagged[idx].draw(), 0, 0)
			ctn.append(cvs)
		}
		return ctn
	}
}

const mats = {
	walls: (n) => {
		const ctn = create_container(`minmax(${mat_dim(n)}px, 1fr)`)
		const mats = gen_mats(tiles, n * 2, n * 2)
		for (let idx = 0; idx < mats.length; ++idx) {
			const cvs = document.createElement("canvas")
			cvs.width = mat_dim(n)
			cvs.height = mat_dim(n)
			for (let y = 0; y < mats[idx].length; ++y)
				for (let x = 0; x < mats[idx][y].length; ++x) {
					const tile_idx = mats[y][x]
					const tile = tiles[tile_idx]
					cvs.drawImage(tile.draw(), x * tile, y * tile)
				}
			ctn.append(cvs)
		}
		return ctn
	}
}

export default (main) => {
	for (const type of Object.keys(tiles))
		main.append(tiles[type]())

	for (const type of Object.keys(mats))
		main.append(mats[type](5))
}
