import {WeaponComponent} from "./WeaponComponent";

export class Weapon extends Entity {
    private animator: Animator;
    private state: AnimationState;
    constructor(model:GLTFShape, base:TranformConstructorArgs, attached:TranformConstructorArgs) {
        super('weapon')
        this.addComponent(model)
        this.addComponent(new WeaponComponent(base, attached))
        this.getComponent(WeaponComponent).attached = true
        this.drop()

        // this.animator = new Animator()
        // this.addComponent(this.animator)
        // this.state = new AnimationState("pick_anim01")
        // this.animator.addClip(this.state)
        // this.state.stop()
        // this.state.looping = false
        // this.state.playing = false
        // this.state.speed = 1
    }

    take() {
        if (!this.getComponent(WeaponComponent).attached) {
            this.removeComponent(OnPointerDown)
            this.addComponentOrReplace(new Transform(this.getComponent(WeaponComponent).attachedTransform))
            const parent = this.getParent()
            if (parent != null) {
                this.getComponent(WeaponComponent).baseParent = parent
            }
            this.setParent(Attachable.FIRST_PERSON_CAMERA)
            this.getComponent(WeaponComponent).attached = true
        }
    }

    drop() {
        if (this.getComponent(WeaponComponent).attached) {
            this.addComponentOrReplace(new Transform(this.getComponent(WeaponComponent).baseTransform))
            if (this.getComponent(WeaponComponent).baseParent != null) {
                this.setParent(this.getComponent(WeaponComponent).baseParent)
            }
            this.addComponent(
                new OnPointerDown((e) => {
                    this.take()
                    },
                    {button: ActionButton.ANY, hoverText: 'take', distance: 5}
                )
            )
            this.getComponent(WeaponComponent).attached = false
        }
    }

    toggle() {
        if (this.getComponent(WeaponComponent).attached) {
            this.drop()
        } else {
            this.take()
        }
    }

    fire() {
        // this.state.stop()
        // this.state.play()
    }
}