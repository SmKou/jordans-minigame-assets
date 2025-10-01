import canvas, { sizes } from "./canvas"

const { block, tile, half_tile } = sizes

export const TILE_SIDE = block
export const SQUARE_SIDE = 2 * block

export const gen_cvs = (side = block) => {
	const cvs = new OffscreenCanvas(side, side)
	const ctx = cvs.getContext("2d")
	return {
		cvs,
		ctx,
		end() {
			ctx.lineWidth = 0.5
			ctx.strokeStyle = "#111"
			ctx.stroke()
		}
	}
}

export const gen_square = (square, tiles) => () => {
	const tile_names = Object.keys(square)
	const { cvs, ctx } = gen_cvs(SQUARE_SIDE)
	tile_names.forEach(tile_name => {
		const tile = tiles[tile_name].draw()
		const placements = square[tile_name]
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
	return cvs
}

const gen_border = (tile, side = block, line_width = 0.5) => {
	const cvs = tile(side)
	const ctx = cvs.getContext("2d")
	ctx.strokeStyle = "#111"
	ctx.lineWidth = line_width
	ctx.strokeRect(0, 0, side, side)
	return cvs
}

// Intended for sampling (or demonstration)
export const gen_sample = (data, side, bordered = false) => {
	const container = canvas.container(
		`${bordered ? "bordered " : ""}${data.caption}`,
		{ width: side, height: side, margin: half_tile + "px" }
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
	return container
}

export const gen_terrain = (data, side, width, height, bordered = false) => {
	const container = canvas.container(
		data.caption,
		{ width: side * width, height: side * height, margin: tile + "px" }
	)
	const cvs = document.createElement("canvas")
	cvs.width = side * width
	cvs.height = side * height
	const ctx = cvs.getContext("2d")
	const drawn_tile = bordered
		? gen_border(data.draw)
		: data.draw()
	for (let y = 0; y < height; ++y)
		for (let x = 0; x < width; ++x)
			ctx.drawImage(drawn_tile, x * side, y * side)
	container.append(cvs)
	return container
}

const tile_demos = (tiles, grids, width, height, add_borders = false) => {
	const [samples, terrains] = grids
	const tile_names = Object.keys(tiles)
	tile_names.forEach(tile_name => {
		const unbordered = gen_sample(tiles[tile_name], TILE_SIDE)
		samples.append(unbordered)
		if (add_borders) {
			const bordered = gen_sample(tiles[tile_name], TILE_SIDE, true)
			samples.append(bordered)
		}
	})
	tile_names.forEach(tile_name => {
		const unbordered = gen_terrain(tiles[tile_name], TILE_SIDE, width, height)
		terrains.append(unbordered)
		if (add_borders) {
			const bordered = gen_terrain(tiles[tile_name], TILE_SIDE, width, height, true)
			terrains.append(bordered)
		}
	})
	return grids
}

const square_demos = (squares, tiles, grids, width, height) => {
	const [samples, terrains] = grids
	const square_names = Object.keys(squares)
	square_names.forEach(square_name => {
		const caption = squares[square_name].caption
		const draw = gen_square(squares[square_name].tiles, tiles)
		const sample = gen_sample({ caption, draw }, SQUARE_SIDE)
		samples.append(sample)
	})
	square_names.forEach(square_name => {
		const caption = squares[square_name].caption
		const draw = gen_square(squares[square_name].tiles, tiles)
		const terrain = gen_terrain({ caption, draw }, SQUARE_SIDE, width, height)
		terrains.append(terrain)
	})
	return grids
}

export const demo = {
	cvs: gen_cvs,
	tiles: tile_demos,
	TILE: TILE_SIDE,
	squares: square_demos
}

export default {
	cvs: gen_cvs,
	square: gen_square,
	sample: gen_sample,
	terrain: gen_terrain
}
