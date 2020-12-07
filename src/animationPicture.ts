export class AnimationPicture extends Entity implements ISystem {
    private frameCount: number;
    private currentFrameIndex: number = 0;
    private dt: number = 0;
    private fps: number = 1;
    constructor(url:string, frameCount:number, fps:number, transform:TranformConstructorArgs) {
        super('animationPicture');
        this.frameCount = frameCount
        this.fps = fps
        const displayTexture = new BasicMaterial()
        displayTexture.texture = new Texture(url)
        const displayShape = new PlaneShape()
        displayShape.uvs = this.setUVS(this.currentFrameIndex)
        this.addComponent(displayShape)
        this.addComponent(displayTexture)
        this.addComponent(new Transform(transform))
    }

    setUVS(index) {
        const pos_top = 1.0 / this.frameCount * (this.frameCount - index - 1)
        const pos_bottom = 1.0 / this.frameCount * (this.frameCount - index)
        return [
            0, pos_top,
            1, pos_top,
            1, pos_bottom,
            0, pos_bottom,

            1, pos_top,
            0, pos_top,
            0, pos_bottom,
            1, pos_bottom,
        ]
    }

    update(dt: number) {
        if (this.dt > 1 / this.fps) {
            this.dt = 0
            if(++this.currentFrameIndex >= this.frameCount) {
                this.currentFrameIndex = 0
            }
            // log('next', this.currentFrameIndex)
            this.getComponent(PlaneShape).uvs = this.setUVS(this.currentFrameIndex)
        } else {
            this.dt += dt
        }
    }

    setVisible(visible:boolean) {
        this.getComponent(PlaneShape).visible = visible
    }
}