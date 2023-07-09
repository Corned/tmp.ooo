import "/scripts/commands.js"
import "/scripts/program.js"

import CommandParser from "./terminal/CommandParser.js"
import Fragment from "./terminal/Fragments.js"
import Terminal from "./terminal/Terminal.js"

import Commands from "./scripts/commands.js"

const RunCommand = Commands.RunCommand

window.addEventListener("load", () => {
  const history = [ "help" ]
  let historyPointer = 0

  const input = document.getElementById("terminal-input")
  const terminal = document.getElementById("terminal")

  terminal.classList.add("center")
  input.focus()

  
  RunCommand(Commands.intro)

  document.addEventListener("keydown", (event) => {
    const { code, target } = event

    if (target.id !== "terminal-input") {
      return
    }

    if (code === "ArrowUp") {
      historyPointer = historyPointer - 1
    } else if (code === "ArrowDown") {
      historyPointer = historyPointer + 1
    } else {
      return
    }

    historyPointer = Math.max(0, Math.min(history.length, historyPointer))
    input.value = history[historyPointer] || ""
  })

  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault()

    const commandString = input.value
    input.value = ""
    Terminal.log(`tmp.ooo> ${commandString}`)

    history.push(commandString)
    historyPointer = history.length


    try {
      const [ command, ...rest ] = CommandParser(commandString)
      if (command === "help") {
        RunCommand(Commands.help, rest)
      } else if (command === "ls") {
        RunCommand(Commands.ls, rest)
      } else if (command === "cat") {
        RunCommand(Commands.cat, rest)
      } else if (command === "clear") {
        RunCommand(Commands.clearTerminal)
      } else if (command === "intro") {
        RunCommand(Commands.intro)
      } else if (command === "parse-flags") {
        RunCommand(Commands.parseFlags, commandString)
      } else {
        throw new Error(`The term "${command}" is not a valid command.`)
      }
    } catch (err) {
      Terminal.error(err.message)
      Terminal.log(" ")
    }  

    return false
  })
})