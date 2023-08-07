export const TAG_PREFIX = 'BDSH_';
export const SEP = '___';

export function ID(namespace: string, ...extra: string[]) {
  return ['BDSH', namespace, ...extra].join(SEP);
}

export const TAG_PENDING = ID('PENDING');
export const TAG_INIT = ID('INIT');

export const DELAY = 10;

export enum DIMENSION {
  OVERWORLD = "minecraft:overworld",
  THE_END = "minecraft:the_end",
  NETHER = "minecraft:nether",
}

export const TELEBOT_TAG = 'DBSH_TeleBot';
export const ID_TAG = 'DBSH_ID';
export const OWNER_TAG = 'DBSH_OWNER';
