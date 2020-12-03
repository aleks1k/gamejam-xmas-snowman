import * as ui from '../node_modules/@dcl/ui-utils/index'
import {BarStyles} from '../node_modules/@dcl/ui-utils/utils/types'

export class GameUI {
    color = Color4.Green()
    level = new ui.UICounter(0, -100, 150, this.color)
    levelLabel = new ui.CornerLabel('Wave:', -170, 150, this.color)

    score = new ui.UICounter(0, -100, 100, this.color)
    scoreLabel = new ui.CornerLabel('Kills:', -170, 100, this.color)

    // health = new ui.UIBar(1, -30, 60, Color4.Red(), BarStyles.ROUNDSILVER, 1)
    // healthLabel = new ui.CornerLabel('Health:', -170, 55, this.color)

    presentsCounter = new ui.LargeIcon('textures/presents.png', 0, 40, 64*5, 64)

    constructor() {
        this.presentsCounter.image.sourceWidth = 128*5
        this.presentsCounter.image.sourceHeight = 128
    }

    setPresentCount(count) {
        this.presentsCounter.image.sourceLeft = 128 * (5 - count)
        this.presentsCounter.image.positionX = 128 * (5 - count)
    }

    visible(val:boolean) {
        this.level.uiText.visible = this.score.uiText.visible =
        this.levelLabel.uiText.visible = this.scoreLabel.uiText.visible =
            this.presentsCounter.image.visible = val
    }
}