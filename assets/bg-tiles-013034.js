import canvas from "./rsc/canvas";
import gen from "./rsc/TileGenerator";

const TILE_SIDE = block
const SQUARE_SIDE = 2 * block
const { block, tile, half_tile, half } = canvas

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

// tiles[tile_name].draw()

export default function(main) {
	const tiles_grid = canvas.section()
	const tile_names = Object.keys(tiles)
	tile_names.forEach(tile_name => {
		const container = gen.spl(tiles[tile_name], TILE_SIDE)
		tiles_grid.append(container)
	})
	const square_names = Object.keys(squares)
	square_names.forEach(square_name => {
		const container = gen_spl({
			caption: squares[square_name].caption,
			draw: () => gen.squ(squares[square_name], tiles)
		}, SQUARE_SIDE)
		tiles_grid.append(container)
	})
	main.append(tiles_grid)

	const terrains_grid = canvas.section()
	tile_names.forEach(tile_name => {
		const container = gen.trrn(tiles[tile_name], TILE_SIDE, 8, 6)
		terrains_grid.append(container)
	})
	main.append(terrains_grid)
}
