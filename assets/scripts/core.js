const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const choose = (...args) => {
	return args[randint(0, args.length - 1)]
}
