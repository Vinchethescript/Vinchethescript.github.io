const title = document.querySelector(".titleDiv h2.vinchetitle")
const centeredStuff = document.querySelector(".centeredStuff")
const boxes = document.querySelector(".boxes")
const zwsp = "\u200b"
let titleTexts = [zwsp, "_"]
let animateTitle = true


const setTitleText = (text) => {
	title.innerHTML = text + (animateTitle ? "_" : zwsp)
	titleTexts = [text + zwsp, text + "_"]
	return titleTexts
}

const titleAnimation = async () => {
	const startWithTitle = !document.cookie
	if (startWithTitle) {
		toggleBoxes()
		alwaysUpdateAge()
	}
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
	if (startWithTitle) {
		await sleep(200)
		setTitleText(coso + "./Vinche.zsh<br>")
		await sleep(1000)


		boxes.classList.remove("kindaRemoved")
		await sleep(100)
		boxes.classList.remove("hidden")
		title.onclick = toggleBoxes
		animateTitle = false
		setTitleText(coso + "./Vinche.zsh")
		document.body.classList.add("background")
		makeStars()
		removeRandomStars()
		toggleBoxes()
		await sleep(500)
		animateTitle = true
		await sleep(500)
		document.body.classList.add("animate")
	}
}

const blinkAnimation = async () => {
	let a = 0
	while (true) {
		title.innerHTML = titleTexts[a]
		a = animateTitle ? (a + 1) % 2 : 0
		await sleep(250)
	}
}

const toggleBoxes = async () => {
	const allBoxes = centeredStuff.querySelectorAll(".box")
	for (let box of allBoxes) {
		box.classList.toggle("hidden")
		await sleep(125)
	}
}

const htmlSucksAndAllowsHrefOnlyOnButtons = (stronzo) => {
	return window.open(stronzo, "_blank")
}
