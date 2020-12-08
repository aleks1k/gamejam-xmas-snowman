import { Dialog, ImageData } from '../node_modules/@dcl/npc-utils/utils/types'
import {NPCBase} from "./npcBase";

export class SnowmanNPC extends NPCBase {
    
    ava = { path: 'textures/avaSnowman.png', offsetX: -700 }
    snowmanDlg: Dialog[] = [
        //for debug fast start
        // {
        //     name: '4_1_start_game',
        //     text: 'Take snowball!',
        //     triggeredByNext: () => {
        //         this.takeHandler();
        //     },
        //     isEndOfDialog: true,
        // },
        { 
            name: '1_start',
            text: 'Hello Dear Metaverse Traveller!',
            image: this.ava
        },
        {
            name: '1_1_start',
            text: "2020 has been a challenging year for us all! Myself included! You wouldn't believe what I get up to in the summer!",
            image: this.ava
        },
        {
            name: '2_1',
            text: "I hope you are well during these tough times! Perhaps you could help me with something if you've got time, I'll make it worth your while!",
            image: this.ava
        },
        {
            name: '3_ufo_question',
            text: 'A pesky UFO has arrived and sent snowmen to earth who are trying to steal our Christmas Presents! The cheek of it! Can you believe it!?',
            image: this.ava,
            isQuestion: true,
            buttons: [
                {label: `Yes`, goToDialog: '4_play'},
                {label: `No`, goToDialog: '4_play'},
            ]
        },
        {
            name: '4_play',
            text: "What say you brave traveller, can you help me to save Xmas and destroy these snowmen?",
            isQuestion: true,
            image: this.ava,
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
    active = true
    state : number | string = 0
    private takeHandler: any;

    constructor(position: TranformConstructorArgs, takeHandler) {
        super(
            position,
            'models/snowman.glb', 'sfx/snowwalk.mp3')
        this.dlgScript = this.snowmanDlg
        this.takeHandler = takeHandler
    }

    onActivateHandler() {
        super.onActivateHandler()
        // --
    }
}