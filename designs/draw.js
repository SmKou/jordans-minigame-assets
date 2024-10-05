/* Shapes */
// const stroke = ({ ctx, r, g, b, a }) => ctx.fillStyle = `rgb(${r} ${g} ${b} / ${a}%)`
// const fill = ({ ctx, r, g, b, a }) => ctx.strokeStyle = `rgb(${r} ${g} ${b} / ${a}%)`
//
// const oval = ({ ctx, x, y, w, h, rot = false }) => {
//     const rad_x = w / 2
//     const rad_y = h / 2
//     ctx.translate(x, y)
//     ctx.ellipse(0 - rad_x, 0 - rad_y, rad_x, rad_y, rot ? Math.PI / 2 : 0, 0, Math.PI * 2)
// }
//
// const triangle = ({ ctx, x, y, size, rot = false, right = false, type = 0, rgba } = {}) => {}
//
// const rect = ({ ctx, x, y, w, h, rot = false, rgba } = {}) => {}
// // includes: rhombus
//
// const trapezoid = ({ ctx, x, y, size, rot = false, rots = 0, rgba } = {}) => {}
//
// const parallelogram = ({ ctx, x, y, size, rot = false, rots = 0, flip = false, rgba } = {}) => {}
//
// const pentagon = ({ ctx, x, y, size, rot = false, rots = 0, rgba } = {}) => {}
//
// const hexagon = ({ ctx, x, y, size, rot = false, rgba } = {}) => {}
//
// const octagon = ({ ctx, x, y, size, rgba } = {}) => {}
//
// const star = ({ ctx, x, y, size, pts = 3, rot = false, rots = 0, rgba } = {}) => {}



/* Terrain tiles */
const tile = 32
const half = tile / 2
const area = tile / 4
const unit = tile / 8

document.querySelectorAll('canvas').forEach(cvs => {
	cvs.width = tile
	cvs.height = tile
})

for (let i = 2; i <= 12; ++i) {
	document.querySelectorAll('.col-' + i).forEach(col => {
		col.style.gridColumn = 'span ' + i
		col.width = tile * i
	})
	document.querySelectorAll('.row-' + i).forEach(row => {
		row.style.gridRow = 'span ' + i
		row.height = tile * i
	})
}

const rock_terrain = document.getElementById("rock-terrain").getContext("2d")
rock_terrain.lineWidth = 2
rock_terrain.strokeStyle = '#0007'
rock_terrain.strokeRect(half - unit, half - area, area, half)
rock_terrain.strokeRect(half, 0, half - area, half)
rock_terrain.strokeRect(area, half, half - area, half)
rock_terrain.strokeRect(0 - unit, 0 - unit, half - area, half)
rock_terrain.strokeRect(tile - unit, 0 - unit, half - area, half)
rock_terrain.strokeRect(tile - unit, tile - area, half - area, half)
rock_terrain.strokeRect(0 - unit, tile - area, half - area, half)

const cave_terrain = document.getElementById("cave-terrain").getContext("2d")
cave_terrain.lineWidth = 2
cave_terrain.fillStyle = '#000'
cave_terrain.fillRect(0, 0, tile, tile)
cave_terrain.strokeStyle = '#fff7'
cave_terrain.strokeRect(half - unit, half - area, area, half)
cave_terrain.strokeRect(half, 0, half - area, half)
cave_terrain.strokeRect(area, half, half - area, half)
cave_terrain.strokeRect(0 - unit, 0 - unit, half - area, half)
cave_terrain.strokeRect(tile - unit, 0 - unit, half - area, half)
cave_terrain.strokeRect(tile - unit, tile - area, half - area, half)
cave_terrain.strokeRect(0 - unit, tile - area, half - area, half)

const dirt_terrain = document.getElementById("dirt-terrain").getContext("2d")


const grass_terrain = document.getElementById("grass-terrain").getContext("2d")

const water_terrain = document.getElementById("water-terrain").getContext("2d")

const deep_water_terrain = document.getElementById("deep-water-terrain").getContext("2d")

const sludge_terrain = document.getElementById("sludge-terrain").getContext("2d")

const lava_rock_terrain = document.getElementById("lava-rock-terrain").getContext("2d")

const magma_terrain = document.getElementById("magma-terrain").getContext("2d")

const ice_terrain = document.getElementById("ice-terrain").getContext("2d")

const snow_terrain = document.getElementById("snow-terrain").getContext("2d")

const planks_terrain_2v = document.getElementById("planks-terrain-2v").getContext("2d")

const planks_terrain_2h = document.getElementById("planks-terrain-2h").getContext("2d")

const planks_terrain_4v = document.getElementById("planks-terrain-4v").getContext("2d")

const planks_terrain_4h = document.getElementById("planks-terrain-4h").getContext("2d")

const planks_terrain_8v = document.getElementById("planks-terrain-8v").getContext("2d")

const planks_terrain_8h = document.getElementById("planks-terrain-8h").getContext("2d")

const bricks_terrain_1 = document.getElementById("bricks-terrain-1").getContext("2d")

const bricks_terrain_2 = document.getElementById("bricks-terrain-2").getContext("2d")

const bricks_terrain_4 = document.getElementById("bricks-terrain-4").getContext("2d")

// Pattern terrain
const pavement_terrain = document.getElementById("pavement-terrain").getContext("2d")
