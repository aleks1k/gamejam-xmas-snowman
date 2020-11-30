import {static_scene} from "./static";

engine.addEntity(static_scene)

class RotatorSystem {
  update(dt: number) {
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())


