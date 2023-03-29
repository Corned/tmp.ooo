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

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
    ctx.fill()
  }
}