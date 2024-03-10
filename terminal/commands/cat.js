import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button
const Table = Fragments.Table

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
      // Quick solution for special formatting, only for projects.txt.
      const [ firstLine, ...rest ] = text.split("\n")
      if (firstLine && firstLine.startsWith("§")) {
        const tableFormat = JSON.parse(firstLine.substring(1))
        const columnCount = tableFormat.length

        const rows = []
        for (let i = 0; i < rest.length; i += columnCount) {
          const row = []
          for (let j = 0; j < columnCount; j++) {
            const value = rest[i + j]
            row.push( tableFormat[j] === "Text" ? Text(value) : Link(value, value) )
          }
          rows.push(row)
        }

        terminal.log(Table([], rows, 2))

        return resolve()
      }

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