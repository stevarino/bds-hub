import { join } from "path";
import { root } from "./lib.js";

export * from './behavior_pack/constants.js';

export const ADDON_NAME = 'bds_hub_bp';
export const ADDON_OUTPUT = join(root, 'dist', ADDON_NAME);
export const ADDON_SCRIPT = join(root, 'dist/behavior_pack/script.js');
export const ADDON_ROLLUP = join(ADDON_OUTPUT, 'scripts/script.rollup.js')
export const ADDON_SCENES = join(ADDON_OUTPUT, 'dialogue/scene.json');
export const ADDON_TRANSITIONS = join(root, 'dist/behavior_pack/transitions.js');
