/**
 * Pure types (no node_module dependencies) for use in behavior pack code
 */

export enum Actions {
  breakBlock=0,
  placeBlock=1,
  killed=2,
  hurt=3,
  pressurePlatePush=4,
  targetBlockHit=5,
  online=6,
};

export enum Constants {
  weatherClear=0,
  weatherRain=1,
  weatherLightning=2,
};

export interface Update {
  time: number,
  weather: number,
  entities: {[name: string]: EntityUpdate},
  messages: string[],
};

export type PositionTuple = [
  dimension: string,
  x: number,
  y: number,
  z: number
];

export interface EntityUpdate {
  pos?: PositionTuple,
  events: EntityEvent[],
};

export interface EntityEvent {
  action: Actions,
  qty?: number,
  object?: string,
  extra?: string,
};

export interface UpdateResponse {
  messages: string[];
};

export interface ServerStatus {
  time?: number,
  weather?: string,
  online?: string[],
};


export type Actor = BaseActor & ( TagActor | SelectorActor | NamedActor );
interface BaseActor  { scene: string };
interface TagActor { tag: string };
interface NamedActor { name: string };
interface SelectorActor { selector: string };
export type SuperActor = BaseActor & Partial<TagActor & NamedActor & SelectorActor>;



export type Button = BaseButton & ( ActionButton | CommandButton | SceneButton );
interface BaseButton { text: string };
interface ActionButton {
  action: string,
  args?: Args,
};
export interface Args {[key: string]: unknown};
interface CommandButton { command: string };
interface SceneButton { scene: string };
export type SuperButton = Button & Partial< ActionButton & CommandButton & SceneButton >;;

export type Transition = Partial<SuperButton>;
export type TransitionMap = {[key: string]: Transition};

export interface Trader {
  trades: {
    accepts: string[],
    gives: string[],
    ratio?: number,
  }[],
}

export interface Event {
  entity: string,
  action: string,
  object?: string,
  extra?: string,
  qty: number,
}

export type EventField = keyof Event;

export interface EventRequest {
  select?: EventField[],
  where?: Partial<Event>,
  order?: EventField[],
}
