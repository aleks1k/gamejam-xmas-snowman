import { Dialog } from '../node_modules/@dcl/npc-utils/utils/types'
import {NPCBase} from "./npcBase";
import {matic} from '../node_modules/@dcl/l2-utils/index'

export class LotteryNPC extends NPCBase {
    ticketPrice = 10
    ava = { path: 'textures/avaSanta.png', offsetX: -700 }
    santaDlg: Dialog[] = [
        {
            name: 'start',
            text: 'Ho-ho-ho. Merry Christmas!',
            image: this.ava,
            triggeredByNext:() => {
                if (this.eventHandler != null) this.eventHandler.onStartTalk('lottery')

                //debug
                // this.eventHandler.onCustomEvent('lottery', 'buyTicket', {count:1, res: ''})

            },
            // isEndOfDialog: true
        },
       /* {
            text: "I'm here to spread the festive cheer. You can win big prizes for Christmas in my lottery!",
            image: this.ava,
        },
        {
            text: 'The lottery is designed so that all the money from ticket sales go into the prize pool.',
            image: this.ava,
        },
        {
            name: 'buy_tickets',
            text: 'Lottery ticket price is '+this.ticketPrice+' MANA, accepting only Matic transactions. Do you want buy tickets?',
            image: this.ava,
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: 'check_balance',
                    triggeredActions: () => {
                       this.checkMaticBalance()
                    }},
                {label: `No`, goToDialog: 'end'},
                {
                    label: `View terms`, goToDialog: 'buy_tickets',
                    triggeredActions: () => {
                        openExternalURL('https://dapp-craft.com/xmas-lottery-terms')
                    }
                },
            ]
        },
        {
            name: 'check_balance',
            text: 'Wait a few seconds, I will check your matic balance.',
            image: this.ava,
            isEndOfDialog: true
        },
        {
            name: 'no_matic_mana',
            text: 'You need to top up your Matic MANA Balance. Find the Robot (Matic Bot), he will help you to top up your balance.',
            image: this.ava,
            isEndOfDialog: true
        },
        {
            name: 'amount_tickets',
            text: 'How many tickets do you want?!',
            image: this.ava,
            isQuestion: true,
            buttons: [
                {label: `5 - `+this.ticketPrice*5+' MANA', goToDialog: 'approve_transfer',
                    triggeredActions: () => {
                        this.buyTickets(5)
                    }},
                {label: `1 - `+this.ticketPrice+' MANA', goToDialog: 'approve_transfer',
                    triggeredActions: () => {
                        this.buyTickets(1)
                    }},
                {label: `25 - `+this.ticketPrice*25+' MANA', goToDialog: 'approve_transfer',
                    triggeredActions: () => {
                        this.buyTickets(25)
                    }},
                {label: `100 - `+this.ticketPrice*100+' MANA', goToDialog: 'approve_transfer',
                    triggeredActions: () => {
                        this.buyTickets(100)
                    }},
            ]
        },
        {
            name: 'approve_transfer',
            text: 'Sign in Metamask for approve transfer',
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'complete',
            text: `Thank you! Good Luck! Lottery results will be on 25th of Dec!`,
            image: this.ava,
            triggeredByNext: () => {
                this.startDance()
            },
            isEndOfDialog: true,
        }, */
        {
            name: 'end',
            text: `Fine, see you soon!`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_1',
            text: `It's the most wonderful time of the year!`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_2',
            text: `Tis the season to be jolly!`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_3',
            text: `Have yourself a Merry little Christmas, let your heart be light.`,
            image: this.ava,
            isEndOfDialog: true,
        },        
        {
            name: 'end_4',
            text: `Yule always be my favourite.`,
            image: this.ava,
            isEndOfDialog: true,
        },        
        {
            name: 'end_5',
            text: `Christmas is a very spiritual time - In your case vodka, gin and whisky`,
            image: this.ava,
            isEndOfDialog: true,
        },        
        {
            name: 'end_6',
            text: `I only got you a card in case you got me one...`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_7',
            text: `Yay! It's Christmas! Let's buy loads of stuff no one needs!`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_8',
            text: `I bet yule be drunk this Christmas!`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'end_9',
            text: `I'm so grateful for a friend like you, at Christmas and all year.`,
            image: this.ava,
            isEndOfDialog: true,
        },
        {
            name: 'error',
            text: `Opps, some error!`,
            image: this.ava,
            isEndOfDialog: true,
        }
    ]
    fillInCanvas: UIInputText
    submittedText: string = ''
    active = true
    state : number | string = 0
    dancingShape = new GLTFShape("models/santaDancing.glb")
    network: string = 'mainnet'
    ticketWallet = '0xf308239230Dd2965fBA141B164967E80069C4246'
    private collider: Entity;
    userAddress: string = null;

    constructor(position: TranformConstructorArgs) {
        super(
            position,
            'models/santaWaiting.glb', 'sfx/hohoho.mp3', 'mixamo.com')
        this.dlgScript = this.santaDlg

        //for debug
        //this.network = 'goerli'
        // this.state = 'amount_tickets'

        this.collider = new Entity("collider")
        this.collider.addComponent(new Transform({
            position: new Vector3(0, 0.1, 0),
            scale: new Vector3(0.08,0.2,0.07),
        }));
        const coliderMaterial = new Material()
        coliderMaterial.albedoColor = Color4.Clear()
        this.collider.addComponent(coliderMaterial)
        this.collider.addComponent(new BoxShape())
        this.collider.addComponent(
            new OnPointerDown(
                (e) => {
                    if (this.inCooldown || this.dialog.isDialogOpen) return
                    this.activate()
                },
                {
                    button: ActionButton.POINTER,
                    hoverText: 'Talk',
                }
            )
        )
        this.collider.setParent(this)
    }

    private startDance() {
        this.addComponentOrReplace(this.dancingShape)
    }

    buyTickets(count) {
        executeTask(async () => {
            const amount = this.ticketPrice * count
            const res = await matic.sendMana(this.ticketWallet, amount, true, this.network).then((res) =>
            {
                log(res)
                this.eventHandler.onCustomEvent('lottery', 'buyTicket', {count:count, res: res})
                this.talk(this.dlgScript, 'complete')
            }).catch((e) =>
            {
                this.showError(e.toString())
            })
            log(res)
        })
    }

    onActivateHandler() {
        super.onActivateHandler()
        if (this.userAddress == null) {
            this.endInteraction()
            this.showError("Can not detect your ETH address, please reload page!")
        }
    }
    private checkMaticBalance() {
        executeTask(async () => {
            await matic.balance(this.userAddress, this.network).then((balance) =>
            {
                log(balance)
                if (balance.l2 < 10) {
                    this.talk(this.dlgScript, 'no_matic_mana')
                } else {
                    this.talk(this.dlgScript, 'amount_tickets')
                }
            }).catch((e) =>
            {
                this.showError(e.toString())
            })
        })
    }
}