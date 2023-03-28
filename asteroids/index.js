

const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const size = 800
const mid = size / 2

class Asteroid {
  constructor(position, radius, corners, smoothness) {
    this.position = position
    this.radius = radius
    this.corners = corners
    this.smoothness = smoothness

    this.rotation = 0
    this.rotVelocity = Math.random() / 10 - 0.05
    this.velocity = new Vector(Math.random() - 0.5, Math.random() - 0.5)

    this.edgePoints = []
    for (let i = -Math.PI; i < Math.PI; i += Math.PI/this.corners * 2) {
      this.edgePoints.push(
        new Vector(
          radius * Math.cos(i),
          radius * Math.sin(i),
        ).mul(1 + Math.random())
      )
    }
  }

  update() {
    this.position = this.position.add(this.velocity)
    this.rotation = this.rotation + this.rotVelocity
  }

  draw(ctx) {
    shape(ctx, ...this.edgePoints.map(point => point.add(this.position)))
  }
}


class Particle {
  constructor(position, velocity, radius, lifetime = 1000) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.lifetime = lifetime
    this.birth = Date.now()
    this.delete = false
  }

  update() {
    if (this.delete || this.birth + this.lifetime <= Date.now()) {
      this.delete = true
      return
    }

    this.position = this.position.add(this.velocity)

    if (this.position.x < 0) {
      this.position = new Vector(800, this.position.y)
    }
    if (this.position.x > 800) {
      this.position = new Vector(0, this.position.y)
    }
    if (this.position.y < 0) {
      this.position = new Vector(this.position.x, 800)
    }
    if (this.position.y > 800) {
      this.position = new Vector(this.position.x, 0)
    }
  }

  draw(ctx) {
    if (this.delete) return
    const transparency = 1 - (Date.now() - this.birth) / this.lifetime

    ctx.fillStyle = `rgba(255, 255, 255, ${transparency})`
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    ctx.fill()
  }
}


class Bullet {
  constructor(position, velocity, radius) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.delete = false
  }

  update() {
    this.position = this.position.add(this.velocity)

    if (this.position.x < 0) {
      this.delete = true  
    }
    if (this.position.x > 800) {
      this.delete = true
    }
    if (this.position.y < 0) {
      this.delete = true
    }
    if (this.position.y > 800) {
      this.delete = true
    }
  }

  draw(ctx) {
    if (this.delete) return


    console.log("DRAW BULLET");

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    ctx.fill()
    console.log("END");
  }
}

class Ship {
  constructor() {
    this.position = new Vector(400, 400)
    this.size = 10
    this.rotation = 0
    this.velocity = new Vector(0, 0)
    this.acceleration = 0.1
    this.rotVelocity = 0
    this.particles = []
    this.bullets = []
    this.lastShot = 0
    this.bulletInterval = 100
    this.maxSpeed = 5
  }

  update(keys) {
    this.rotVelocity = 0
    if (keys[" "]) {
      if (this.lastShot + this.bulletInterval < Date.now()) {
        this.lastShot = Date.now()

        // take a shot
        const dist = new Vector(0, -1)
        const loc = this.position.add(
          new Vector(
            dist.x * Math.cos(this.rotation) - dist.y * Math.sin(this.rotation),
            dist.y * Math.cos(this.rotation) + dist.x * Math.sin(this.rotation)
          ).mul(20)
        )

        const dir = this.position
          .sub(loc)
          .unit
          .mul(-5) // bullet speed

        const bullet = new Bullet(loc, dir, 2)
        console.log(bullet);

        this.bullets.push(bullet)
      }
    }

    if (keys["ArrowLeft"]) {
      this.rotVelocity += -0.05
    }

    if (keys["ArrowRight"]) {
      this.rotVelocity += 0.05
    }
    
    if (keys["ArrowUp"]) {
      const direction = new Vector(0, -1)
      this.velocity = this.velocity.add(new Vector(
        direction.x * Math.cos(this.rotation) - direction.y * Math.sin(this.rotation),
        direction.y * Math.cos(this.rotation) + direction.x * Math.sin(this.rotation)
      ).unit.mul(0.1))

      if (this.velocity.magnitude > this.maxSpeed) {
        this.velocity = this.velocity.unit.mul(this.maxSpeed)
      }

      for (let ax = 0; ax < 3; ax++) {


        const dist = new Vector(0, 10)
        const loc = this.position.add(
          new Vector(
            dist.x * Math.cos(this.rotation) - dist.y * Math.sin(this.rotation),
            dist.y * Math.cos(this.rotation) + dist.x * Math.sin(this.rotation)
          )
        )

        const a = 2
        const b = 1 / a / 2
        const rand = this.rotation + (Math.random() / a - b)
        const loc2 = this.position.add(
          new Vector(
            dist.x * Math.cos(rand) - dist.y * Math.sin(rand),
            dist.y * Math.cos(rand) + dist.x * Math.sin(rand)
          )
        )
        const dir = this.position
        .sub(loc2)
        .unit
        .mul(-this.maxSpeed)

        const newParticle = new Particle(
          loc,
          dir,
          Math.random() * 3,
          200
        )
    
        this.particles.push(newParticle)
          


      }
    }

    this.position = this.position.add(this.velocity)
    if (this.position.x < 0) {
      this.position = new Vector(800, this.position.y)
    }
    if (this.position.x > 800) {
      this.position = new Vector(0, this.position.y)
    }
    if (this.position.y < 0) {
      this.position = new Vector(this.position.x, 800)
    }
    if (this.position.y > 800) {
      this.position = new Vector(this.position.x, 0)
    }

    this.rotation += this.rotVelocity


    this.bullets = this.bullets.map((bullet) => {
      bullet.update()

      if (bullet.delete) {
        bullet = null
        return null
      }

      bullet.draw(context)
      return bullet
    }).filter(o => !!o)

    this.particles = this.particles.map((particle) => {
      particle.update()

      if (particle.delete) {
        particle = null
        return null
      }

      particle.draw(context)
      return particle
    }).filter(o => !!o)
  }

  draw(ctx) {

    const modifiers = [
      new Vector(),
      new Vector(0, 800),
      new Vector(0, -800),
      new Vector(800, 0),
      new Vector(-800, 0),
    ]
    
    for (const modifier of modifiers) {
      let points = []

      points.push(new Vector(0, -2))
      points.push(new Vector(1.5, 2))
      points.push(new Vector(0, 1))
      points.push(new Vector(-1.5, 2))
    
      points = points.map((v) => 
        new Vector(
          v.x * Math.cos(this.rotation) - v.y * Math.sin(this.rotation),
          v.y * Math.cos(this.rotation) + v.x * Math.sin(this.rotation)
        )
        .mul(this.size)
        .add(this.position.add(modifier))
      )
    
      shape(ctx, ...points)
    }

    for (const particle of this.particles) {
      particle.draw(ctx)
    }
  }

    
}



const keys = {}

window.addEventListener("blur", () => {
  ship.rotVelocity = 0
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
let particles = []
let asteroids = [ new Asteroid(new Vector(400, 100), 20, 10, 5)  ]



setInterval(() => {
  context.fillStyle = "black"
  context.clearRect(0, 0, canvas.width, canvas.height)


  // logic
  ship.update(keys)

  for (const asteroid of asteroids) {
    asteroid.update()
  }
  
  // render
  
  ship.draw(context)
  for (const asteroid of asteroids) {
    asteroid.draw(context)
  }

}, 1000 / 60)


