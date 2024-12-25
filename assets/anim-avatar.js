import { units, rad, create_grid_container, create_container, create_canvas } from './data.js'

const { block, tile, half_tile, half } = units
const side_matrices = []
const back_matrices = []

const sample_side = {
	container: create_container("Frames of side view", { width: block, height: block }),
	canvas: create_canvas(6, { width: block, height: block },
		function(cvs, i) {}
	)
}

const sample_back = {
	container: create_container("Frames of back view", { width: block, height: block }),
	canvas: create_canvas(6, { width: block, height: block },
		function(cvs, i) {}
	)
}

const avatar = {
	container: create_container("Working avatar", { width: block, height: block }),
	canvas: create_canvas(),
	draw: function(arr) {}
}

export default (main) => {
	const grid = create_grid_container()
	const run_proc = []
	for (const { container, canvas, draw } of [sample, avatar]) {
		const ctnr = container()
		const arr = canvas()
		ctnr.append(...arr)
		grid.append(ctnr)
		main.append(grid)

		if (draw)
			run_proc.push(draw(arr))
	}
	return run_proc
}
