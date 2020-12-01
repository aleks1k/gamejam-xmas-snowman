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
  rotation:  Quaternion.Euler(0,-90,0),
  scale: new Vector3(2.5000030994415283, 2.5, 2.5000030994415283)
}, () => {
  snowball.take()
})



const myVideoClip = new VideoClip(
  "models/static/eyes.mp4"
)

// #2
const myVideoTexture = new VideoTexture(myVideoClip)

// #3
const myMaterial = new BasicMaterial()
myMaterial.texture = myVideoTexture

// #4
const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(-0.03, 0.68, 0.1),
    scale: new Vector3 (0.13, 0.04, 0.13)
  })
)
screen.addComponent(myMaterial)
screen.addComponent(
  new OnPointerDown(() => {
    myVideoTexture.playing = !myVideoTexture.playing
  })
)

screen.setParent(npc)

// #5
myVideoTexture.playing = true
myVideoTexture.loop = true


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