import { units, rad, create_grid_container, create_container, create_canvas } from './data.js'

const n = 120
const { block, tile, half_tile, half } = units
const dim = block * 2
const deg = [0, 22.5, 45, 67.5]
const trans = [
	{ x: 0, y: 0 },
	{ x: half, y: -half},
	{ x: half, y: -half},
	{ x: half, y: -half}
]

const frames = function(idx) {
    const offset = block / 2
	const cvs = new OffscreenCanvas(dim, dim)
	const ctx = cvs.getContext("2d")

    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.moveTo(offset + half, offset + half + tile)
    ctx.lineTo(offset + half + tile, offset + half + tile)
    ctx.stroke()
    ctx.closePath()

    ctx.translate(trans[idx].x, trans[idx].y)
	ctx.translate(offset + half_tile, offset + half_tile)
	ctx.rotate(rad(deg[idx]))
	ctx.translate(-offset - half_tile, -offset - half_tile)

	ctx.fillStyle = '#000'
	ctx.fillRect(offset + half, offset + half, tile, tile)

	return cvs
}

const method_a = [
    {
        container: create_container(
            "Spritesheet using set timeout", 
            { overflow: "hidden", width: dim, height: dim }
        ),
        canvas: create_canvas(1, { width: dim * 4, height: dim, position: "absolute" },
            function(cvs) {
                const ctx = cvs.getContext("2d")
                for (let i = 0; i < deg.length; ++i)
                    ctx.drawImage(frames(i), dim * i, 0)
            }
        ),
        draw: function(arr) {
            const ui = {
                fps_interval: 900,
                frame: 0
            }
            const cvs = arr[0]
            const draw = function() {
                cvs.style.left = `${-dim * ui.frame}px`
                ui.fps_interval = ui.frame ? 300 : 900
                ui.frame++
                if (ui.frame >= deg.length) ui.frame = 0
                setTimeout(draw, ui.fps_interval)
            }
            return draw
        }
    },
    {
        container: create_container(
            "Spritesheet using request frame", 
            { overflow: "hidden", width: dim, height: dim}
        ),
        canvas: create_canvas(1, { width: dim * 4, height: dim, position: "absolute"},
            function(cvs) {
                const ctx = cvs.getContext("2d")
                for (let i = 0; i < deg.length; ++i)
                    ctx.drawImage(frames(i), dim * i, 0)
            }
        ),
        draw: function(arr) {
            const ui = {
                fps_interval: 900,
                frame: 0,
                then: Date.now(),
                elapsed: 0
            }
            const cvs = arr[0]
            const draw = function() {
                requestAnimationFrame(draw)
                ui.now = Date.now()
                ui.elapsed = ui.now - ui.then
                if (ui.elapsed > ui.fps_interval) {
                    ui.then = ui.now - (ui.elapsed % ui.fps_interval)
                    cvs.style.left = `${-dim * ui.frame}px`
                    ui.fps_interval = ui.frame ? 300 : 900
                    ui.frame++
                    if (ui.frame >= deg.length) ui.frame = 0
                }
            }
            return draw
        }
    }
]

const method_b = [
    {
        container: create_container(
            "Sprites using set timeout", 
            { width: dim, height: dim }
        ),
        canvas: create_canvas(deg.length, { width: dim, height: dim, position: "absolute", background: "white" },
            (cvs, i) => cvs.getContext("2d").drawImage(frames(i), 0, 0)
        ),
        draw: function(arr) {
            const ui = {
                fps_interval: 900,
                frame: 0,
                z: 1
            }
            const draw = () => {
                arr[ui.frame].style.zIndex = ui.z
                ui.fps_interval = ui.frame ? 300 : 900
                ui.z++
                ui.frame++
                if (ui.frame >= deg.length) ui.frame = 0
                setTimeout(draw, ui.fps_interval)
            }
            return draw
        }
    },
    {
        container: create_container(
            "Sprites using request frame", 
            { width: dim, height: dim }
        ),
        canvas: create_canvas(deg.length, { width: dim, height: dim, position: "absolute", background: "white" },
            (cvs, i) => cvs.getContext("2d").drawImage(frames(i), 0, 0)
        ),
        draw: function(arr) {
            const ui = {
                fps_interval: 900,
                frame: 0,
                then: Date.now(),
                elapsed: 0,
                z: 1
            }
            const draw = () => {
                requestAnimationFrame(draw)
                ui.now = Date.now()
                ui.elapsed = ui.now - ui.then
                if (ui.elapsed > ui.fps_interval) {
                    ui.then = ui.now - (ui.elapsed % ui.fps_interval)
                    arr[ui.frame].style.zIndex = ui.z
                    ui.fps_interval = ui.frame ? 300 : 900
                    ui.z++
                    ui.frame++
                    if (ui.frame >= deg.length) ui.frame = 0
                }
            }
            return draw
        }
    }
]

const generate = (main) => {
    const grids = [...method_a, ...method_b].map(method => ({ 
        method, 
        grid: create_grid_container({ borderBottom: `3px solid rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }) 
    }))
    const run_proc = []
    for (const { method, grid } of grids) {
        const { container, canvas, draw } = method
        for (let idx = 0; idx < n; ++idx) {
            const ctnr = container()
            const cvs = canvas()
            ctnr.append(...cvs)
            grid.append(ctnr)
            run_proc.push(draw(cvs))
        }
        main.append(grid)
    }
    return run_proc
}

const generate_test = main => {
    const grid = create_grid_container()
    const run_proc = []
    const { container, canvas, draw } = method_a[1]
    for (let idx = 0; idx < n * 5; ++idx) {
        const ctnr = container()
        const cvs = canvas()
        ctnr.append(...cvs)
        grid.append(ctnr)
        run_proc.push(draw(cvs))
    }
    main.append(grid)
    return run_proc
}
// method_a(reqFrame): n * 4
// method_b(reqFrame): n * 3

export default generate_test