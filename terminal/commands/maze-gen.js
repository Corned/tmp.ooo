import Fragments from "../Fragments.js"
import CommandParser from "../CommandParser.js"

const Text = Fragments.Text
const Bold = Fragments.Bold
const Link = Fragments.Link
const Button = Fragments.Button

const command = (terminal, resolve, reject, params) => {


/*   const [ width = 20, height = 10 ] = params

  terminal.log(Text(`Width: ${width}`))
  terminal.log(Text(`Height: ${height}`))
 */

  const WIDTH = 99
  const HEIGHT = 38

  const WALL = "#"
  const EMPTY = " "

/*   let str = (WALL.repeat(WIDTH) + "\n").repeat(HEIGHT).trim()
  terminal.log(Text(str)) */

  const mazeHeight = HEIGHT - 2
  const mazeWidth = WIDTH - 2

  const maze = Array.from({ length: mazeHeight }).map(() => {
    return Array.from({ length: mazeWidth }).fill(0)
  })

  //console.log(maze);

  const mazeToString = (maze) => {
    return [
      WALL.repeat(WIDTH) + "\n",
      maze.map((column) => {
        return WALL + column.map(a => a === 1 ? WALL : EMPTY).join("") + WALL + "\n"
      }).join(""),
      WALL.repeat(WIDTH)
    ].map(Text)
  }

  terminal.log(mazeToString(maze))

  resolve()
}

export default {
  fn: command,
  name: "maze",
  help: "WIP"
}