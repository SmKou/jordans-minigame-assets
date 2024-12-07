import { block, tile, half_tile, half, unit } from 'data.js'

const jagged = [
	{
		right: () => 1,
		down: (r) => {
			if (r < .3) return 0
			if (r < .6) return 1
			if (r < .8) return 2
			return 3
		},
		draw(border = 0) {
			const cvs = new OffscreenCanvas(tile, tile)
			const ctx = cvs.getContext("2d", { alpha: false })
			if (border > 0)
				return cvs

			ctx.beginPath()
			ctx.moveTo(half, 0)
			ctx.lineTo(tile, half_tile)
			ctx.moveTo(half, half_tile)
			ctx.lineTo(tile, tile)
			ctx.strokeStyle = '#ddd'
			ctx.stroke()

			return cvs
		}
	}
]
