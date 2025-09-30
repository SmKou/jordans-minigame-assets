import canvas from './rsc/canvas'

const { block, tile, half_tile } = canvas
const ocvs = (side = block) => {
	const cvs = new OffscreenCanvas(side, side)
	const ctx = cvs.getContext("2d")
	return {
		cvs,
		ctx,
		end() {
			ctx.strokeStyle = "#000"
			ctx.stroke()
		}
	}
}
const border = (tile, dim = block, line_width = 0.5) => {
	const cvs = tile()
	const ctx = cvs.getContext("2d")
	ctx.strokeStyle = "#000"
	ctx.lineWidth = line_width
	ctx.strokeRect(0, 0, dim, dim)
	return cvs
}

const mini_tatami = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.beginPath()
	ctx.moveTo(tile, 0)
	ctx.lineTo(tile, block)
	ctx.moveTo(0, tile)
	ctx.lineTo(block, tile)
	ctx.moveTo(half_tile, 0)
	ctx.lineTo(half_tile, tile)
	ctx.moveTo(block - half_tile, tile)
	ctx.lineTo(block - half_tile, block)
	ctx.moveTo(0, block - half_tile)
	ctx.lineTo(tile, block - half_tile)
	ctx.moveTo(tile, half_tile)
	ctx.lineTo(block, half_tile)
	end()
	return cvs
}

const mini_tatami_reverse = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(0, half_tile)
	ctx.lineTo(tile, half_tile)
	ctx.moveTo(0, tile)
	ctx.lineTo(block, tile)
	ctx.moveTo(tile, block - half_tile)
	ctx.lineTo(block, block - half_tile)
	ctx.moveTo(block - half_tile, 0)
	ctx.lineTo(block - half_tile, tile)
	ctx.moveTo(tile, 0)
	ctx.lineTo(tile, block)
	ctx.moveTo(half_tile, tile)
	ctx.lineTo(half_tile, block)
	end()
	return cvs
}

const one_vertical = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(tile, 0)
	ctx.lineTo(tile, block)
	end()
	return cvs
}

const two_vertical = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(block / 3, 0)
	ctx.lineTo(block / 3, block)
	ctx.moveTo(block * 2 / 3, block)
	ctx.lineTo(block * 2 / 3, 0)
	end()
	return cvs
}

const two_vertical_even = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(half_tile, 0)
	ctx.lineTo(half_tile, block)
	ctx.moveTo(block - half_tile, block)
	ctx.lineTo(block - half_tile, 0)
	end()
	return cvs
}

const three_vertical = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(half_tile, 0)
	ctx.lineTo(half_tile, block)
	ctx.moveTo(tile, block)
	ctx.lineTo(tile, 0)
	ctx.moveTo(block - half_tile, 0)
	ctx.lineTo(block - half_tile, block)
	end()
	return cvs
}

const one_horizontal = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(0, tile)
	ctx.lineTo(block, tile)
	end()
	return cvs
}

const two_horizontal = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(0, block / 3)
	ctx.lineTo(block, block / 3)
	ctx.moveTo(block, block * 2 / 3)
	ctx.lineTo(0, block * 2 / 3)
	end()
	return cvs
}

const two_horizontal_even = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(0, half_tile)
	ctx.lineTo(block, half_tile)
	ctx.moveTo(block, block - half_tile)
	ctx.lineTo(0, block - half_tile)
	end()
	return cvs
}

const three_horizontal = () => {
	const { cvs, ctx, end } = ocvs()
	ctx.moveTo(0, half_tile)
	ctx.lineTo(block, half_tile)
	ctx.moveTo(block, tile)
	ctx.lineTo(0, tile)
	ctx.moveTo(0, tile + half_tile)
	ctx.lineTo(block, tile + half_tile)
	end()
	return cvs
}

export default function(main) {
	const tiles_grid = canvas.section()
	const tiles = {
		one_vertical: {
			caption: "vertical stripe",
			draw: one_vertical
		},
		one_vertical_bordered: {
			caption: "vertical stripe bordered",
			draw: () => border(one_vertical)
		},
		two_vertical: {
			caption: "two vertical stripes (thirds)",
			draw: two_vertical
		},
		two_vertical_bordered: {
			caption: "two vertical stripes bordered (thirds)",
			draw: () => border(two_vertical)
		},
		two_vertical_even: {
			caption: "two vertical stripes (on fourth lines)",
			draw: two_vertical_even
		},
		two_vertical_even_bordered: {
			caption: "two vertical stripes bordered (on fourth lines)",
			draw: () => border(two_vertical_even)
		},
		three_vertical: {
			caption: "three vertical stripes (fourths)",
			draw: three_vertical
		},
		three_vertical_bordered: {
			caption: "three vertical stripes bordered (fourths)",
			draw: () => border(three_vertical)
		},
		one_horizontal: {
			caption: "horizontal stripe",
			draw: one_horizontal
		},
		one_horizontal_bordered: {
			caption: "horizontal stripe bordered",
			draw: () => border(one_horizontal)
		},
		two_horizontal: {
			caption: "two horizontal stripes (thirds)",
			draw: two_horizontal
		},
		two_horizontal_bordered: {
			caption: "two horizontal stripes bordered (thirds)",
			draw: () => border(two_horizontal)
		},
		two_horizontal_even: {
			caption: "two horizontal stripes (on fourth lines)",
			draw: two_horizontal_even
		},
		two_horizontal_even_bordered: {
			caption: "two horizontal stripes bordered (on fourth lines)",
			draw: () => border(two_horizontal_even)
		},
		three_horizontal: {
			caption: "three horizontal stripes (fourths)",
			draw: three_horizontal
		},
		three_horizontal_bordered: {
			caption: "three horizontal stripes bordered (fourths)",
			draw: () => border(three_horizontal)
		},
		mini_tatami: {
			caption: "mini tatami - 20: vertical two strip, -11: horizontal two strip",
			draw: mini_tatami
		},
		mini_tatami_bordered: {
			caption: "mini tatami bordered - 20: vertical two strip, -11: horizontal two strip",
			draw: () => border(mini_tatami)
		},
		mini_tatami_reverse: {
			caption: "mini tatami - 20: horizontal two strip, -11 vertical two strip",
			draw: mini_tatami_reverse
		},
		mini_tatami_reverse_bordered: {
			caption: "mini tatami bordered - 20: horizontal two strip, -11 vertical two strip",
			draw: () => border(mini_tatami_reverse)
		}
	}
	const tile_names = Object.keys(tiles)
	for (const tile_name of tile_names) {
		const [ width, height ] = [block, block]
		const container = canvas.container(tiles[tile_name].caption, {
			width,
			height,
			margin: half_tile + "px"
		})
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		const ctx = cvs.getContext("2d")
		ctx.drawImage(tiles[tile_name].draw(), 0, 0)
		container.append(cvs)
		tiles_grid.append(container)
	}
	main.append(tiles_grid)

	const squares_grid = canvas.section()
	const SQUARE_SAMPLE_DIM = 2 * block
	const squares = {
		tatami: {
			caption: `20: ${tiles.one_vertical.caption} & -11: ${tiles.one_horizontal.caption}`,
			draw: () => {
				const { cvs, ctx, end } = ocvs(SQUARE_SAMPLE_DIM)
				ctx.drawImage(one_vertical(), 0, 0)
				ctx.drawImage(one_vertical(), block, block)
				ctx.drawImage(one_horizontal(), block, 0)
				ctx.drawImage(one_horizontal(), 0, block)
				ctx.moveTo(block, 0)
				ctx.lineTo(block, 2 * block)
				ctx.moveTo(0, block)
				ctx.lineTo(2 * block, block)
				end()
				return cvs
			}
		},
		tatami_bordered: {
			caption: `bordered 20: ${tiles.one_vertical.caption} & -11: ${tiles.one_horizontal.caption}`,
			draw: () => {
				const { cvs, ctx, end } = ocvs(SQUARE_SAMPLE_DIM)
				ctx.drawImage(border(squares.tatami.draw, SQUARE_SAMPLE_DIM), 0, 0)
				end()
				return cvs
			}
		},
		two_lined_tatami: {
			caption: `20: ${tiles.two_vertical.caption} & -11: ${tiles.two_horizontal.caption}`,
			draw: () => {
				const { cvs, ctx, end } = ocvs(SQUARE_SAMPLE_DIM)
				ctx.drawImage(two_vertical(), 0, 0)
				ctx.drawImage(two_vertical(), block, block)
				ctx.drawImage(two_horizontal(), block, 0)
				ctx.drawImage(two_horizontal(), 0, block)
				ctx.moveTo(block, 0)
				ctx.lineTo(block, 2 * block)
				ctx.moveTo(0, block)
				ctx.lineTo(2 * block, block)
				end()
				return cvs
			}
		},
		two_lined_tatami_bordered: {
			caption: `bordered 20: ${tiles.two_vertical.caption} & -11: ${tiles.two_horizontal.caption}`,
			draw: () => {
				const { cvs, ctx, end } = ocvs(SQUARE_SAMPLE_DIM)
				ctx.drawImage(border(squares.two_lined_tatami.draw, SQUARE_SAMPLE_DIM), 0, 0)
				end()
				return cvs
			}
		}
	}
	const square_names = Object.keys(squares)
	for (const square_name of square_names) {
		const [ width, height ] = [2 * block, 2 * block]
		const container = canvas.container(squares[square_name].caption, {
			width,
			height,
			margin: half_tile + "px"
		})
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		const ctx = cvs.getContext("2d")
		ctx.drawImage(squares[square_name].draw(), 0, 0)
		container.append(cvs)
		squares_grid.append(container)
	}
	main.append(squares_grid)

	const terrains_grid = canvas.section()
	const tile_terrain_dim = 8
	tile_names.forEach(tile_name => {
		const width = block * tile_terrain_dim
		const height = block * tile_terrain_dim
		const container = canvas.container(tiles[tile_name].caption + " x8", {
			width,
			height,
			margin: half_tile + "px"
		})
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		const ctx = cvs.getContext("2d")
		for (let xy = 0; xy < tile_terrain_dim ** 2; ++xy) {
			ctx.drawImage(
				tiles[tile_name].draw(),
				(xy % tile_terrain_dim) * block,
				Math.floor(xy / tile_terrain_dim) * block
			)
		}
		container.append(cvs)
		terrains_grid.append(container)
	})
	const square_terrain_dim = 4
	square_names.forEach(square_name => {
		const width = block * tile_terrain_dim
		const height = block * tile_terrain_dim
		const container = canvas.container(squares[square_name].caption + " x4", {
			width,
			height,
			margin: half_tile + "px"
		})
		const cvs = document.createElement("canvas")
		cvs.width = width
		cvs.height = height
		const ctx = cvs.getContext("2d")
		for (let xy = 0; xy < square_terrain_dim ** 2; ++xy) {
			const square = squares[square_name].draw()
			const x = (xy % square_terrain_dim) * 2 * block
			const y = Math.floor(xy / square_terrain_dim) * 2 * block
			ctx.drawImage(square, x, y)
		}
		container.append(cvs)
		terrains_grid.append(container)
	})
	main.append(terrains_grid)
}
