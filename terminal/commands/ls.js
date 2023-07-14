import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {

  // for now, log hardcoded list of files
  terminal.log(Text("passwords.txt\tprojects.txt"))

  resolve()
}

export default {
  fn: command,
  name: "ls",
  help: "Lists files in current or specified directory."
}