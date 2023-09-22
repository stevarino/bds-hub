/**
 * Pure types (no node_module dependencies) for use in behavior pack code
 */

export * from './transitionTypes.js';

export function enumStrings(myEnum: {[key: string]: string|number}) {
  return Object.keys(myEnum).filter(e => /[^0-9]/.test(e));
}

/** A runtime contianer of world state */
export interface WorldState {
  /** All known players to the world */
  players?: string[],
  npcs?: NpcState[],
  accounts?: AccountState[],
}

/** Used for in-memory storage of npc's */
export interface NpcState {
  /** Unique identifier, set to nametag */
  id: string,
  description: string,
  /** undefined implies admin controlled */
  owner?: string,
  location: PositionTuple,
  /** actor identifier */
  role: string,
  /** role specific settings, namespaced by role */
  extra?: Record<string, Record<string, unknown>>,
}

/** wip */
export interface AccountState {
  id: number,
  name: string,
  owner: string,
  ammount: number,
  currency: string,
}

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
  players: {[name: string]: PlayerUpdate},
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
export interface PlayerUpdate {
  pos?: PositionTuple,
  events: PlayerEvent[],
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
export type PlayerEvent = ActionRef & EventDetails;

export type Event = Entity & ActionStr & EventDetails;

export type EventField = keyof Event;

export interface EventRequest {
  select?: EventField[],
  where?: Partial<Event>,
  order?: EventField[],
}

export interface EventResponse {
  events: Partial<Event>[],
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

export interface ServerSuccess {
  success: boolean,
  pk?: number,
}

export interface IDQuery {
  id: number,
}

export interface Location {
  id?: number,
  owner?: string,
  dimension: string,
  x1: number,
  x2: number,
  z1: number,
  z2: number,
  y1?: number,
  y2?: number,
  name: string,
  type: LocationType,
  color: LocationColor,
  sort: number,
  isPublic: boolean,
}

export type LocListReq = {
  owner?: string,
  publicOnly?: boolean,
}

export type LocListRes = {
  locations: LocationResult[],
}

export type LocGetAllRes = {
  locations: Location[],
}

export type LocationGet = {
  location?: Location;
}

export type LocationResult = Omit<Location, 
  "x1"|"x2"|"y1"|"y2"|"z1"|"z2"|"isPublic"
  > & {x: number, y: number, z: number|null}


export enum LocationType {
  base=0,
  store=1,
  farm=2,
  region=3,
  other=4,
}

export enum LocationColor {
  white,
  black,
  dark_blue,
  dark_green,
  dark_aqua,
  dark_red,
  dark_purple,
  orange,
  gray,
  dark_gray,
  blue,
  green,
  aqua,
  red,
  light_purple,
  yellow,
  gold,
  quartz,
  iron,
  netherite,
  redstone,
  copper,
  goldenrod,
  emerald,
  diamond,
  lapis,
  amethyst,
}

export const colorNames = {
  black: '§0',
  dark_blue: '§1',
  dark_green: '§2',
  dark_aqua: '§3',
  dark_red: '§4',
  dark_purple: '§5',
  orange: '§6',
  gray: '§7',
  dark_gray: '§8',
  blue: '§9',
  green: '§a',
  aqua: '§b',
  red: '§c',
  light_purple: '§d',
  yellow: '§e',
  white: '§f',
  gold: '§g',
  quartz: '§h',
  iron: '§i',
  netherite: '§j',
  redstone: '§m',
  copper: '§n',
  goldenrod: '§p',
  emerald: '§q',
  diamond: '§s',
  lapis: '§t',
  amethyst: '§u',
}

export const colorHex = {
  black: '#000000',
  dark_blue: '#0000AA',
  dark_green: '#00AA00',
  dark_aqua: '#00AAAA',
  dark_red: '#AA0000',
  dark_purple: '#AA00AA',
  orange: '#FFAA00',  
  gray: '#AAAAAA',
  dark_gray: '#555555',
  blue: '#5555FF',
  green: '#55FF55',
  aqua: '#55FFFF',
  red: '#FF5555',
  light_purple: '#FF55FF',
  yellow: '#FFFF55',
  white: '#FFFFFF',
  gold: '#DDD605',
  quartz: '#E3D4D1',
  iron: '#CECACA',
  netherite: '#443A3B',
  redstone: '#971607',
  copper: '#B4684D',
  goldenrod: '#DEB12D',
  emerald: '#47A036',
  diamond: '#2CBAA8',
  lapis: '#21497B',
  amethyst: '#9A5CC6',
}
