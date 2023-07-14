import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button
const Table = Fragments.Table

const command = (terminal, resolve, reject, params) => {
  if (params && params.length === 0) {
    terminal.log([
      Text("For more information on a specific command, type "),
      Bold("HELP command-name")
    ])

    const headers = [ ]
    const rows = []

    for (const command of Object.values(terminal.commands)) {
      rows.push([ Bold(command.name.toUpperCase()), Text(command.help) ])
    }

    terminal.log(Table(headers, rows))

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