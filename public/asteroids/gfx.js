const shape = (ctx, color = "rgb(255, 255, 255)", ...points) => {
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }

  
  ctx.lineTo(points[0].x, points[0].y)

  ctx.fill()
}