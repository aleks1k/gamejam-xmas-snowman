import {PathData} from "./pathDataComponent";

export class PatrolPath implements ISystem {
    private entity: Entity
    private path: Path3D
    private speed: number

    public constructor(entity: Entity, path: Path3D, speed: number) {
        this.entity = entity
        this.path = path
        this.speed = speed
    }

    update(dt: number) {
        let transform = this.entity.getComponent(Transform)
        let path = this.entity.getComponent(PathData)
        if (path.nextPathIndex >= this.path.path.length) {
            // end path
            return
        }
        if (path.fraction < 1) {
            transform.position = Vector3.Lerp(path.origin, path.target, path.fraction)
            if (this.speed > 10) this.speed = 9
            path.fraction += (dt / 3) * (this.speed / 6)
        } else {
            path.nextPathIndex += 1
            path.origin = path.target
            path.target = this.path.path[path.nextPathIndex]
            path.fraction = 0
        }
    }
}
