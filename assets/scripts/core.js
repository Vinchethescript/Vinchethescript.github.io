const cookies = new Proxy({}, {
    get(target, prop) {
        if (prop === Symbol.toPrimitive) {
            return () => document.cookie
        }
        const cookieMap = document.cookie.split(";")
            .map(cookie => cookie.trim().split("="))
            .reduce((acc, [key, value]) => {
                acc[key] = decodeURIComponent(value)
                return acc
            }, {})
        return cookieMap[prop]
    },
    set(target, prop, value) {
        document.cookie = `${prop}=${encodeURIComponent(value)}`
        return true
    },
    ownKeys() {
        const cookieKeys = document.cookie
            .split(";")
            .map(cookie => cookie.trim().split("=")[0])
        return [...cookieKeys]
    }
})

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
