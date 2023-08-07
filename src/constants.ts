import { join } from "path";
import { root } from "./scripts/lib.js";
import { cwd } from "process";

export * from './behavior_pack/src/lib/constants.js';

export const ADDON_NAME = 'bds_hub_bp';

export const ADDON_SCRIPTS = join(root, '/dist/behavior_pack/src');

export const ADDON_OUTPUT = join(cwd(), '/build/', ADDON_NAME);
export const ADDON_ROLLUP = join(ADDON_OUTPUT, '/scripts/script.rollup.js')
export const ADDON_SCENES = join(ADDON_OUTPUT, '/dialogue/scene.json');

export const ADDON_TEMP = join(cwd(), '/build/temp');
export const ADDON_ENTRY = join(ADDON_TEMP, '/index.js');
export const ADDON_SCRIPT = join(ADDON_TEMP, '/dialogue/script.js');
