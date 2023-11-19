import Fragments from "./Fragments.js"
import CommandParser from "./CommandParser.js"

class Terminal {
  constructor(terminalElement) {
    this.terminal = terminalElement
    this.input = document.getElementById("terminal__input-form")
    this.inputField = document.getElementById("terminal__input-field")
    this.output = document.getElementById("terminal__output")

    this.commands = {}
    this.history = [ "help" ]
    this.historyPointer = 0

    this.terminal.classList.add("center")
    this.inputField.focus()

    this.input.addEventListener("submit", this.submit.bind(this))
  }

  submit(event) {
    event.preventDefault()
    const commandString = this.inputField.value

    this.log(Fragments.Text(`tmp.ooo> ${commandString}`))

    this.inputField.value = ""
    this.history.push(commandString)
    this.historyPointer = this.history.length

    try {
      const [ commandName, ...rest ] = CommandParser(commandString)

      if (this.commands[commandName]) {
        this.runCommand(commandName, rest)
      } else {
        throw new Error(`"${commandName}" is not recognized as an internal or external command, operable program or batch file.`)
      }
    } catch (err) {
      this.error(Fragments.Text(err.message))
      this.newLine()
    }  
  }

  runCommand(commandName, params) {
    const promise = new Promise((resolve, reject) => {
      const commandFn = this.commands[commandName].fn
      commandFn(this, resolve, reject, params)
    })
  
    promise
      .then(() => {
        // Command was run successfully.
        // New line after a command only if it's not clear.
        if (commandName !== "clear") {
          this.newLine()
        }

        /* this.log(Fragments.Text("/home/user")) */
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        this.error(Fragments.Text(errorMessage))
        this.newLine()
        throw errorMessage
      })
  }


  loadCommand(command) {
    const name = command.name
    this.commands[name] = command

    console.log(`Loaded command "${name}"`);
  }

  newLine() {
    this.log(Fragments.Text(" "))
  }

  clear() {
    this.output.innerHTML = ""
  }

  log(fragments) {
    const terminalOutputMessageElement = document.createElement("span")
    terminalOutputMessageElement.classList.add("output__message")
  
    // Check if fragments is iterable
    if (fragments[Symbol.iterator]) {
      for (const fragment of fragments) {
        terminalOutputMessageElement.appendChild(fragment)
      }
    } else {
      terminalOutputMessageElement.appendChild(fragments)
    }

    this.output.appendChild(terminalOutputMessageElement)
    this.output.scrollTo(0, this.output.scrollHeight)
  }

  error(fragments) {
    const terminalOutputMessageElement = document.createElement("span")
    terminalOutputMessageElement.classList.add("output__message", "message--error")
  
    // Check if fragments is iterable
    if (fragments[Symbol.iterator]) {
      for (const fragment of fragments) {
        terminalOutputMessageElement.appendChild(fragment)
      }
    } else {
      terminalOutputMessageElement.appendChild(fragments)
    }

    this.output.appendChild(terminalOutputMessageElement)
    this.output.scrollTo(0, this.output.scrollHeight)
  }
}

export default Terminal