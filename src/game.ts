import {static_scene} from "./static";
import {Snowball} from "./snowball";
import {SnowmanNPC} from "./npc";
import {AnimationPicture} from "./animationPicture";

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
  rotation: Quaternion.Euler(0, -90, 0),
  scale: new Vector3(2.5000030994415283, 2.5, 2.5000030994415283)
}, () => {
  snowball.take()
})

const screen = new AnimationPicture("textures/eyesSprites.png", 14, 2,{
    position: new Vector3(-0.03, 0.68, 0.1),
    scale: new Vector3 (0.13, 0.04, 0.13)
})
engine.addEntity(screen)
engine.addSystem(screen)
screen.setParent(npc)

const eggShape = new GLTFShape("models/egg.glb")
const egg1 = new Entity()
egg1.addComponentOrReplace(eggShape)
const transformEgg1 = new Transform({
  position: new Vector3(19.5, 1.8, 28.8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 2, 2)
})
egg1.addComponentOrReplace(transformEgg1)
egg1.addComponent(
  new OnPointerDown(
    (e) => {
      openExternalURL("https://discord.gg/8AKYpEj")
    },
    {
      button: ActionButton.ANY,
      showFeedback: true,
      hoverText: "GO TO DISCORD"
    }
  )
)
engine.addEntity(egg1)

const egg2 = new Entity()
egg2.addComponentOrReplace(eggShape)
const transformEgg2 = new Transform({
  position: new Vector3(9, 1.8, 28.8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 2, 2)
})
egg2.addComponentOrReplace(transformEgg2)
egg2.addComponent(
  new OnPointerDown(
    (e) => {
      openExternalURL("https://discord.gg/8AKYpEj")
    },
    {
      button: ActionButton.ANY,
      showFeedback: true,
      hoverText: "GO TO DISCORD"
    }
  )
)
engine.addEntity(egg2)



const santa = new Entity()
santa.addComponentOrReplace(new GLTFShape("models/santa.glb"))
const transformSanta = new Transform({
  position: new Vector3(6.5, 0.05, 4),
  rotation: Quaternion.Euler(0,-200,0),
  scale: new Vector3(10, 12, 10)
})
santa.addComponentOrReplace(transformSanta)
engine.addEntity(santa)


const santaD = new Entity()
santaD.addComponentOrReplace(new GLTFShape("models/santaDancing.glb"))
const transformSantaD = new Transform({
  position: new Vector3(4.5, 0.05, 4),
  rotation: Quaternion.Euler(0,-200,0),
  scale: new Vector3(10, 12, 10)
})
santaD.addComponentOrReplace(transformSantaD)
engine.addEntity(santaD)


const santaW = new Entity()
santaW.addComponentOrReplace(new GLTFShape("models/santaWaiting.glb"))
const transformSantaW = new Transform({
  position: new Vector3(8.5, 0.05, 4),
  rotation: Quaternion.Euler(0,-200,0),
  scale: new Vector3(10, 12, 10)
})
santaW.addComponentOrReplace(transformSantaW)
engine.addEntity(santaW)


const robot = new Entity()
robot.addComponentOrReplace(new GLTFShape("models/robot.glb"))
const transformRobot = new Transform({
  position: new Vector3(10.5, 1.5, 6),
  rotation: Quaternion.Euler(0,-180,0),
  scale: new Vector3(1, 1, 1)
})
robot.addComponentOrReplace(transformRobot)
engine.addEntity(robot)
