const flagParser = (str) => {
  const stringStart = [ "\"", "'", "`" ]
  const values = []
  str = str.trim()

  let current = ""
  let inString = false
  let stringSymbol = ""

  for (const c of str) {
    if (inString) {
      current += c

      if (c === stringSymbol) {
        inString = false
        stringSymbol = ""
        values.push( current.substring(1, current.length - 1) )
        current = ""
      }
      continue
    }

    if (c === " " && current.length > 0) {
      values.push(current)
      current = ""
      continue
    }

    if (c === " " && current.length === 0) {
      continue
    }

    // string starts
    if (stringStart.includes(c)) {
      inString = true
      stringSymbol = c
      
      if (current.length > 0) {
        values.push(current)
        current = ""
      }
    }

    current += c
  }

  if (current.length > 0) {
    values.push(current)
  }

  if (inString) {
    const errorMessage = `Malformed string: ${str}`
    throw new Error(errorMessage + "\n" + " ".repeat(errorMessage.length - current.length) + "^".repeat(current.length))
  }

  return values
}

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

const fragment_link = (message, href) => {
  return `<a href="${href}" target="_blank" class="output__message message-link">${message}</a>`
}

window.addEventListener("load", () => {
  const input = document.getElementById("terminal-input")
  document.getElementById("terminal").classList.add("center")

  RunCommand(intro)

  input.focus()

  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault()

    const commandString = input.value
    input.value = ""
    log(`tmp.ooo> ${commandString}`)

    try {
      const [ command, ...rest ] = flagParser(commandString)
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
      } else if (command === "parse-flags") {
        RunCommand(parseFlags, commandString)
      } else {
        throw new Error(`The term "${command}" is not a valid command.`)
      }
    } catch (err) {
      error(err.message)
      log(" ")
    }  

    return false
  })
})