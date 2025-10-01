import canvas, { sizes } from "./rsc/canvas";
import generate, { TILE_SIDE, SQUARE_SIDE } from "./rsc/TileGenerator";

const { block, tile, half_tile, half, unit, point } = sizes

const slantedT = {
	caption: "T from corner 2",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(tile, tile)
		ctx.lineTo(block, 0)
		ctx.moveTo(tile, tile)
		ctx.lineTo(0, block)
		end()
		return cvs
	}
}

const slantedT_rot_left = {
	caption: "T from corner -1",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(block, block)
		ctx.moveTo(tile, tile)
		ctx.lineTo(0, block)
		end()
		return cvs
	}
}

const outwardH = {
	caption: "Horizontal H split between top and bottom",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile, 0)
		ctx.lineTo(tile, half_tile)
		ctx.moveTo(0, half_tile)
		ctx.lineTo(block, half_tile)
		ctx.moveTo(block, block - half_tile)
		ctx.lineTo(0, block - half_tile)
		ctx.moveTo(tile, block - half_tile)
		ctx.lineTo(tile, block)
		end()
		return cvs
	}
}

const inwardH = {
	caption: "Horizontal H",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.lineTo(0, half_tile)
		ctx.lineTo(block, half_tile)
		ctx.moveTo(tile, half_tile)
		ctx.lineTo(tile, block - half_tile)
		ctx.moveTo(block, block - half_tile)
		ctx.lineTo(0, block - half_tile)
		end()
		return cvs
	}
}

const corner_2 = {
	caption: "Corner emphasis 2",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, block)
		ctx.lineTo(0, 0)
		ctx.lineTo(block, 0)
		end()
		return cvs
	}
}

const corner_1 = {
	caption: "Corner emphasis 1",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(block, 0)
		ctx.lineTo(block, block)
		end()
		return cvs
	}
}

const corner_0 = {
	caption: "Corner emphasis 0",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(block, 0)
		ctx.lineTo(block, block)
		ctx.lineTo(0, block)
		end()
		return cvs
	}
}

const corner__1 = {
	caption: "Corner emphasis -1",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(block, block)
		ctx.lineTo(0, block)
		ctx.lineTo(0, 0)
		end()
		return cvs
	}
}

const square_outline = {
	caption: "Square outline",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.strokeRect(0, 0, block, block)
		ctx.lineWidth = point
		end()
		return cvs
	}
}

const square_fill = {
	caption: "Square",
	draw() {
		const { cvs, ctx } = generate.cvs()
		ctx.fillRect(0, 0, block, block)
		return cvs
	}
}

const square_outline_center = {
	caption: "Quarter-size square outline in center",
	draw() {
		const { cvs, ctx } = generate.cvs()
		ctx.strokeRect(tile - half_tile, tile - half_tile, tile, tile)
		ctx.strokeRect(tile - half_tile, tile - half_tile, tile, tile)
		return cvs
	}
}

const square_center = {
	caption: "Quarter-size square in center",
	draw() {
		const { cvs, ctx } = generate.cvs()
		ctx.fillRect(tile - half_tile, tile - half_tile, tile, tile)
		return cvs
	}
}

const mini_square_outline_center = {
	caption: "Half quarter-size square outline in center",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.strokeRect(tile - half, tile - half, half_tile, half_tile)
		ctx.strokeRect(tile - half, tile - half, half_tile, half_tile)
		end()
		return cvs
	}
}

const mini_square_center = {
	caption: "Half quarter-size square in center",
	draw() {
		const { cvs, ctx } = generate.cvs()
		ctx.fillRect(tile - half, tile - half, half_tile, half_tile)
		return cvs
	}
}

const cross = {
	caption: "Cross",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile, 0)
		ctx.lineTo(tile, block)
		ctx.moveTo(0, tile)
		ctx.lineTo(block, tile)
		end()
		return cvs
	}
}

const crosshair = {
	caption: "Crosshair",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile, 0)
		ctx.lineTo(tile, half_tile)
		ctx.moveTo(block, tile)
		ctx.lineTo(block - half_tile, tile)
		ctx.moveTo(tile, block)
		ctx.lineTo(tile, block - half_tile)
		ctx.moveTo(0, tile)
		ctx.lineTo(half_tile, tile)
		end()
		return cvs
	}
}

const point_off_cross = {
	caption: "Cross with point off center axes",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile + point, 0)
		ctx.lineTo(tile + point, tile)
		ctx.moveTo(block, tile + point)
		ctx.lineTo(block - tile, tile + point)
		ctx.moveTo(tile - point, block)
		ctx.lineTo(tile - point, block - tile)
		ctx.moveTo(0, tile - point)
		ctx.lineTo(tile, tile - point)
		end()
		return cvs
	}
}

const spiral_cross = {
	caption: "Cross with inner square",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile + unit, 0)
		ctx.lineTo(tile + unit, tile + unit)
		ctx.lineTo(tile + unit, 0)
		ctx.moveTo(block, tile + unit)
		ctx.lineTo(tile - unit, tile + unit)
		ctx.lineTo(block, tile + unit)
		ctx.moveTo(tile - unit, block)
		ctx.lineTo(tile - unit, tile - unit)
		ctx.lineTo(tile - unit, block)
		ctx.moveTo(0, tile - unit)
		ctx.lineTo(tile + unit, tile - unit)
		ctx.lineTo(0, tile - unit)
		end()
		return cvs
	}
}

const cross_corner_2 = {
	caption: "Corner emphasis 2, inside cross 0",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, block)
		ctx.lineTo(0, 0)
		ctx.lineTo(block, 0)
		ctx.moveTo(block, block - half_tile)
		ctx.lineTo(block, block)
		ctx.lineTo(block - half_tile, block)
		end()
		return cvs
	}
}

const cross_corner_1 = {
	caption: "Corner emphasis 1, inside cross -1",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(block, 0)
		ctx.lineTo(block, block)
		ctx.moveTo(0, block - half_tile)
		ctx.lineTo(0, block)
		ctx.lineTo(half_tile, block)
		end()
		return cvs
	}
}

const cross_corner_0 = {
	caption: "Corner emphasis 0, inside cross 2",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(block, 0)
		ctx.lineTo(block, block)
		ctx.lineTo(0, block)
		ctx.moveTo(0, half_tile)
		ctx.lineTo(0, 0)
		ctx.lineTo(half_tile, 0)
		end()
		return cvs
	}
}

const cross_corner__1 = {
	caption: "Corner emphasis -1, inside cross 1",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(block, block)
		ctx.lineTo(0, block)
		ctx.lineTo(0, 0)
		ctx.moveTo(block - half_tile, 0)
		ctx.lineTo(block, 0)
		ctx.lineTo(block, half_tile)
		end()
		return cvs
	}
}

const horizontal_Hsplit = {
	caption: "Horizontal H with cross line crossing square",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, tile)
		ctx.lineTo(block, tile)
		ctx.moveTo(half_tile, 0)
		ctx.lineTo(half_tile, block)
		ctx.moveTo(block - half_tile, 0)
		ctx.lineTo(block - half_tile, block)
		end()
		return cvs
	}
}

const vertical_Hsplit = {
	caption: "Verical H with cross line crossing square",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(tile, 0)
		ctx.lineTo(tile, block)
		ctx.moveTo(0, half_tile)
		ctx.lineTo(block, half_tile)
		ctx.moveTo(0, block - half_tile)
		ctx.lineTo(block, block - half_tile)
		end()
		return cvs
	}
}

const horizontal_Hlink = {
	caption: "Horizontal H with feet on ends",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(0, half_tile)
		ctx.lineTo(block, half_tile)
		ctx.lineTo(block, 0)
		ctx.moveTo(0, block)
		ctx.lineTo(0, block - half_tile)
		ctx.lineTo(block, block - half_tile)
		ctx.lineTo(block, block)
		ctx.moveTo(tile, half_tile)
		ctx.lineTo(tile, block - half_tile)
		end()
		return cvs
	}
}

const vertical_Hlink = {
	caption: "Vertical H with feet on ends",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(0, 0)
		ctx.lineTo(half_tile, 0)
		ctx.lineTo(half_tile, block)
		ctx.lineTo(0, block)
		ctx.moveTo(block, 0)
		ctx.lineTo(block - half_tile, 0)
		ctx.lineTo(block- half_tile, block)
		ctx.lineTo(block, block)
		ctx.moveTo(half_tile, tile)
		ctx.lineTo(block - half_tile, tile)
		end()
		return cvs
	}
}

const hexagon_outline = {
	caption: "Hexagon",
	draw() {
		const { cvs, ctx, end } = generate.cvs()
		ctx.moveTo(half_tile, 0)
		ctx.lineTo(block - half_tile, 0)
		ctx.lineTo(block, half_tile)
		ctx.lineTo(block, block - half_tile)
		ctx.lineTo(block - half_tile, block)
		ctx.lineTo(half_tile, block)
		ctx.lineTo(0, block - half_tile)
		ctx.lineTo(0, half_tile)
		ctx.lineTo(half_tile, 0)
		end()
		return cvs
	}
}

const tiles = {
	slantedT,
	slantedT_rot_left,
	outwardH,
	inwardH,
	corner_2,
	square_outline,
	square_fill,
	square_outline_center,
	square_center,
	mini_square_outline_center,
	mini_square_center,
	cross,
	crosshair,
	point_off_cross,
	spiral_cross,
	cross_corner_2,
	horizontal_Hsplit,
	vertical_Hsplit,
	horizontal_Hlink,
	vertical_Hlink,
	hexagon_outline
}

/* ------------------------------------------- SQUARES */

const cobble = {
	caption: "Cobble: Use of T and rotated T in corners 2 and -1",
	tiles: {
		slantedT: [2, -1],
		slantedT_rot_left: [0, 1]
	}
}

const brick = {
	caption: "Brick: Use of Horizontal H in corners 2 and -1",
	tiles: {
		outwardH: [2, -1],
		inwardH: [1, 0]
	}
}

const large_kitchen = {
	caption: "Kitchen tiles: Use of four corners",
	tiles: {
		corner_2: [2],
		corner_1: [1],
		corner_0: [0],
		corner__1: [-1]
	}
}

const spotted_kitchen = {
	caption: "Children's kitchen tiles: Use of inside filled and outline square",
	tiles: {
		mini_square_center: [2, 0],
		mini_square_outline_center: [-1, 1]
	}
}

const large_factory = {
	caption: "Factory tiles: Use of black and white tiles",
	tiles: {
		square_fill: [2, 0],
		square_outline: [-1, 1]
	}
}

const star_hotel = {
	caption: "Star hotel: Use of corners with small inside corner",
	tiles: {
		cross_corner_0: [0],
		cross_corner__1: [-1],
		cross_corner_1: [1],
		cross_corner_2: [2]
	}
}

const squares = {
	cobble,
	brick,
	large_kitchen,
	spotted_kitchen,
	large_factory,
	star_hotel
}

// tiles[tile_name].draw()

export default function(main) {
	const tiles_grid = canvas.section()
	const terrains_grid = canvas.section()

	const tile_names = Object.keys(tiles)
	tile_names.forEach(tile_name => {
		const container_unbordered = generate.sample(tiles[tile_name], TILE_SIDE)
		tiles_grid.append(container_unbordered)
		const container_bordered = generate.sample(tiles[tile_name], TILE_SIDE, true)
		tiles_grid.append(container_bordered)
	})

	tile_names.forEach(tile_name => {
		const container_unbordered = generate.terrain(tiles[tile_name], TILE_SIDE, 8, 6)
		terrains_grid.append(container_unbordered)
		const container_bordered = generate.terrain(tiles[tile_name], TILE_SIDE, 8, 6, true)
		terrains_grid.append(container_bordered)
	})

	const square_names = Object.keys(squares)
	const ref_tiles = { ...tiles,
		corner__1,
		corner_0,
		corner_1,
		cross_corner__1,
		cross_corner_0,
		cross_corner_1
	}
	square_names.forEach(square_name => {
		const caption = squares[square_name].caption
		const draw = generate.square(squares[square_name].tiles, ref_tiles)
		const container = generate.sample({ caption, draw }, SQUARE_SIDE)
		tiles_grid.append(container)
	})

	square_names.forEach(square_name => {
		const caption = squares[square_name].caption
		const draw = generate.square(squares[square_name].tiles, ref_tiles)
		const container = generate.terrain({ caption, draw }, SQUARE_SIDE, 4, 3)
		terrains_grid.append(container)
	})
	main.append(tiles_grid)
	main.append(terrains_grid)
}
