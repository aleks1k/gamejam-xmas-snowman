import { NPC } from '../node_modules/@dcl/npc-utils/index'
import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'

export class NPCBase extends NPC {
    dlgScript: Dialog[]
    fillInCanvas: UIInputText
    submittedText: string = ''
    active = true
    state : number | string = 0
    private soundEnt: Entity;

    constructor(position: TranformConstructorArgs, model: string, dialogSound=null) {
        super(
            position,
            model,
            () => {
                this.onActivateHandler()
            },
            {
                faceUser: false,
                reactDistance: 3,
                continueOnWalkAway: true,
                onlyClickTrigger: true,
                // dialogSound: dialogSound
            })

        this.soundEnt = new Entity()

        if (dialogSound) {
            this.soundEnt.addComponent(new Transform())
            this.soundEnt.addComponent(new AudioSource(new AudioClip(dialogSound)))
            this.soundEnt.getComponent(AudioSource).volume = 0.5
            engine.addEntity(this.soundEnt)
            this.soundEnt.setParent(Attachable.AVATAR)
        }
    }

    hide() {
        if (this.active) {
            this.endInteraction()
            engine.removeEntity(this)
            this.active = false
        }
    }

    onActivateHandler() {
        if (this.soundEnt.hasComponent(AudioSource)) {
            this.soundEnt.getComponent(AudioSource).playOnce()
        }
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