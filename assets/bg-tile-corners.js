import canvas, { sizes } from "./rsc/canvas";
import { demo } from './rsc/TileGenerator'

const { block, tile, half_tile, half } = sizes

const inverted_corner_2 = {
	caption: "Half quarter inverted corner of 2",
	draw() {
		const { cvs, ctx, end } = demo.cvs()
		ctx.moveTo(block - half_tile, block)
		ctx.lineTo(block - half_tile, block - half_tile)
		ctx.lineTo(block, block - half_tile)
		end()
		return cvs
	}
}

const inverted_corner_1 = {
	caption: "Half quarter inverted corner of 1",
	draw() {
		const { cvs, ctx, end } = demo.cvs()
		ctx.moveTo(0, block - half_tile)
		ctx.lineTo(half_tile, block - half_tile)
		ctx.lineTo(half_tile, block)
		end()
		return cvs
	}
}

const inverted_corner_0 = {
	caption: "Half quarter inverted corner of 0",
	draw() {
		const { cvs, ctx, end } = demo.cvs()
		ctx.moveTo(half_tile, 0)
		ctx.lineTo(half_tile, half_tile)
		ctx.lineTo(0, half_tile)
		end()
		return cvs
	}
}

const inverted_corner__1 = {
	caption: "Half quarter inverted corner of -1",
	draw() {
		const { cvs, ctx, end } = demo.cvs()
		ctx.moveTo(block - half_tile, 0)
		ctx.lineTo(block - half_tile, half_tile)
		ctx.lineTo(block, half_tile)
		end()
		return cvs
	}
}

const tiles = {
	inverted_corner_2
}

const inverted_corners = {
	caption: "Inverted corners",
	tiles: {
		inverted_corner__1: [-1],
		inverted_corner_0: [0],
		inverted_corner_1: [1],
		inverted_corner_2: [2]
	}
}

const squares = {
	inverted_corners
}

export default function(main) {
	console.log("tiles", Object.keys(tiles).length)
	const grids = demo.tiles(tiles, [canvas.section(), canvas.section()], 8, 6, true)
	const [samples, terrains] = demo.squares(squares, {
			...tiles,
			inverted_corner__1,
			inverted_corner_0,
			inverted_corner_1
		}, grids, 4, 3
	)
	main.append(samples)
	main.append(terrains)
}
