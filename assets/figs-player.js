import { units, create_grid_container } from "./data"

const { block, tile, half_tile, half, unit } = units

const head = ctx => {
    ctx.strokeStyle = "#000"
    ctx.moveTo(half_tile + unit, unit)
    ctx.ellipse(tile, half_tile, half_tile + half, half_tile + half, 0, 0, Math.PI * 2)
    ctx.stroke()
}

// -1: face left, 1: face right
// const eyes = (ctx, expression, side) => {
//     const offset = side === -1 ? 
//     ctx.moveTo()
// }

const frames = (dir, idx) => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.beginPath()
    head(ctx)

}

const generate = (main) => {
    const grid = create_grid_container()
    const methods = []
    
}
export default generate
/*
const generate = (main) => {
    const grid = create_grid_container()
    const methods = [contained_canvas_position, canvas_redraw, cycle_frame_layer, sample]
    const run_proc = []
    for (const {container, canvas, draw} of methods) {
        const ctnr_elm = container()
        const cvs_elms = canvas()
        ctnr_elm.append(...cvs_elms)
        grid.append(ctnr_elm)
        run_proc.push(draw(cvs_elms))
    }
    main.append(grid)
    return run_proc
}

export default generate
*/