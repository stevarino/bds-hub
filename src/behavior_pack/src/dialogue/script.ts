/**
 * Script - a datastructure of all the interactions defined by the user.
 * 
 * Overwritten during the build process by scripts/hubPack.ts
 */

import { Chat, SuperActor, SuperItemUse, TransitionMap } from '../types/packTypes.js';

type Script = {
  actions: TransitionMap,
  actors: SuperActor[],
  items: SuperItemUse[]
  chats: Chat[],
}

export const script: Script = {
  actions: {},
  actors: [],
  items: [],
  chats: [],
}
