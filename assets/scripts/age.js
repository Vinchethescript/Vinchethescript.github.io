const birthDate = new Date(1174518000000)
let age
const alwaysUpdateAge = async () => {
    while (true) {
        const today = Date.now()

        age = new Date(today - birthDate).getUTCFullYear() - 1970
        document.querySelector(".age").innerText = age + " years old "
        await sleep(1000)
    }
}