import { NPC } from '../node_modules/@dcl/npc-utils/index'
import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'

export class NPCBase extends NPC {
    dlgScript: Dialog[]
    fillInCanvas: UIInputText
    submittedText: string = ''
    active = true
    state : number | string = 0

    constructor(position: TranformConstructorArgs, model: string) {
        super(
            position,
            model,
            () => {
                this.onActivateHandler()
            },
            {
                faceUser: true,
                reactDistance: 3,
                continueOnWalkAway: true
            })
    }

    hide() {
        if (this.active) {
            this.endInteraction()
            engine.removeEntity(this)
            this.active = false
        }
    }

    onActivateHandler() {
        this.talk(this.dlgScript, this.state)
    }

    showError(error) {
        this.dlgScript.filter(b => b.name == 'error')[0].text = 'Opps, some error: ' + error
        this.talk(this.dlgScript, 'error')
    }

    show() {
        if (!this.active) {
            engine.addEntity(this)
            this.active = true
        }
    }

    onTextSubmit(text:string) {
        log(text)
    }

    showInputText() {
        this.fillInCanvas = new UIInputText(this.dialog.container)
        this.fillInCanvas.height = 60
        this.fillInCanvas.width = 400
        this.fillInCanvas.hTextAlign = 'center'
        this.fillInCanvas.vTextAlign = 'center'
        this.fillInCanvas.fontSize = 15
        this.fillInCanvas.color = Color4.Gray()
        this.fillInCanvas.onTextSubmit = new OnTextSubmit(() => {
            this.fillInCanvas.visible = false
            this.endInteraction()
            this.onTextSubmit(this.submittedText)
        })

        this.fillInCanvas.onChanged = new OnChanged((x) => {
            this.submittedText = x.value
        })
    }

    hideInputText() {
        this.fillInCanvas.visible = false
    }

    textSubmit() {
        this.hideInputText()
        this.onTextSubmit(this.submittedText)
    }
}