import sprite from './assets/anim-sprite.js'
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
	anim: { sprite },
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
		case 'anim':
			const actions = select_asset(main)
			for (const action of actions)
				action()
			break;
		case 'trrn':
			console.log(select_asset)
			break;

	}
})

// Quick select: used for graphic debugging

types.value = "anim"
types.dispatchEvent(new Event("change"))

content.value = "sprite"
content.dispatchEvent(new Event("change"))
