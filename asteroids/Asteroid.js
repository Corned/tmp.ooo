class Asteroid {
  constructor(position, radius, corners, smoothness) {
    this.position = position
    this.radius = radius
    this.corners = corners
    this.smoothness = smoothness

    this.rotation = 0
    this.rotVelocity = Math.random() / 10 - 0.05
    this.velocity = new Vector() //new Vector(Math.random() - 0.5, Math.random() - 0.5)
    this.delete = false

    this.particles = []

    this.shape = []
    for (let i = -Math.PI; i < Math.PI; i += Math.PI/this.corners * 2) {
      this.shape.push(
        new Vector(
          radius * Math.cos(i),
          radius * Math.sin(i),
        ).mul(1 + Math.random())
      )
    }

    
    this.explosionAudio = new Audio("/asteroids/assets/explosion1.wav")
  }

  update() {
    this.position = this.position.add(this.velocity)
    this.rotation = this.rotation + this.rotVelocity

    this.particles = this.particles.map((particle) => {
      particle.update()

      if (particle.delete) {
        particle = null
        return null
      }

      return particle
    }).filter(o => !!o)
  }

  collidesWith(position) {
    const getArea = (a, b, c) => 0.5 * Math.abs((b.x - a.x)*(c.y - a.y) - (c.x - a.x)*(b.y - a.y))

    const points = [ ...this.shape, this.shape[0] ].map(a => a.add(this.position))

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
        collides = true

        return [b, c]
      }
    }

    return collides

   /*  if (collides) {

      this.delete = true
      bullet.delete = true

      const clone = this.explosionAudio.cloneNode(true)
      clone.volume = 0.2
      clone.play()


      for (let ax = 0; ax < 40; ax++) {

        const particleSpawnLocation = bullet.position
        const directionAwayFromAsteroid = particleSpawnLocation.sub(this.position).unit.mul(-1)
        const angle = Math.random() * Math.PI * 2
 
        const normalizedRandomizedDirection = new Vector(
            directionAwayFromAsteroid.x * Math.cos(angle) - directionAwayFromAsteroid.y * Math.sin(angle),
            directionAwayFromAsteroid.y * Math.cos(angle) + directionAwayFromAsteroid.x * Math.sin(angle)
          ).mul(2 + Math.random())

        const newParticle = new Particle(
          particleSpawnLocation,
          normalizedRandomizedDirection,
          1 + Math.random() * 3,
          200
        )
    
        this.particles.push(newParticle)
      }
    } */
  }

  draw(ctx) {

    shape(ctx, "white", ...this.shape.map(point => 
      point.add(this.position)
    ))

/*     ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 2, 0, 2*Math.PI)
    ctx.fill()
    
    const points = this.shape.map(a => a.add(this.position))
    for (const point of points) {
      ctx.strokeStyle = "red"
      ctx.beginPath()
      ctx.moveTo(this.position.x, this.position.y)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
    } */

    const points2 = [ ...this.shape, this.shape[0] ].map(a => a.add(this.position))


/*     for (let corner = 0; corner < points2.length - 1; corner++) {
      const p = this.position
      const a = points2 [corner] 
      const b = points2[corner + 1]

      ctx.strokeStyle = "red"
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()

    } */


    for (const particle of this.particles) {
      particle.draw(ctx)
    }
  }
}