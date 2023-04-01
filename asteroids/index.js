

const canvas = document.getElementById("game")
let context = canvas.getContext("2d")

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
  new Asteroid(new Vector(400, 100), 40, 10, 1),
  new Asteroid(new Vector(150, 100), 40, 10, 1),
  new Asteroid(new Vector(650, 100), 40, 10, 1),
  new Asteroid(new Vector(400, 700), 40, 10, 1),
  new Asteroid(new Vector(150, 700), 40, 10, 1),
  new Asteroid(new Vector(650, 700), 40, 10, 1),
]



const a = setInterval(() => {
  context.fillStyle = "black"
  context.clearRect(0, 0, canvas.width, canvas.height)

  // logic
  ship.update(keys)
  for (const asteroid of asteroids) {
    asteroid.update()
    
    // check if bullet collides with asteroid
    for (const bullet of ship.bullets) {
      const results = asteroid.collidesWith(bullet.position)
      if (results) {
        asteroid.velocity = asteroid.velocity.add(bullet.velocity.unit.mul(0.1))
        console.log(asteroid.velocity)

        const surface = results[1].sub(results[0]).mul(-1)

        function dotProduct(v1, v2) {
          return v1.x * v2.x + v1.y * v2.y;
        }

        function normalVector(v) {
          return new Vector( -v.y, v.x )
        }
      

        const N = normalVector(surface).unit
        const V = bullet.velocity
        const R = V.sub( N.mul( dotProduct(V, N) ).mul(2) )
        
        bullet.velocity = R

        while (asteroid.collidesWith(bullet.position)) {
          bullet.position = bullet.position.add(bullet.velocity.unit.mul(0.01))
        }

        
/*
        red: surface
        green: surface normal
        blue: reflection (new velocity)
        yellow: original velocity

        let a = results[0]
        let b = results[1]

        context.strokeStyle = "red"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.stroke()

        a = bullet.position
        b = bullet.position.add(N.mul(100))

        context.strokeStyle = "green"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(bullet.position.x, bullet.position.y)
        context.lineTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.stroke()

        a = bullet.position
        b = bullet.position.add(R.unit.mul(100))

        context.strokeStyle = "blue"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(bullet.position.x, bullet.position.y)
        context.lineTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.stroke()
  

        a = bullet.position
        b = bullet.position.sub(origVel.unit.mul(100))

        context.strokeStyle = "yellow"
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(bullet.position.x, bullet.position.y)
        context.lineTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.stroke() */
  

        /* context = null */
      }
    }

    // check if asteroid collides with ship
    for (const point of asteroid.shape) {
      const results = ship.collidesWith(point.add(asteroid.position))
      if (results) {
        console.log("ASTEROID CORNER INSIDE SHIP", Math.random())

      }
    }

    // check if ship collides with asteroid
    for (const point of ship.shape) {
      const results = asteroid.collidesWith(point.add(ship.position))

      if (results) {
        console.log("SHIP CORNER INSIDE ASTEROID", Math.random())
        

      }
    }
  }
  
  // render
  ship.draw(context)
  for (const asteroid of asteroids) {
    asteroid.draw(context)
  }

}, 1000 / 60)


