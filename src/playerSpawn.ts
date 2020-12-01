import {LevelController} from "./levelController";
import {movePlayerTo} from "@decentraland/RestrictedActions";

export class PlayerSpawn {
    spawnPositions = [
        {x: 15.51, y: 0, z: 6.19},
        {x: 10.93, y: 0, z: 7.13},
        {x: 19.84, y: 0, z: 5.07}
    ]
    colliderShape = new GLTFShape("models/static/snowFortCollider.glb")
    private collider: Entity;

    constructor() {
        this.colliderShape.withCollisions = true
        this.colliderShape.isPointerBlocker = false
        this.colliderShape.visible = true
        ///// сейчас есть проблема в том, что телепорт раньше срабатывает, чем появляется коллайдер
        ///// надо коллайдер заранее инициализировать, иначе выбежать удается после телепортирования
    }

    spawn() {
        this.collider = new Entity()
        const pointIndex = LevelController.getRandomInt(0, 3)
        const sp = this.spawnPositions[pointIndex]
        this.collider.addComponent(new Transform({
            position: new Vector3(sp.x, sp.y, sp.z),
            rotation: new Quaternion(-8.300713665954172e-15, -0.9951847791671753, 1.1863526339084274e-7, -0.09801724553108215),
            scale: new Vector3(3, 3, 3)
        }))
        this.collider.addComponentOrReplace(this.colliderShape)
        engine.addEntity(this.collider)

        movePlayerTo(sp, {x: 8, y: 1, z: 8})
    }

    release() {
        if (this.collider != null) {
            engine.removeEntity(this.collider)
            this.collider = null
        }
    }
}