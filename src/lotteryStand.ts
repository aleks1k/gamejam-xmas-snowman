export class LotteryStand extends Entity {
    private mainPrizeCounter: TextShape;

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
    }

    createCounter(fontSize:number, color:Color3, position: TranformConstructorArgs) {
        const prizeCounterShape = new TextShape("1000000")
        prizeCounterShape.fontSize = fontSize
        prizeCounterShape.color = color
        prizeCounterShape.font = new Font(Fonts.SanFrancisco)

        const prizeCounter = new Entity('prizeCounter')
        prizeCounter.addComponent(prizeCounterShape)
        prizeCounter.addComponent(new Transform(position))
        prizeCounter.setParent(this)
        return prizeCounterShape
    }
}