export const init = (ctn) => {
	const cvs = document.createElement("canvas")
	cvs.width = ctn.clientWidth * 4
	cvs.height = ctn.clientHeight

	const ctx = cvs.getContext("2d")
	ctx.fillStyle = "#000"
	ctx.fillRect(0, 0, 32, 32)

	ctn.append(cvs)
}
