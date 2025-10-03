const agePart = document.querySelector(".age")
const birthDate = new Date(1174518000000)
let age = cookies["age"]
agePart.innerText = age + " "

const alwaysUpdateAge = async() => {
    
    const today = Date.now()

    age = new Date(today - birthDate).getFullYear() - 1970
    const text = `${age} years old`
    cookies["age"] = text
    agePart.innerText = text + " "

    setTimeout(alwaysUpdateAge, interval * 10)
}