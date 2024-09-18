const oval = ({ ctx, x, y, w, h, rot = false }) => {
    console.log("oval")
}

const triangle = ({ ctx, x, y, size, rot = false, right = false, type = 0 } = {}) => {
    console.log("triangle")
}

const rect = ({ ctx, x, y, w, h, rot = false } = {}) => {
    console.log("rectangle")
}
// includes: rhombus

export default { rect }