const log = (message) => {
  const element = document.createElement("span")
  element.classList.add("output__message", "message-log")
  if (typeof message === "string") {
    element.textContent = message
  } else {
    element.innerHTML = message.join("")
  }

  document.getElementById("terminal__output").appendChild(element)
  document.getElementById("terminal__output").scrollTo(0, document.getElementById("terminal__output").scrollHeight)
}

const error = (message) => {
  const element = document.createElement("span")
  element.classList.add("output__message", "message-log", "message-error")
  element.textContent = message

  document.getElementById("terminal__output").appendChild(element)
  document.getElementById("terminal__output").scrollTo(0, document.getElementById("terminal__output").scrollHeight)
}

const fragment_text = (message) => {
  return `<span class="output__message message-log">${message}</span>`
}

const fragment_button = (message, actionF) => {
  return `<span onclick="${actionF}" class="output__message message-button">${message}</span>`
}

window.addEventListener("load", () => {
  const input = document.getElementById("terminal-input")
  document.getElementById("terminal").classList.add("center")

  RunCommand(intro)

  input.focus()

  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault()

    const commandString = input.value
    const [ command, ...rest ] = commandString.split(" ")
    input.value = ""

    log(`tmp.ooo> ${commandString}`)

    if (command === "help") {
      RunCommand(help, rest)
    } else if (command === "ls") {
      RunCommand(ls, rest)
    } else if (command === "cat") {
      RunCommand(cat, rest)
    } else if (command === "clear") {
      RunCommand(clearTerminal)
    } else if (command === "intro") {
      RunCommand(intro)
    } else {
      RunCommand(notFound, command)
    }
    

    return false
  })
})