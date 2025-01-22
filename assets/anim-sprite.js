import { create_container, create_section, sizes } from "./data"

const { block, tile, half_tile, half } = sizes
const deg = [0, 22.5, 45, 67.5]
const trans = [
    { x: 0, y: 0 },
    { x: half, y: -half},
    { x: half, y: -half},
    { x: half, y: -half}
]

const frames = (idx, width = block, height = block) => {
    const xoff = width - block > 0 ? (width - block) / 2 : 0
    const yoff = height - block > 0 ? (height - block) / 2 : 0
    const cvs = new OffscreenCanvas(width, height)
    const ctx = cvs.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(xoff + half, yoff + tile + half)
    ctx.lineTo(xoff + tile + half, yoff + tile + half)
    ctx.strokeStyle = "#000"
    ctx.stroke()
    ctx.closePath()
    ctx.translate(trans[idx].x, trans[idx].y)
    ctx.translate(xoff + half_tile, xoff + half_tile)
    ctx.rotate(rad(deg[idx]))
    ctx.translate(-xoff - half_tile, -yoff - half_tile)
    ctx.fillStyle = "#000"
    ctx.fillRect(xoff + half, yoff + half, tile, tile)
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
        init(ctx, i)
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

const sample_frames = {
    container: {
        caption: "View positions",
        props: {
            width: 2 * block * 4 + "px",
            height: 2 * block + "px"
        }
    },
    canvas: {
        qty: 4,
        props: {
            width: block * 4,
            height: block,
            position: "absolute"
        },
        draw: (cvs) => {
            for (let i = 0; i < deg.length; ++i)
                cvs.getContext("2d").drawImage(frames(i), block * i, 0)
        }
    },
    draw: {}
}

const contain_canvas = {
    container: {
        caption: "Draw each frame to portion of canvas and each frame, move canvas with css position",
        props: {
            width: block + "px",
            height: block + "px",
            overflow: "hidden"
        }
    },
    canvas: {
        qty: 1,
        props: {
            width: block * 4,
            height: block,
            position: "absolute"
        },
        draw: (cvs) => {
            for (let i = 0; i < deg.length; ++i)
                cvs.getContext("2d").drawImage(frames(i), block * i, 0)
        }
    },
    draw: {
        run_proc: ({ ipt, ui }) => {
            ipt.style.left = `${-block * ui.frame}px`
            ui.fps_interval = ui.frame ? 300 : 900
            ui.frame++
            if (ui.frame >= deg.length)
                ui.frame = 0
            return ui
        },
        input: ['cvs']
    }
}

const canvas_redraw = {
    container: {
        caption: "Draw each frame",
        props: {
            width: block + "px",
            height: block + "px"
        }
    },
    canvas: {
        qty: 1,
        props: {
            width: block,
            height: block
        },
        draw: cvs => cvs
    },
    draw: {
        run_proc: ({ ipt, ui }) => {
            ipt.clearRect(0, 0, block, block)
            ipt.drawImage(frames(ui.frame), 0, 0)
            ui.fps_interval = ui.frame ? 300 : 900
            ui.frame++
            if (ui.frame >= deg.length)
                ui.frame = 0
            return ui
        },
        input: ['ctx']
    }
}

const cycle_layer = {
    container: {
        caption: "Draw canvas for each frame, and each frame, change order with z-index",
        props: {}
    },
    canvas: {
        qty: deg.length,
        props: {
            width: block,
            height: block,
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

const generate = main => {
    const grid = create_section({}, true)
    const methods = [sample_frames, contain_canvas, canvas_redraw, cycle_layer]
    const procs = []
    for (const { container, canvas, draw } of methods) {
        const ctnr = create_container(...container)
        const cvs = create_canvas(...canvas)
        ctnr.append(...cvs)
        grid.append(ctnr)
        procs.push(create_draw(cvs, ...draw))
    }
    main.append(grid)
    return procs
}
export default generate