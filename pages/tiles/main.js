import tiles from '../../js/tiles.js'

const app = document.getElementById("app")
const fragment = new DocumentFragment()
console.log(fragment)

const size = 64
const tile = size / 2
const unit = tile / 8

for (const tile of Object.keys(tiles)) {
	const cvs = document.createElement("canvas")
	cvs.width = 64
	cvs.height = 64
	const ctx = cvs.getContext("2d")
	ctx.drawImage(tiles[tile](unit), 0, 0)
	ctx.drawImage(tiles[tile](unit), tile, 0)
	ctx.drawImage(tiles[tile](unit), 0, tile)
	ctx.drawImage(tiles[tile](unit), tile, tile)
	fragment.append(cvs)
}

app.append(fragment)
