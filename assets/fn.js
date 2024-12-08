import { block, tile } from './data.js'

// Terrains

export const create_container = (repeat_size) => {
	const ctn = document.createElement("div")
	ctn.style.width = '100%'
	ctn.style.marginBottom = `${tile}px`
	ctn.style.display = 'grid'
	ctn.style.gridTemplateColumns = `repeat(auto-fit, ${repeat_size})`
	ctn.style.gap = `${tile}px`
	return ctn
}

export const mat_dim = (n) => block * n

const gen_right = (tiles, idx, width = 5) => {
	const ord = [idx]
	while (ord.length < width) {
		const last_idx = ord.length - 1
		curr = tiles[ord[last_idx]].right()
		ord.push(curr)
	}
	return ord
}

const gen_down = (tiles, ids, width = 5, height = 5) => {
	let idx = ids[ids.length - 1]
	while (ids.length < height) {
		ids.push(tiles[idx].down(Math.random()))
		idx = ids[ids.length - 1]
	}
	const ord = []
	for (let i = 0; i < ids.length; ++i)
		ord.push(...gen_right(tiles, ids[i], width))
	return ord
}

export const gen_mats = (tiles, width, height) => {
	const mats = []
	const combos = []
	for (let idx = 0; idx < tiles.length; ++idx)
		if (tiles[idx + 1].right() === idx)
			combos.push([idx, idx + 1])

	for (let idx = 0; idx < tiles.length; ++idx)
		mats.push(tiles, [idx], width, height)

	for (let i = 0; i < combos.length; ++i) {
		const starts = []

		let curr = false
		while (starts.length < height.length) {
			starts.push(combos[i][Number(curr)])
			curr = !curr
		}

		mats.push(tiles, starts, width, height)
	}
	return mats
}
