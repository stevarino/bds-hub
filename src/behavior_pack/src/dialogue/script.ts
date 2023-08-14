/**
 * Script - a datastructure of all the interactions defined by the user.
 * 
 * Overwritten during the build process by scripts/hubPack.ts
 */

import { Chat, SuperActor, SuperItemUse, TransitionMap } from '../types/packTypes.js';

type Script = {
  transitions: TransitionMap,
  actions: TransitionMap,
  actors: SuperActor[],
  items: SuperItemUse[]
  chats: Chat[],
};

/** @overwrite */
export const script: Script = {
  transitions: {},
  actions: {},
  actors: [],
  items: [],
  chats: [],
};
