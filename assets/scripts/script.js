const title = document.querySelector(".titleDiv h2.vinchetitle")
const centeredStuff = document.querySelector(".centeredStuff")
let titleTexts = ["\u200b", "_"]


const setTitleText = (text) => {
	title.innerHTML = text + "_"
	titleTexts = [text, text + "_"]
	return titleTexts
}

const titleAnimation = async () => {
	const coso = "vinche@air ~ % "
	blinkAnimation()
	await sleep(1000)
	setTitleText(coso)
	await sleep(1000)
	setTitleText(coso + ".")
	await sleep(100)
	setTitleText(coso + "./")
	await sleep(100)
	setTitleText(coso + "./V")
	await sleep(100)
	setTitleText(coso + "./Vi")
	await sleep(100)
	setTitleText(coso + "./Vin")
	await sleep(100)
	setTitleText(coso + "./Vinc")
	await sleep(100)
	setTitleText(coso + "./Vinch")
	await sleep(100)
	setTitleText(coso + "./Vinche")
	await sleep(100)
	setTitleText(coso + "./Vinche.")
	await sleep(100)
	setTitleText(coso + "./Vinche.z")
	await sleep(100)
	setTitleText(coso + "./Vinche.zs")
	await sleep(100)
	setTitleText(coso + "./Vinche.zsh")
}

const blinkAnimation = async () => {
	let a = 0
	while (true) {
		title.innerHTML = titleTexts[a]
		a = (a + 1) % 2
		await sleep(250)
	}
}

const toggleBoxes = async () => {
	const boxes = centeredStuff.querySelectorAll(".box")
	for (let box of boxes) {
		box.classList.toggle("hidden")
		await sleep(125)
	}
}

const htmlSucksAndAllowsHrefOnlyOnButtons = (stronzo) => {
	return window.open(stronzo, "_blank")
}
