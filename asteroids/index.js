

const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const size = 800
const mid = size / 2

let keys = {}

window.addEventListener("blur", () => {
  keys = {}
})

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return
  if (event.repeat) return

  keys[event.key] = true
})

window.addEventListener("keyup", (event) => {
  if (event.defaultPrevented) return
  if (event.repeat) return

  keys[event.key] = null
})

const ship = new Ship()
let asteroids = [
  new Asteroid(new Vector(400, 100), 20, 10, 5),
]



setInterval(() => {
  context.fillStyle = "black"
  context.clearRect(0, 0, canvas.width, canvas.height)

  // logic
  ship.update(keys)
  for (const asteroid of asteroids) {
    asteroid.update()
    
    for (const bullet of ship.bullets) {
      asteroid.collidesWith(bullet)
    }
  }
  
  // render
  ship.draw(context)
  for (const asteroid of asteroids) {
    asteroid.draw(context)
  }

}, 1000 / 60)


