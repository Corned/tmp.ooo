class Scene {
  constructor() {
    this.actors = []
  }

  addActor(newActor) {
    this.actors.push(newActor)
  }

  update(delta) {
    for (const actor of this.actors) {
      actor.update(delta)
    }
  }

  draw(ctx) {
    
    for (const actor of this.actors) {
      actor.draw(ctx)
    }
  }
}