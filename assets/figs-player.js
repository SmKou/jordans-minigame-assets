import { create_grid_container, create_container, create_canvas, sizes } from "./data"

const { block, tile, half_tile, half, unit, point } = sizes

const fill = ctx => {
    ctx.fillStyle = "#fff"
    ctx.fill()
}

const stroke = ctx => {
    ctx.strokeStyle = "#000"
    ctx.stroke()
}

const idle_y = is_up => {
    const cvs = new OffscreenCanvas(tile + half_tile, block + tile)
    const ctx = cvs.getContext("2d")
    // head
    // shoulders
    // left arm/leg
    // right arm/leg

    return cvs
}

const move_y = is_up => {}

const idle_x = is_left => {
    const cvs = new OffscreenCanvas(tile + half_tile, block + tile)
    const ctx = cvs.getContext("2d")
}

const move_x = is_left => {}

const move_player = () => {
    w: () => {

    }
}

const stop_player = () => {
    keyup
}

const generate = main => {
    const grid = create_grid_container()

    const size_sample = document.createElement("canvas")
    size_sample.width = block
    size_sample.height = block
    size_sample.style.marginRight = half_tile + "px"
    const s = Object.keys(sizes)
    const ss_ctx = size_sample.getContext("2d")
    ss_ctx.fillStyle = "#000"
    ss_ctx.fillRect(0, 0, block, block)
    ss_ctx.beginPath()
    for (let i = 0; i < s.length; ++i) {
        ss_ctx.moveTo(0, half + i * half)
        ss_ctx.lineTo(sizes[s[i]], half + i * half)
    }
    ss_ctx.strokeStyle = "#fff"
    ss_ctx.stroke()
    grid.append(size_sample)

    const get_frame = (fn, ipt = false) => {
        const cvs = document.createElement("canvas")
        cvs.width = block
        cvs.height = block
        cvs.style.marginRight = half_tile + "px"
        const ctx = cvs.getContext("2d")
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, block, block)
        ctx.drawImage(fn(ipt), half_tile, 0)
        return cvs
    }
    grid.append(get_frame(idle_y, true))
    grid.append(get_frame(idle_y))

    main.append(grid)
}

export default generate