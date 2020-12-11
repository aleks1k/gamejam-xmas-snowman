import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'
import * as layerTwo from '../node_modules/@dcl/l2-utils/index'
import {NPCBase} from "./npcBase";

export class MaticNPC extends NPCBase {

    ava = { path: 'textures/avaMatic.png', offsetX: -700 }
    maticDlg: Dialog[] = [
        {
            name: '1_start',
            text: 'Hello, I’m Matic bot!',
            triggeredByNext:() => {
                this.eventHandler.onStartTalk('manaBot')
            },
            image: this.ava
        },
        {
            name: '1_1_start',
            text: 'Matic Network is a Layer 2 scaling solution for Ethereum using an adapted version of Plasma with PoS based side chains, achieving high throughput and free transactions.',
            triggeredByNext: () => {
                const balance = this.getMaticBalance()
            },
            isEndOfDialog: true,
            image: this.ava
        },
        {
            name: '1_no_mana',
            text: 'You do not have enough MANA!',
            image: this.ava
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
            ],
            image: this.ava
        },
        {
            name: '1_balance',
            text: '',
            image: this.ava
        },
        {
            name: 'top_up_intro',
            text: `I can help you top up your Matic MANA balance.`,
            image: this.ava
        },
        {
            text: 'At any time you can deposit or withdraw Matic MANA by speaking to me.',
            image: this.ava
        },
        {
            text: 'Allowing you to spend your mana on a variety of things including: Xmas Lottery, Casinos within DCL, QuizZone and more including wearables in the future',
            image: this.ava
        },
        {
            name: 'top_up_start',
            text: `Do you want to top up your Matic MANA balance?`,
            image: this.ava,
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
            image: this.ava,
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
            image: this.ava
        },
        {
            text: `After main MANA is withdrawn, matic MANA will appear shortly`,
            isEndOfDialog: true,
            image: this.ava
        },
        {
            name: 'top_up_complete',
            text: `Complete! The whole procedure takes 5-10 minutes`,
            isEndOfDialog: true,
            image: this.ava
        },
        {
            name: 'end',
            text: `Fine, see you soon!`,
            isEndOfDialog: true,
            image: this.ava
        },
        {
            name: 'error',
            text: `Opps, some error!`,
            isEndOfDialog: true,
            image: this.ava
        }
    ]
    fillInCanvas: UIInputText
    submittedText: string = ''
    network: string = 'mainnet'
    active = true
    state : number | string = 0
    private balance: { l1: number; l2: number };
    userAddress: string = null;

    constructor(position: TranformConstructorArgs) {
        super(
            position,
            "models/robot.glb", 'sfx/robot.mp3', 'Talk')
        this.dlgScript = this.maticDlg

        //for debug
        //this.network = 'goerli'
    }

    updateBalanceText() {
        this.dlgScript.filter(b => b.name == '1_balance')[0].text = `Do you have ${this.balance.l1} MANA on Main Network and \n${this.balance.l2} MANA on Matic Network`
    }

    private getMaticBalance() {
        executeTask(async () => {
            await layerTwo.matic.balance(this.userAddress, this.network).then((res) =>
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
    onActivateHandler() {
        super.onActivateHandler()
        if (this.userAddress == null) {
            this.endInteraction()
            this.showError("Can not detect your ETH address, please reload page!")
        }

    }
    textSubmit() {
        super.textSubmit();
        executeTask(async () => {
            const amount = parseFloat(this.submittedText)
            const res = await layerTwo.matic.depositMana(amount, this.network).then((res) =>
            {
                log(res)
                this.eventHandler.onCustomEvent('manaBot', 'depositMana', {amount:amount, res: res})
                this.talk(this.dlgScript, 'top_up_complete')
            }).catch((e) =>
            {
                this.showError(e.toString())
            })
            log(res)
        })
    }
}