import canvas from "./rsc/canvas";

const TILE_SIDE = block
const SQUARE_SIDE = 2 * block
const { block, tile, half_tile, half } = canvas

const gen_cvs = (side = block) => {
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

const slantedT = {
	caption: "T from corner 2",
	draw() {
		const { cvs, ctx, end } = gen_cvs()
		ctx.lineTo(tile, tile)
		ctx.lineTo(block, 0)
		ctx.moveTo(tile, tile)
		ctx.lineTo(0, block)
		end()
		return cvs
	}
}

const slantedT_reversed = {
	caption: "T from corner -1",
	draw() {}
}

const tiles = {
	slantedT,
	slantedT_reversed
}

/* ------------------------------------------- SQUARES */

const gen_square = (square) => () => {
	const tile_names = Object.keys(square.tiles)
	const { cvs, ctx, end } = gen_cvs(SQUARE_SIDE)
	tile_names.forEach(tile_name => {
		const tile = tiles[tile_name].draw()
		const placements = square.tiles[tile_name]
		placements.forEach(place => {
			switch (place) {
				case -1:
					ctx.drawImage(tile, 0, block)
					break;
				case 0:
					ctx.drawImage(tile, block, block)
					break;
				case 1:
					ctx.drawImage(tile, block, 0)
					break;
				case 2:
					ctx.drawImage(tile, 0, 0)
			}
		})
	})
	end()
	return cvs
}

const cobble = {
	caption: "Use of T and reversed T in vertically adjacent corners",
	tiles: {
		slantedT: [2, 0],
		slantedT_reversed: [-1, 1]
	}
}

const squares = {
	cobble
}

const gen_border = (tile, side = block, line_width = 0.5) {
	const cvs = tile(side)
	const ctx = cvs.getContext("2d")
	ctx.strokeStyle = "#000"
	ctx.lineWidth = line_width
	ctx.strokeRect(0, 0, side, side)
	return cvs
}

// Intended for sampling (or demonstration)
const gen_sample = (data, side, bordered = false) => {
	const container = canvas.container(
		`${bordered ? "bordered " : ""}${data.caption}`,
		{
			width: side,
			height: side,
			margin: half_tile + "px"
		}
	)
	const cvs = document.createElement("canvas")
	cvs.width = side
	cvs.height = side
	const ctx = cvs.getContext("2d")
	const tile = bordered
		? gen_border(data.draw)
		: data.draw()
	ctx.drawImage(tile, 0, 0)
	container.append(cvs)
	return bordered
		? container
		: [container, gen_sample(data, side, true)]
}

const gen_terrain = (data, side, width, height) => {
	const container = canvas.container(
		data.caption,
		{
			width: side * width,
			height: side * height,
			margin: tile + "px"
		}
	)
	const cvs = document.createElement("canvas")
	cvs.width = side * width
	cvs.height = side * height
	const ctx = cvs.getContext("2d")
	for (let xy = 0; xy < width * height; ++xy) {
		const tile = data.draw()
		const x = (xy % width) * side
		const y = Math.floor(xy / height) * side
		ctx.drawImage(tile, x, y)
	}
	container.append(cvs)
	return container
}

export default function(main) {
	const tiles_grid = canvas.section()
	const tile_names = Object.keys(tiles)
	tile_names.forEach(tile_name => {
		const container = gen_sample(tiles[tile_name], TILE_SIDE)
		tiles_grid.append(container)
	})
	const square_names = Object.keys(squares)
	square_names.forEach(square_name => {
		const container = gen_sample(squares[square_name], SQUARE_SIDE)
		tiles_grid.append(container)
	})

	const terrains_grid = canvas.section()
	tile_names.forEach(tile_name => {
		const container = gen_terrain(tiles[tile_name], TILE_SIDE, 8, 6)
		terrains_grid.append(container)
	})
	main.append(terrains_grid)
}
