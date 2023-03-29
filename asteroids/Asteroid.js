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