import typia from "typia";

import { Button, Actor, ItemUse, MenuDetails } from './packTypes.js';
export * from './packTypes.js';

export interface Scene {
  id: string,
  text: string,
  /**
   * @minItems 1
   * @maxItems 6
   */
  buttons: Button[],
  // internal variable - marks if the scene is an initial scene
  _entrayPoint?: boolean,
}

export interface DialogueFile {
  actors?: Actor[],
  scenes?: Scene[],
  items?: ItemUse[],
  menus?: {[ref: string]: MenuDetails}
}

export const assertDialogueFile = typia.createAssert<DialogueFile>();
export const parseDialogueFile = typia.createAssertParse<DialogueFile>();
