import './style.css'

const block = 32
const tile = block / 2
const unit = tile / 8

const town = (cvs) => {
	cvs.width = 25 * block
	cvs.height = 20 * block
	const ctx = cvs.getContext("2d")
	ctx.fillStyle = "#000"
	ctx.fillRect(0, 0, cvs.width, cvs.height)
	const boundary = [
		{ x: 1, y: 1 },
		{ x: 6, y: 1 },
		{ x: 6, y: 2 },
		{ x: 7, y: 2 },
		{ x: 7, y: 3 },
		{ x: 8, y: 3 },
		{ x: 8, y: 5 },
		{ x: 7, y: 5 },
		{ x: 7, y: 6 },
		{ x: 6, y: 6 },
		{ x: 6, y: 7 },
		{ x: 8, y: 7 },
		{ x: 8, y: 8 },
		{ x: 9, y: 8 },
		{ x: 9, y: 9 },
		{ x: 12, y: 9 },
		{ x: 12, y: 7 },
		{ x: 13, y: 7 },
		{ x: 13, y: 6 },
		{ x: 15, y: 6 },
		{ x: 15, y: 5 },
		{ x: 17, y: 5 },
		{ x: 17, y: 3 },
		{ x: 18, y: 3 },
		{ x: 18, y: 1 },
		{ x: 24, y: 1 },
		{ x: 24, y: 7 },
		{ x: 22, y: 7 },
		{ x: 22, y: 8 },
		{ x: 19, y: 8 },
		{ x: 19, y: 10 },
		{ x: 18, y: 10 },
		{ x: 18, y: 11 },
		{ x: 15, y: 11 },
		{ x: 15, y: 14 },
		{ x: 17, y: 14 },
		{ x: 17, y: 13 },
		{ x: 18, y: 13 },
		{ x: 18, y: 12 },
		{ x: 20, y: 12 },
		{ x: 20, y: 9 },
		{ x: 21, y: 9 },
		{ x: 21, y: 10 },
		{ x: 22, y: 10 },
		{ x: 22, y: 11 },
		{ x: 24, y: 11 },
		{ x: 24, y: 16 },
		{ x: 23, y: 16 },
		{ x: 23, y: 17 },
		{ x: 21, y: 17 },
		{ x: 21, y: 19 },
		{ x: 14, y: 19 },
		{ x: 14, y: 17 },
		{ x: 13, y: 17 },
		{ x: 13, y: 16 },
		{ x: 12, y: 16 },
		{ x: 12, y: 13 },
		{ x: 10, y: 13 },
		{ x: 10, y: 15 },
		{ x: 9, y: 15 },
		{ x: 9, y: 16 },
		{ x: 8, y: 16 },
		{ x: 8, y: 17 },
		{ x: 6, y: 17 },
		{ x: 6, y: 18 },
		{ x: 5, y: 18 },
		{ x: 5, y: 19 },
		{ x: 1, y: 19 },
		{ x: 1, y: 16 },
		{ x: 2, y: 16 },
		{ x: 2, y: 15 },
		{ x: 3, y: 15 },
		{ x: 3, y: 14 },
		{ x: 5, y: 14 },
		{ x: 5, y: 13 },
		{ x: 7, y: 13 },
		{ x: 7, y: 12 },
		{ x: 4, y: 12 },
		{ x: 4, y: 11 },
		{ x: 2, y: 11 },
		{ x: 2, y: 10 },
		{ x: 1, y: 10 },
		{ x: 1, y: 1 }
	]
	ctx.beginPath()
	ctx.moveTo(boundary[0].x * block, boundary[0].y * block)
	for (let i = 1; i < boundary.length; ++i)
		ctx.lineTo(boundary[i].x * block, boundary[i].y * block)
	ctx.lineWidth = 8
	ctx.strokeStyle = "#aaa"
	ctx.stroke()
	ctx.fillStyle = "#fff"
	ctx.fill()
	ctx.closePath()
	return cvs
}

const pop_map = () => {
	const app = document.getElementById("app")
	const loader = document.querySelector(".loader")
	app.removeChild(loader)
	app.appendChild(town(document.createElement("canvas")))
}
pop_map()
