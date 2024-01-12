import { BasicMap } from "./data_map";

export const MAX_BYTE = 255;
export const MAX_U32 = 4_294_967_295;

interface EntityInterface {
  getTags: () => string[];
  addTag: (tag: string) => boolean;
  removeTag: (tag: string) => boolean;
}

export class TagMap implements BasicMap {
  map = new Map<string, {val: string; tag: string}>();
  size = 0;
  bitLimit: number;
  constructor(
    public entity: EntityInterface | null,
    public prefix = 'hub',
    public sep = '__',
  ) {
    for (const {key, val, tag} of this.parseTags()) {
      this.map.set(key, {val, tag});
    }
    this.size = this.map.size;
    // Assumptions:
    //  max char length for tag is 1024
    //  assume 5 chars for the tag key
    //  6 bits per char due to base64 encoding
    const maxLimit = (1024 - prefix.length - 2 * sep.length - 5) * 6;
    this.bitLimit = Math.floor(maxLimit / 64) * 64;
  }

  parseTags() {
    const tags: {key: string; val: string; tag: string}[] = [];
    if (this.entity === null) return tags;

    const start = this.prefix + this.sep;
    for (const tag of this.entity.getTags()) {
      if (!tag.startsWith(start)) continue;
      const part = tag.slice(start.length);
      const index = part.indexOf(this.sep);
      if (index === -1) {
        console.error('Invalid tag: ', tag);
        continue;
      }
      const key = part.slice(0, index);
      const val = part.slice(index + this.sep.length);
      tags.push({tag, key, val});
    }
    return tags;
  }

  buildTag(key: string, val: string) {
    return `${this.prefix}${this.sep}${key}${this.sep}${val}`;
  }

  set(key: string, val: string) {
    if (key.includes(this.sep)) throw Error('key includes seperator');
    if (this.entity === null) throw Error('Setting key on null entity');
    const tag = this.buildTag(key, val);
    this.entity.addTag(tag);
    this.map.set(key, {val, tag});
    this.size = this.map.size;
    return this;
  }

  get(key: string) {
    if (this.entity === null) throw Error('Getting key on null entity');
    return this.map.get(key)?.val;
  }

  getTag(key: string) {
    if (this.entity === null) throw Error('Getting key on null entity');
    return this.map.get(key)?.tag;
  }
}

export const DummyTagMap = new TagMap(null);

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
interface WorldInterface {
  setDynamicProperty(
    identifier: string,
    value: string | number | boolean | Vector3 | undefined,
  ): void;
  getDynamicProperty(
    identifier: string,
  ): string | number | boolean | Vector3 | undefined;
}

export class GlobalMap implements BasicMap {
  map = new Map<string, {val: string; tag: string}>();
  size = 0;
  constructor(
    public world: WorldInterface,
    public prefix = 'hub',
    public sep = '__',
  ) {
    this.size = this.map.size;
  }

  set(key: string, val: string) {
    if (key.includes(this.sep)) throw Error('key includes seperator');
    this.world.setDynamicProperty(key, val);
    this.size = this.map.size;
    return this;
  }

  get(key: string) {
    return this.world.getDynamicProperty(key) as string | undefined;
  }
}
