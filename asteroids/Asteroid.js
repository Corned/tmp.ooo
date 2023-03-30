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

    this.particles = this.particles.map((particle) => {
      particle.update()

      if (particle.delete) {
        particle = null
        return null
      }

      return particle
    }).filter(o => !!o)
  }

  collidesWith(bullet) {
    const getArea = (a, b, c) => 0.5 * Math.abs((b.x - a.x)*(c.y - a.y) - (c.x - a.x)*(b.y - a.y))

    const points = [ ...this.edgePoints, this.edgePoints[0] ].map(a => a.add(this.position))

    let asteroidArea = 0
    let asteroidAreaBullet = 0

    for (let corner = 0; corner < points.length - 1; corner++) {

      const p = this.position
      const a = points[corner] 
      const b = points[corner + 1]
      const c = bullet.position

      asteroidArea += getArea(p, a, b)
      asteroidAreaBullet += getArea(c, a, b)
    }


    const collides = asteroidAreaBullet - asteroidArea < 10
    if (collides) {

      this.delete = true
      bullet.delete = true

      for (let ax = 0; ax < 40; ax++) {

        const particleSpawnLocation = bullet.position
        const directionAwayFromAsteroid = particleSpawnLocation.sub(this.position).unit.mul(-1)

        const a = particleSpawnLocation
        const b = this.position
        const angle = /* Math.atan2(b.y - a.y, b.x - a.x) */ Math.random() * Math.PI * 2

        console.log(angle);
 
        const normalizedRandomizedDirection = new Vector(
            directionAwayFromAsteroid.x * Math.cos(angle) - directionAwayFromAsteroid.y * Math.sin(angle),
            directionAwayFromAsteroid.y * Math.cos(angle) + directionAwayFromAsteroid.x * Math.sin(angle)
          ).mul(2 + Math.random())

          console.log(angle, normalizedRandomizedDirection);

        const newParticle = new Particle(
          particleSpawnLocation,
          normalizedRandomizedDirection,
          1 + Math.random() * 3,
          200
        )
    
        this.particles.push(newParticle)
      }
    }
  }

  draw(ctx) {

    shape(ctx, /* this.delete ? "red" : */ "white", ...this.edgePoints.map(point => 
      point
      .add(this.position)
    ))

    for (const particle of this.particles) {
      particle.draw(ctx)
    }
  }
}