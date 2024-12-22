const jagged = {
	combos: [
		['two_left_edge', 'two_right_edge'],
		['overlapping_left', 'overlapping_right']
	],
	tiles: {
		blank: {
			right: () => major([
				'blank',
				'two_left_edge',
				'overlapping_left'
			], 15, Math.random()),
			down: () => major([
				'blank',
				'two_left_edge',
				'two_right_edge',
				'overlapping_left',
				'overlapping_right'
			], 5, Math.random()),
			draw() {
				const cvs = new OffscreenCanvas(tile, tile)
				const ctx = cvs.getContext("2d", { alpha: false })
				return cvs
			}
		},
		two_left_edge: {
			right: () => 'two_right_edge',
			down: () => major(Object.keys(jagged.tiles), 5, Math.random()),
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
		two_right_edge: {
			right: () => major(Object.keys(jagged.tiles), 5, Math.random()),
			down: () => major(Object.keys(jagged.tiles), 5, Math.random()),
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
		overlapping_left: {
			right: () => 'overlapping_right',
			down: () => major(Object.keys(jagged.tiles), 5, Math.random()),
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
		overlapping_right: {
			right: () => major(Object.keys(jagged.tiles), 5, Math.random()),
			down: () => major(Object.keys(jagged.tiles), 15, Math.random()),
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
	}
}

const tiles = {
	walls: () => {
		const ctn = create_container(tile + 'px')
		for (const tile_name of Object.keys(jagged.tiles)) {
			const cvs = document.createElement("canvas")
			cvs.width = tile
			cvs.height = tile
			cvs.getContext("2d").drawImage(jagged.tiles[tile_name].draw(), 0, 0)
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

export default { tiles, mats }
