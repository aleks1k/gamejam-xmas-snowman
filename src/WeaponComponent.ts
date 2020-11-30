@Component('weapon')
export class WeaponComponent {
    attached:boolean = false
    baseTransform:TranformConstructorArgs
    attachedTransform:TranformConstructorArgs
    baseParent:IEntity

    constructor(base:TranformConstructorArgs, attached:TranformConstructorArgs) {
        this.baseTransform = base
        this.attachedTransform = attached
    }
}