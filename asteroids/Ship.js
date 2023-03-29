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

      return bullet
    }).filter(o => !!o)

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

    for (const bullet of this.bullets) {
      bullet.draw(ctx)
    }
  
  }

    
}