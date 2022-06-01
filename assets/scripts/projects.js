//const items = document.querySelectorAll("div.item")
//const projects = document.querySelector(".projectsList").children

const getProjectElement = (projects, id) => {
	for (let p of projects) {
		if (p.classList.contains(id)) {
			return p
		}
	}
}

const onBackButtonClick = async (item, box, originalHeight, currentHeight, project, content) => {
	box.classList.remove("itemThing")
	content.classList.remove("itemThing")
	project.classList.remove("show")
	box.style.height = currentHeight
	let heightBeingUsed = currentHeight

	while (heightBeingUsed > parseInt(originalHeight)) {
		heightBeingUsed -= 1
		requestAnimationFrame(() => {
			box.style.height = heightBeingUsed + "px"
		})
	}

//	while (window.getComputedStyle(project).opacity != "0") await sleep(0)

	//await sleep(10)


	const transitionsend = async () => {
		//project.removeChild(document.querySelector(".backButton"))
		box.removeChild(project)
		project.removeEventListener("transitionend", transitionsend)
	}
	project.addEventListener('transitionend', transitionsend)

}

const itemOnClick = async (item, box, type, projectContent, parentContent) => {

	const startHeight = window.getComputedStyle(box).height
	//const bodyStartHeight = screen.height
	const content = parentContent
	box.style.height = startHeight
	box.classList.add("itemThing")
	content.classList.add("itemThing")
	box.appendChild(projectContent)
//	alert(newcoso)
	projectContent.style.display = "block"
	await sleep(1)
	projectContent.classList.add("show")

	let backButton = {}
	if (!projectContent.querySelector(".backButton")) {
		backButton = document.createElement("button")
		backButton.classList.add("backButton")
		backButton.innerText = "< back"
		const whereToAdd = projectContent.querySelector(".content") ?? projectContent
		whereToAdd.appendChild(backButton)
	}

	box.style.height = ""
	box.style.transition = "none"


//	content.style.display = "none"
	await sleep(1)
	const currentHeight = parseInt(window.getComputedStyle(box).height)
	backButton.onclick = () => onBackButtonClick(item, box, startHeight, currentHeight, projectContent, content)
	
	let heightBeingUsed = parseInt(startHeight)
	//let bodyHeightBeingUsed = parseInt(bodyStartHeight)
	box.style.height = startHeight
	box.style.transition = ""
	while (currentHeight > heightBeingUsed) {
		heightBeingUsed += 1
		//bodyHeightBeingUsed += 1
		requestAnimationFrame(() => {
			box.style.height = heightBeingUsed + "px"
			//const bodyHeightToUse = "100% " + bodyHeightBeingUsed + "px"
			//document.body.style.backgroundSize = bodyHeightToUse
		})
	}
}

const boxes = document.querySelectorAll(".box")

for (let box of boxes) {
	let type = box.classList[1]
	if (type.endsWith("s")) {
		type = type.slice(0, -1)
	}
	const items = document.querySelectorAll(".item")
	if (!items) continue

	for (let item of items) {
		const projects = document.querySelector("." + type + "sList")?.children
		if (!projects) continue
		const project = getProjectElement(projects, item.classList[1])
		if (!project) continue

		item.onclick = () => itemOnClick(item, box, type, project, item.parentElement)
	}

	for (let item of items) {
		if (item.cosato || !item.onclick) continue
		item.cosato = true
		item.innerText += " (>) "
	}
}


