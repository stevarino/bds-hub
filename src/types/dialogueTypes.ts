import typia from "typia";

import * as types from '../behavior_pack/src/types/packTypes.js';
export * from '../behavior_pack/src/types/packTypes.js';

export interface Scene {
  id: string,
  text: string,
  npc_name?: string,
  /**
   * @minItems 1
   * @maxItems 6
   */
  buttons: types.Button[],
  // internal variable - marks if the scene is an initial scene
  _entrayPoint?: boolean,
}

export interface DialogueFile {
  actors?: types.Actor[],
  scenes?: Scene[],
  items?: types.ItemUse[],
  chats?: types.Chat[],
  actions?: types.TransitionMap,
}

export interface ScriptFile {
  actions: types.TransitionMap,
  actors: types.SuperActor[],
  items: types.SuperItemUse[]
  chats: types.Chat[],
}

export const assertDialogueFile = typia.createAssert<DialogueFile>();
export const parseDialogueFile = typia.createAssertParse<DialogueFile>();
