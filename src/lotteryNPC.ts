import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'
import {NPCBase} from "./npcBase";

export class LotteryNPC extends NPCBase {
    santaDlg: Dialog[] = [
        {
            name: 'start',
            text: 'Ho-ho-ho. Merry Christmas!'
        },
        {
            text: 'I\'m here to do marvelous things. You can win a big prize for Christmas in my lottery.'
        },
        {
            text: 'The lottery is designed so that all the money from the ticket sale goes to the prize pool.'
        },
        {
            name: 'buy_tickets',
            text: 'Lottery ticket price is 10 MANA, accepting only Matic transactions. Do you want buy tickets?',
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: 'amount_tickets'},
                {label: `No`, goToDialog: 'no_matic_mana'},
                {
                    label: `View terms`, goToDialog: 'buy_tickets',
                    triggeredActions: () => {
                        openExternalURL('https://dapp-craft.com/xmas-lottery-terms')
                    }
                },
            ]
        },
        {
            name: 'no_matic_mana',
            text: 'You need to top up Matic Balance. Find the Robot (Matic Bot), he will help you to top up your balance.',
            isEndOfDialog: true
        },
        {
            name: 'amount_tickets',
            text: 'How many tickets do you want buy?!',
            isQuestion: true,
            buttons: [
                {label: `1`, goToDialog: 'approve_transfer'},
                {label: `5`, goToDialog: 'approve_transfer'},
                {label: `25`, goToDialog: 'approve_transfer'},
                {label: `100`, goToDialog: 'approve_transfer'},
            ]
        },
        {
            name: 'approve_transfer',
            text: 'Cost 10 MANA, sign Metamask for approve transfer',
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: 'complete',                    triggeredActions: () => {
                        this.startDance()
                    }},
                {label: `No`, goToDialog: 'end'},
            ]
        },
        {
            name: 'complete',
            text: `Thank you!`,
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
    dancingShape = new GLTFShape("models/santaDancing.glb")

    constructor(position: TranformConstructorArgs) {
        super(
            position,
            'models/santaWaiting.glb')
        this.dlgScript = this.santaDlg
    }

    private startDance() {
        this.addComponentOrReplace(this.dancingShape)
    }
}