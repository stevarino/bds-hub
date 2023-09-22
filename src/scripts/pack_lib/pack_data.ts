import { UniqueMap } from '../../types/unique_map.js';
import { DefaultMap } from '../../types/default_map.js';
import { Dialogue } from '../../types.js';

export class PackData {
  scenes = new UniqueMap<string, Dialogue.SavedScene>();
  actors = new UniqueMap<string, Dialogue.NormalizedActor>();
  items: Dialogue.ItemUse[] = [];
  chats: Dialogue.Chat[] = [];
  actions = new UniqueMap<string, Dialogue.Transition>();
  variables = new UniqueMap<string, [scope: string, type: string, index: number]>();
  variableTypes = new DefaultMap((scopeAndType: string) => new UniqueMap<number, string>());
  npcSkins = new Map<string, string[]>();
}
