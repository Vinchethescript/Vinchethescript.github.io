const stars = document.querySelector(".stars")

const makeStar = async () => {
	const halfWidth = document.body.clientWidth / 2
	const star = document.createElement("div")
	star.classList.add("star")
	star.classList.add(choose("red", "white"))
	star.classList.add("hidden")
	stars.appendChild(star)
	star.style.width = randint(10, 100) + "px"
	star.style.height = star.style.width
	star.style.top = randint(1, 100) + "%"
	star.style.left = randint(1, 100) + "%"
	star.style.transform = "rotate(" + randint(0, 360) + "deg)"

	const computedStyle = getComputedStyle(star)
	const left = Math.round(parseFloat(computedStyle.left))
	const top = Math.round(parseFloat(computedStyle.top))
	const blur = (Math.abs((left - halfWidth)) / 500) + (parseInt(star.style.top) / 80)
	star.style.filter = "blur(" + blur + "px)"
	await sleep(1)
	star.classList.remove("hidden")
	return star
}

const removeRandomStar = async () => {
	const star = stars.children[randint(0, stars.children.length - 1)]
	star.classList.add("hidden")
	await sleep(500)
	stars.removeChild(star)
}

const removeRandomStars = async () => {
	while (true) {
		await sleep(randint(5000, 10000))
		removeRandomStar()
	}
}

const makeStars = async() => {
	for (let i of Array(20)) {
		makeStar()
		await sleep(0)
	}

	while (true) {
		makeStar()
		await sleep(randint(5000, 10000))
	}
}