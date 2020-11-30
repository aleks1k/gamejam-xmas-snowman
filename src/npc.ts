import { NPC } from '../node_modules/@dcl/npc-utils/index'
import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'

export class SnowmanNPC extends NPC {
    ILoveCats: Dialog[] = [
        {
            name: '1_start',
            text: 'Hello Dear Metaverse Traveller!'
        },
        {
            name: '1_1_start',
            text: '2020 has been a challenging year for us all! Myself included! You wouldn\'t believe what I get up to in the summer!'
        },
        {
            name: '2_1',
            text: 'I hope you are doing well during these tough times and managing to stay positive.'
        },
        {
            name: '2_2',
            text: 'As the saying goes, trouble almost always arrives in groups of two or more! I\'m sorry to say but Houston we have a problem...'
        },
        {
            name: '3_wish',
            text: 'Do you want tell me your wish for present by Santa Claus?',
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: '5_wish'},
                {label: `No`, goToDialog: '3_ufo_question'},
            ]
        },
        {
            name: '5_wish',
            text: 'Enter wish and click button',
            triggeredByNext: () => {
                this.fillInCanvas = new UIInputText(this.dialog.container)
                this.fillInCanvas.height = 60
                this.fillInCanvas.width = 400
                this.fillInCanvas.hTextAlign = 'center'
                this.fillInCanvas.vTextAlign = 'center'
                this.fillInCanvas.fontSize = 15
                this.fillInCanvas.color = Color4.Gray()
                this.fillInCanvas.onTextSubmit = new OnTextSubmit(() => {
                    log(this.submittedText)
                    this.fillInCanvas.visible = false
                    this.endInteraction()
                    this.sendToSanta(this.submittedText)
                })

                this.fillInCanvas.onChanged = new OnChanged((x) => {
                    this.submittedText = x.value
                })
            },
        },
        {
            text: `Enter wish:`,
            offsetY: 50,
            triggeredByNext: () => {
                this.fillInCanvas.visible = false
                log(this.submittedText)
            },
            isQuestion: true,
            buttons: [
                {
                    label: `Send`, goToDialog: '5_1_sign_wait',
                    triggeredActions: () => {
                        this.fillInCanvas.visible = false
                        log(this.submittedText)
                        // myNPC.endInteraction()
                        this.sendToSanta(this.submittedText)
                    }
                },
            ],
            // isEndOfDialog: true,
        },
        {
            name: '5_1_sign_wait',
            text: `Thank you!`,
            // isEndOfDialog: true,
        },
        {
            name: '3_ufo_question',
            text: 'A pesky UFO arrived and has sent snowmen to earth who are trying to steal our Christmas! The cheek of it! Can you believe it!?',
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: '4_play'},
                {label: `No`, goToDialog: '4_play'},
            ]
        },
        {
            name: '4_play',
            text: 'What say you brave traveller. Can you help in destroying these snowmen? I\'ll give you some snowballs and you try to break them all. Got it?',
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: '4_1_start_game'},
                {label: `No`, goToDialog: 'end'},
            ]
        },
        {
            name: '4_1_start_game',
            text: 'Take snowball!',
            triggeredByNext: () => {
                this.takeHandler();
            },
            isEndOfDialog: true,
        },
        {
            name: 'end',
            text: `Fine, see you soon!`,
            isEndOfDialog: true,
        },
        {
            name: 'error',
            text: `Opps, some error!`,
            isEndOfDialog: true,
        }
    ]
    fillInCanvas: UIInputText
    submittedText: string = ''
    active = true
    state : number | string = 0
    private takeHandler: any;

    constructor(position: TranformConstructorArgs, takeHandler) {
        super(
            position,
            'models/snowman.glb',
            () => {
                this.onActivateHandler()
            },
            {
                faceUser: true,
                reactDistance: 3,
                continueOnWalkAway: true
            })

        this.takeHandler = takeHandler
    }

    hide() {
        if (this.active) {
            this.endInteraction()
            engine.removeEntity(this)
            this.active = false
        }
    }

    onActivateHandler() {
        this.talk(this.ILoveCats, this.state)
    }

    showError(error) {
        this.ILoveCats.filter(b => b.name == 'error')[0].text = 'Opps, some error: ' + error
        this.talk(this.ILoveCats, 'error')
    }

    show() {
        if (!this.active) {
            engine.addEntity(this)
            this.active = true
        }
    }

    private sendToSanta(submittedText: string) {

    }
}