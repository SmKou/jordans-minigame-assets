import { create_container, create_section, sizes } from "./data";

const qty = 120
const { block, tile, half_tile, half } = sizes
const dim = 2 * block
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
    ctx.beginPath()
    ctx.moveTo(offset + half, offset + half + tile)
    ctx.lineTo(offset + half + tile, offset + half + tile)
    ctx.strokeStyle = "#000"
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

const create_canvas = (qty, props, init) => {
    const { width, height, ...cssprops } = props
    const arr = []
    for (let i = 0; i < qty; ++i) {
        const cvs = document.createElement("canvas")
        cvs.width = width
        cvs.height = height
        for (const prop of Object.keys(cssprops))
            cvs.style[prop] = cssprops[prop]
        const ctx = cvs.getContext("2d")
        init(ctx)
        arr.push(cvs)
    }
    return arr
}

const create_draw = (arr, run_proc, input) => {
    let ui = {
        fps_interval: 900,
        frame: 0,
        then: Date.now(),
        elapsed: 0
    }
    let ipt;
    switch (input[0]) {
        case "arr":
            ipt = arr
            break;
        case "cvs":
            ipt = arr[0]
            break;
        case "ctx":
            ipt = arr[0].getContext("2d")
            break;
    }
    const draw = () => {
        requestAnimationFrame(draw)
        ui.now = Date.now()
        ui.elapsed = ui.now - ui.then
        if (ui.elapsed > ui.fps_interval) {
            ui.then = ui.now - (ui.elapsed % ui.fps_interval)
            ui = run_proc({ ipt, ui })
        }
    }
}

const a = {
    container: {
        caption: "Spritesheet using request frame",
        props: {
            width: dim,
            height: dim,
            overflow: "hidden"
        }
    },
    canvas: {
        qty: 1,
        props: {
            width: dim * 4,
            height: dim,
            position: "absolute"
        },
        draw: cvs => {
            for (let i = 0; i < deg.length; ++i)
                cvs.getContext("2d").drawImage(frames(i), dim * i, 0)
        }
    },
    draw: {
        run_proc: ({ ipt, ui }) => {
            ipt.style.left = `${-dim * ui.frame}px`
            ui.fps_interval = ui.frame ? 300 : 900
            ui.frame++
            if (ui.frame >= deg.length)
                ui.frame = 0
            return ui
        },
        input: ["cvs"]
    }
}

const b = {
    container: {
        caption: "Sprites using request frame",
        props: {
            width: dim,
            height: dim
        }
    },
    canvas: {
        qty: deg.length,
        props: {
            width: dim,
            height: dim,
            position: "absolute",
            background: "white"
        },
        draw: (cvs, idx) => {
            cvs.getContext("2d").drawImage(frames(idx), 0, 0)
        }
    },
    draw: {
        run_proc: ({ ipt, ui }) => {
            if (!ui.z)
                ui.z = 1
            ipt[ui.frame].style.zIndex = ui.z
            ui.fps_interval = ui.frame ? 300 : 900
            ui.z++
            ui.frame++
            if (ui.frame >= deg.length)
                ui.frame = 0
            return ui
        },
        input: ["arr"]
    }
}

export const generate = main => {
    const procs = []
    for (const method of [a, b]) {
        const rgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
        const grid = create_section({
            borderBottom: `3px solid rgb(${rgb.join(", ")})`
        }, true)
        const { container, canvas, draw } = method
        for (let i = 0; i < qty; ++i) {
            const ctnr = create_container(...container)
            const cvs = create_canvas(...canvas)
            ctnr.append(cvs)
            grid.append(ctnr)
            procs.push(create_draw(cvs, ...draw))
        }
        main.append(grid)
    }
    return procs
}

const lim = 5
const upper_lim_test = main => {
    let procs = []
    for (let i = 0; i < lim; ++i)
        procs = procs.concat(generate(main))
    return procs
}

export default upper_lim_test