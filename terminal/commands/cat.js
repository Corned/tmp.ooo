import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {

  const path = params[0]
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
      terminal.log(Text(text))
      resolve()
    })
    .catch((err) => {
      reject(err)
    })

}

export default {
  fn: command,
  name: "cat",
  help: "Reads the contents of a file."
}