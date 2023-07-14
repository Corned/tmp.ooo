import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button
const Table = Fragments.Table

const command = (terminal, resolve, reject, params) => {

  const headers = [ "Name", "Age", "Job" ].map(Bold)
  const rows = [
    [ "John", "32", "Developer" ],
    [ "Jane", "28", "Designer" ],
    [ "Jack", "45", "Manager" ],
    [ "Jill", "33", "Developer" ],
    [ "James", "29", "Designer" ],
    [ "Jenny", "44", "Manager" ],
  ].map(row => row.map(Text))

  terminal.log(Table(headers, rows))

  resolve()
}

export default {
  fn: command,
  name: "tabletest",
  help: "Tests the table fragment."
}