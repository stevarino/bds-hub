
interface Vector3 {
  x: number,
  y: number,
  z: number,
}

interface Vector2 {
  x: number,
  y: number,
}

interface Game {
  id: string
  active: boolean
  owners: string[]
  region: Region
  regions?: Region[]
  regionGroups?: {[key: string]: string[]}
  stages?: Stage[]
  defaultStage?: string
  onTick?: Event[]
  onEnter?: Event[]
  onExit?: Event[]
}

interface Region {
  id: string
  pos1: Vector3
  pos2: Vector3
}

interface Stage {
  id: string
  onEnter?: Event[]
  onExit?: Event[]
  onTick?: Event[]
  transitions: Transition[]
}

interface Event {
  camera?: Camera
  title?: string
  subtitle?: string
  fade?: Fade
  teleport?: Vector3
}

interface Transition {
  afterStageEnter?: number
  afterGameEnter?: number
  ifRegionIntersect?: string
  ifRegionEnter?: string
  ifCalc?: unknown
  then: string
}

interface Camera {
  /** Presets */
  mode: keyof typeof cameraPresets
  /** Where to place the camera */
  position?: Partial<Vector3>
  /** What angle the camera should be displayed */
  angle?: Partial<Vector2>
  /** Offset the camera relative to the player angle on the x/z plane */
  relOffset?: Partial<Vector3>
  /** Offset the camera relative to the world */
  absOffset?: Partial<Vector3>
  /** Rotate the camera */
  relAngle?: Partial<Vector2>
  easeTime?: number
  easeType?: (
    "linear"|"spring"|"easeInSine"|"easeOutSine"|"easeInOutSine"|"easeInQuad"|
    "easeOutQuad"|"easeInOutQuad"|"easeInCubic"|"easeOutCubic"|"easeInOutCubic"|
    "easeInQuart"|"easeOutQuart"|"easeInOutQuart"|"easeInQuint"|"easeOutQuint"|
    "easeInOutQuint"|"easeInExpo"|"easeOutExpo"|"easeInOutExpo"|"easeInCirc"|
    "easeOutCirc"|"easeInOutCirc"|"easeInBack"|"easeOutBack"|"easeInOutBack"|
    "easeInElastic"|"easeOutElastic"|"easeInOutElastic"|"easeInBounce"|
    "easeOutBounce"|"easeInOutBounce"
  )
}

type CameraPreset = Omit<Camera, 'mode'>;

const cameraPresets: {[key: string]: CameraPreset} = {
  reset: {},
  free: {},
  overhead: { relOffset: {y: 5}, angle: {x: 90} },
  overheadLocked: { relOffset: {y: 5}, angle: {x: 90, y: 0} },
  following: { relOffset: {x: 5, z: 1, y: 1}}
}

interface Fade {
  timeIn?: number
  timeOut?: number
  hold?: number
  /** color of the fade in #rrggbb hex (or #rgb) */
  color: string
}
