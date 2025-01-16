import { create_grid_container, create_container, sizes } from "./data"

const { block, tile, half_tile, half, unit, point } = sizes

const player_frames = {
    move: {
        up: [
            ctx => {
                ctx.beginPath()
                ctx.moveTo(tile + half_tile - point, half_tile)
                ctx.ellipse(tile, half_tile, half_tile - point, half_tile - point, 0, 0, 2 * Math.PI)
                ctx.moveTo(half_tile - point, tile - point)
                ctx.rect(half_tile - point, tile - point, tile + unit, unit + point)
                ctx.fillStyle = "#fff"
                ctx.fill()
                
                ctx.beginPath()
                ctx.moveTo(tile + half_tile - unit, half_tile)
                ctx.ellipse(tile, half_tile, half_tile - unit, half_tile - unit, 0, 0, 2 * Math.PI)
                ctx.moveTo(half_tile, tile)
                ctx.lineTo(3 * half_tile / 4, tile)
                ctx.strokeStyle = "#000"
                ctx.stroke()


            },
            ctx => {}
        ],
        down: [],
        side: []
    },
    idle: {
        up: ctx => {},
        down: ctx => {},
        side: (ctx, face_left = false) => {} 
    }
}

const move_player = () => {}

const stop_player = () => {}

const generate = main => {
    for (const dir of Object.keys(player_frames.move)) {
        const container = create_grid_container()
        const frames = player_frames.move[dir]
        container.title = "Player move: " + dir
        for (const frame of frames) {
            const cvs = create_canvas(1, { width: block, height: block }, cvs => frame(cvs.getContext("2d")))()
            container.append(cvs)
        }
        main.append(container)
    }

    const idle_container = create_grid_container()
    idle_container.title = "Player idle views"
    for (const frame of Object.keys(player_frames.idle)) {
        const cvs = create_canvas(1, {  width: block, height: block }, cvs => frame(cvs.getContext("2d")))()
        idle_container.append(cvs)
    }
    main.append(idle_container)

    main.append(document.creaateElement("hr"))

    const player = create_container("Interactive player", { width: block, height: block, position: "relative" })
    main.append(player)
    return { move_player, stop_player }
}

export default generate