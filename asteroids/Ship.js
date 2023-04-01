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
    this.bulletInterval = 1000 / 4
    this.maxSpeed = 4

    this.laserShootAudio = new Audio("/asteroids/assets/laserShoot.wav")

    this.shape = [
      new Vector(0, -2),
      new Vector(1.5, 2),
      new Vector(0, 1),
      new Vector(-1.5, 2),
    ].map((v) => v.mul(this.size))
  }

  collidesWith(position) {
    const getArea = (a, b, c) => 0.5 * Math.abs((b.x - a.x)*(c.y - a.y) - (c.x - a.x)*(b.y - a.y))

    const points = [ ...this.shape, this.shape[0] ].map(a => a.rotate(this.rotation).add(this.position))

    let collides = false

    for (let corner = 0; corner < points.length - 1; corner++) {
      let triangleArea = 0
      let triangleAreaPoint = 0
  
      const a = this.position
      const b = points[corner] 
      const c = points[corner + 1]
      const x = position

      triangleArea += getArea(a, b, c)
      triangleAreaPoint += getArea(x, a, b)
      triangleAreaPoint += getArea(x, b, c)
      triangleAreaPoint += getArea(x, c, a)

      if (triangleAreaPoint - triangleArea < 10) {
        return [b, c]
      }
    }

    return collides
  }

  update(keys) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
 
    if (keys[" "] && this.lastShot + this.bulletInterval < Date.now()) {
      this.lastShot = Date.now()

      const clone = this.laserShootAudio.cloneNode(true)
      clone.volume = 0.3
      clone.play()

      // direction of the ship
      const direction = (new Vector(0, -1)).rotate(this.rotation)
      // get bullet spawn location
      const bulletSpawnLocation = this.position.add(direction.mul(20))

      const bulletVelocity = this.position
        .sub(bulletSpawnLocation)
        .unit
        .mul(-5)

      const bullet = new Bullet(bulletSpawnLocation, bulletVelocity, 2) // position, velocity, radius

      this.bullets.push(bullet)
    }

    if (keys["ArrowLeft"]) {
      this.rotVelocity += -0.004
    }

    if (keys["ArrowRight"]) {
      this.rotVelocity += 0.004
    }

    if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
      this.rotVelocity /= 1.02
    }
    
    if (keys["ArrowUp"]) {
      // direction of the ship
      const direction = (new Vector(0, -1)).rotate(this.rotation)
      this.velocity = this.velocity.add(direction.unit.mul(0.1))

      if (this.velocity.magnitude > this.maxSpeed) {
        this.velocity = this.velocity.unit.mul(this.maxSpeed)
      }

      // spawn an amount of particles for exhaust
      // give them random acceleration to spread them
      for (let _ = 0; _ < 5; _++) {
        const backDirection = new Vector(0, 1)
        const particleSpawnLocation = this.position.add(
          backDirection.rotate(this.rotation).mul(10)
        )

        const spreadAngle = 45
        const randomAngleDeg = Math.random() * spreadAngle - spreadAngle / 2
        const randomAngleRad = randomAngleDeg * Math.PI / 180
        const randomizedAngle = this.rotation + randomAngleRad

        const particleVelocity = backDirection.rotate(randomizedAngle)
        .unit
        .mul(this.maxSpeed - Math.random() + 0.5)

        const newParticle = new Particle(
          particleSpawnLocation,
          particleVelocity,
          Math.random() * 3,
          250
        )

        this.particles.push(newParticle)
      }
    }

    if (!keys["ArrowUp"]) {
      this.velocity = this.velocity.div(1.01)
    }

    this.position = this.position.add(this.velocity)

    // If ship leaves the play area, wrap around
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

    // Update ship's rotation
    this.rotVelocity = clamp(this.rotVelocity, -0.05, 0.05)
    this.rotation += this.rotVelocity

    // Update ship's bullets
    this.bullets = this.bullets.map((bullet) => {
      bullet.update()

      if (bullet.delete) {
        bullet = null
        return null
      }

      return bullet
    }).filter(o => !!o)

    // Update ship's particle spray when moving
    this.particles = this.particles.map((particle) => {
      particle.update()

      if (particle.delete) {
        particle = null
        return null
      }

      return particle
    }).filter(o => !!o)
  }

  draw(ctx) {
    for (const particle of this.particles) {
      particle.draw(ctx)
    }

    // Render a few additional ships for way smoother wrapping
    const modifiers = [
      new Vector(),

      new Vector(0, 800),
      new Vector(0, -800),
      new Vector(800, 0),
      new Vector(-800, 0),

      new Vector(800, 800),
      new Vector(800, -800),
      new Vector(-800, -800),
      new Vector(-800, 800),
    ]
    
    for (const modifier of modifiers) {
      // Resize and rotate the ship based on its rotation and size
      const points = this.shape.map((v) =>
        v
        .rotate(this.rotation)
        .add(this.position.add(modifier))
      )
    
      shape(ctx, "white", ...points)
    }



    for (const bullet of this.bullets) {
      bullet.draw(ctx)
    }
  
  }

    
}