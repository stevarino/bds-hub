import { atob, btoa } from "./base64/index.js"

interface EntityInterface {
  getTags: () => string[],
  addTag: (tag: string) => boolean,
  removeTag: (tag: string) => boolean,
}

export class TagMap implements Map<string, string> {
  map = new Map<string, {val: string, tag: string}>();
  size = 0;
  constructor(
    public entity: EntityInterface|null,
    public prefix = 'hub',
    public sep = '__',
  ) {
    for (const {key, val, tag} of this.parseTags()) {
      this.map.set(key, {val, tag});
    }
    this.size = this.map.size;
  }

  parseTags() {
    const tags: {key: string, val: string, tag: string}[] = [];
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

  has(key: string) {
    if (this.entity === null) throw Error('Checking key on null entity');
    return this.map.has(key);
  }

  clear(): void {
    for (const {tag} of this.map.values()) {
      this.entity?.removeTag(tag);
    }
    this.map.clear();
    this.size = 0;
  }

  delete(key: string): boolean {
    const tag = this.map.get(key)?.tag;
    if (tag === undefined) return false;
    this.entity?.removeTag(tag);
    const rv = this.map.delete(key);
    this.size = this.map.size;
    return rv;
  }

  copy() {
    const map = new Map<string, string>()
    for (const [key, {val}] of this.map.entries()) {
      map.set(key, val);
    }
    Object.freeze(map);
    return map;
  }

  forEach(callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
    this.copy().forEach(callbackfn);
  }
  
  entries(): IterableIterator<[string, string]> {
    return this.copy().entries();
  }
  
  keys(): IterableIterator<string> {
    return this.map.keys();
  }
  
  values(): IterableIterator<string> {
    return this.copy().values();
  }
  
  [Symbol.iterator](): IterableIterator<[string, string]> {
    throw new Error("Method not implemented.");
  }
  
  [Symbol.toStringTag]: string;
}

export const DummyTagMap = new TagMap(null);

/** Allows for binary data to be stored in tags */
export class ComplexTagMap extends TagMap {

  /** Gets a sequence of bits from a base64-encoded tag */
  _getBits(key: string, type='b') {
    const str = this.get(`${key}:${type}`) ?? '';
    return Uint8Array.from(atob(str) as string, c => c.charCodeAt(0));
  }

  /** Sets a sequence of bits to a base64-encoded tag */
  _setBits(key: string, arr: Uint8Array, type='b') {
    const str = btoa(String.fromCharCode.apply(null, arr as unknown as number[])) as string
    this.set(
      `${key}:${type}`, str
    );
  }

  /** Reads a singular bit from a Uint8Array (defaults to false) */
  _uint8ToBit(arr: Uint8Array|undefined, n: number) {
    const item = Math.floor(n / 8);
    return (((arr ?? [])[item] ?? 0) & (1 << (n % 8))) !== 0;
  }

  /** If arr is shorter than len, returns a copy of arr of length len */
  _resizeUint8(arr: Uint8Array, len: number) {
    if (len >= arr.length) {
      const other = new Uint8Array(len + 1);
      other.set(arr);
      return other;
    }
    return arr;
  }

  /**
   * Gets a bit from a tag.
   * 
   * WARNING: will default to false on unset values.s
   */
  getBit(index: number, key='P') {
    const arr = this._getBits(key);
    return this._uint8ToBit(arr, index);
  }

  /**
   * Set a bit in a tag.
   */
  setBit(index: number, value: boolean, key='P') {
    let arr = this._getBits(key);
    const item = Math.floor(index / 8);
    const current = this._uint8ToBit(arr, index);
    if (current === value) return;
    arr = this._resizeUint8(arr, item);
    arr[item] = arr[item]! ^ (1 << index % 8);
    this._setBits(key, arr);
  }

  /**
   * Read a bit with a default value.
   * 
   * Reads bits two at a time, if the first bit is 0, returns default value,
   * otherwise returns the second bit.
   */
  getDefaultBit(index: number, defaultValue?: boolean, key='P') {
    index = index * 2;
    const arr = this._getBits(key, 'd');
    if (this._uint8ToBit(arr, index)) {
      return this._uint8ToBit(arr, index + 1);
    }
    return defaultValue;
  }

  _setDefaultBit(arr: Uint8Array, index: number, value: boolean) {
    const item = Math.floor(index / 8);
    arr[item] = arr[item]! & (1 << index % 8);
    if (this._uint8ToBit(arr, index + 1) !== value) {
      arr[item] = arr[item]! ^ (1 << (index + 1) % 8);
    }
  }

  /** Writes a bit and marks it as explicitly set. */
  setDefaultBit(index: number, value: boolean, key='P') {
    index = index * 2;
    let arr = this._getBits(key, 'd');
    arr = this._resizeUint8(arr, Math.floor(index / 8));
    this._setDefaultBit(arr, index, value);
    this._setBits(key, arr, 'd');
  }

  setManyDefaultBit(bits: [number, boolean][], key='P') {
    if (bits.length === 0) return;
    let max = bits[0]![0];
    for (let i=1; i<bits.length; i++) {
      if (bits[i]![0] > max) max = bits[i]![0];
    }
    let arr = this._getBits(key, 'd');
    arr = this._resizeUint8(arr, Math.floor(max * 2 / 8));
    for (const [k, v] of bits) {
      this._setDefaultBit(arr, k * 2, v);
    }
    this._setBits(key, arr, 'd');
  }
}