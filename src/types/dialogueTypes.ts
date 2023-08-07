import typia from "typia";

import * as types from '../behavior_pack/src/types/packTypes.js';
export * from '../behavior_pack/src/types/packTypes.js';

export interface ScriptFile {
  actors?: types.Actor[],
  scenes?: types.ScriptScene[],
  items?: types.ItemUse[],
  chats?: types.Chat[],
  actions?: types.TransitionMap,
}

export const assertDialogueFile = typia.createAssert<ScriptFile>();
export const parseDialogueFile = typia.createAssertParse<ScriptFile>();
