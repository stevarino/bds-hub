/**
 * Pure types (no node_module dependencies) for use in behavior pack code
 */
export enum Actions {
    breakBlock = 0,
    placeBlock = 1,
    killed = 2,
    hurt = 3,
    pressurePlatePush = 4,
    targetBlockHit = 5,
    online = 6,
    use = 7
}
;
export interface Menu {
    menu: {
        body?: string;
        buttons: Button[];
    };
}
export enum Constants {
    weatherClear = 0,
    weatherRain = 1,
    weatherLightning = 2
}
;
export interface Update {
    time: number;
    weather: number;
    entities: {
        [name: string]: EntityUpdate;
    };
    messages: string[];
}
;
export type PositionTuple = [
    dimension: string,
    x: number,
    y: number,
    z: number
];
export interface EntityUpdate {
    pos?: PositionTuple;
    events: EntityEvent[];
}
;
export interface EntityEvent {
    action: Actions;
    qty?: number;
    object?: string;
    extra?: string;
}
;
export interface UpdateResponse {
    messages: string[];
}
;
export interface ServerStatus {
    time?: number;
    weather?: string;
    online?: string[];
}
;
interface TagSelector {
    tag: string;
}
interface NameSelector {
    name: string;
}
interface SelectorSelector {
    selector: string;
}
;
interface BaseActor {
    scene: string;
}
;
export type Actor = BaseActor & (TagSelector | SelectorSelector | NameSelector);
export type SuperActor = BaseActor & Partial<TagSelector & SelectorSelector & NameSelector>;
export type Button = BaseButton & (Action | Command | Scene | Menu);
interface BaseButton {
    text: string;
}
;
interface Action {
    action: string;
    args?: Args;
}
;
export interface Args {
    [key: string]: unknown;
}
;
interface Command {
    command: string;
}
;
interface Scene {
    scene: string;
}
;
export type SuperButton = Button & Partial<Action & Command & Scene & Menu>;
;
export type Transition = Partial<SuperButton>;
export type TransitionMap = {
    [key: string]: Transition;
};
export interface Trader {
    trades: {
        accepts: string[];
        gives: string[];
        ratio?: number;
    }[];
}
export interface Event {
    entity: string;
    action: string;
    object?: string;
    extra?: string;
    qty: number;
}
export type EventField = keyof Event;
export interface EventRequest {
    select?: EventField[];
    where?: Partial<Event>;
    order?: EventField[];
}
interface BaseItemUse {
    requireOp?: boolean;
}
;
export type ItemUse = BaseItemUse & (TagSelector | NameSelector) & (Command | Action | Menu);
export type SuperItemUse = Partial<BaseItemUse & TagSelector & NameSelector & Command & Action & Menu>;
