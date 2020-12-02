import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'
import * as layerTwo from '../node_modules/@dcl/l2-utils/index'
import {NPCBase} from "./npcBase";

export class MaticNPC extends NPCBase {
    maticDlg: Dialog[] = [
        {
            name: '1_start',
            text: 'Hello, I’m Matic bot!'
        },
        {
            name: '1_1_start',
            text: 'Matic Network brings massive scale to Ethereum using an adapted version of Plasma with PoS based side chains. High throughput and free transactions.',
            triggeredByNext: () => {
                const balance = this.getMaticBalance()
                // if ( > 0) {
                //     log('matic')
                // }
            },
            isEndOfDialog: true,
        },
        {
            name: '1_balance',
            text: ''
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
    private balance: { l1: number; l2: number };

    constructor(position: TranformConstructorArgs) {
        super(
            position,
            "models/robot.glb")
        this.dlgScript = this.maticDlg
    }

    updateBalanceText() {
        this.dlgScript.filter(b => b.name == '1_balance')[0].text = `Do you have ${this.balance.l1} MANA on Main Network and \n${this.balance.l2} MANA on Matic Network`
    }

    private getMaticBalance() {
        executeTask(async () => {
            this.balance = await layerTwo.matic.balance()
            log(this.balance)
            this.updateBalanceText()
            if (this.balance.l2 >= 10) {
                this.talk(this.dlgScript, '1_balance')
            }
            if (this.balance.l1 < 10) {

            }
            return this.balance
        })
        return null
    }
}