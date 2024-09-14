import './style.css'

const loader = document
			   .createElement("div")
			   .setAttribute("class", "loader")

document.getElementById("app").append(loader)

const current = {
	area: localStorage.getItem("curr_area") || "undertown"
}
