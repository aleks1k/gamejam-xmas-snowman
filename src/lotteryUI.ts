import * as ui from '../node_modules/@dcl/ui-utils/index'

export class LotteryUI {
    private window: UIImage
    private closeIcon: UIImage
    private canvas: UICanvas
    private tasksActive: ui.LargeIcon
    private tasksInactive: ui.LargeIcon
    private tasksCompleated: ui.LargeIcon
    private bottomSpace = 150
    
    constructor() {


        this.window = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.window.width = "445"
        this.window.height = "250"
        this.window.sourceWidth = 445
        this.window.sourceHeight = 250
        this.window.sourceLeft = 0
        this.window.sourceTop = 115
        this.window.positionY = this.bottomSpace
        this.window.positionX = 0
        this.window.vAlign = "bottom"
        this.window.hAlign = "left"
        this.window.visible = true

        this.closeIcon = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.closeIcon.width = "45"
        this.closeIcon.height = "55"
        this.closeIcon.sourceWidth = 45
        this.closeIcon.sourceHeight = 55
        this.closeIcon.sourceLeft = 235
        this.closeIcon.sourceTop = 55
        this.closeIcon.positionY = this.bottomSpace+192
        this.closeIcon.positionX = 390
        this.closeIcon.vAlign = "bottom"
        this.closeIcon.hAlign = "left"
        this.closeIcon.visible = true

        this.tasksActive = new ui.LargeIcon('textures/tasks_active.png', 0, 0, 365, 30*4)
        this.tasksActive.image.vAlign = "bottom"
        this.tasksActive.image.hAlign = "left"
        this.tasksActive.image.positionY = this.bottomSpace+20
        this.tasksActive.image.positionX = 45
        this.tasksActive.image.visible = false

        this.tasksInactive = new ui.LargeIcon('textures/tasks_inactive.png', 0, 0, 365, 30*4)
        this.tasksInactive.image.vAlign = "bottom"
        this.tasksInactive.image.hAlign = "left"
        this.tasksInactive.image.positionY = this.bottomSpace+20
        this.tasksInactive.image.positionX = 45
        this.tasksInactive.image.visible = false

        this.tasksCompleated = new ui.LargeIcon('textures/tasks_completed.png', 0, 0, 365, 30*4)
        this.tasksCompleated.image.vAlign = "bottom"
        this.tasksCompleated.image.hAlign = "left"
        this.tasksCompleated.image.positionY = this.bottomSpace+20
        this.tasksCompleated.image.positionX = 45
        this.tasksCompleated.image.visible = true
    }

    
    /*setPresentCount(count) {
        this.presentsCounter.image.sourceLeft = 128 * (5 - count)
        this.presentsCounter.image.positionX = 128 * (5 - count)
    }

    visible(val: boolean) {
        this.level.uiText.visible = this.score.uiText.visible =
            this.levelLabel.uiText.visible = this.scoreLabel.uiText.visible =
            this.presentsCounter.image.visible = val
    }*/
}