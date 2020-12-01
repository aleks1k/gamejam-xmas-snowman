@Component("pathData")
export class PathData {
    public path: Path3D
    origin: Vector3
    target: Vector3
    fraction: number = 0
    nextPathIndex: number = 1

    constructor(path: Path3D) {
        this.path = path
        this.origin = this.path.path[0]
        this.target = this.path.path[1]
    }
}