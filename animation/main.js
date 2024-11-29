/*
 * Animation: rolling square
 * 32 x 32
 *
 * How to animate:
 *
 * 1. Contained canvas positioning
 * Draw each frame to portion of canvas
 * Move canvas with transform each frame
 *
 * 2. Canvas redraw
 * Draw each frame
 *
 * 3. Cycle frames visibility
 * Draw canvas for each frame
 * Change order with z-index each frame
 */

import init from '/exp_1.js'

init(document.getElementById("exp-1"))

const block = 64
const unit = block / 4
const rad = (deg) => deg * Math.PI / 180

const cvs_exp_2 = document.querySelector("#exp-2 canvas")
const exp_2 = cvs_exp_2.getContext("2d")


const cvs_exp_3 = document.querySelectorAll("#exp-3 canvas")
const exp_3 = cvs_exp_3.map(cvs => cvs.getContext("2d"))

