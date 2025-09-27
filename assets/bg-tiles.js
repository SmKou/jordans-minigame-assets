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
const border = (tile, line_width = 0.5) => {
	const cvs = tile()
	const ctx = cvs.getContext("2d")
	ctx.strokeStyle = "#000"
	ctx.lineWidth = line_width
	ctx.strokeRect(0, 0, block, block)
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

	end()
	return cvs
}

const two_horizontal_even = () => {
	const { cvs, ctx, end } = ocvs()

	end()
	return cvs
}

const three_horizontal = () => {
	const { cvs, ctx, end } = ocvs()

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
	const squares = {
		tatami: {
			caption: `20: ${tiles.one_vertical.caption} & -11: ${tiles.one_horizontal.caption}`,
			draw: () => {
				const { cvs, ctx, end } = ocvs(2 * block)
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
}
