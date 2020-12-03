import {static_scene} from "./static";
import {Snowball} from "./snowball";
import {SnowmanNPC} from "./snowmanNPC";
import {AnimationPicture} from "./animationPicture";
import {LevelController} from "./levelController";
import {PlayerSpawn} from "./playerSpawn";
import {MaticNPC} from "./maticNPC";
import {LotteryNPC} from "./lotteryNPC";
import {LotteryUI} from "./lotteryUI";
import {getCurrentRealm} from "@decentraland/EnvironmentAPI";
import {BuilderHUD} from "./builderHUD/BuilderHUD";
import {LotteryStand} from "./lotteryStand";
import {movePlayerTo} from "@decentraland/RestrictedActions";

engine.addEntity(static_scene)
getCurrentRealm().then(realm => {
    if (realm.displayName == 'localhost-stub') {
        const hud = new BuilderHUD()
        const hudAttachEntities = [
            // 'LotteryStand','snowmanNPC'
            // 'MaticNPC','LotteryNPC',
            // 'stealPresent'
        ]

        for (const e in engine.entities) {
            const entity = engine.entities[e];
            if (entity instanceof Entity && entity.name != null) {
                // log(entity.name)
                if (hudAttachEntities.indexOf(entity.name) > -1) {
                    log('attach To Entity', entity.name)
                    hud.attachToEntity(entity)
                }
            }
        }
    }
})


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
  position: new Vector3(25.5,0,3.5),
  rotation: Quaternion.Euler(0, -90, 0),
  scale: new Vector3(2.5000030994415283, 2.5, 2.5000030994415283)
}, () => {
  snowball.take()
})
snowmanNPC.name = 'snowmanNPC'
// const presentShape = new GLTFShape("models/static/present.glb")
// const present = new Entity('stealPresent')
// present.addComponent(presentShape)
// present.addComponent(new Transform({
//     position: new Vector3(0, 0.5, 0.2),
//     scale: new Vector3(1, 1, 1)
// }))
// present.setParent(snowmanNPC)

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

class EggSystem implements ISystem {
    update(dt: number) {
        const u = Camera.instance.position
        if ( u.x < 23 && u.x > 22 && u.y < 2 && u.y > 0 && u.z < 26 && u.z > 25) {
            movePlayerTo({x: 12.9, y: 2, z: 30.5})
        }
    }
}
engine.addSystem(new EggSystem())

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

const lotteryScene = new LotteryStand({
  position: new Vector3(5.6, 0, 4.1),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lotteryScene.setParent(static_scene)
lotteryScene.updateInfo(500000, 10000000, 1000, 200)

const santa = new LotteryNPC({
    position: new Vector3(-2.3,0.05,2.7),
    rotation: Quaternion.Euler(0,120,0),
    scale: new Vector3(10, 12, 10)
})
santa.setParent(lotteryScene)
santa.name = 'LotteryNPC'

const maticNpc = new MaticNPC({
    position: new Vector3(-2.1,1.5,-2.1),
    rotation: Quaternion.Euler(0,30,0),
    scale: new Vector3(1, 1, 1)
})
maticNpc.setParent(lotteryScene)
maticNpc.name = 'MaticNPC'

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