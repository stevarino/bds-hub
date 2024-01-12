import {join} from 'path';
import {root} from './scripts/lib.js';
import {cwd} from 'process';

export * from './behavior_pack/lib/constants.js';

export const BP_NAME = 'bds_hub_bp';

export const BUILD = join(cwd(), 'build');
export const BUILD_INFO = join(BUILD, 'buildinfo.json');
export const ADDON_SCRIPTS = join(root, '/dist/behavior_pack');

export const BP_OUTPUT = join(BUILD, 'output', BP_NAME);
export const BP_MAN = join(BP_OUTPUT, 'manifest.json');
export const BP_FILE = join(BUILD, 'output', BP_NAME + '.mcaddon');
export const BP_ROLLUP = join(BP_OUTPUT, '/scripts/script.rollup.js');
export const BP_SCENES = join(BP_OUTPUT, '/dialogue/scene.json');

export const ADDON_TEMP = join(BUILD, 'temp');
export const ADDON_TEMP_BP = join(ADDON_TEMP, 'bp');
export const ADDON_TEMP_LIB = join(ADDON_TEMP, 'lib');
export const ADDON_ENTRY = join(ADDON_TEMP_BP, '/index.js');
export const ADDON_SCRIPT = join(ADDON_TEMP_BP, '/script.js');

export const RP_NAME = 'bds_hub_rp';
export const RP_OUTPUT = join(BUILD, 'output', RP_NAME);
export const RP_MAN = join(RP_OUTPUT, 'manifest.json');
export const RP_FILE = join(BUILD, 'output', RP_NAME + '.mcaddon');
