import {static_scene} from "./static";
import {Snowball} from "./snowball";

engine.addEntity(static_scene)

class RotatorSystem {
  update(dt: number) {
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

const snowball = new Snowball(null)
snowball.setParent(static_scene)
engine.addSystem(snowball)

const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
  snowball.toggle()
})
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => {
  snowball.fire()
})