class Game {
  constructor({ framerate, debug }) {
    this.camera = null
    this.scene = null

    this.framerate = framerate
    this.debug = debug
  }

  setScene(newScene) {
    this.scene = newScene
  }

  update(delta) {
    this.scene?.update(delta)
  }

  draw(ctx) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 800, 800)

    this.scene?.draw(ctx)
  }
}