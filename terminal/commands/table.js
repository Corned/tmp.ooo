import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button
const Table = Fragments.Table

const command = (terminal, resolve, reject, params) => {

  const headers = [ "Age", "Job", "Name" ].map(Bold)
  const rows = [
    [ "32", "Developer", "John" ],
    [ "28", "Designer", "Jane" ],
    [ "45", "Manager", "Jack" ],
    [ "33", "Developer", "Jill" ],
    [ "29", "Designer", "James" ],
    [ "44", "Manager", "Jenny" ],
  ].map(row => row.map(Text))

  terminal.log(Table(headers, rows))

  resolve()
}

export default {
  fn: command,
  name: "tabletest",
  help: "Tests the table fragment."
}