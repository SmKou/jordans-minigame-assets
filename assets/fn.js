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

export const gen_mats = (tiles, width, height) => {
	const gen_right = (idx) => {
		const ord = [idx]
		while (ord.length < width)
			ord.push(tiles[ord.at(-1)].right())
		return ord
	}

	const gen_down = (ids) => {
		let idx = ids.at(-1)
		while (ids.length < height)
			ids.push(tiles[ids.at(-1)].down(Math.random()))
		const ord = []
		for (const id of ids)
			ord.push(...gen_right(id))
		return ord
	}

	const combos = []
	for (let idx = 0; idx < tiles.length; ++idx)
		if (tiles[idx + 1] && tiles[idx + 1].right() === idx)
			combos.push([idx, idx + 1])

	const mats = []
	for (let idx = 0; idx < tiles.length; ++idx)
		mats.push(gen_down([idx]))

	for (const combo of combos) {
		const starts = []

		let curr = false
		while (starts.length < height) {
			starts.push(combo[Number(curr)])
			curr = !curr
		}

		mats.push(gen_down(starts))
	}
	return mats
}
