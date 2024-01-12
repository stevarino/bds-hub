/**
 * Basic functions, constants, and data structures.
 */
import * as events from './events.js';

export * from './functions.js';
export * as forms from './form.js';
export * as common from '../types/common.js'
export * as constants from './constants.js';
export {DefaultMap} from './default_map.js';
export {UniqueMap} from './unique_map.js';
export {TagMap, DummyTagMap} from './tag_map.js';

export const Emitter = new events.EventEmitter();
export const StartupEvent = new events.EventHandler<null>(Emitter, 'startup');

