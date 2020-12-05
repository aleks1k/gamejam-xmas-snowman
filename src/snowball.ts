import utils from "../node_modules/decentraland-ecs-utils/index"
import { Weapon } from "./weapon";
import { WeaponComponent } from "./WeaponComponent";
import { movePlayerTo } from '@decentraland/RestrictedActions'

const camera = Camera.instance

export class Snowball extends Weapon implements ISystem {
    private takeHandler
    private fireParent: IEntity;
    private fireBase: Entity;
    private shootTime = 0.3
    private sfxClip
    private sfxSource
    private ballPath = [
        new Vector3(0, 0, 0),
        new Vector3(4, 1, 0),
        new Vector3(8, 1.5, 0),
        new Vector3(16, 1, 0),
        new Vector3(20, 0, 0),
        new Vector3(24, -1, 0),
    ]
    private isFly: boolean = false;
    private dt: number = 0;

    constructor(takeHandler) {
        super(new GLTFShape(
            "models/snowBall.glb"),
            {
                position: new Vector3(25.1, 1.5, 5),
                scale: new Vector3(1, 1, 1)
            },
            {
                position: new Vector3(0, -0.35, 0.95),
                rotation: Quaternion.Euler(0, 270, 0),
                scale: new Vector3(0.4, 0.4, 0.4)
            }
        )

        this.takeHandler = takeHandler

        this.fireBase = new Entity()
        this.fireBase.addComponent(new Transform({
            position: camera.position,
            rotation: camera.rotation
        }))
        engine.addEntity(this.fireBase)
        this.ballPath = this.ballPath.map(v => v.add(new Vector3(0, -0.55, 0)))//-0.95)))


        // this.initSnowball()

        // engine.addSystem(this)
        this.sfxClip = new AudioClip("sfx/snowballFire1.mp3")
        this.sfxSource = new AudioSource(this.sfxClip)
        this.addComponent(this.sfxSource)
    }

    initSnowball() {
        this.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(15, 90, 0)))
        this.addComponent(
            new OnPointerDown(() => {
                this.take()
            },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "TAKE",
                    distance: 4,
                })
        )
    }

    take() {
        // this.removeComponent(OnPointerDown)
        // this.getComponent(utils.KeepRotatingComponent).stop()
        // this.removeComponent(utils.KeepRotatingComponent)
        super.take()
        if(this.takeHandler != null) this.takeHandler()
    }

    fire() {
        if (!this.getComponent(WeaponComponent).attached || this.isFly) {
            return
        }
        if (this.getParent() != this.fireBase) {
            this.fireParent = this.getParent()
            this.setParent(this.fireBase)
        }
        this.fireBase.getComponent(Transform).position = camera.position
        this.fireBase.getComponent(Transform).rotation = camera.rotation.multiply(Quaternion.Euler(0, 270, 0))
        this.addComponent(new utils.FollowPathComponent(this.ballPath, this.shootTime))
        this.isFly = true
        this.sfxSource.playOnce()
        this.sfxSource.volume = 1
    }

    update(dt: number) {
        if (this.isFly) {
            // log('up', this.dt)
            this.dt += dt
        }
        if (this.dt > this.shootTime) {
            // log('end')
            this.isFly = false
            this.removeComponent(utils.FollowPathComponent)
            this.getComponent(Transform).position = this.getComponent(WeaponComponent).attachedTransform.position
            this.setParent(Attachable.FIRST_PERSON_CAMERA)
            // this.setParent(this.fireParent)
            // this.getComponent(Transform).scale.x = 1
            this.dt = 0
        }
    }
}
