const title = document.querySelector(".titleDiv h2.vinchetitle")
const centeredStuff = document.querySelector(".centeredStuff")
const bottomText = centeredStuff.querySelector(".bottomText")
const boxes = document.querySelector(".boxes")
const zwsp = "\u200b"
const interval = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--interval').trim())
let titleTexts = [zwsp, "_"]
let animateTitle = true


const setTitleText = (text) => {
	title.innerHTML = text + (animateTitle ? "_" : zwsp)
	titleTexts = [text + zwsp, text + "_"]
	return titleTexts
}

const titleAnimation = async() => {
	const startWithTitle = !document.cookie
	if (startWithTitle) {
		toggleBoxes()
		alwaysUpdateAge()
	}
	const ps1 = "vinche@rpi ~ % "
	cycleText()
	await sleep(interval * 10)
	setTitleText(ps1)
	await sleep(interval * 10)
	
	const name = "./Vinche.zsh"
	const full = ps1 + name
	for (let i = 1; i < name.length + 1; i++) {
		setTitleText(ps1 + name.slice(0, i))
		await sleep(interval)
	}

	if (startWithTitle) {
		const texts = titleTexts
		await sleep(interval * 2)
		setTitleText(full + "<br>")
		boxes.classList.remove("kindaRemoved")
		fixAllBoxes()
		await sleep(interval * 10)

		titleTexts[1] = titleTexts[0]
		boxes.classList.remove("hidden")
		title.onclick = toggleBoxes
		animateTitle = false
		setTitleText(full)
		document.body.classList.add("background")
		makeStars()
		removeRandomStars()
		toggleBoxes()
		bottomText.classList.remove("hidden")
		await sleep(interval * 5)
		animateTitle = true
		await sleep(interval * 5)
		document.body.classList.add("animate")
		titleTexts[1] = texts[1]
	}
}

const cycleText = async() => {
	let a = 0
	const doCycleText = () => {
		title.innerHTML = titleTexts[a]
		a = animateTitle ? (a + 1) % 2 : 0
		setTimeout(doCycleText, interval * 2.5)
	}
	doCycleText()
}

const toggleBoxes = async() => {
	const allBoxes = centeredStuff.querySelectorAll(".box")
	for (let box of allBoxes) {
		box.classList.toggle("hidden")
		await sleep(interval * 1.25)
	}
}

const redirectTo = (link) => {
	return window.open(link, "_blank")
}
