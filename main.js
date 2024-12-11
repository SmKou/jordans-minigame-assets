import underground from './assets/trrn-underground.js'

const types = document.getElementById("asset-type-select")
const content = document.getElementById("asset-select")
const main = document.querySelector("main")
const ui = {
	type: '',
	content: ''
}

const erase = () => {
	ui.type = ''
	ui.content = ''
}

const assets = {
	trrn: { underground }
}

const clear = (e) => {
	if (!e) e = main
	while (e.firstChild)
		e.removeChild(e.firstChild)
}

const add_option = (text) => {
	const option = document.createElement("option")
	option.append(document.createTextNode(text))
	return option
}

types.addEventListener("change", e => {
	erase()
	ui.type = e.target.value
	clear(content)
	if (!ui.type) {
		content.append(add_option("Select an asset type first"))
		return;
	}

	if (!assets.hasOwnProperty(ui.type)) {
		content.append(add_option("No assets available yet."))
		return;
	}

	const keys = Object.keys(assets[ui.type])
	if (!keys.length) {
		content.append(add_option("No assets available yet."))
		return;
	}

	content.append(add_option("Select an asset"))

	for (const key of keys) {
		const option = add_option(key[0].toUpperCase() + key.slice(1))
		option.value = key
		content.append(option)
	}
})

content.addEventListener("change", e => {
	ui.content = e.target.value
	clear()

	const select_asset = assets[ui.type][ui.content]
	switch (ui.type) {
		case 'trrn':
			console.log(select_asset)
			for (const tile_set of Object.keys(select_asset.tiles))
				main.append(select_asset.tiles[tile_set]())
			for (const tile_mat of Object.keys(select_asset.mats))
				main.append(select_asset.mats[tile_mat]())
			break;

	}
})
