import {AnimationPicture} from "./animationPicture";

export class LotteryStand extends Entity {
    private mainPrizeCounter: TextShape;
    private poolCounter: TextShape;
    private ticketsCounter: TextShape;
    private winnerPlacesCounter: TextShape;
    private dt: number;
    private alertTimer: number = 5;
    private msgIncreased: AnimationPicture;
    private alertActive: boolean = false;

    constructor(position: TranformConstructorArgs) {
        super('LotteryStand');
        this.addComponent(new GLTFShape("models/lottery.glb"))
        this.addComponent(new Transform(position))

        this.mainPrizeCounter = this.createCounter(3, Color3.Green(),
            {
            position: new Vector3(-3.07,2.98,0.63),
            rotation: Quaternion.Euler(0, -90, 0),
            scale: new Vector3(1, 1, 1)
        })
        this.poolCounter = this.createCounter(2.7, Color3.White(),
            {
            position: new Vector3(-3.07,3.58,0.63),
            rotation: Quaternion.Euler(0, -90, 0),
            scale: new Vector3(1, 1, 1)
        })
        this.winnerPlacesCounter = this.createCounter(2.4, Color3.White(),
            {
            position: new Vector3(-3.07,2.97,1.97),
            rotation: Quaternion.Euler(0, -90, 0),
            scale: new Vector3(1, 1, 1)
        })
        this.ticketsCounter = this.createCounter(2.4, Color3.White(),
            {
            position: new Vector3(-3.07,2.97,-0.64),
            rotation: Quaternion.Euler(0, -90, 0),
            scale: new Vector3(1, 1, 1)
        })

        this.msgIncreased = new AnimationPicture("textures/increasedSprites.png", 6, 10, {
            position: new Vector3(-3.03,4.15,0.63),
            scale: new Vector3(4, 0.8, 4),
            rotation: Quaternion.Euler(0,-90,0)
        })
        this.msgIncreased.setParent(this)
        this.msgIncreased.setVisible(this.alertActive)

        const clip = new AudioClip("sfx/coin.wav")
        let source = new AudioSource(clip)
        source.playing = false
        source.loop = false
        source.volume = 1
        this.addComponentOrReplace(source)

        engine.addSystem(this)
    }

    createCounter(fontSize:number, color:Color3, position: TranformConstructorArgs) {
        const prizeCounterShape = new TextShape("0")
        prizeCounterShape.fontSize = fontSize
        prizeCounterShape.color = color
        prizeCounterShape.font = new Font(Fonts.SanFrancisco)

        const prizeCounter = new Entity('prizeCounter')
        prizeCounter.addComponent(prizeCounterShape)
        prizeCounter.addComponent(new Transform(position))
        prizeCounter.setParent(this)
        return prizeCounterShape
    }

    updateInfo(mainPrize, pool, tickets, winnerPlaces) {
        this.mainPrizeCounter.value = mainPrize
        this.poolCounter.value = pool
        this.ticketsCounter.value = tickets
        this.winnerPlacesCounter.value = winnerPlaces
        this.getComponent(AudioSource).playOnce()
        this.dt = 0
        this.alertActive = true
        this.msgIncreased.setVisible(this.alertActive)
        engine.addSystem(this.msgIncreased)
    }

    update(dt: number) {
        if (this.dt > this.alertTimer && this.alertActive) {
            this.alertActive = false
            this.msgIncreased.setVisible(this.alertActive)
            engine.removeSystem(this.msgIncreased)
        } else {
            this.dt += dt
        }
    }
}