import { Application, Assets, Sprite, Container } from 'pixi.js'

const app = new Application()

const setup = async () => {
	await app.init({ background: '#1099bb', resizeTo: window })
	document.getElementById('app').appendChild(app.canvas)
}

const preload = async () => {
	const assets = [
		{ alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
		{ alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
		{ alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
		{ alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
		{ alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
		{ alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
		{ alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
		{ alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' }
	]
	await Assets.load(assets)
}

const add_background = (app) => {
	const background = Sprite.from('background')
	background.anchor.set(0.5)

	if (app.screen.width > app.screen.height) {
		background.width = app.screen.width * 1.2
		background.scale.y = background.scale.x
	}
	else {
		background.height = app.screen.height  * 1.2
		background.scale.x = background.scale.y
	}

	background.x = app.screen.width / 2
	background.y = app.screen.height / 2

	app.stage.addChild(background)
}

const add_fish = (app, fishes) => {
	const fish_container = new Container()
	app.stage.addChild(fish_container)

	const count = 20
	const fish_types = 5
	for (let i = 0; i < count; ++i) {
		const fish_asset = "fish" + i % fish_types
		const fish = Sprite.from(fish_asset)
		fish.anchor.set(0.5)

		fish.direction = Math.random() * Math.PI * 2
		fish.speed = 2 + Math.random() * 2
		fish.turnSpeed = Math.random() - 0.8

		fish.x = Math.random() * app.screen.width
		fish.y = Math.random() * app.screen.height
		fish.scale.set(0.5 + Math.random() * 0.2)

		fish_container.addChild(fish)
		fishes.push(fish)
	}
}

const anim_fish = (app, fishes, time) => {
	const delta = time.deltaTime
	const stage_padding = 100
	const bound_width = app.screen.width + stage_padding
	const bound_height = app.screen.height + stage_padding

	fishes.forEach(fish => {
		fish.direction += fish.turnSpeed * 0.01
		fish.x += Math.sin(fish.direction) * fish.speed
		fish.y += Math.cos(fish.direction) * fish.speed
		fish.rotation = -fish.direction - Math.PI / 2

		if (fish.x < -stage_padding)
			fish.x += bound_width
		if (fish.x > app.screen.width + stage_padding)
			fish.x -= bound_width
		if (fish.y < -stage_padding)
			fish.y += bound_height
		if (fish.y > app.screen.height + stage_padding)
			fish.y -= bound_height
	})
}

const add_water = (app) => {

}

(async () => {
	await setup()
	await preload()

	add_background(app)

	const fishes = []
	add_fish(app, fishes)
	app.ticker.add((time) => anim_fish(app, fishes, time))
})()
