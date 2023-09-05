/**
 * Script - a datastructure of all the interactions defined by the user.
 * 
 * Overwritten during the build process by scripts/hubPack.ts
 */

import { Chat, FinalActor, SuperItemUse, TransitionMap } from './types/packTypes.js';

type Script = {
  transitions: TransitionMap,
  actions: TransitionMap,
  actors: Record<string, FinalActor>,
  items: SuperItemUse[],
  chats: Chat[],
};

/** @overwrite */
export const script: Script = {
  transitions: {},
  actions: {},
  actors: {},
  items: [],
  chats: [],
};

/** @overwrite */
export const host: string|undefined = undefined;

/** @overwrite */
export const version: string = '0.0.0';
