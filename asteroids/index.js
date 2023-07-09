

const canvas = document.getElementById("game")
let context = canvas.getContext("2d", { willReadFrequently: true })
context.willReadFrequently = true

const game = new Game({
  debug: true,
})

const scene = new Scene()
scene.addActor(new Ship())

game.setScene(scene)


const x = 400
const y = 200
let r = 100

let frame = 0

let lastUpdate = performance.now()
const tick = (now) => {
  const delta = now - lastUpdate
  const deltaInSeconds = delta / 1000

  frame = frame + 1 * 60 * deltaInSeconds

  lastUpdate = now
  
  game.update(delta)
  game.draw(context)
  
  if (game.debug) {
    const debugMessage = `${Math.floor(1000 / delta)}fps ${delta.toFixed(2)}ms`
    document.getElementById("debug").innerText = debugMessage
  }
  
  r = 100 + Math.sin(frame / 100) * 50
  
  const imgdata = context.getImageData(0, 0, 800, 800)

  const pix = imgdata.data

  for (var i = 0, n = pix.length; i < n; i += 4) {
    const x1 = Math.floor(i / 4 % 800)
    const y1 = Math.floor(i / 4 / 800)

    const dist = (new Vector(x1, y1).sub(new Vector(x, y))).magnitude

    if (dist < r) {
      pix[i  ] = 255 - pix[i  ]; // red
      pix[i+1] = 255 - pix[i+1]; // green
      pix[i+2] = 255 - pix[i+2]; // blue
      // i+3 is alpha (the fourth element)

    }

  }

  context.putImageData(imgdata, 0, 0);

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)


/* 

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


 */