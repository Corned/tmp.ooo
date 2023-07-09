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

export default { log, error }