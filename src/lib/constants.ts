export const TAG_PREFIX = 'BDSH_';
export const SEP = '__';

export function ID(namespace: string, ...extra: string[]) {
  return ['hub', namespace, ...extra].join(SEP);
}

export const TAG_PENDING = ID('PENDING');
export const TAG_INIT = ID('INIT');

export enum DIMENSION {
  OVERWORLD = 'minecraft:overworld',
  THE_END = 'minecraft:the_end',
  NETHER = 'minecraft:nether',
}

export const BOT_ID_PREFIX = ID('BOT', 'ID', '');
export const BOT_TYPE_PREFIX = ID('BOT', 'TYPE', '');
