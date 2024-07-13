const stars = document.querySelector(".stars")
const minRandMultip = 50
const maxRandMultip = 100
const maxStarSize = 100
const minStarSize = 10

const makeStar = async() => {
	const bodyData = getComputedStyle(document.body)
	const bodyHeight = parseFloat(bodyData.height)
	let maxHeight = (bodyHeight / window.innerHeight) * 100
	if (window.innerHeight > bodyHeight) {
		maxHeight = 100
	}
	const halfWidth = parseFloat(bodyData.width) / 2
	const star = document.createElement("div")
	const rotation = randint(0, 360)
	const size = randint(minStarSize, maxStarSize)
	const radRot = rotation * Math.PI / 180

	const hght = Math.abs(size * Math.sin(radRot) + size * Math.cos(radRot))
	const mxHg = Math.abs(maxStarSize * Math.sin(radRot) + maxStarSize * Math.cos(radRot))
	star.classList.add("star")
	star.classList.add(choose("red", "white"))
	star.classList.add("hidden")
	stars.appendChild(star)
	star.style.width = size + "px"
	star.style.height = star.style.width
	star.style.transform = "rotate(" + rotation + "deg)"

	// remove 1/3 of the star's size from maxHeight
	maxHeight -= (((hght / mxHg) * 100) / 3)
	star.style.top = (randint(1000, maxHeight * 1000) / 1000) + "%"
	star.style.left = (randint(1000, 100000) / 1000) + "%"

	const computedStyle = getComputedStyle(star)
	const left = Math.round(parseFloat(computedStyle.left))
	// always keep a veeeery little blur, so the stars don't look too sharp
	const blur = 0.0625 + (Math.abs((left - halfWidth)) / 500) + (parseFloat(star.style.top) / 27.5)
	star.style.filter = "blur(" + blur + "px)"
	await sleep(interval / 100)
	star.classList.remove("hidden")
	return star
}

const removeRandomStar = async() => {
	const star = stars.children[randint(0, stars.children.length - 1)]
	star.classList.add("hidden")
	await sleep(interval * 5)
	stars.removeChild(star)
}

const removeRandomStars = async() => {
	const doRemoveRandomStar = () => {
		removeRandomStar()
		setTimeout(doRemoveRandomStar, randint(interval * minRandMultip, interval * maxRandMultip))
	}
	setTimeout(doRemoveRandomStar, randint(interval * minRandMultip, interval * maxRandMultip))
}

const makeStars = async(stars) => {
	stars = stars ?? randint(25, 75)
	for (let i of Array(stars)) {
		makeStar()
		await sleep(0)
	}

	const doCreateStar = () => {
		makeStar()
		setTimeout(doCreateStar, randint(interval * minRandMultip, interval * maxRandMultip))
	}

	doCreateStar()
}