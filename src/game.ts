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
import {movePlayerTo, PredefinedEmote, triggerEmote} from "@decentraland/RestrictedActions";
import {getUserAccount} from "@decentraland/EthereumController";
import {INpcEvents} from "./npcBase";

const serverUrl = "wss://xmas-api.dapp-craft.com/"
// const serverUrl = "ws://127.0.0.1:3000/"

static_scene.addComponentOrReplace(new Transform({
  position: new Vector3(32, 0, 0),
  rotation: Quaternion.Euler(0, -90, 0)
}))

engine.addEntity(static_scene)
getCurrentRealm().then(realm => {
  if (realm.displayName == 'localhost-stub') {
    const hud = new BuilderHUD()
    const hudAttachEntities = [
      // 'LotteryStand','snowmanNPC'
      // 'MaticNPC','LotteryNPC',
      'discordLink','voting'
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
    gameController.startGame(snowball)
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
  position: new Vector3(25.5, 0, 3.5),
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
snowmanNPC.setParent(static_scene)

const snowmanEyes = new AnimationPicture("textures/eyesSprites.png", 14, 2, {
  position: new Vector3(-0.03, 0.68, 0.1),
  scale: new Vector3(0.13, 0.04, 0.13)
})
snowmanEyes.setParent(snowmanNPC)
engine.addSystem(snowmanEyes)

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
egg1.setParent(static_scene)

class EggSystem implements ISystem {
  dt = 0
  emoteTimer = 10

  update(dt: number) {
    const u = Camera.instance.position
    if (u.x < 7 && u.x > 6 && u.y < 2 && u.y > 0 && u.z < 25 && u.z > 22) {
      movePlayerTo({ x: 2, y: 2, z: 14})
      let clip = new AudioClip("sfx/egg.wav")
      let source = new AudioSource(clip)
      egg1.addComponentOrReplace(source)
      source.playing = true
      source.loop = false
      source.volume = 1
    }
    this.dt += dt
    if (u.x < 99 && u.x > 23 && u.y < 10 && u.y > 0 && u.z < 8 && u.z > 0) {
      if(this.dt > this.emoteTimer) {
        triggerEmote({predefined: PredefinedEmote.MONEY})
        log('Emote')
        this.dt = 0
      }
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
egg2.setParent(static_scene)

const lotteryScene = new LotteryStand({
  position: new Vector3(5.6, 0, 4.1),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lotteryScene.setParent(static_scene)
// lotteryScene.updateInfo(500000, 10000000, 1000, 200)

const santa = new LotteryNPC({
  position: new Vector3(-2.3, 0.05, 2.7),
  rotation: Quaternion.Euler(0, 120, 0),
  scale: new Vector3(10, 12, 10)
})
santa.setParent(lotteryScene)
santa.name = 'LotteryNPC'

const maticNpc = new MaticNPC({
  position: new Vector3(-2.1, 1.5, -2.1),
  rotation: Quaternion.Euler(0, 30, 0),
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

    sendMessage(socket, 'score', {
      score: score,
      level: level
    })
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
    snowball.take()
    snowmanNPC.hide()
    playerSpawn.spawn()
  }
})
engine.addSystem(gameController)

Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
  log('USER POSITION: ', Camera.instance.position)
})

let socket = null

function sendMessage(socket:WebSocket, command:string, d:any) {
  if (socket == null) {
    santa.showError('Could not connect to backend server!')
    return
  }
  const data = d
  if (userAddress != null) {
    data['userAddress'] = userAddress
  }
  data['command'] = command
  log('sendMessage', data)
  socket.send(JSON.stringify(data))
}

let npcEvents = new class implements INpcEvents {
  onCustomEvent(npcId: string, event: string, params: any) {
    params['npcId'] = npcId
    if(event === 'buyTicket') {
      sendMessage(socket, event, params)
    } else if (event === 'depositMana') {
      sendMessage(socket, event, params)
    } else {
      params['npcEvent'] = event
      sendMessage(socket, 'sendEvent', params)
    }
  }

  onStartTalk(npcId: string) {
    log('onStartTalk_')
    sendMessage(socket, 'talkNpc', {npcId: npcId})
  }
}
santa.setEventHandler(npcEvents)
maticNpc.setEventHandler(npcEvents)

function connectSocket(userAddress) {
  try {
    socket = new WebSocket(serverUrl);
  } catch (e) {
    log(e)
    socketReconnectSys.dt = 0
  }

  socket.onmessage = function (event) {
    try {
      const msg = JSON.parse(event.data)
      log(msg)
      if (msg.type === 'updateState') {
        lotteryUI.updateTask(msg.tiketsCount, msg.tasksState)
      } else if (msg.type === 'scoreTable') {
        gameController.showHighscore(msg.table)
      } else if (msg.type === 'lotteryInfoUpdate') {
        lotteryScene.updateInfo(msg.lotteryState.mainPrize, msg.lotteryState.pool, msg.lotteryState.tickets, msg.lotteryState.winnerPlaces)
        triggerEmote({predefined: PredefinedEmote.FIST_PUMP})
      } else if (msg.type === 'updateStream') {
        // TODO
      }
    } catch (error) {
      log(error);
    }
  };

  socket.onopen = function (event) {
    log('connect', userAddress)
    sendMessage(socket, 'connect', {})
  }

  socket.onclose = function(e) {
    log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    socketReconnectSys.dt = 0
  };

  socket.onerror = function(err) {
    log('Socket encountered error: ', err.message, 'Closing socket');
    socket.close();
  };
}

const socketReconnectSys = new class implements ISystem {
  reconnectTimeout = 10
  dt = this.reconnectTimeout

  update(dt: number) {
    if(this.dt > this.reconnectTimeout) {
      if (userAddress != null && (socket == null || socket.readyState == WebSocket.CLOSED)) {
        connectSocket(userAddress)
      }
    } else {
      this.dt += dt
    }
  }
}
engine.addSystem(socketReconnectSys)

let userAddress = null


const _getUserAccount = async () => {
  let address;
  while(!address){
    try {
      address = await getUserAccount();
    }catch (e) {

    }
    if(!address){
      log("NO USER, retry", address);
    }
  }
  return address;
}

_getUserAccount().then(address => {
  if (address != null) {
    userAddress = address
    santa.userAddress = userAddress
    maticNpc.userAddress = userAddress
    connectSocket(address)
  }
}).catch(reason => {
  santa.showError(reason.toString())
})

const discordLink = new Entity('discordLink')
discordLink.addComponent(
    new Transform({
      position: new Vector3(25.5,0.6, 2),
      scale: new Vector3(0.6, 0.6, 0.6),
    })
)
discordLink.addComponent(new GLTFShape('models/discord.glb'))
discordLink.addComponent(
    new OnPointerDown(
        (e) => {
          openExternalURL("https://discord.gg/2dmBNae")
        },
        { hoverText: 'Join the Discussion', button: ActionButton.POINTER }
    )
)
discordLink.setParent(static_scene)

const voting_stand = new Entity('qwe')
voting_stand.addComponent(
  new Transform({
    position: new Vector3(6.6,0.1,7.6),
    rotation: Quaternion.Euler(-180,35,-180),
    scale: new Vector3(0.14,0.11,0.16),
  })
)
voting_stand.addComponent(new GLTFShape('models/stand.glb'))
voting_stand.addComponent(
  new OnPointerDown(
      (e) => {
        openExternalURL("https://contest.decentraland.org/")
      },
      { hoverText: 'VOTE', button: ActionButton.POINTER }
  )
)
voting_stand.setParent(static_scene)



const myVideoClip = new VideoClip(
  "https://video.dcl.guru/live/anorak/index.m3u8"
 //"https://theuniverse.club/live/consensys/index.m3u8"
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
    position: new Vector3(2.55,2.53,4.79),
    rotation: Quaternion.Euler(0,-90,0),
    scale: new Vector3(-5.8,3.3,3),
  })
)
screen.addComponent(myMaterial)
screen.addComponent(
  new OnPointerDown(() => {
    myVideoTexture.playing = !myVideoTexture.playing
  })
)
screen.setParent(static_scene)

// #5
myVideoTexture.playing = true