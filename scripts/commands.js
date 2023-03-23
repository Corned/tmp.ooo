const RunCommand = (command, params) => {

  const promise = new Promise((resolve, reject) => {
    command(resolve, reject, params)
  })

  promise
    .then(() => {
      log(" ")
    })
    .catch((errorMessage) => {
      error(errorMessage)
      log(" ")
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

  resolve()
}

const help = (resolve, reject, params) => {
  log([ fragment_button("help", "SimulateCommand(help)"), fragment_text("\tLists all available commands") ])
  log([ fragment_button("intro", "SimulateCommand(intro)"), fragment_text("\tDisplays the starting message") ])
  log([ fragment_button("clear", "SimulateCommand(clear)"), fragment_text("\tClears the terminal") ])
  log([ fragment_button("ls", "SimulateCommand(ls)"), fragment_text("\tLists files in current directory") ])
  log([ fragment_text("cat\tReads contents of a file") ])

  resolve()
}

const ls = (resolve, reject, params) => {
  log("passwords.txt\tprojects.txt") // lol

  resolve()
}

const cat = (resolve, reject, [ path ]) => {
  if (!path) {
    reject("No path provided")
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
      reject(err.message)
    })
}

const clear = (resolve, reject) => {
  const output = document.getElementById("terminal__output")
  output.innerHTML = ""

  resolve()
}

const notFound = (resolve, reject, command) => {
  reject(`The term "${command}" is not recognized as a valid command.` )

  resolve()
}