import {LevelController} from "./levelController";
import {movePlayerTo} from "@decentraland/RestrictedActions";

export class PlayerSpawn {
    spawnPositions = [
        {x: 15.51, y: 0, z: 6.19},
        {x: 10.93, y: 0, z: 7.13},
        {x: 19.84, y: 0, z: 5.07}
    ]
    colliderShape = new GLTFShape("models/static/snowFortCollider.glb")
    private colliders: Entity[] = [];
    currentPointIndex = null

    constructor(collidersCreated=true) {
        this.colliderShape.withCollisions = true
        this.colliderShape.isPointerBlocker = false
        this.colliderShape.visible = true

        this.spawnPositions.forEach(sp => {
            this.addColleder(sp)
        })
    }

    addColleder(sp) {
        const collider = new Entity()
        collider.addComponent(new Transform({
            position: new Vector3(sp.x, sp.y, sp.z),
            rotation: new Quaternion(-8.300713665954172e-15, -0.9951847791671753, 1.1863526339084274e-7, -0.09801724553108215),
            scale: new Vector3(3, 3, 3)
        }))
        collider.addComponentOrReplace(this.colliderShape)
        engine.addEntity(collider)
        this.colliders.push(collider)
    }

    spawn() {
        this.colliderShape.visible = true
        this.colliderShape.withCollisions = true
        this.currentPointIndex = LevelController.getRandomInt(0, 3)
        const sp = this.spawnPositions[this.currentPointIndex]
        engine.addEntity(this.colliders[this.currentPointIndex])
        // this.addColleder(sp)
        movePlayerTo(sp, {x: 8, y: 1, z: 8})
    }

    release() {
        if (this.currentPointIndex != null) {
            engine.removeEntity(this.colliders[this.currentPointIndex])
            this.currentPointIndex = null
        }
    }
}