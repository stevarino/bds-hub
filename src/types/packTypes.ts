/**
 * Pure types (no node_module dependencies) for use in behavior pack code
 */

/** Enum for tracked actions */
export enum Actions {
  breakBlock=0,
  placeBlock=1,
  killed=2,
  hurt=3,
  pressurePlatePush=4,
  targetBlockHit=5,
  online=6,
  use=7,
};

/** Enum for Weather (and other things?) */
export enum Constants {
  weatherClear=0,
  weatherRain=1,
  weatherLightning=2,
};

/** A polled update sent to the Hub Server */
export interface Update {
  time: number,
  weather: number,
  entities: {[name: string]: EntityUpdate},
  messages: string[],
};

/** Entity position */
export type PositionTuple = [
  dimension: string,
  x: number,
  y: number,
  z: number
];

/** Position and events for a given player */
export interface EntityUpdate {
  pos?: PositionTuple,
  events: EntityEvent[],
};

type Entity = {entity: string};
type ActionRef = {action: Actions}
type ActionStr = {action: string}
type EventDetails = {
  object?: string,
  extra?: string,
  qty?: number,
}

/** What happened by or to a given player */
export type EntityEvent = ActionRef & EventDetails;

export type Event = Entity & ActionStr & EventDetails;

export type EventField = keyof Event;

export interface EventRequest {
  select?: EventField[],
  where?: Partial<Event>,
  order?: EventField[],
}

/** Response from the server */
export interface UpdateResponse {
  /** Incoming Discord messsages to display */
  messages: string[];
};

/** Generic Server Status output by /status */
export interface ServerStatus {
  time?: number,
  weather?: string,
  online?: string[],
};

/******************************************************************************* 
 * Interface types (menus, dialogues, forms, etc)
*******************************************************************************/

/** Optional, if response requires OP priveleges */
type requireOp = { requireOp?: boolean }

/** Pack-side function */
interface Action { action: string, args?: Args };
/** Minecraft command */
interface Command { command: string };
/** Minecraft dialogue entry */
interface Scene { scene: string };

/** Describes a menu to open up */
export interface Menu { menu: MenuDetails };
export interface MenuDetails {
  title: string,
  body?: string,
  buttons: Button[],
};

interface TagSelector { tag: string }
interface NameSelector { name: string }
interface SelectorSelector { selector: string };

/** A dialogue response */
type BaseTransition = Action | Command | Scene | Menu;
export type Transition = Partial< Action & Command & Scene & Menu >;
export type TransitionMap = {[key: string]: Transition};

export type Actor = { scene: string } & ( TagSelector | SelectorSelector | NameSelector );
export type SuperActor = Actor & Partial< TagSelector & SelectorSelector & NameSelector >;

export type Button = { text: string } & requireOp & ( BaseTransition );
export interface Args {[key: string]: unknown};
export type SuperButton = Button & Transition;

export interface Trader {
  trades: {
    gives: string,
    accepts: string[],
    ratio?: number,
  }[],
}

export type ItemUse = requireOp & (TagSelector | NameSelector) & (Command | Action | Menu);
export type SuperItemUse = Partial<requireOp & TagSelector & NameSelector & Command & Action & Menu>;
