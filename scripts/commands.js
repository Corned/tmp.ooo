
import Fragment from "../terminal/Fragments.js"
import Terminal from "../terminal/Terminal.js"

const { Text, Button, Link, Bold } = Fragment

const RunCommand = (command, params) => {
  const promise = new Promise((resolve, reject) => {
    command(resolve, reject, params)
  })

  promise
    .then(() => {
      // TODO: fix bandaid fix
      if (command.name !== "clearTerminal") {
        // New line after a command.
        Terminal.newLine()
      }
    })
    .catch((errorMessage) => {
      Terminal.error(Fragments)
      Terminal.newLine()
      throw errorMessage
    })
}

const SimulateCommand = (command, params = "") => {
  Terminal.log([Text(`tmp.ooo> ${command.name} ${params}`)])
  RunCommand(command, params)
}

const notFound = (resolve, reject, command) => {
  reject(`The term "${command}" is not recognized as a valid command.` )
}

export default {
  RunCommand, SimulateCommand,

  intro,
  help,
  ls,
  cat,
  clearTerminal,
  notFound,
}