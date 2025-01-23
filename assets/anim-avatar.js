/*
Avatar:
- animatable sprite
- keydown / keyup events
*/

import { sizes, rad, create_section, create_container, create_draw } from "./data"

const { block, tile, half_tile, half, unit } = sizes

const axis = ctx => ctx.fillRect(tile - unit, tile, half, half_tile)
const rot = ctx => ctx.fillRect(tile - unit, half_tile, half, half_tile)

// move_x

const a = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    rot(ctx)
    return cvs
}

const b = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    ctx.translate(tile - unit, tile)
    ctx.rotate(rad(45))
    ctx.translate(unit - tile, -tile)
    rot(ctx)
    return cvs
}

const c = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    ctx.translate(tile - unit, tile)
    ctx.rotate(rad(90))
    ctx.translate(unit - tile, -tile)
    rot(ctx)
    return cvs
}

const d = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.translate(tile, tile)
    ctx.rotate(rad(45))
    ctx.translate(-tile, -tile)
    ctx.fillStyle = "#000"
    axis(ctx)
    ctx.translate(tile - unit, tile)
    ctx.rotate(rad(90))
    ctx.translate(unit - tile, -tile)
    rot(ctx)
    return cvs
}

const e = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    ctx.translate(tile + unit, tile)
    ctx.rotate(rad(270))
    ctx.translate(-(tile + unit), -tile)
    rot(ctx)
    return cvs
}

const f = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    ctx.translate(tile + unit, tile)
    ctx.rotate(rad(315))
    ctx.translate(-(tile + unit), -tile)
    rot(ctx)
    return cvs
}

const move_x = [a, b, c, d, e, f]

// move_y

const g = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    ctx.fillRect(tile - unit, half_tile + half, half, half + half_tile)
    return cvs
}

const h = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    axis(ctx)
    return cvs
}

const j = () => {
    const cvs = new OffscreenCanvas(block, block)
    const ctx = cvs.getContext("2d")
    ctx.fillStyle = "#000"
    ctx.fillRect(tile - unit, half_tile + half, half, half_tile)
    return cvs
}

const move_y = [a, g, h, j, h, g]

const generate = main => {
    const samples_grid = create_section({}, true)
    const sample_frames = [a, b, c, d, e, f, a, g, h, j, h, g, a]
    for (let i = 0; i < sample_frames.length; ++i) {
        const ctnr = create_container("Sample frame: " + i, {
            width: block + "px",
            height: block + "px",
            border: "1px solid black"
        })
        const cvs = document.createElement("canvas")
        cvs.width = block
        cvs.height = block
        const ctx = cvs.getContext("2d")
        ctx.drawImage(sample_frames[i](), 0, 0)
        ctnr.append(cvs)
        samples_grid.append(ctnr)
    }
    main.append(samples_grid)

    const procs = []

    const move_samples_grid = create_section({}, true)
    const dir = {
        left: move_x.toReversed(),
        right: move_x,
        up: move_y,
        down: move_y.slice(0, 3).concat(move_y[2]).concat(move_y.slice(4))
    }
    for (const dx of Object.keys(dir)) {
        const ctnr = create_container("Animation: " + dx, {
            width: block,
            height: block,
            border: "1px solid black",
            overflow: "hidden"
        })
        const cvs = document.createElement("canvas")
        cvs.width = block * dir[dx].length
        cvs.height = block
        cvs.style.position = "absolute"
        const ctx = cvs.getContext("2d")
        for (let i = 0; i < dir[dx].length; ++i)
            ctx.drawImage(dir[dx][i](), block * i, 0)
        ctnr.append(cvs)
        move_samples_grid.append(ctnr)
        procs.push(create_draw(
            [cvs], 
            ({ ipt, ui }) => {
                ipt.style.left = `${-block * ui.frame}px`
                ui.frame++
                if (ui.frame >= dir[dx].length)
                    ui.frame = 0
                return ui
            }, 
            ["cvs"], 
            5
        ))
    }
    main.append(move_samples_grid)

    const avatar_sx = create_section({
        height: block * 3 + "px",
        border: "1px solid green",
        position: "relative"
    })
    const wrapper = document.createElement("div")
    wrapper.style.width = block + "px"
    wrapper.style.height = block + "px"
    wrapper.style.position = "absolute"
    const pos = {
        x: tile,
        y: tile
    }
    wrapper.style.top = (pos.x - tile) + "px"
    wrapper.style.left = (pos.y - tile) + "px"
    
    const avatar = create_container("Animated avatar", {
        width: block,
        height: block,
        overflow: "hidden"
    })
    const max = Math.max(dir.left.length, dir.up.length)
    const cvs = document.createElement("canvas")
    cvs.width = block * max
    cvs.height = block * 3
    cvs.style.position = "absolute"
    const ctx = cvs.getContext("2d")
    for (let i = 0; i < dir.right.length; ++i)
        ctx.drawImage(dir.right[i](), block * i, 0)
    for (let i = 0; i < dir.up.length; ++i)
        ctx.drawImage(dir.up[i](), block * i, block)
    for (let i = 0; i < dir.down.length; ++i)
        ctx.drawImage(dir.down[i](), block * i, block * 2)
    avatar.append(cvs)
    wrapper.append(avatar)
    avatar_sx.append(wrapper)
    
    const move = {
        right: dir.right.length,
        up: dir.up.length,
        down: dir.down.length
    }

    const ui = {
        fps_interval: 200,
        frame: 0,
        dir: 'idle',
        then: Date.now(),
        elapsed: 0
    }

    const add_draw = (ui, cvs, pos, wrapper) => {
        const key_states = {
            w: false,
            a: false,
            s: false,
            d: false
        }

        const update = key => {
            if (!['w', 'a', 's', 'd'].includes(key))
                return;
            key_states[key] = true
            switch (key) {
                case "w":
                    ui.frame = 0
                    ui.dir = "up"
                    return;
                case "a":
                    ui.frame = move.right - 1
                    ui.dir = "left"
                    return;
                case "s":
                    ui.frame = 0
                    ui.dir = "down"
                    return;
                case "d":
                    ui.frame = 0
                    ui.dir = "right"
            }
        }

        const stop = key => {
            key_states[key] = false
            if (!Object.values(key_states).filter(ks => ks).length)
                ui.dir = "idle"
        }

        const speed = 2

        const draw = () => {
            ui.id = requestAnimationFrame(draw)
            ui.now = Date.now()
            ui.elapsed = ui.now - ui.then
            if (ui.elapsed > ui.fps_interval) {
                ui.then = ui.now - (ui.elapsed % ui.fps_interval)

                if (ui.dir === "idle") {
                    cancelAnimationFrame(ui.id)
                    cvs.style.top = 0
                    cvs.style.left = 0
                    return;
                }

                switch (ui.dir) {
                    case "left":
                        pos.x -= speed
                        if (pos.x - tile <= 0) {
                            pos.x = tile
                            ui.dir = "idle"
                            return;
                        }
                        wrapper.style.left = pos.x - tile + "px"
                        break;
                    case "right":
                        pos.x += speed
                        if (pos.x + tile >= avatar_sx.clientWidth) {
                            pos.x = avatar_sx.clientWidth - tile
                            ui.dir = "idle"
                            return;
                        }
                        wrapper.style.left = pos.x - tile + "px"
                        break;
                    case "up":
                        pos.y -= speed
                        if (pos.y <= 0) {
                            pos.y = tile
                            ui.dir = "idle"
                            return;
                        }
                        wrapper.style.top = pos.y - tile + "px"
                        break;
                    case "down":
                        pos.y += speed
                        if (pos.y + tile >= avatar_sx.clientHeight) {
                            pos.y = avatar_sx.clientHeight - tile
                            ui.dir = "idle"
                            return;
                        }
                        wrapper.style.top = pos.y - tile + "px"
                }

                const row = ui.dir === "left" ? 0 : Object.keys(move).indexOf(ui.dir)
                const dt = ui.dir === "left" ? -1 : 1
                cvs.style.top = (-block * row) + "px"
                cvs.style.left = (-block * ui.frame) + "px"
                ui.frame += dt
                if (ui.dir === "left" && ui.frame < 0)
                    ui.frame = move.right - 1
                else if (ui.frame >= move[ui.dir])
                    ui.frame = 0
            }
        }

        return {
            keydown: e => {
                if (key_states[e.key])
                    return;
                update(e.key)
                draw()
            },
            keyup: e => {
                stop(e.key)
            }
        }
    }
    main.append(avatar_sx)
    

    return { add: true, procs, events: { ui, cvs, pos, wrapper, add_draw } }
}

export default generate