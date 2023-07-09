import Fragments from "./Fragments.js"

const log = (message) => {
  const messageLogElement = document.createElement("span")
  messageLogElement.classList.add("output__message", "message-log")

  if (typeof message === "object") {
    for (const element of message) {
      messageLogElement.appendChild(element)
    }
  }

  document.getElementById("terminal__output").appendChild(messageLogElement)
  document.getElementById("terminal__output").scrollTo(0, document.getElementById("terminal__output").scrollHeight)
}

const error = (message) => {
  const element = document.createElement("span")
  element.classList.add("output__message", "message-log", "message-error")
  element.textContent = message

  document.getElementById("terminal__output").appendChild(element)
  document.getElementById("terminal__output").scrollTo(0, document.getElementById("terminal__output").scrollHeight)
}

const newLine = () => {
  log([Fragments.Text(" ")])
}

export default { log, error, newLine }