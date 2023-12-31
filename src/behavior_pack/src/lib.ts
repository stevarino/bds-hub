/**
 * Basic functions, constants, and data structures.
 */
import { EventEmitter } from "./lib/events.js";

export * from './lib/state.js';
export * from './lib/network.js';
export * from './lib/functions.js';
export * from './lib/runtimeState.js';
export * as forms from './lib/form.js';

export const Emitter = new EventEmitter();
export const StartupEvent = Emitter.getHandler<null>('startup');

export { TagMap, DummyTagMap } from './lib/tag_map.js';
