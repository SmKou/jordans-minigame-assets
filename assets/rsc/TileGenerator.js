export const gen_cvs = (side = block) => {
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

export const gen_square = (square, tiles) => () => {
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

const gen_border = (tile, side = block, line_width = 0.5) {
	const cvs = tile(side)
	const ctx = cvs.getContext("2d")
	ctx.strokeStyle = "#000"
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
	return bordered
		? container
		: [container, gen_sample(data, side, true)]
}

export const gen_terrain = (data, side, width, height) => {
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

export default {
	cvs: gen_cvs,
	squ: gen_square,
	spl: gen_sample,
	trrn: gen_terrain
}
