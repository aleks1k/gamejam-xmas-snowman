import {Enemy, IEnemyEvent} from "./enemy"

export class EnemyFactory {
    public enemies: Enemy[] = []
    private explosions = []
    private explosionShape = new GLTFShape("models/bang.glb")
    private enemyShape = new GLTFShape("models/snowman.glb")
    public needAddShootComponent = true

    constructor() {
        // very long loading model
        const explosion = new Entity()
        explosion.addComponent(this.explosionShape)
        explosion.addComponent(new Transform({
            position: new Vector3(0,19,0),
            scale: new Vector3(0.001, 0.001, 0.001)
        }))
        engine.addEntity(explosion)
    }

    enemyDying(enemy:Enemy, pos:Vector3) {
        const explosion = new Entity()
        explosion.addComponent(this.explosionShape)
        explosion.addComponent(new Transform({
            position: pos,
            scale: new Vector3(0.02, 0.02, 0.02)
        }))
        engine.addEntity(explosion)
        this.explosions.push({dt: 0, explosion: explosion, enemy: enemy})
    }

    public add(path: Path3D, speed: number, handler:IEnemyEvent) {
        let enemy = new Enemy(this.enemyShape, path, speed, handler, this.needAddShootComponent, this)
        this.enemies.push(enemy)
        return enemy
    }

    public reset() {
        this.enemies.forEach(e => {
            engine.removeEntity(e)
        });
        this.enemies = []
    }

    public update(dt) {
        this.enemies.forEach(e => {
            e.update(dt)
        })

        for (let i = 0; i < this.explosions.length; i++) {
            const ex = this.explosions[i]
            ex.dt += dt
            if (ex.dt > 3 && ex.explosion != null) {
                engine.removeEntity(ex.explosion)
                ex.explosion = null
                this.explosions.splice(i, 1);
                log('remove explosion')
                break;
            }
            if (ex.dt > 1 && ex.enemy != null) {
                engine.removeEntity(ex.enemy)
                log('remove enemy')
                ex.enemy = null
            }
        }
    }
}
