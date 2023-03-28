const RunCommand = (command, params) => {
  const promise = new Promise((resolve, reject) => {
    command(resolve, reject, params)
  })

  promise
    .then(() => {
      // TODO: fix bandaid fix
      if (command.name !== "clearTerminal") {
        log(" ")
      }
    })
    .catch((errorMessage) => {
      throw errorMessage
    })
}

const SimulateCommand = (command, params = "") => {
  log(`tmp.ooo> ${command.name} ${params}`)
  RunCommand(command, params)
}

const intro = (resolve, reject, params) => {
  const emoticons = [
    "\＼(◎o◎)／", "(/◕ヮ◕)/", "(︶｡︶✽)", "(●＾o＾●)", "( ͡° ͜ʖ ͡°)", "༼ つ ◕_◕ ༽つ", "¯\\_(ツ)_/¯",
    "♪~ ᕕ(ᐛ)ᕗ", "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻", "╰(▔∀▔)╯", "⊂◉‿◉つ", "(✯◡✯)", "°˖✧◝(⁰▿⁰)◜✧˖°",
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "( ˘ ³˘)", "♥（ﾉ´∀`）", "┌( ಠ‿ಠ )┘", "₍₍ ◝(・ω・)◟ ⁾⁾", "Σ(-᷅_-᷄ ๑)"
  ]


  log(`        /\\_/\\    welcome to tmp.ooo! ${emoticons[Math.floor(Math.random() * emoticons.length)]}`)

  log([
    fragment_text(`   ____/ o o \\   type "help" or click `),
    fragment_button("here", `SimulateCommand(help)`),
    fragment_text(` to get started!`)
  ])

  log(` /~____  =ø= /`)
  log(`(______)__m_m)   The cat says it's ${moment().format("dddd")} my dudes!`)
  
  log([
    fragment_text(`                 Try out `),
    fragment_link("Asteroids", `/asteroids.html`),
    fragment_text(` and check the `),
    fragment_link("Couch Potatoes", `https://couchpotatoes.team/`),
    fragment_text(` website!`)
  ])

  resolve()
}

const help = (resolve, reject, params) => {
  log([ fragment_button("help", "SimulateCommand(help)"), fragment_text("\t\tLists all available commands") ])
  log([ fragment_button("intro", "SimulateCommand(intro)"), fragment_text("\t\tDisplays the starting message") ])
  log([ fragment_button("clear", "SimulateCommand(clearTerminal)"), fragment_text("\t\tClears the terminal") ])
  log([ fragment_button("ls", "SimulateCommand(ls)"), fragment_text("\t\tLists files in current directory") ])
  log([ fragment_text("cat\t\tReads contents of a file") ])
  log([ fragment_text("parse-flags\tFlag parser demo") ])

  resolve()
}

const ls = (resolve, reject, params) => {
  log("passwords.txt\tprojects.txt") // lol

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
      log(text)
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

const parseFlags = (resolve, reject, input) => {
  const output = JSON.stringify(flagParser(input))

  log(output)

  resolve()
}

const notFound = (resolve, reject, command) => {
  reject(`The term "${command}" is not recognized as a valid command.` )
}