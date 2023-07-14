import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {
  if (params && params.length === 0) {
    terminal.log([
      Text("For more information on a specific command, type "),
      Bold("HELP command-name")
    ])

    for (const command of Object.values(terminal.commands)) {
      terminal.log([
        Bold(`${command.name.toUpperCase()}`),
        Text(`\t${command.help}`)
      ])
    }

    return resolve()
  }

  const command = terminal.commands[params[0].toLowerCase()]
  terminal.log(Fragments.Text(command.help)) // change command.help to command.guide when it's implemented

  resolve()
}

export default {
  fn: command,
  name: "help",
  help: "Used to gain information on how commands work."
}