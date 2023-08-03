import typia from "typia";

import { Button, Actor } from './packTypes.js';
export * from './packTypes.js';

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
