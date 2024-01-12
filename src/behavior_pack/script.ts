/**
 * Script - a datastructure of all the interactions defined by the user.
 *
 * Overwritten during the build process by scripts/hubPack.ts
 */

import {
  Chat,
  NormalizedActor,
  SuperItemUse,
  TransitionMap,
} from './types/packTypes.js';

export type Script = {
  transitions: TransitionMap;
  actions: TransitionMap;
  actors: Record<string, NormalizedActor>;
  items: SuperItemUse[];
  chats: Chat[];
  variables: Record<string, [scope: string, type: string, index: number]>;
};

/** @overwrite */
export const script: Script = {
  transitions: {},
  actions: {},
  actors: {},
  items: [],
  chats: [],
  variables: {},
};

/** @overwrite */
export const npcSkins: Record<string, string[]> = {};

/** @overwrite */
export const host: string | undefined = undefined;

/** @overwrite */
export const version = '0.0.0';
