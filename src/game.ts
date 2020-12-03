import {static_scene} from "./static";
import {Snowball} from "./snowball";
import {SnowmanNPC} from "./snowmanNPC";
import {AnimationPicture} from "./animationPicture";
import {LevelController} from "./levelController";
import {PlayerSpawn} from "./playerSpawn";
import {MaticNPC} from "./maticNPC";
import {LotteryNPC} from "./lotteryNPC";
import {LotteryUI} from "./lotteryUI";

engine.addEntity(static_scene)

class RotatorSystem {
  update(dt: number) {
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

const snowball = new Snowball(() => {
    gameController.startGame()
})
snowball.setParent(static_scene)
engine.addSystem(snowball)

const input = Input.instance
// input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
//   snowball.toggle()
// })
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (e) => {
  snowball.fire()
})

let lotteryUI = new LotteryUI()



const snowmanNPC = new SnowmanNPC({
  position: new Vector3(23.5, 0, 4),
  rotation: Quaternion.Euler(0, -90, 0),
  scale: new Vector3(2.5000030994415283, 2.5, 2.5000030994415283)
}, () => {
  snowball.take()
})

const snowmanEyes = new AnimationPicture("textures/eyesSprites.png", 14, 2,{
    position: new Vector3(-0.03, 0.68, 0.1),
    scale: new Vector3 (0.13, 0.04, 0.13)
})
engine.addEntity(snowmanEyes)
engine.addSystem(snowmanEyes)
snowmanEyes.setParent(snowmanNPC)

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


const lotteryScene = new Entity()
const transform70 = new Transform({
  position: new Vector3(7.5, 0, 4.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lotteryScene.addComponentOrReplace(transform70)
lotteryScene.addComponentOrReplace(new GLTFShape("models/lottery.glb"))
engine.addEntity(lotteryScene)

const santa = new LotteryNPC({
    position: new Vector3(4.5, 0.05, 4),
    rotation: Quaternion.Euler(0,90,0),
    scale: new Vector3(10, 12, 10)
})
engine.addEntity(santa)

const maticNpc = new MaticNPC({
    position: new Vector3(10.5, 1.5, 6),
    rotation: Quaternion.Euler(0,-180,0),
    scale: new Vector3(1, 1, 1)
})
engine.addEntity(maticNpc)

let playerSpawn = new PlayerSpawn();

const gameController = new LevelController(new class implements IGameEvents {
    onEnd(level: number, score: number) {
        snowball.drop()
        snowmanNPC.show()
        playerSpawn.release()
    }

    onExit() {
        snowball.drop()
        snowmanNPC.show()
        playerSpawn.release()
    }

    onFire() {
    }

    onKill() {
    }

    onNewLeve(level: number) {
        log('new level', level)
    }

    onStart() {
        snowmanNPC.hide()
        playerSpawn.spawn()
    }
})
engine.addSystem(gameController)

Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
    log('USER POSITION: ', Camera.instance.position)
})