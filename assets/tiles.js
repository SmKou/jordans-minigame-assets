import { sizes, create_section } from "./data";

const { block, tile, half_tile, half, unit } = sizes

const init = () => {
	const cvs = new OffscreenCanvas(block, block)
	const ctx = cvs.getContext("2d")
	ctx.fillStyle = "#fff"
	ctx.fillRect(block, block, block, block)
	ctx.strokeStyle = "#000"
	return { cvs, ctx }
}

const cobble = (side) => {
	const { cvs, ctx } = init()
	if (side) {
		ctx.lineTo(tile, tile)
		ctx.moveTo(block, 0)
		ctx.lineTo(0, block)
	}
	else {
		ctx.lineTo(block, block)
		ctx.moveTo(0, block)
		ctx.lineTo(tile, tile)
	}
	return cvs
}

const long_brick = (side, edge = 0) => {
	const { cvs, ctx } = init()
	if (side) {
		ctx.moveTo(0, tile)
		ctx.lineTo(block, tile)
	}
	else {
		ctx.moveTo(0, half_tile)
		ctx.lineTo(block, half_tile)
		ctx.moveTo(0, block - half_tile)
		ctx.lineTo(block, block - half_tile)
	}
	ctx.moveTo(0, block)
	ctx.lineTo(block, block)
	ctx.lineTo(block, 0)
	switch (edge) {
		case 2:
			ctx.moveTo(0, block)
			ctx.lineTo(0, 0)
			ctx.lineTo(block, 0)
			break;
		case -1:
		case 20:
			ctx.moveTo(0, block)
			ctx.lineTo(0, 0)
			break;
		case 1:
		case 21:
			ctx.moveTo(0, block)
			ctx.lineTo(0, 0)
			break;
	}
	return cvs
}

const short_brick = (side, edge) => {
	const { cvs, ctx } = init()

}
