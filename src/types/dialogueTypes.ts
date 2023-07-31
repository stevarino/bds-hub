import typia from "typia";

export interface DialogueFile {
  actors?: Actor[],
  scenes?: Scene[]
}

export type Actor = BaseActor & ( TagActor | SelectorActor );
interface BaseActor { scene: string };
interface TagActor { tag: string };
interface SelectorActor { selector: string };
type SuperActor = (
  Actor & Partial<TagActor> & Partial<SelectorActor>);

export interface Scene {
  id: string,
  text: string,
  buttons?: Button[]
}

type Button = BaseButton & ( ActionButton | CommandButton | SceneButton );
interface BaseButton { text: string };
interface ActionButton { action: string };
interface CommandButton { command: string };
interface SceneButton { scene: string };
export type SuperButton = Button & Partial< ActionButton & CommandButton & SceneButton >;;

export type Transition = Partial<SuperButton>;
export type TransitionMap = {[key: string]: Transition};

export const assertDialogueFile = typia.createAssert<DialogueFile>();
export const parseDialogueFile = typia.createAssertParse<DialogueFile>();
