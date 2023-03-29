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

    const fillStyles = [
      `rgba(255, 0, 0, ${transparency})`,
      `rgba(255, 255, 0, ${transparency})`,
      `rgba(255, 255, 200, ${transparency})`,
    ]

    ctx.fillStyle = fillStyles[Math.floor(Math.random() * fillStyles.length)]
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    ctx.fill()
  }
}