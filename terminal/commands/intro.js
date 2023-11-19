import Fragments from "../Fragments.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {
  const emoticons = [
    "°˖✧◝(⁰▿⁰)◜✧˖°",
  ] 

  terminal.log([
    Text("        /\\_/\\    "),
    Bold("welcome"),
    Text(" to tmp.ooo! "),
    Text(emoticons[Math.floor(Math.random() * emoticons.length)]),
  ])

  terminal.log([
    Text(`   ____/ o o \\   type "help" or click `),
    Button("here", () => SimulateCommand(help)),
    Text(` to get started!`)
  ])

  terminal.log([Text(` /~____  =ø= /`)])
  terminal.log([Text(`(______)__m_m)   The cat says it's ${moment().format("dddd")} my dudes!`)])
  
/*   terminal.log([
    Text(`                 Check out the `),
    Link("Couch Potatoes", `https://couchpotatoes.team/`),
    Text(` website!`)
  ]) */

  resolve()
}

export default {
  fn: command,
  name: "intro",
  help: "Displays the introduction message."
}