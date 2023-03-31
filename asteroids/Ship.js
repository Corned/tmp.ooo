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
    this.bulletInterval = 1000 / 5
    this.maxSpeed = 4

    this.laserShootAudio = new Audio("/asteroids/assets/laserShoot.wav")
  }

  update(keys) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    // 
    if (keys[" "] && this.lastShot + this.bulletInterval < Date.now()) {
      this.lastShot = Date.now()

      const clone = this.laserShootAudio.cloneNode(true)
      clone.volume = 0.3
      clone.play()

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
        .mul(-this.maxSpeed - Math.random())

        const newParticle = new Particle(
          loc,
          dir,
          Math.random() * 3,
          200
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

    // Render a few additional ships for way smoother wrapping
    const modifiers = [
      new Vector(),
      new Vector(0, 800),
      new Vector(0, -800),
      new Vector(800, 0),
      new Vector(-800, 0),
    ]
    
    for (const modifier of modifiers) {
      let points = []

      // Ship's shape
      points.push(new Vector(0, -2))
      points.push(new Vector(1.5, 2))
      points.push(new Vector(0, 1))
      points.push(new Vector(-1.5, 2))
    
      // Resize and rotate the ship based on its rotation and size
      points = points.map((v) => 
        new Vector(
          v.x * Math.cos(this.rotation) - v.y * Math.sin(this.rotation),
          v.y * Math.cos(this.rotation) + v.x * Math.sin(this.rotation)
        )
        .mul(this.size)
        .add(this.position.add(modifier))
      )
    
      shape(ctx, "white", ...points)
    }

    for (const particle of this.particles) {
      particle.draw(ctx)
    }

    for (const bullet of this.bullets) {
      bullet.draw(ctx)
    }
  
  }

    
}