//const items = document.querySelectorAll("div.item")
//const projects = document.querySelector(".projectsList").children

const getProjectElement = (projects, id) => {
	for (let p of projects) {
		if (p.classList.contains(id)) {
			return p
		}
	}
}

const onBackButtonClick = async(item, box, originalHeight, currentHeight, project, content) => {
	project.style.zIndex = ""
	box.classList.remove("itemThing")
	content.classList.remove("itemThing")
	project.classList.remove("show")
	box.dataset.openItem = ""
	box.style.height = currentHeight
	let heightBeingUsed = currentHeight

	if (heightBeingUsed > parseInt(originalHeight)) {
		box.style.height = originalHeight	
	}
	
	await sleep(interval * 10)

	if (box.dataset.openItem == project.classList[1]) return
	box.removeChild(project)
}

const itemOnClick = async(item, box, type, projectContent, parentContent) => {

	const startHeight = window.getComputedStyle(box).height
	const content = parentContent
	projectContent.style.zIndex = 5
	box.dataset.openItem = item.classList[1]
	box.classList.add("itemThing")
	content.classList.add("itemThing")

	box.appendChild(projectContent)
	projectContent.style.display = "block"
	await sleep(1)
	projectContent.classList.add("show")

	let backButton = {}
	const contentOrProj = projectContent.querySelector(".content") ?? projectContent
	if (!projectContent.querySelector(".backButton")) {
		backButton = document.createElement("button")
		backButton.classList.add("backButton")
		backButton.innerText = "< back"
		contentOrProj.appendChild(backButton)
	}


//	content.style.display = "none"
	await sleep(1)
	//const currentHeight = parseInt(window.getComputedStyle(box).height)
	const currentHeight = parseInt(window.getComputedStyle(contentOrProj).height)
	backButton.onclick = () => onBackButtonClick(item, box, startHeight, currentHeight, projectContent, content)

	let heightBeingUsed = parseInt(startHeight)
	//let bodyHeightBeingUsed = parseInt(bodyStartHeight)
	if (currentHeight > heightBeingUsed) {
		box.style.height = currentHeight + "px"
		await sleep(1000)
	}
}

const allBoxes = document.querySelectorAll(".box")

const fixBox = (box) => {
	const type = box.classList[1]
	const hk = "box-" + type + "-height"
	const cont = box.querySelector(".content") ?? box
	if (cookies[hk]) {
		box.style.height = cookies[hk]
	} else {
		box.style.height = getComputedStyle(cont).minHeight
	}
	const fix = () => {
		const hg = getComputedStyle(cont).height
		if (hg === cookies[hk]) return
		box.style.height = hg
		cookies[hk] = hg
	}
	if (document.readyState === "complete") fix()
	else addEventListener("load", fix)
}

const fixAllBoxes = () => {
	for (let box of allBoxes) {
		fixBox(box)
	}
}

for (let box of allBoxes) {
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