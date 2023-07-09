class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(v2) {
    return new Vector(
      this.x + v2.x,
      this.y + v2.y
    )
  }

  sub(v2) {
    return new Vector(
      this.x - v2.x,
      this.y - v2.y
    )
  }

  mul(v) {
    return new Vector(
      this.x * v,
      this.y * v
    )
  }

  div(v) {
    return new Vector(
      this.x / v,
      this.y / v
    )
  }

  rotate(angle) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.y * Math.cos(angle) + this.x * Math.sin(angle)
    )
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  } 

  get unit() {
    return this.div(this.magnitude)
  }



  isWithinRect(pos, size) {
    return (
      this.x >= pos.x 
      && this.x <= pos.x + size.x
      && this.y >= pos.y 
      && this.y <= pos.y + size.y
    )
  }

  isWithinTriangle(p1, p2, p3) {
    const area = 0.5 * Math.abs((p2.x - p1.x)*(p3.y - p1.y) - (p3.x - p1.x)*(p2.y - p1.y))
    const sub1 = 0.5 * Math.abs((p1.x - this.x)*(p2.y - this.y) - (p2.x - this.x)*(p1.y - this.y))
    const sub2 = 0.5 * Math.abs((p2.x - this.x)*(p3.y - this.y) - (p3.x - this.x)*(p2.y - this.y))
    const sub3 = 0.5 * Math.abs((p3.x - this.x)*(p1.y - this.y) - (p1.x - this.x)*(p3.y - this.y))
    
    return sub1 + sub2 + sub3 === area
  }
}
