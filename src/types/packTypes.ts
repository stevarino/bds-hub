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
