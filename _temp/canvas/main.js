const maps from 'js/maps.js'

/*
 * Preload:
 * Determine dimensions for app view
 *
 * Load:
 * Create canvas elementgit
 */

const preload = () => {
	const width = (() => {
		const cw = document.getElementById('app').clientWidth
		const xu = cw >= 2560 ? 64
		: cw <= 1280 ? 16
		: 32
		return {
			view: Math.ceil((cw - xu) / xu),
			area: xu,
			tile: xu / 2,
			unit: xu / 8
		}
	})()
	const height = (() => {
		const ch = document.getElementById('app').clientHeight
		const yu = ch >= 2560 ? 64
		: ch <= 1280 ? 16
		: 32
		return {
			view: Math.ceil((ch - yu) / yu),
			area: yu,
			tile: yu / 2,
			unit: yu / 8
		}
	})()
	return { width, height }
}

const load = (app) => {
	const scene = maps['sample1']
	const cvs = document.createElement('canvas')
	cvs.width = scene.width * app.width.area
	cvs.height = scene.height * app.height.area
	app.cvs = cvs
	app.ctx = app.cvs.getContext('2d')
}

const generate = () => {}

window.onload = () => {
	const app = preload()
	load(app)
}

window.onresize = () => {}
