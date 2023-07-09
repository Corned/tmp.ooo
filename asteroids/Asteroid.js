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
  }

  draw(ctx) {

    shape(ctx, "white", ...this.shape.map(point => 
      point.add(this.position)
    ))

    for (const particle of this.particles) {
      particle.draw(ctx)
    }
  }
}