import utils from "../node_modules/decentraland-ecs-utils/index"

import {PathData} from "./pathDataComponent"
import {PatrolPath} from "./patrolPath"

const invisibleSphere = new SphereShape()
invisibleSphere.visible = false
invisibleSphere.isPointerBlocker = false

export interface IEnemyEvent {
    onHit(p: Enemy, pos: any);

    onSmashPlayer(p: Enemy, position: any);
    onTakePresent();
}

export class Enemy extends Entity {
    path: Path3D
    public isLive: boolean
    public attack = 0.1
    public isExployed = false
    private PatrolPath: PatrolPath
    private handler:IEnemyEvent
    private rayTrigger: Entity;
    private presentShape = new GLTFShape("models/static/present.glb")
    stealPresent = false
    runAway = false
    private present: Entity;

    constructor(model:GLTFShape, path: Path3D, speed: number, handler:IEnemyEvent, needAddShootComponent) {
        super()
        this.handler = handler
        this.isLive = true
        this.path = path
        this.addComponent(new Transform({
            // position: path.path[0],
            scale: new Vector3(2, 2, 2)
        }))

        this.PatrolPath = new PatrolPath(this, this.path, speed)

        // engine.addSystem(this.PatrolPath)
        this.addComponent(model)

        if (needAddShootComponent) this.addShootComponent()
        this.getComponent(GLTFShape).withCollisions = false

        this.rayTrigger = new Entity("enemyRayTrigger")
        this.rayTrigger.addComponent(invisibleSphere)
        this.rayTrigger.addComponent(new Transform({
            scale: new Vector3(0.6, 0.6, 0.6)
        }))

        // create trigger area object, setting size and relative position
        let triggerBox = new utils.TriggerSphereShape(1.5, Vector3.Zero())
        this.addComponent(
            new utils.TriggerComponent(
                triggerBox, //shape
                2, //layer
                1, //triggeredByLayer
                null,
                null,
                () => {
                    if (this.isLive) this.smashPlayer()
                }, //onTriggerEnter
                null, false //onCameraExit
            )
        )
        this.addComponent(new PathData(this.path))
        this.addComponent(new Billboard())
        engine.addEntity(this)
        this.rayTrigger.setParent(this)
        log("Enemy added")
    }
    public static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
    public addShootComponent() {
        this.addComponent(
            new OnPointerDown(() => {
                    log('kill', this)
                    if (this.isLive) this.kill('snowball')
                },
                {
                    button: ActionButton.ANY,
                    showFeedback: false,
                    hoverText: "SHOOT",
                    distance: 100,
                })
        )
    }

    private smashPlayer() {
        const pos = this.die(false)
        this.handler.onSmashPlayer(this, pos)
    }

    public kill(weapon) {
        const pos = this.die(true)
        log(pos)
        this.handler.onHit(this, pos)
    }

    private die(showExplosion) {
        this.rayTrigger.setParent(null)
        let clip = new AudioClip("sfx/sfxFight.mp3")
        let source = new AudioSource(clip)
        source.playing = true
        source.loop = false
        source.volume = 1
        this.addComponentOrReplace(source)
        let explosionPosition = null
        if (showExplosion) {
            explosionPosition = this.getComponent(Transform).position.clone()
            explosionPosition.y += 0.5
        }

        this.isLive = false
        this.removeComponent(GLTFShape)
        this.getComponent(Transform).position = new Vector3(8, 15, 8)
        // engine.removeSystem(this.PatrolPath)
        return explosionPosition
    }

    update(dt:number) {
        this.PatrolPath.update(dt)
        const path = this.getComponent(PathData)
        if (path.nextPathIndex >= path.path.path.length-1) {
            if (path.nextPathIndex >= path.path.path.length) {
                if (!this.runAway) {
                    // teleport to mars with present
                    this.runAway = true
                    this.isLive = false
                    this.present.setParent(null)
                    engine.removeEntity(this.present)
                    this.removeComponent(GLTFShape)
                }
            } else {
                if (!this.stealPresent) {
                    // steal present
                    this.present = new Entity('stealPresent')
                    this.present.addComponent(this.presentShape)
                    this.present.addComponent(new Transform({
                        position: new Vector3(0, 2, 0),
                        scale: new Vector3(1, 1, 1)
                    }))
                    this.present.setParent(this)
                    this.stealPresent = true
                }
            }
        }
    }
}