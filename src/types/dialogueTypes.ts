import typia from "typia";

import { Button } from '../behavior_pack/bpTypes.js';
export * from '../behavior_pack/bpTypes.js';

export type Actor = BaseActor & ( TagActor | SelectorActor );
interface BaseActor { scene: string };
interface TagActor { tag: string };
interface SelectorActor { selector: string };

export interface Scene {
  id: string,
  text: string,
  buttons?: Button[],
  // internal variable - marks if the scene is an initial scene
  _entrayPoint?: boolean,
}

export interface DialogueFile {
  actors?: Actor[],
  scenes?: Scene[]
}

export const assertDialogueFile = typia.createAssert<DialogueFile>();
export const parseDialogueFile = typia.createAssertParse<DialogueFile>();
