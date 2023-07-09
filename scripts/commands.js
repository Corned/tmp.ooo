
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
      Terminal.error(errorMessage)
      Terminal.newLine()
      throw errorMessage
    })
}

const SimulateCommand = (command, params = "") => {
  Terminal.log([Text(`tmp.ooo> ${command.name} ${params}`)])
  RunCommand(command, params)
}

const intro = (resolve, reject, params) => {
  const emoticons = [
    "°˖✧◝(⁰▿⁰)◜✧˖°",
  ] 


  Terminal.log([
    Text("        /\\_/\\    "),
    Bold("welcome"),
    Text(" to tmp.ooo! "),
    Text(emoticons[Math.floor(Math.random() * emoticons.length)]),
  ])

  Terminal.log([
    Text(`   ____/ o o \\   type "help" or click `),
    Button("here", () => SimulateCommand(help)),
    Text(` to get started!`)
  ])

  Terminal.log([Text(` /~____  =ø= /`)])
  Terminal.log([Text(`(______)__m_m)   The cat says it's ${moment().format("dddd")} my dudes!`)])
  
  Terminal.log([
    Text(`                 Try out `),
    Link("Asteroids", `/asteroids.html`),
    Text(` and check the `),
    Link("Couch Potatoes", `https://couchpotatoes.team/`),
    Text(` website!`)
  ])

  resolve()
}

const help = (resolve, reject, params) => {
  Terminal.log([ Button("help", () => SimulateCommand(help)), Text("\t\tLists all available commands") ])
  Terminal.log([ Button("intro", () => SimulateCommand(intro)), Text("\t\tDisplays the starting message") ])
  Terminal.log([ Button("clear", () => SimulateCommand(clearTerminal)), Text("\t\tClears the terminal") ])
  Terminal.log([ Button("ls", () => SimulateCommand(ls)), Text("\t\tLists files in current directory") ])
  Terminal.log([ Text("cat\t\tReads contents of a file") ])

  resolve()
}

const ls = (resolve, reject, params) => {
  Terminal.log([Text("passwords.txt\tprojects.txt")]) // lol

  resolve()
}

const cat = (resolve, reject, [ path ]) => {
  if (!path) {
    reject(new Error("No path provided"))
    return
  }

  fetch(`/filesystem/${path}`)
    .then((response) => {
      if (response.ok) return response.text()
      throw new Error(`Could not read file "${path}".`)
    })
    .then((text) => {
      Terminal.log([Text(text)])
      resolve()
    })
    .catch((err) => {
      reject(err)
    })
}

const clearTerminal = (resolve, reject) => {
  const output = document.getElementById("terminal__output")
  output.innerHTML = ""

  resolve()
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