import CommandParser from "./terminal/CommandParser.js"
import Terminal from "./terminal/Terminal.js"

import help from "./terminal/commands/help.js"
import intro from "./terminal/commands/intro.js"
import ls from "./terminal/commands/ls.js"
import cat from "./terminal/commands/cat.js"
import clear from "./terminal/commands/clear.js"
import table from "./terminal/commands/table.js"
import mazegen from "./terminal/commands/maze-gen.js"


window.addEventListener("load", () => {
  const history = [ "help" ]
  let historyPointer = 0

  const terminal = new Terminal(
    document.getElementById("terminal"),
    document.getElementById("terminal-input"),
    document.getElementById("terminal-output"),
  )

  terminal.loadCommand(intro)
  terminal.loadCommand(help)
  terminal.loadCommand(ls)
  terminal.loadCommand(cat)
  terminal.loadCommand(clear)
  terminal.loadCommand(table)
  terminal.loadCommand(mazegen)

  terminal.runCommand("intro")

  document.addEventListener("keydown", (event) => {
    const { code, target } = event

    if (target.id !== "terminal__input-field") {
      return
    }

    if (code === "ArrowUp") {
      historyPointer = historyPointer - 1
    } else if (code === "ArrowDown") {
      historyPointer = historyPointer + 1
    } else {
      return
    }

    historyPointer = Math.max(0, Math.min(history.length, historyPointer))
    input.value = history[historyPointer] || ""
  })
})