import * as fs from 'node:fs';
import typia from 'typia';
export * as MinecraftAssetFiles from './asset_files.js';

export type Version = [number, number, number];

function readAndParseJson<T>(parser: (input: string) => T) {
  return (path: string) => {
    return parser(JSON.parse(fs.readFileSync(path, 'utf-8')));
  };
}

export interface ConfigFile {
  /** Port for server and add on */
  port?: number;
  /** Used to override add on requested domain, otherwise `127.0.0.1:{port}` */
  host?: string;
  databaseFilename?: string;
  discord?: {
    token: string;
    app_id: string;
    /** Channel URL */
    channels: string[];
    nick?: string;
    /** discord username to xbox gamertag */
    users: {[discordUsername: string]: string};
  };
  // list of files to be included as dialogues (accepts json and yaml)
  script_files?: string[];
  // list of optiaonl addons to include.
  addons?: string[];
}
export const validateConfigFile = typia.createValidateEquals<ConfigFile>();

/** Contains useful information about build state */
export interface BuildFile {
  bp_version: Version;
  bp_hash: string;
  rp_version: Version;
  rp_hash: string;
}
const parseBuildFile = typia.createAssert<BuildFile>();
export const readBuildFile = readAndParseJson(parseBuildFile);

export interface ManifestFile {
  format_version: number;
  header: {
    name: string;
    description: string;
    uuid: string;
    version: Version;
    min_engine_version: Version;
  };
  modules: Array<{
    type: string;
    uuid: string;
    version: Version;
    language?: string;
    entry?: string;
    description?: string;
  }>;
  dependencies?: Array<{
    uuid?: string;
    module_name?: string;
    version: Version | string;
  }>;
}
const parseManifest = typia.createAssert<ManifestFile>();
export const readManifest = readAndParseJson(parseManifest);

export interface SceneFileScene {
  scene_tag: string;
  text: string | {rawtext: unknown[]};
  npc_name?: string;
  on_open_commands?: string[];
  on_close_commands?: string[];
  buttons: {
    name: string;
    commands: string[];
  }[];
}

export interface SceneFile {
  format_version: '1.17';
  'minecraft:npc_dialogue': {
    scenes: SceneFileScene[];
  };
}
