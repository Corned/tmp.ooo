import Fragments from "./Fragments.js"

const log = (elements) => {
  const terminalOutputMessageElement = document.createElement("span")
  terminalOutputMessageElement.classList.add("output__message", "message-log")

  if (elements[Symbol.iterator]) {
    for (const element of elements) {
      terminalOutputMessageElement.appendChild(element)
    }
  } else {
    terminalOutputMessageElement.appendChild(elements)
  }

  document.getElementById("terminal__output").appendChild(terminalOutputMessageElement)
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
  log(Fragments.Text(" "))
}

export default { log, error, newLine }