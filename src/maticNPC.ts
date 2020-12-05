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
            },
            isEndOfDialog: true,
        },
        {
            name: '1_no_mana',
            text: 'You do not have enough MANA!',
        },
        {
            text: 'You need to buy more MANA!',
            isQuestion: true,
            buttons: [
                {label: `Ok`, goToDialog: 'end'},
                {label: `Close`, goToDialog: 'end'},
                {
                    label: `Kyberswap`, goToDialog: 'end',
                    triggeredActions: () => {
                        openExternalURL('https://kyberswap.com/swap/eth-mana');
                    }
                },
                {
                    label: `Uniswap`, goToDialog: 'end',
                    triggeredActions: () => {
                        openExternalURL('https://app.uniswap.org/#/swap');
                    }
                },
            ]
        },
        {
            name: '1_balance',
            text: ''
        },
        {
            name: 'top_up_intro',
            text: `I can help to top up your Matic balance.`,
        },
        {
            text: `At any time you can withdraw money back or spend it on Lottery here, or Casino in DCL, or QuizZone, or Wearables (in the future), etc.`,
        },
        {
            name: 'top_up_start',
            text: `Do you want to top up your Matic MANA balance?`,
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: 'top_up_input',
                    triggeredActions: () => {
                        this.showInputText()
                    }
                },
                {label: `Later`, goToDialog: 'end'},
                {label: `Matic Wallet`, goToDialog: 'end',
                    triggeredActions: () => {
                        openExternalURL('https://wallet.matic.network/')
                    }
                },
            ]
        },
        {
            name: 'top_up_input',
            text: `Enter the amount of MANA:`,
            offsetY: 50,
            triggeredByNext: () => {
                this.hideInputText()
            },
            isQuestion: true,
            buttons: [
                {
                    label: `Send`, goToDialog: 'top_up_send',
                    triggeredActions: () => {
                        this.textSubmit()
                    }
                },
            ]
        },
        {
            name: 'top_up_send',
            text: `You will have to sign TWO transactions`,
        },
        {
            text: `After main MANA is withdrawn, matic MANA will appear shortly`,
            isEndOfDialog: true,
        },
        {
            name: 'top_up_complete',
            text: `Complete! The whole procedure takes 5-10 minutes`,
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
    network: string = 'mainnet'
    active = true
    state : number | string = 0
    private balance: { l1: number; l2: number };

    constructor(position: TranformConstructorArgs) {
        super(
            position,
            "models/robot.glb", 'sfx/robot.mp3')
        this.dlgScript = this.maticDlg

        //for debug
        this.network = 'goerli'
    }

    updateBalanceText() {
        this.dlgScript.filter(b => b.name == '1_balance')[0].text = `Do you have ${this.balance.l1} MANA on Main Network and \n${this.balance.l2} MANA on Matic Network`
    }

    private getMaticBalance() {
        executeTask(async () => {
            await layerTwo.matic.balance(null, this.network).then((res) =>
            {
                this.balance = res
                log(this.balance)
                this.updateBalanceText()
                if (this.balance.l1 < 10 && this.balance.l2 < 10) {
                    this.talk(this.dlgScript, '1_no_mana')
                } else {
                    this.talk(this.dlgScript, '1_balance')
                }
            }).catch((e) =>
            {
                this.showError(e.toString())
            })
        })
    }

    textSubmit() {
        super.textSubmit();
        executeTask(async () => {
            const amount = parseFloat(this.submittedText)
            const res = await layerTwo.matic.depositMana(amount, this.network).then((res) =>
            {
                log(res)
                this.talk(this.dlgScript, 'top_up_complete')
            }).catch((e) =>
            {
                this.showError(e.toString())
            })
            log(res)
        })
    }
}