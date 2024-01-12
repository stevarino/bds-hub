import {type Vector2, type Vector3} from '../../../types/common.js';
import {type NamedRegion} from '../../../lib/region_lib.js';
export type {NamedRegion, Vector2, Vector3};

export class ParseError extends Error {}

export enum GameMode {
  /** Game is running with a single stage for all players */
  singular = 0,
  /** Each player gets their own stage set */
  parellel = 1,
}

/**
 * Minigame - represents a game definition without runtime state.
 */
export interface Minigame {
  /**
   * unique identifier
   *
   * Matches /^[^/]+$/
   **/
  id: string;
  /** whether the game can be either played (true) or edited (false) */
  active: boolean;
  /** owner of the minigame, by player.id */
  owner: string;
  /** list of player id's */
  editors?: string[];

  mode: GameMode;

  /** whether to run the game in adventure mode */
  adventureMode?: boolean;

  /**
   * Whether the framework or the game will clean up things
   *
   * This includes restoring the camera, player controls, adventure mode, etc.
   **/
  doAutomaticCleanup?: boolean;
  /** any runtime variables */
  playerVars?: {[name: string]: number | string | boolean | null};
  /** any runtime variables */
  gameVars?: {[name: string]: number | string | boolean | null};

  /** stages of the game (state machine states) */
  stages: Stage[];
  /** default stage */
  defaultStage: string;

  /** bounding box of the game */
  region: NamedRegion;
  /** subregions within the game */
  regions?: NamedRegion[];
  /** groupings of regions */
  regionGroups?: {[key: string]: string[]};
}

export interface Stage {
  id: string;
  onEnter?: StatementList;
  onExit?: StatementList;
  onTick?: StatementList;
}

export type EventType = 'onEnter' | 'onTick' | 'onExit';
export const EventNames: EventType[] = ['onEnter', 'onTick', 'onExit'];

/**
 * TokenTuple - a serialized set of expression tokens safe for JSON
 *
 * First element represents the token code (like "tel" for the teleport token)
 * and the rest (0 or more) are attributes of that token.
 *
 * Some tokens can contain nested tokens, making this a recursive data structure.
 **/

/** Valid values for tokens */
export type TokenExpressionArg =
  | string
  | number
  | boolean
  | null
  | Record<string, number | string>
  | ExpressionTuple
  | ExpressionTuple[];

/** An expression identifier and subsequent arguments */
export type TokenExpressionTuple = [string, ...TokenExpressionArg[]];

/**
 * An expression set of tuples, with possibly nested expressions, equivalent to TokenExpressionTuple
 *
 * https://github.com/microsoft/TypeScript/issues/41164
 * */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExpressionTuple extends TokenExpressionTuple {}

// export type ExpressionTuple = [
//   string,
//   ...(string | number | Array<unknown> | Record<string, unknown>)[],
// ];

export type StatementList = ExpressionTuple[];

type ExpressionArgs =
  | [Name: string, ArgumentType: EXPRESSION_ARGUMENT_TYPES]
  | [Name: string, ArgumentType: EXPRESSION_ARGUMENT_TYPES, Value: unknown];

/** Expression - Defines code for a game, along with parameters for editing */
export class Expression {
  args: ExpressionArgs[];
  toJavascript: (args: string[]) => string;

  constructor(
    /** User friendly name */
    public name: string,
    /** Helpful description of the expression */
    public desc: string,
    /**
     * List of expression arguments.
     *
     * If just a list of strings, all arguments are assumed to be of type expression.
     *
     * Next option is a two-tuple, with string names and argument types.
     *
     * Final option is a three-tuple: string names, afrgument types, and default values.
     */
    args: (string | ExpressionArgs)[],
    public categories: EXPRESSION_CATEGORIES[],
    parser: string | ((args: string[]) => string),
  ) {
    if (args.length > 0 && typeof args[0] === 'string') {
      this.args = [];
      for (const f of args) {
        this.args.push([f as string, EXPRESSION_ARGUMENT_TYPES.Expression]);
      }
    } else {
      this.args = args as ExpressionArgs[];
    }
    if (
      !this.categories.includes(EXPRESSION_CATEGORIES.Statement) &&
      !this.categories.includes(EXPRESSION_CATEGORIES.Expression)
    ) {
      this.categories.push(EXPRESSION_CATEGORIES.Expression);
    }

    if (typeof parser === 'string') {
      this.toJavascript = args =>
        this._stringToJavascript(parser, args, this.args);
    } else {
      this.toJavascript = parser;
    }
  }

  _stringToJavascript(
    argFormat: string,
    args: string[],
    argTypes: ExpressionArgs[],
    unknown = 'undefined',
  ) {
    const lookup: {[k: string]: string} = {};
    const obj: {[k: string]: string} = {};
    for (const [i, arg] of args.entries()) {
      lookup[`%${i}`] = arg;
      if (arg !== undefined && argTypes[i] !== undefined) {
        obj[argTypes[i]![0]] = arg;
      }
    }
    lookup['%o'] = JSON.stringify(obj);
    lookup['%n'] = `[${args.join(',')}]`;
    lookup['%s'] = args.shift() ?? unknown;

    const parts: string[] = [];
    let format = argFormat;
    while (true) {
      const m = /%./.exec(format);
      if (m === null) break;
      parts.push(format.slice(0, m.index));
      parts.push(lookup[m[0]] ?? unknown);
      if (m[0] === '%s') {
        lookup['%s'] = args.shift() ?? unknown;
      }
      format = format.slice(m.index + 2);
    }
    parts.push(format);
    return parts.join('');
  }
}

export interface EventFade {
  /** color of the fade in #rrggbb hex (or #rgb), default black */
  color?: string;

  // all time in seconds
  timeIn?: number;
  hold?: number;
  timeOut?: number;
}

export interface EventTeleport {
  position: Vector3;
  variance?: Vector3;
  rot?: {y: number; x: number};
}

/**
 * Camera Options
 *
 * Note: Only certain combinations of these options are allowed.
 *  - location and optional ease
 *  - facing (both forms) with optional location and ease
 *  - angle with optional location and ease
 *
 * Any modifier is valid with or without the given property. If a property
 * is not specified, the player's location/rotation are used.
 */
export interface EventCamera {
  /** Presets */
  mode: CAMERA_PRESET;
  /** Where to place the camera */
  location?: Partial<Vector3>;
  /**
   * Offset the camera relative to the player angle
   *
   * x = Right / Left
   * z = Fwd / Back
   * {x: 1, z: -3} is 1m right, 3m back
   **/
  relOffset?: Partial<Vector3>;
  /** Offset the camera relative to the world */
  absOffset?: Partial<Vector3>;

  /**
   * Angle relative to the world
   *
   * (0, 0) = +Z / South
   * (0, 180) = -Z / North
   * (0, 90) = -X / West
   * (0, 270) = +X / East
   * (90, 0) = Down, +Z / South at top of screen
   **/
  angle?: Partial<Vector2>;
  /** Rotate the camera relative to the player (WIP) */
  relAngle?: Partial<Vector2>;

  /** Facing: accepts either an entity selector or a block position */
  facing?: string | Vector3;
  ease?: {
    time: number;
    type: string;
  };
}

export type CameraPreset = Omit<EventCamera, 'mode'>;

export interface EventInputPermission {
  enabled: boolean;
  permissions?: Array<'camera' | 'movement'>;
}

export interface EventPlaySound {
  sound: string;
  volume?: number;
  pitch?: number;
}

/** Argument Types */
export enum EXPRESSION_ARGUMENT_TYPES {
  Expression = 0,
  StatementList = 1,
  Stage = 2,
  Region = 3,
  Var = 4,
  VarGame = 5,
  VarPlayer = 6,

  // data
  String = 20,
  Number = 21,
  Integer = 22,
  Boolean = 23,
  /** Vector3 */
  Vector3 = 24,
  /** Vector3 Integer */
  Vector3i = 25,
  /** Relative Vector3: [~, 4, ~+20] */
  Vector3r = 26,
  /** Optional Vector3 */
  Vector3o = 27,
  /** Partial Vector3 */
  Vector3p = 28,
  /** Vector2 */
  Vector2 = 40,
  /** Optional Vector2 */
  Vector2o = 41,
  /** Partial Vector2 */
  Vector2p = 42,

  // enums
  PlayerState = 70,
  CameraPreset = 71,
  CameraEase = 72,
  CameraFade = 73,
}

/** Expression Types */
export enum EXPRESSION_CATEGORIES {
  Game,
  Logic,
  Math,
  Player,
  Data,

  Statement,
  Expression,
}

export enum PLAYER_STATE {
  Climbing,
  Emoting,
  Falling,
  Flying,
  Gliding,
  InWater,
  Jumping,
  OnGround,
  Sleeping,
  Sneaking,
  Sprinting,
  Swimming,
}

export enum CAMERA_PRESET {
  Free,
  Overhead,
  OverheadLocked,
  Following,
}

export enum CAMERA_EASE {
  None,
  Linear,
  InBack,
  InBounce,
  InCirc,
  InCubic,
  InElastic,
  InExpo,
  InOutBack,
  InOutBounce,
  InOutCirc,
  InOutCubic,
  InOutElastic,
  InOutExpo,
  InOutQuad,
  InOutQuart,
  InOutQuint,
  InOutSine,
  InQuad,
  InQuart,
  InQuint,
  InSine,
  OutBack,
  OutBounce,
  OutCirc,
  OutCubic,
  OutElastic,
  OutExpo,
  OutQuad,
  OutQuart,
  OutQuint,
  OutSine,
  Spring,
}

export enum CAMERA_FADE {
  Black = '#000',
  White = '#fff',
  Red = '#f00',
  Blue = '#0f0',
  Green = '#00f',
  Yellow = '#ff0',
  Magenta = '#f0f',
  Cyan = '#0ff',
}

export function getMinigamePath(mg: Minigame) {
  return `minigames/${mg.id}`;
}
