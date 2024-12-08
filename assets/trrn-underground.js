import { block, tile, half_tile, half, unit } from './data.js'
import { create_container, mat_dim, gen_mats } from './fn.js'

const jagged = {
	combos:
}

[
	{ // Two left-edge
		right: () => 2,
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
		right: (r) => {
			if (r < .7)
				return -1
			return 0
		},
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
		right: (r) => {
			if (r < .7)
				return -1
			return 2
		},
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
	},
	// ground: () => {}
}

const mats = {
	walls: (n) => {
		const tn = n * 2
		const ctn = create_container(`minmax(${mat_dim(n)}px, 1fr)`)
		const mats = gen_mats(jagged, tn, tn)
		for (let idx = 0; idx < mats.length; ++idx) {
			const cvs = document.createElement("canvas")
			cvs.width = mat_dim(n)
			cvs.height = mat_dim(n)
			const ctx = cvs.getContext("2d", { alpha: false })
			for (let i = 0; i < mats[idx].length; ++i) {
				const x = i % tn
				const y = Math.floor(i / tn)
				const tile_idx = mats[idx][i]
				if (tile_idx < 0)
					continue;
				const border = x === 0 ? -1
					: x === tn - 1 ? 1
					: 0
				ctx.drawImage(jagged[tile_idx].draw(border), x * tile, y * tile)
			}
			ctn.append(cvs)
		}
		return ctn
	},
	// ground: (n) => {}
}

export default (main) => {
	for (const type of Object.keys(tiles))
		main.append(tiles[type]())

	for (const type of Object.keys(mats))
		main.append(mats[type](5))
}
