import typia, {tags} from 'typia';

import * as types from '../behavior_pack/types/packTypes.js';
export * from '../behavior_pack/types/packTypes.js';

export interface IndexedFields {
  [index: string & tags.Pattern<'^[0-9]+$'>]: string;
}

export interface Variables {
  flags?: IndexedFields;
  bools?: IndexedFields;
  bytes?: IndexedFields;
  u32?: IndexedFields;
}

export interface ScriptFile {
  actors?: types.Actor[];
  scenes?: types.SavedScene[];
  items?: types.ItemUse[];
  chats?: types.Chat[];
  actions?: types.TransitionMap;
  variables?: {
    player?: Variables;
    npc?: Variables;
    global?: Variables;
  };
}

export const ActionArgs: {
  [key: string]: (input: unknown) => typia.IValidation;
} = {
  Give: typia.createValidateEquals<types.GiveArgs>(),
  Trader: typia.createValidateEquals<types.TraderArgs>(),
};

export const validateScript = typia.createValidateEquals<ScriptFile>();
