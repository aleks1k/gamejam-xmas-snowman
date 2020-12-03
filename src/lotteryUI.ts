import * as ui from '../node_modules/@dcl/ui-utils/index'

enum TaskState {
    active,
    inactive,
    completed,
}

export class LotteryUI {
    private window: UIImage
    private closeIcon: UIImage
    private canvas: UICanvas
    private tasks: ui.LargeIcon[] = []
    private bottomSpace = 150
    private vAlign: string = "bottom";
    private hAlign: string = "left";
    private task_img_height = 30;
    private task_count = 4;
    private ticket_count: UICounter;
    private uiShapes:UIShape[] = []
    private taskBtn: UIImage;

    constructor() {
        this.taskBtn = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.taskBtn.width = "160"
        this.taskBtn.height = "40"
        this.taskBtn.sourceWidth = 220
        this.taskBtn.sourceHeight = 55
        this.taskBtn.positionY = 10
        this.taskBtn.positionX = -150
        this.taskBtn.vAlign = "bottom"
        this.taskBtn.hAlign = "center"
        this.taskBtn.visible = false
        this.taskBtn.onClick = new OnClick(() => {
            this.show()
        })

        this.window = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.window.width = "445"
        this.window.height = "250"
        this.window.sourceWidth = 445
        this.window.sourceHeight = 250
        this.window.sourceLeft = 0
        this.window.sourceTop = 115
        this.window.positionY = this.bottomSpace
        this.window.positionX = 0
        this.window.vAlign = "bottom"
        this.window.hAlign = "left"
        this.window.visible = true
        this.uiShapes.push(this.window)

        this.closeIcon = new UIImage(this.canvas, new Texture("textures/ui_full.png"))
        this.closeIcon.width = "45"
        this.closeIcon.height = "55"
        this.closeIcon.sourceWidth = 45
        this.closeIcon.sourceHeight = 55
        this.closeIcon.sourceLeft = 235
        this.closeIcon.sourceTop = 55
        this.closeIcon.positionY = this.bottomSpace+192
        this.closeIcon.positionX = 390
        this.closeIcon.vAlign = "bottom"
        this.closeIcon.hAlign = "left"
        this.closeIcon.visible = true
        this.closeIcon.onClick =  new OnClick(() => {
            this.hide()
        })
        this.uiShapes.push(this.closeIcon)

        this.ticket_count = new ui.UICounter(0, 200, 336, Color4.Red(), 25)
        this.ticket_count.uiText.vAlign = this.vAlign
        this.ticket_count.uiText.hAlign = this.hAlign
        this.uiShapes.push(this.ticket_count.uiText)


        const task_state = [
            TaskState.inactive,
            TaskState.inactive,
            TaskState.inactive,
            TaskState.inactive,
        ]
        for (let i=0; i<task_state.length; i++) {
            this.addTask(i, task_state[i], this.task_count, this.task_img_height)
        }

        this.hide()

        this.updateTask(99, [
            TaskState.completed,
            TaskState.active,
            TaskState.active,
            TaskState.inactive,
        ])
    }

    addTask(index:number, state:TaskState, task_count:number, task_img_height=30) {
        const task = new ui.LargeIcon('textures/tasks.png', 45, this.bottomSpace+(task_count-index)*task_img_height, 365, task_img_height)
        task.image.vAlign = this.vAlign
        task.image.hAlign = this.hAlign
        task.image.sourceTop = state*task_img_height*task_count + index*task_img_height
        log(task.image.sourceTop)

        this.tasks.push(task)
        this.uiShapes.push(task.image)

    }

    updateTask(tikets_count, state:TaskState[]) {
        this.ticket_count.set(tikets_count)
        for (let i=0; i<state.length; i++) {
            this.tasks[i].image.sourceTop = state[i]*this.task_img_height*this.task_count + i*this.task_img_height
        }
    }

    private hide() {
        this.uiShapes.forEach(s => s.visible = false)
        this.taskBtn.visible = true
    }
    private show() {
        this.uiShapes.forEach(s => s.visible = true)
        this.taskBtn.visible = false
    }
}