import {static_scene} from "./static";
import {Snowball} from "./snowball";
import {SnowmanNPC} from "./npc";

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
// input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
//   snowball.toggle()
// })
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (e) => {
  snowball.fire()
})

const npc = new SnowmanNPC({
  position: new Vector3(23.5, 0, 4),
  rotation: new Quaternion(-1.10062582369541e-15, 0.6343932747840881, -7.562556447737734e-8, 0.7730104327201843),
  scale: new Vector3(2.5000030994415283, 2.5, 2.5000030994415283)
}, () => {
  snowball.take()
})
//
//
// const snowman = new Entity('snowman')
// snowman.setParent(static_scene)
// const transform12 = new Transform()
// snowman.addComponentOrReplace(transform12)
// const gltfShape7 = new GLTFShape("models/static/snowman.glb")
// gltfShape7.withCollisions = true
// gltfShape7.isPointerBlocker = true
// gltfShape7.visible = true
// snowman.addComponentOrReplace(gltfShape7)