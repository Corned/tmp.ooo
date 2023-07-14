import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {
  terminal.clear()

  resolve()
}

export default {
  fn: command,
  name: "clear",
  help: "Clears the terminal."
}