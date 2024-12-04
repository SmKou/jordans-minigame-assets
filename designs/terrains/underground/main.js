const m = {
	block: 32,
	tile: 16,
	half_tile: 8,
	half_2: 4,
	unit: 2
}

const walls = {
	jagged: [
		{ // Two left-edge
			right: () => 1,
			down: (r) => {
				if (r < .3)
					return 0
				if (r < .6)
					return 1
				if (r < .8)
					return 2
				return 3
			},
			draw: function(border = 0) {
				const cvs = new OffscreenCanvas(tile, tile)
				const ctx = cvs.getContext("2d")

				ctx.fillStyle = '#000'
				ctx.fillRect(0, 0, tile, tile)

				if (border > 0)
					return cvs

				ctx.beginPath()
				ctx.moveTo(half_2, 0)
				ctx.lineTo(tile, half_tile)
				ctx.moveTo(half_2, half_tile)
				ctx.lineTo(tile, tile)
				ctx.strokeStyle = '#ddd'
				ctx.stroke()
				ctx.moveTo(half_2, 0)
				ctx.closePath()

				return cvs
			}
		},
		{ // Two right-edge
			right: () => 0,
			down: (r) => {
				if (r < .3)
					return 1
				if (r < .6)
					return 0
				if (r < .8)
					return 3
				return 2
			},
			draw: function(border = 0) {
				const cvs = new OffscreenCanvas(tile, tile)
				const ctx = cvs.getContext("2d")

				ctx.fillStyle = "#000"
				ctx.fillRect(0, 0, tile, tile)

				if (border < 0)
					return cvs

				ctx.beginPath()
				ctx.moveTo(0, half_tile)
				ctx.lineTo(half_tile + half_2, 0)
				ctx.moveTo(0, tile)
				ctx.lineTo(half_tile + half_2, half_tile)
				ctx.strokeStyle = '#ddd'
				ctx.stroke()
				ctx.moveTo(0, half_tile)
				ctx.closePath()

				return cvs
			}
		},
		{ // Overlapping left-edge
			right: () => 3,
			down: (r) => {
				if (r < .3)
					return 2
				if (r < .6)
					return 3
				if (r < .8)
					return 0
				return 1
			},
			draw: function(border = 0) {
				const cvs = new OffscreenCanvas(tile, tile)
				const ctx = cvs.getContext("2d")

				ctx.fillStyle = "#000"
				ctx.fillRect(0, 0, tile, tile)

				ctx.beginPath()
				if (border >= 0) {
					ctx.moveTo(0, half_tile)
					ctx.lineTo(half_tile + half_2, 0)
				}
				if (border <= 0) {
					ctx.moveTo(half_2, half_tile)
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
				if (r < .3)
					return 3
				if (r < .6)
					return 2
				if (r < .8)
					return 1
				return 0
			},
			draw: function(border = 0) {
				const cvs = new OffscreenCanvas(tile, tile)
				const ctx = cvs.getContext("2d")

				ctx.fillStyle = '#000'
				ctx.fillRect(0, 0, tile, tile)

				ctx.beginPath()
				if (border >= 0) {
					ctx.moveTo(0, tile)
					ctx.lineTo(half_tile + half_2, half_tile)
				}
				if (border <= 0) {
					ctx.moveTo(half_2, 0)
					ctx.lineTo(tile, half_tile)
				}
				ctx.strokeStyle = '#ddd'
				ctx.stroke()

				return cvs
			}
		}
	],

}

const wall_tiles = document.querySelector(".walls.tiles")
const wall_mats = document.querySelector(".walls.mats")

for (const type of Object.keys(walls)) {
	const tile_ids = walls[type]
	for (let i = 0; i < tile_ids.length; ++i) {
		const cvs = document.createElement("canvas")
		cvs.width = tile
		cvs.height = tile
		const ctx = cvs.getContext("2d")
		ctx.drawImage(walls[type][i].draw(), 0, 0)
		wall_tiles.append(cvs)
	}
}

const populate_right = (type, tile_idx, x = 5, y = 5) => {
	const cvs = document.createElement("canvas")
	cvs.width = block * x
	cvs.height = block * y
	const ctx = cvs.getContext("2d")


	let next = walls[type][tile_idx]
	for (let i = 0; i < (x * 2) * (y * 2); ++i) {
		ctx.drawImage(next.draw(), (i % x) * tile, Math.floor(i / y) * tile)
		next = walls[type][next.right()]
	}
	return cvs
}

const populate_down = (type, tile_idx, x = 5, y = 5) => {
	const cvs = document.createElement("canvas")
	cvs.width = block * x
	cvs.height = block * y
	const ctx = cvs.getContext("2d")

	const starts = new Array(y * 2)
	let start = tile_idx
	for (let i = 0; i < starts.length; ++i) {
		starts[i] = start
		start = walls[type][start].down(Math.random())
	}

	let next;
	for (let i = 0; i < (x * 2) * (y * 2); ++i) {
		if (i % (x * 2) === 0)
			next = walls[type][starts[Math.floor(i / (y * 2)]]
		for (let j = 0; j < x; ++j) {
			ctx.drawImage(next.draw(), (i % x) * tile, Math.floor(i / y) * tile)
			next = walls[type][next.right()]
		}
	}
	return cvs
}

for (const type of Object.keys(walls)) {
	const tile_ids = walls[type].length
	for (let i = 0; i < tile_ids; ++i) {
		wall_mats.append(populate_right(type, i))
		wall_mats.append(populate_down(type, i))
	}
}

const ground_tiles = document.querySelector(".ground.tiles")
const ground_mats = document.querySelector(".ground.mats")
