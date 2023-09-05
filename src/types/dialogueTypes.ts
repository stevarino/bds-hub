import typia from "typia";

import * as types from '../behavior_pack/src/types/packTypes.js';
export * from '../behavior_pack/src/types/packTypes.js';

export interface ScriptFile {
  actors?: types.Actor[],
  scenes?: types.SavedScene[],
  items?: types.ItemUse[],
  chats?: types.Chat[],
  actions?: types.TransitionMap,
}

export const ActionArgs: {[key: string]: (input: unknown) => typia.IValidation} = {
  Give: typia.createValidateEquals<types.GiveArgs>(),
  Trader: typia.createValidateEquals<types.TraderArgs>(),
}

export const validateScript = typia.createValidateEquals<ScriptFile>();
