const streamSite = "https://vincystream.online"
const streamURL = streamSite + "/stream"
const volumeDiv = document.querySelector(".volumeValue")
const volumeSlider = document.querySelector(".vincystreamVolume")
let streamVolume = 0.5
let stream = new Audio(streamURL)

const stopStream = () => {
    stream.pause()
    stream = new Audio(streamURL)
}

const playStream = () => {
    stream.volume = streamVolume
    stream.load()
    stream.play()
}

const setStreamVolume = (volume) => {
    stream.volume = parseInt(volume) / 100
    volumeDiv.innerText = volume + "%"
    volumeSlider.value = volume
    streamVolume = volume / 100
}

const getStreamMetadata = async () => {
    const response = await fetch(streamSite + "/info")
    const data = await response.json()
    return data
}

const toggleStreamAndChangeButtonText = () => {
    const coso = document.querySelector(".vincystreamButton")
    if (stream.paused) {
        playStream()
        coso.innerText = "pause"
    } else {
        stopStream()
        coso.innerText = "play"
    }
}

const updateStreamMetadata = async () => {
    const data = await getStreamMetadata()
    const title = document.querySelector(".vincystreamTitle")
    const artist = document.querySelector(".vincystreamArtist")
    const cover = document.querySelector(".vincystreamCover")
    title.innerHTML = data.title
    artist.innerHTML = data.artists.join(", ")
    cover.src = data.artwork
}

const startMetaLoop = async () => {
	while (true) {
        try {
    		await updateStreamMetadata()
        } catch (e) {}
		await sleep(1000)
	}
}