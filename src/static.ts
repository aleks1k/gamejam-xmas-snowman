export const static_scene = new Entity('static_scene')
const transform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
static_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
entity.setParent(static_scene)
entity.setParent(static_scene)
const gltfShape = new GLTFShape("models/static/FloorBaseConcrete_01/FloorBaseConcrete_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const entity2 = new Entity('entity2')
entity2.setParent(static_scene)
entity2.addComponentOrReplace(gltfShape)
const transform3 = new Transform({
    position: new Vector3(24, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
entity2.addComponentOrReplace(transform3)

const entity3 = new Entity('entity3')
entity3.setParent(static_scene)
entity3.addComponentOrReplace(gltfShape)
const transform4 = new Transform({
    position: new Vector3(8, 0, 24),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
entity3.addComponentOrReplace(transform4)

const entity4 = new Entity('entity4')
entity4.setParent(static_scene)
entity4.addComponentOrReplace(gltfShape)
const transform5 = new Transform({
    position: new Vector3(24, 0, 24),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
entity4.addComponentOrReplace(transform5)

const treepinesnowround = new Entity('treepinesnowround')
treepinesnowround.setParent(static_scene)
const transform6 = new Transform({
    position: new Vector3(20, 0, 20),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
treepinesnowround.addComponentOrReplace(transform6)
const gltfShape2 = new GLTFShape("models/static/treePineSnowRound.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
treepinesnowround.addComponentOrReplace(gltfShape2)

const treedecorated = new Entity('treedecorated')
treedecorated.setParent(static_scene)
const transform7 = new Transform({
    position: new Vector3(16, 0, 19.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(4, 4, 4)
})
treedecorated.addComponentOrReplace(transform7)
const gltfShape3 = new GLTFShape("models/static/treeDecorated.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
treedecorated.addComponentOrReplace(gltfShape3)

const treepinesnow = new Entity('treepinesnow')
treepinesnow.setParent(static_scene)
const transform8 = new Transform({
    position: new Vector3(12, 0, 20),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
treepinesnow.addComponentOrReplace(transform8)
const gltfShape4 = new GLTFShape("models/static/treePineSnow.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
treepinesnow.addComponentOrReplace(gltfShape4)

const treepine = new Entity('treepine')
treepine.setParent(static_scene)
const transform9 = new Transform({
    position: new Vector3(24, 0, 21.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
treepine.addComponentOrReplace(transform9)
const gltfShape5 = new GLTFShape("models/static/treePine.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
treepine.addComponentOrReplace(gltfShape5)

const treepine2 = new Entity('treepine2')
treepine2.setParent(static_scene)
treepine2.addComponentOrReplace(gltfShape5)
const transform10 = new Transform({
    position: new Vector3(8, 0, 21),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
treepine2.addComponentOrReplace(transform10)

const rockformationmedium = new Entity('rockformationmedium')
rockformationmedium.setParent(static_scene)
const transform11 = new Transform({
    position: new Vector3(25, 0, 5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
rockformationmedium.addComponentOrReplace(transform11)
const gltfShape6 = new GLTFShape("models/static/rockFormationMedium.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
rockformationmedium.addComponentOrReplace(gltfShape6)

const snowfort = new Entity('snowfort')
snowfort.setParent(static_scene)
const transform13 = new Transform({
    position: new Vector3(19.5, 0, 6),
    rotation: new Quaternion(-8.300713665954172e-15, -0.9951847791671753, 1.1863526339084274e-7, -0.09801724553108215),
    scale: new Vector3(3.0000033378601074, 3, 3.0000033378601074)
})
snowfort.addComponentOrReplace(transform13)
const gltfShape8 = new GLTFShape("models/static/snowFort.glb")
gltfShape8.withCollisions = true
gltfShape8.isPointerBlocker = true
gltfShape8.visible = true
snowfort.addComponentOrReplace(gltfShape8)

const snowpatch = new Entity('snowpatch')
snowpatch.setParent(static_scene)
const transform14 = new Transform({
    position: new Vector3(15.5, 0, 17.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(8.530407905578613, 1, 10.868406295776367)
})
snowpatch.addComponentOrReplace(transform14)
const gltfShape9 = new GLTFShape("models/static/snowPatch.glb")
gltfShape9.withCollisions = true
gltfShape9.isPointerBlocker = true
gltfShape9.visible = true
snowpatch.addComponentOrReplace(gltfShape9)

const snowfort2 = new Entity('snowfort2')
snowfort2.setParent(static_scene)
snowfort2.addComponentOrReplace(gltfShape8)
const transform15 = new Transform({
    position: new Vector3(15.5, 0, 7),
    rotation: new Quaternion(-6.2048860685192265e-15, -0.9972625374794006, 1.1888295148310135e-7, 0.07394276559352875),
    scale: new Vector3(3.0000052452087402, 3, 3.0000052452087402)
})
snowfort2.addComponentOrReplace(transform15)

const snowfort3 = new Entity('snowfort3')
snowfort3.setParent(static_scene)
snowfort3.addComponentOrReplace(gltfShape8)
const transform16 = new Transform({
    position: new Vector3(11, 0, 8),
    rotation: new Quaternion(-6.641684442275798e-15, -0.9880425930023193, 1.1778384845229084e-7, 0.15418119728565216),
    scale: new Vector3(3.000001907348633, 3, 3.000001907348633)
})
snowfort3.addComponentOrReplace(transform16)

const lightpost = new Entity('lightpost')
lightpost.setParent(static_scene)
const transform17 = new Transform({
    position: new Vector3(8.5, 0, 10.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(2.5, 2.5, 2.5)
})
lightpost.addComponentOrReplace(transform17)
const gltfShape10 = new GLTFShape("models/static/lightpost.glb")
gltfShape10.withCollisions = true
gltfShape10.isPointerBlocker = true
gltfShape10.visible = true
lightpost.addComponentOrReplace(gltfShape10)

const lightpost2 = new Entity('lightpost2')
lightpost2.setParent(static_scene)
lightpost2.addComponentOrReplace(gltfShape10)
const transform18 = new Transform({
    position: new Vector3(23.5, 0, 10),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(2.5, 2.5, 2.5)
})
lightpost2.addComponentOrReplace(transform18)

const present = new Entity('present')
present.setParent(static_scene)
const transform19 = new Transform({
    position: new Vector3(5.5, 0, 22),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
present.addComponentOrReplace(transform19)
const gltfShape11 = new GLTFShape("models/static/present.glb")
gltfShape11.withCollisions = true
gltfShape11.isPointerBlocker = true
gltfShape11.visible = true
present.addComponentOrReplace(gltfShape11)

const presentgreen = new Entity('presentgreen')
presentgreen.setParent(static_scene)
const transform20 = new Transform({
    position: new Vector3(6.5, 0, 21.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
presentgreen.addComponentOrReplace(transform20)
const gltfShape12 = new GLTFShape("models/static/presentGreen.glb")
gltfShape12.withCollisions = true
gltfShape12.isPointerBlocker = true
gltfShape12.visible = true
presentgreen.addComponentOrReplace(gltfShape12)

const presentlow = new Entity('presentlow')
presentlow.setParent(static_scene)
const transform21 = new Transform({
    position: new Vector3(5.5, 0, 24),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
presentlow.addComponentOrReplace(transform21)
const gltfShape13 = new GLTFShape("models/static/presentLow.glb")
gltfShape13.withCollisions = true
gltfShape13.isPointerBlocker = true
gltfShape13.visible = true
presentlow.addComponentOrReplace(gltfShape13)

const presentround = new Entity('presentround')
presentround.setParent(static_scene)
const transform22 = new Transform({
    position: new Vector3(6.242844581604004, 0, 22.954126358032227),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
presentround.addComponentOrReplace(transform22)
const gltfShape14 = new GLTFShape("models/static/presentRound.glb")
gltfShape14.withCollisions = true
gltfShape14.isPointerBlocker = true
gltfShape14.visible = true
presentround.addComponentOrReplace(gltfShape14)

const presentgreenlow = new Entity('presentgreenlow')
presentgreenlow.setParent(static_scene)
const transform23 = new Transform({
    position: new Vector3(4, 0.648318886756897, 23.753015518188477),
    rotation: new Quaternion(-4.507857993914959e-16, 0.2582997977733612, -3.079173538367286e-8, 0.9660648107528687),
    scale: new Vector3(1, 1, 1)
})
presentgreenlow.addComponentOrReplace(transform23)
const gltfShape15 = new GLTFShape("models/static/presentGreenLow.glb")
gltfShape15.withCollisions = true
gltfShape15.isPointerBlocker = true
gltfShape15.visible = true
presentgreenlow.addComponentOrReplace(gltfShape15)

const rusticPostSign = new Entity('rusticPostSign')
rusticPostSign.setParent(static_scene)
const transform24 = new Transform({
    position: new Vector3(23.5, 0, 5.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
rusticPostSign.addComponentOrReplace(transform24)
const gltfShape16 = new GLTFShape("models/static/Sign_01/Sign_01.glb")
gltfShape16.withCollisions = true
gltfShape16.isPointerBlocker = true
gltfShape16.visible = true
rusticPostSign.addComponentOrReplace(gltfShape16)

const coffeeTable = new Entity('coffeeTable')
coffeeTable.setParent(static_scene)
const transform25 = new Transform({
    position: new Vector3(4, 0, 23.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
coffeeTable.addComponentOrReplace(transform25)
const gltfShape17 = new GLTFShape("models/static/Table_06/Table_06.glb")
gltfShape17.withCollisions = true
gltfShape17.isPointerBlocker = true
gltfShape17.visible = true
coffeeTable.addComponentOrReplace(gltfShape17)

const squareCardboardBox = new Entity('squareCardboardBox')
squareCardboardBox.setParent(static_scene)
const transform26 = new Transform({
    position: new Vector3(6.580049514770508, 0, 24.287548065185547),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
squareCardboardBox.addComponentOrReplace(transform26)
const gltfShape18 = new GLTFShape("models/static/CardboardBox_02/CardboardBox_02.glb")
gltfShape18.withCollisions = true
gltfShape18.isPointerBlocker = true
gltfShape18.visible = true
squareCardboardBox.addComponentOrReplace(gltfShape18)

const soccerBall = new Entity('soccerBall')
soccerBall.setParent(static_scene)
const transform27 = new Transform({
    position: new Vector3(4.5, 0.6316139698028564, 23.217208862304688),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
soccerBall.addComponentOrReplace(transform27)
const gltfShape19 = new GLTFShape("models/static/PlaygroundBall_01/PlaygroundBall_01.glb")
gltfShape19.withCollisions = true
gltfShape19.isPointerBlocker = true
gltfShape19.visible = true
soccerBall.addComponentOrReplace(gltfShape19)

const redBicycle = new Entity('redBicycle')
redBicycle.setParent(static_scene)
const transform28 = new Transform({
    position: new Vector3(3.5, 0, 22),
    rotation: new Quaternion(1.4737344137193912e-15, 0.9569404125213623, -1.1407617250824842e-7, -0.2902847230434418),
    scale: new Vector3(1.0000005960464478, 1, 1.0000005960464478)
})
redBicycle.addComponentOrReplace(transform28)
const gltfShape20 = new GLTFShape("models/static/Bicycle_01/Bicycle_01.glb")
gltfShape20.withCollisions = true
gltfShape20.isPointerBlocker = true
gltfShape20.visible = true
redBicycle.addComponentOrReplace(gltfShape20)

const boombox = new Entity('boombox')
boombox.setParent(static_scene)
const transform29 = new Transform({
    position: new Vector3(3.721210479736328, 0.590461254119873, 23.114282608032227),
    rotation: new Quaternion(-5.268044123691684e-16, 0.9822044372558594, -1.1708788605346854e-7, -0.1878153532743454),
    scale: new Vector3(0.5651181936264038, 0.5651178359985352, 0.5651181936264038)
})
boombox.addComponentOrReplace(transform29)
const gltfShape21 = new GLTFShape("models/static/Boombox_01/Boombox_01.glb")
gltfShape21.withCollisions = true
gltfShape21.isPointerBlocker = true
gltfShape21.visible = true
boombox.addComponentOrReplace(gltfShape21)

const hwnTree = new Entity('hwnTree')
hwnTree.setParent(static_scene)
const transform30 = new Transform({
    position: new Vector3(5, 0, 17),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
hwnTree.addComponentOrReplace(transform30)
const gltfShape22 = new GLTFShape("models/static/HWN20_Tree_09.glb")
gltfShape22.withCollisions = true
gltfShape22.isPointerBlocker = true
gltfShape22.visible = true
hwnTree.addComponentOrReplace(gltfShape22)

const cabinwall = new Entity('cabinwall')
cabinwall.setParent(static_scene)
const transform31 = new Transform({
    position: new Vector3(5.5, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall.addComponentOrReplace(transform31)
const gltfShape23 = new GLTFShape("models/static/cabinWall.glb")
gltfShape23.withCollisions = true
gltfShape23.isPointerBlocker = true
gltfShape23.visible = true
cabinwall.addComponentOrReplace(gltfShape23)

const cabinwindowlarge = new Entity('cabinwindowlarge')
cabinwindowlarge.setParent(static_scene)
const transform32 = new Transform({
    position: new Vector3(12.5, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwindowlarge.addComponentOrReplace(transform32)
const gltfShape24 = new GLTFShape("models/static/cabinWindowLarge.glb")
gltfShape24.withCollisions = true
gltfShape24.isPointerBlocker = true
gltfShape24.visible = true
cabinwindowlarge.addComponentOrReplace(gltfShape24)

const cabinwindow = new Entity('cabinwindow')
cabinwindow.setParent(static_scene)
const transform33 = new Transform({
    position: new Vector3(9, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwindow.addComponentOrReplace(transform33)
const gltfShape25 = new GLTFShape("models/static/cabinWindow.glb")
gltfShape25.withCollisions = true
gltfShape25.isPointerBlocker = true
gltfShape25.visible = true
cabinwindow.addComponentOrReplace(gltfShape25)

const cabinwindow2 = new Entity('cabinwindow2')
cabinwindow2.setParent(static_scene)
cabinwindow2.addComponentOrReplace(gltfShape25)
const transform34 = new Transform({
    position: new Vector3(16, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwindow2.addComponentOrReplace(transform34)

const cabinwall2 = new Entity('cabinwall2')
cabinwall2.setParent(static_scene)
const transform35 = new Transform({
    position: new Vector3(19.5, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall2.addComponentOrReplace(transform35)
cabinwall2.addComponentOrReplace(gltfShape23)

const cabindoor = new Entity('cabindoor')
cabindoor.setParent(static_scene)
const transform36 = new Transform({
    position: new Vector3(23, 0, 28.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabindoor.addComponentOrReplace(transform36)
const gltfShape26 = new GLTFShape("models/static/cabinDoor.glb")
gltfShape26.withCollisions = true
gltfShape26.isPointerBlocker = true
gltfShape26.visible = true
cabindoor.addComponentOrReplace(gltfShape26)

const cabinwall3 = new Entity('cabinwall3')
cabinwall3.setParent(static_scene)
cabinwall3.addComponentOrReplace(gltfShape23)
const transform37 = new Transform({
    position: new Vector3(4, 0, 30),
    rotation: new Quaternion(-1.6987753976953346e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
    scale: new Vector3(3.500001907348633, 3.5, 3.500001907348633)
})
cabinwall3.addComponentOrReplace(transform37)

const cabinwall4 = new Entity('cabinwall4')
cabinwall4.setParent(static_scene)
const transform38 = new Transform({
    position: new Vector3(23, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall4.addComponentOrReplace(transform38)
cabinwall4.addComponentOrReplace(gltfShape23)

const cabinwall5 = new Entity('cabinwall5')
cabinwall5.setParent(static_scene)
cabinwall5.addComponentOrReplace(gltfShape23)
const transform39 = new Transform({
    position: new Vector3(19.5, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall5.addComponentOrReplace(transform39)

const cabinwall6 = new Entity('cabinwall6')
cabinwall6.setParent(static_scene)
cabinwall6.addComponentOrReplace(gltfShape23)
const transform40 = new Transform({
    position: new Vector3(16, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall6.addComponentOrReplace(transform40)

const cabinwall7 = new Entity('cabinwall7')
cabinwall7.setParent(static_scene)
cabinwall7.addComponentOrReplace(gltfShape23)
const transform41 = new Transform({
    position: new Vector3(12.5, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall7.addComponentOrReplace(transform41)

const cabinwall8 = new Entity('cabinwall8')
cabinwall8.setParent(static_scene)
cabinwall8.addComponentOrReplace(gltfShape23)
const transform42 = new Transform({
    position: new Vector3(9, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall8.addComponentOrReplace(transform42)

const cabinwall9 = new Entity('cabinwall9')
cabinwall9.setParent(static_scene)
cabinwall9.addComponentOrReplace(gltfShape23)
const transform43 = new Transform({
    position: new Vector3(5.5, 0, 31.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(3.5, 3.5, 3.5)
})
cabinwall9.addComponentOrReplace(transform43)

const cabinroofcenter2 = new Entity('cabinroofcenter2')
cabinroofcenter2.setParent(static_scene)
const gltfShape27 = new GLTFShape("models/static/cabinRoofCenter.glb")
gltfShape27.withCollisions = true
gltfShape27.isPointerBlocker = true
gltfShape27.visible = true
cabinroofcenter2.addComponentOrReplace(gltfShape27)
const transform44 = new Transform({
    position: new Vector3(9.5, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.197366714477539, 3.19735050201416, 3.197366714477539)
})
cabinroofcenter2.addComponentOrReplace(transform44)

const cabinroofcenter3 = new Entity('cabinroofcenter3')
cabinroofcenter3.setParent(static_scene)
cabinroofcenter3.addComponentOrReplace(gltfShape27)
const transform45 = new Transform({
    position: new Vector3(13.5, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.1973655223846436, 3.19735050201416, 3.1973655223846436)
})
cabinroofcenter3.addComponentOrReplace(transform45)

const cabinroofcenter = new Entity('cabinroofcenter')
cabinroofcenter.setParent(static_scene)
cabinroofcenter.addComponentOrReplace(gltfShape27)
const transform46 = new Transform({
    position: new Vector3(5.5, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.1973674297332764, 3.19735050201416, 3.1973674297332764)
})
cabinroofcenter.addComponentOrReplace(transform46)

const cabinroofcenter4 = new Entity('cabinroofcenter4')
cabinroofcenter4.setParent(static_scene)
cabinroofcenter4.addComponentOrReplace(gltfShape27)
const transform47 = new Transform({
    position: new Vector3(17.5, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.19736647605896, 3.19735050201416, 3.19736647605896)
})
cabinroofcenter4.addComponentOrReplace(transform47)

const cabinroofcenter5 = new Entity('cabinroofcenter5')
cabinroofcenter5.setParent(static_scene)
cabinroofcenter5.addComponentOrReplace(gltfShape27)
const transform48 = new Transform({
    position: new Vector3(21.5, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.1973674297332764, 3.19735050201416, 3.1973674297332764)
})
cabinroofcenter5.addComponentOrReplace(transform48)

const cabinsidecenter = new Entity('cabinsidecenter')
cabinsidecenter.setParent(static_scene)
const transform49 = new Transform({
    position: new Vector3(24.5, 3.455536365509033, 30),
    rotation: new Quaternion(1.0677837940556954e-14, -0.7071068286895752, 8.42937097900176e-8, 0.7071068286895752),
    scale: new Vector3(3.0817463397979736, 3.0817394256591797, 3.0817463397979736)
})
cabinsidecenter.addComponentOrReplace(transform49)
const gltfShape28 = new GLTFShape("models/static/cabinSideCenter.glb")
gltfShape28.withCollisions = true
gltfShape28.isPointerBlocker = true
gltfShape28.visible = true
cabinsidecenter.addComponentOrReplace(gltfShape28)

const cabinroofcenter6 = new Entity('cabinroofcenter6')
cabinroofcenter6.setParent(static_scene)
cabinroofcenter6.addComponentOrReplace(gltfShape27)
const transform50 = new Transform({
    position: new Vector3(23, 3, 30),
    rotation: new Quaternion(2.8378269769220544e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
    scale: new Vector3(3.1973676681518555, 3.19735050201416, 3.1973676681518555)
})
cabinroofcenter6.addComponentOrReplace(transform50)

const cabinwall10 = new Entity('cabinwall10')
cabinwall10.setParent(static_scene)
cabinwall10.addComponentOrReplace(gltfShape23)
const transform51 = new Transform({
    position: new Vector3(24.5, 0, 30),
    rotation: new Quaternion(2.3262891687568423e-16, 0.7071068286895752, -8.429368847373553e-8, 0.7071068286895752),
    scale: new Vector3(3.500001907348633, 3.5, 3.500001907348633)
})
cabinwall10.addComponentOrReplace(transform51)

const cabinsidecenter3 = new Entity('cabinsidecenter3')
cabinsidecenter3.setParent(static_scene)
cabinsidecenter3.addComponentOrReplace(gltfShape28)
const transform52 = new Transform({
    position: new Vector3(4, 3.455536365509033, 30),
    rotation: new Quaternion(1.0677837940556954e-14, -0.7071068286895752, 8.42937097900176e-8, 0.7071068286895752),
    scale: new Vector3(3.0817482471466064, 3.0817394256591797, 3.0817482471466064)
})
cabinsidecenter3.addComponentOrReplace(transform52)

const cabinroofchimney = new Entity('cabinroofchimney')
cabinroofchimney.setParent(static_scene)
const transform53 = new Transform({
    position: new Vector3(20.5, 4.038965702056885, 29.593185424804688),
    rotation: new Quaternion(-0.17389880120754242, -9.505388513964487e-17, 2.0730350769326833e-8, 0.9847635626792908),
    scale: new Vector3(2.0923471450805664, 2.092346668243408, 2.092346668243408)
})
cabinroofchimney.addComponentOrReplace(transform53)
const gltfShape29 = new GLTFShape("models/static/cabinRoofChimney.glb")
gltfShape29.withCollisions = true
gltfShape29.isPointerBlocker = true
gltfShape29.visible = true
cabinroofchimney.addComponentOrReplace(gltfShape29)

const sled = new Entity('sled')
sled.setParent(static_scene)
const transform54 = new Transform({
    position: new Vector3(22.5, 0, 18),
    rotation: new Quaternion(5.636601923327423e-17, 0.9569403529167175, -1.1407616540282106e-7, -0.29028481245040894),
    scale: new Vector3(3.000002145767212, 3, 3.000002145767212)
})
sled.addComponentOrReplace(transform54)
const gltfShape30 = new GLTFShape("models/static/sled.glb")
gltfShape30.withCollisions = true
gltfShape30.isPointerBlocker = true
gltfShape30.visible = true
sled.addComponentOrReplace(gltfShape30)

const wreath = new Entity('wreath')
wreath.setParent(static_scene)
const transform55 = new Transform({
    position: new Vector3(20, 1.1964731216430664, 28.248762130737305),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.5, 1.5, 1.5)
})
wreath.addComponentOrReplace(transform55)
const gltfShape31 = new GLTFShape("models/static/wreath.glb")
gltfShape31.withCollisions = true
gltfShape31.isPointerBlocker = true
gltfShape31.visible = true
wreath.addComponentOrReplace(gltfShape31)

const logRound = new Entity('logRound')
logRound.setParent(static_scene)
const transform56 = new Transform({
    position: new Vector3(26, 0.1199026107788086, 19.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 2.1617515087127686, 1)
})
logRound.addComponentOrReplace(transform56)
const gltfShape32 = new GLTFShape("models/static/Log_04/Log_04.glb")
gltfShape32.withCollisions = true
gltfShape32.isPointerBlocker = true
gltfShape32.visible = true
logRound.addComponentOrReplace(gltfShape32)

const logRound2 = new Entity('logRound2')
logRound2.setParent(static_scene)
logRound2.addComponentOrReplace(gltfShape32)
const transform57 = new Transform({
    position: new Vector3(23, 0.008408546447753906, 20),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 2.1617515087127686, 1)
})
logRound2.addComponentOrReplace(transform57)

const logRound3 = new Entity('logRound3')
logRound3.setParent(static_scene)
logRound3.addComponentOrReplace(gltfShape32)
const transform58 = new Transform({
    position: new Vector3(8.5, 0.1199026107788086, 17.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 2.1617515087127686, 1)
})
logRound3.addComponentOrReplace(transform58)

const residentialMailbox = new Entity('residentialMailbox')
residentialMailbox.setParent(static_scene)
const transform59 = new Transform({
    position: new Vector3(3.5, 0, 25.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
residentialMailbox.addComponentOrReplace(transform59)
const gltfShape33 = new GLTFShape("models/static/MailPost_02/MailPost_02.glb")
gltfShape33.withCollisions = true
gltfShape33.isPointerBlocker = true
gltfShape33.visible = true
residentialMailbox.addComponentOrReplace(gltfShape33)

const groundCurvedStoneBlocks = new Entity('groundCurvedStoneBlocks')
groundCurvedStoneBlocks.setParent(static_scene)
const transform60 = new Transform({
    position: new Vector3(6.6603193283081055, 0, 17.406841278076172),
    rotation: new Quaternion(0, 0.2902846932411194, -3.4604628496026635e-8, 0.9569403529167175),
    scale: new Vector3(1, 2.5, 1)
})
groundCurvedStoneBlocks.addComponentOrReplace(transform60)
const gltfShape34 = new GLTFShape("models/static/Stone_Blocks_Curve_01/Stone_Blocks_Curve.glb")
gltfShape34.withCollisions = true
gltfShape34.isPointerBlocker = true
gltfShape34.visible = true
groundCurvedStoneBlocks.addComponentOrReplace(gltfShape34)

const groundCurvedStoneBlocks2 = new Entity('groundCurvedStoneBlocks2')
groundCurvedStoneBlocks2.setParent(static_scene)
groundCurvedStoneBlocks2.addComponentOrReplace(gltfShape34)
const transform61 = new Transform({
    position: new Vector3(3.417112350463867, 0, 9.393065452575684),
    rotation: new Quaternion(8.639256429587481e-16, -0.9951847791671753, 1.1863525628541538e-7, 0.09801711142063141),
    scale: new Vector3(1.0000005960464478, 2.5, 1.0000005960464478)
})
groundCurvedStoneBlocks2.addComponentOrReplace(transform61)

const groundCurvedStoneBlocks3 = new Entity('groundCurvedStoneBlocks3')
groundCurvedStoneBlocks3.setParent(static_scene)
groundCurvedStoneBlocks3.addComponentOrReplace(gltfShape34)
const transform62 = new Transform({
    position: new Vector3(24, 0, 17),
    rotation: new Quaternion(8.473255971375767e-16, -0.9569404125213623, 1.1407617250824842e-7, 0.2902846932411194),
    scale: new Vector3(1.0000025033950806, 2.5, 1.0000025033950806)
})
groundCurvedStoneBlocks3.addComponentOrReplace(transform62)

const groundCurvedStoneBlocks4 = new Entity('groundCurvedStoneBlocks4')
groundCurvedStoneBlocks4.setParent(static_scene)
groundCurvedStoneBlocks4.addComponentOrReplace(gltfShape34)
const transform63 = new Transform({
    position: new Vector3(24, 0, 13),
    rotation: new Quaternion(1.2642946119615695e-15, -0.7730104923248291, 9.21500173944878e-8, 0.6343933343887329),
    scale: new Vector3(1.0000035762786865, 2.5, 1.0000035762786865)
})
groundCurvedStoneBlocks4.addComponentOrReplace(transform63)

const groundCurvedStoneBlocks5 = new Entity('groundCurvedStoneBlocks5')
groundCurvedStoneBlocks5.setParent(static_scene)
groundCurvedStoneBlocks5.addComponentOrReplace(gltfShape34)
const transform64 = new Transform({
    position: new Vector3(29.41534423828125, 0, 25.24388885498047),
    rotation: new Quaternion(-4.977548456958428e-15, 0.3826834261417389, -4.561942290592924e-8, 0.9238795042037964),
    scale: new Vector3(1.0000028610229492, 2.5, 1.0000028610229492)
})
groundCurvedStoneBlocks5.addComponentOrReplace(transform64)

const lightsmulti = new Entity('lightsmulti')
lightsmulti.setParent(static_scene)
const transform65 = new Transform({
    position: new Vector3(16, 1, 18.127296447753906),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.4757347106933594, 1.4757347106933594, 1.4757347106933594)
})
lightsmulti.addComponentOrReplace(transform65)
const gltfShape35 = new GLTFShape("models/static/lightsMulti.glb")
gltfShape35.withCollisions = true
gltfShape35.isPointerBlocker = true
gltfShape35.visible = true
lightsmulti.addComponentOrReplace(gltfShape35)

const lightsmulti2 = new Entity('lightsmulti2')
lightsmulti2.setParent(static_scene)
lightsmulti2.addComponentOrReplace(gltfShape35)
const transform66 = new Transform({
    position: new Vector3(16.071022033691406, 2.391826629638672, 18.484073638916016),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.4757347106933594, 1.4757347106933594, 1.4757347106933594)
})
lightsmulti2.addComponentOrReplace(transform66)

const lightsmulti3 = new Entity('lightsmulti3')
lightsmulti3.setParent(static_scene)
lightsmulti3.addComponentOrReplace(gltfShape35)
const transform67 = new Transform({
    position: new Vector3(16, 3.391826629638672, 18.66271209716797),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.0526175498962402, 1.4757347106933594, 1.4757345914840698)
})
lightsmulti3.addComponentOrReplace(transform67)

const tubeContainer = new Entity('tubeContainer')
tubeContainer.setParent(static_scene)
const transform68 = new Transform({
    position: new Vector3(23, 0, 25.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(4.049280166625977, 9.033802032470703, 4.049280166625977)
})
tubeContainer.addComponentOrReplace(transform68)
const gltfShape36 = new GLTFShape("models/static/ScienceContainer_01/ScienceContainer_01.glb")
gltfShape36.withCollisions = true
gltfShape36.isPointerBlocker = true
gltfShape36.visible = true
tubeContainer.addComponentOrReplace(gltfShape36)

const enemyUfoRed = new Entity('enemyUfoRed')
enemyUfoRed.setParent(static_scene)
const transform69 = new Transform({
    position: new Vector3(23, 6, 25.5),
    rotation: new Quaternion(-0.07971804589033127, -0.00716436468064785, 0.06705741584300995, 0.9945335984230042),
    scale: new Vector3(10.031323432922363, 2.6741979122161865, 10.02418327331543)
})
enemyUfoRed.addComponentOrReplace(transform69)
const gltfShape37 = new GLTFShape("models/static/enemy_ufoRed.glb")
gltfShape37.withCollisions = true
gltfShape37.isPointerBlocker = true
gltfShape37.visible = true
enemyUfoRed.addComponentOrReplace(gltfShape37)



