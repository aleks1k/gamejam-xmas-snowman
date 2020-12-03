import * as ui from '../node_modules/@dcl/ui-utils/index'
import { PromptStyles, ButtonStyles } from "../node_modules/@dcl/ui-utils/utils/types"

export interface ISceneUIEvent {
    onRestart()
    onEndGame()
}

export class PlayerUI {
    private uiPlayAgain: UIImage
    private uiGameOver: UIImage
    private canvas: UICanvas
    private uiEventHandler: ISceneUIEvent

    private dt = 0
    private uiArrowDown: UIImage
    private uiArrowTop: UIImage
    private uiArrowRight: UIImage
    private uiArrowLeft: UIImage
    private isCountDown = false
    private menuBtn: UIImage
    private closeBtn: UIImage
    private discordBtn: UIImage
    private isOpenedMenu: boolean = false
    public endGameBtn: UIImage;

    constructor(uiEventHandler: ISceneUIEvent) {
        this.uiEventHandler = uiEventHandler
        this.canvas = new UICanvas()
        this.initDamage()
        this.initGameOverUI()
        this.initMenu()
    }

    private initMenu() {
        this.endGameBtn = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.endGameBtn.width = "160"
        this.endGameBtn.height = "40"
        this.endGameBtn.sourceWidth = 220
        this.endGameBtn.sourceHeight = 55
        this.endGameBtn.sourceTop = 55
        this.endGameBtn.positionY = 10
        this.endGameBtn.positionX = 150
        this.endGameBtn.vAlign = "bottom"
        this.endGameBtn.hAlign = "center"
        this.endGameBtn.visible = false
        this.endGameBtn.onClick = new OnClick(() => {
            let prompt = new ui.OptionPrompt(
                'End Game',
                'Are you sure end this game?',
                () => {
                    this.endGame()
                },
                () => {
                    log(`no`)
                },
                'Yes',
                'No'
            )

        })

        this.closeBtn = new UIImage(this.canvas, new Texture("textures/uiClose.png"))
        this.closeBtn.width = "160"
        this.closeBtn.height = "40"
        this.closeBtn.sourceWidth = 220
        this.closeBtn.sourceHeight = 51
        this.closeBtn.positionY = 10
        this.closeBtn.positionX = 0
        this.closeBtn.vAlign = "bottom"
        this.closeBtn.hAlign = "center"
        this.closeBtn.visible = false
        this.closeBtn.onClick = new OnClick(() => {
            this.closeMenu()
        })

        this.menuBtn = new UIImage(this.canvas, new Texture("textures/menuBtn.png"))
        this.menuBtn.width = "160"
        this.menuBtn.height = "40"
        this.menuBtn.sourceWidth = 220
        this.menuBtn.sourceHeight = 51
        this.menuBtn.positionY = 10
        this.menuBtn.positionX = 0
        this.menuBtn.vAlign = "bottom"
        this.menuBtn.hAlign = "center"
        this.menuBtn.visible = false
        this.menuBtn.onClick = new OnClick(() => {
            this.closeMenu()
        })

        this.discordBtn = new UIImage(this.canvas, new Texture("textures/discordBtn.png"))
        this.discordBtn.width = "65"
        this.discordBtn.height = "65"
        this.discordBtn.sourceWidth = 99
        this.discordBtn.sourceHeight = 99
        this.discordBtn.positionY = 200
        this.discordBtn.positionX = -50
        this.discordBtn.vAlign = "bottom"
        this.discordBtn.hAlign = "right"
        this.discordBtn.visible = false
        this.discordBtn.onClick = new OnClick(() => {
            openExternalURL("https://discord.gg/Md5G7mZYfc")
        })
    }

    private initDamage() {
        this.uiArrowDown = new UIImage(this.canvas, new Texture("textures/Adown.png"))
        this.uiArrowDown.width = "267"
        this.uiArrowDown.height = "104"
        this.uiArrowDown.sourceWidth = 533
        this.uiArrowDown.sourceHeight = 208
        this.uiArrowDown.positionY = 10
        this.uiArrowDown.vAlign = "bottom"
        this.uiArrowDown.visible = false

        this.uiArrowTop = new UIImage(this.canvas, new Texture("textures/Atop.png"))
        this.uiArrowTop.width = "267"
        this.uiArrowTop.height = "104"
        this.uiArrowTop.sourceWidth = 533
        this.uiArrowTop.sourceHeight = 208
        this.uiArrowTop.positionY = 10
        this.uiArrowTop.vAlign = "top"
        this.uiArrowTop.visible = false

        this.uiArrowLeft = new UIImage(this.canvas, new Texture("textures/Aleft.png"))
        this.uiArrowLeft.width = "104"
        this.uiArrowLeft.height = "267"
        this.uiArrowLeft.sourceWidth = 208
        this.uiArrowLeft.sourceHeight = 533
        this.uiArrowLeft.positionX = 10
        this.uiArrowLeft.hAlign = "left"
        this.uiArrowLeft.visible = false

        this.uiArrowRight = new UIImage(this.canvas, new Texture("textures/Aright.png"))
        this.uiArrowRight.width = "104"
        this.uiArrowRight.height = "267"
        this.uiArrowRight.sourceWidth = 208
        this.uiArrowRight.sourceHeight = 533
        this.uiArrowRight.positionX = -10
        this.uiArrowRight.hAlign = "right"
        this.uiArrowRight.visible = false
    }

    public initGameOverUI() {

        this.uiGameOver = new UIImage(this.canvas, new Texture("textures/gameover.png"))
        this.uiGameOver.width = "462"
        this.uiGameOver.height = "117"
        this.uiGameOver.sourceWidth = 462
        this.uiGameOver.sourceHeight = 117
        this.uiGameOver.positionY = 550
        this.uiGameOver.vAlign = "bottom"
        this.uiGameOver.visible = false

        this.uiPlayAgain = new UIImage(this.canvas, new Texture("textures/playagain.png"))
        this.uiPlayAgain.width = "294"
        this.uiPlayAgain.height = "89"
        this.uiPlayAgain.sourceWidth = 294
        this.uiPlayAgain.sourceHeight = 89
        this.uiPlayAgain.positionY = 30
        this.uiPlayAgain.vAlign = "top"
        this.uiPlayAgain.visible = false
        this.uiPlayAgain.isPointerBlocker = true
        this.uiPlayAgain.onClick = new OnClick(() => {
            this.reset()
        })
    }

    update(dt: number) {
        if (this.isCountDown) {
            this.dt += dt
        }

        if (this.dt > 0.5) {
            this.uiArrowDown.visible = false
            this.uiArrowTop.visible = false
            this.uiArrowRight.visible = false
            this.uiArrowLeft.visible = false
            this.isCountDown = false
            this.dt = 0
        }
    }

    public damage() {
        this.uiArrowDown.visible = true
        this.uiArrowTop.visible = true
        this.uiArrowRight.visible = true
        this.uiArrowLeft.visible = true
        this.isCountDown = true
        this.dt = 0
    }

    public showHighscore(data) {
        let NameColumn = 'Name\n'
        let ScoreColumn = 'Score\n'
        data.forEach(s => {
            NameColumn += s.userName + '\n'
            ScoreColumn += s.score + '\n'
        })
        let prompt = new ui.CustomPrompt(PromptStyles.LIGHTLARGE,400, 400)
        prompt.canvas = this.canvas
        prompt.addText('Highscore', 0, 150, Color4.Red(), 30)
        prompt.addText(NameColumn, -100, -100).text.hTextAlign = 'left'
        prompt.addText(ScoreColumn, 100, -100).text.hTextAlign = 'right'

        prompt.addButton(
            'Again',
            0,
            -200,
            () => {
                log('Try again')
                this.reset()
                prompt.hide()
            },
            ButtonStyles.E
        )
    }

    public kill() {
        this.uiGameOver.visible = true
    }

    private reset() {
        this.closeBtn.visible = true
        // this.uiPlayAgain.visible = false
        this.uiGameOver.visible = false
        this.uiEventHandler.onRestart()
        log("PLAY AGAIN")
    }

    closeMenu() {
        this.isOpenedMenu = !this.isOpenedMenu
        this.menuBtn.visible = !this.menuBtn.visible
        this.closeBtn.visible = !this.closeBtn.visible
        this.discordBtn.visible = !this.discordBtn.visible
    }

    private endGame() {
        this.closeBtn.visible = false
        // this.uiPlayAgain.visible = true
        this.uiGameOver.visible = false
        this.uiEventHandler.onEndGame()
    }
}

