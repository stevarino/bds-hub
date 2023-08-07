/**
 * Pure types (no node_module dependencies) for use in behavior pack code
 */

export * from './transitionTypes.js';

/** A runtime contianer of world state */
export interface WorldState {
  /** All known players to the world */
  players?: string[],
  bots?: BotState[],
  accounts?: AccountState[],
}

export enum BotType {
  TeleBot = 'TeleBot',
  Greeter = 'Greeter',
}

export interface BotState {
  id: string,
  name: string,
  owner?: string,
  location: PositionTuple,
  type: BotType,
  tags?: string[],
  offset?: [number, number, number];
}

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
  entities: {[name: string]: PlayerUpdate},
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

