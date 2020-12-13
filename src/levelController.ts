import {EnemyFactory} from "./enemyFactory"
import {ISceneUIEvent, PlayerUI} from "./playerUI"
import {GameUI} from "./gameUI";
import {IEnemyEvent, Enemy} from "./enemy";
import {Weapon} from "./weapon";

const camera = Camera.instance

enum GameState {
    NotStarted,
    Strarted,
    Over
}

export class LevelController implements ISystem, IEnemyEvent, ISceneUIEvent {
    state: GameState
    factory: EnemyFactory
    sceneUI: PlayerUI
    ui: GameUI
    eventHandler: IGameEvents
    dt: number = 0
    level: number = 0
    stealPresents: number = 0
    addScore = 1
    snowmanSpawnPoint = new Vector3(6.5, 0, 23.11)
    presentsTargetPoint = new Vector3(7.18, 0, 4.6)
    private stealMax: number = 5;
    private weapon: Weapon;

    constructor(eventHandler: IGameEvents) {
        this.eventHandler = eventHandler
        this.ui = new GameUI()
        this.sceneUI = new PlayerUI(this)
        this.factory = new EnemyFactory()
        this.ui.visible(false)
    }

    onRestart() {
        this.restart()
    }

    onEndGame() {
        this.endGame()
    }

    onHit(p: Enemy, pos: any) {
        if (this.isStarted() && !this.weapon.isReload()) {
            p.die(true)
            this.ui.score.increase(this.addScore)
            this.factory.enemyDying(p, pos)
        }
    }
    onSmashPlayer(p: Enemy, position: any) {
        // if (this.isStarted()) {
        //     this.ui.health.decrease(1)
        //     this.sceneUI.damage()
        //     if (this.ui.health.read() <= 0) {
        //         this.sceneUI.kill()
        //         this.state = GameState.Over
        //         this.eventHandler.onEnd(this.level, this.ui.score.read())
        //     }
        // }
    }

    onStealPresentAndRunAway(p: Enemy) {
        this.stealPresents++
        this.ui.setPresentCount(this.stealMax - this.stealPresents)
        log('steal', this.stealPresents)
        if (this.isStarted() && this.stealPresents >= this.stealMax) {
            this.sceneUI.kill()
            this.state = GameState.Over
            this.eventHandler.onEnd(this.level, this.ui.score.read())
        }
    }

    isStarted() {
        return this.state == GameState.Strarted
    }

    public checkLiveEnemies() {
        if (this.isStarted()) {
            let countLiveEnemies = this.factory.enemies.filter(e => e.isLive).length
            if (countLiveEnemies == 0 && this.state != GameState.Over)
                this.nextLevel()
        }
    }

    public nextLevel() {
        this.level++
        this.ui.level.set(this.level)
        let difficult = this.level
        for (let i = 0; i < this.level; i++) {
            const points = []
            points[0] = this.snowmanSpawnPoint
            if(difficult>6) difficult = 7
            for (let j = 1; j < LevelController.getRandomInt(3, 7 + ((difficult+3) * 2)); j++) {
                points[j] = new Vector3(LevelController.getRandomInt(7, 11), 0, LevelController.getRandomInt(5, 24))
            }
            points.push(this.presentsTargetPoint)
            points.push(this.snowmanSpawnPoint)
            const myPath = new Path3D(points)
            this.factory.add(myPath, difficult+3, this)
        }
        this.eventHandler.onNewLeve(this.level)
    }

    public static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    public startGame(weapon:Weapon) {
        this.weapon = weapon
        this.restart()
    }

    public restart() {
        this.stealPresents = 0
        this.ui.setPresentCount(this.stealMax - this.stealPresents)
        this.ui.score.set(0)
        this.level = 0
        this.ui.level.set(this.level)
        this.factory.reset()
        this.state = GameState.Strarted
        this.sceneUI.endGameBtn.visible = true
        this.nextLevel()
        this.eventHandler.onStart()
        this.ui.visible(true)
    }

    endGame() {
        this.factory.reset()
        this.state = GameState.NotStarted
        this.eventHandler.onExit()
        this.sceneUI.endGameBtn.visible = false
    }

    update(dt: number) {
        this.dt += dt
        if (this.dt > 1) {
            this.checkLiveEnemies()
            this.dt = 0
        }

        this.factory.update(dt)
        this.sceneUI.update(dt)
    }

    showHighscore(scoreTable: any) {
        this.sceneUI.showHighscore(scoreTable)
    }

    getCurrentScore() {
        return this.ui.score.read()
    }
}
