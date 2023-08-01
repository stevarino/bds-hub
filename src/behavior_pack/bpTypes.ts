

export type Button = BaseButton & ( ActionButton | CommandButton | SceneButton );
export interface Args {[key: string]: unknown};
interface BaseButton { text: string };
interface ActionButton {
  action: string,
  args?: Args,
};
interface CommandButton { command: string };
interface SceneButton { scene: string };
export type SuperButton = Button & Partial< ActionButton & CommandButton & SceneButton >;;

export type Transition = Partial<SuperButton>;
export type TransitionMap = {[key: string]: Transition};

export interface Trader {
  trades: [
    itemsIn: string[],
    ItemsOut: string[],
    ratio?: number,
  ]
}
