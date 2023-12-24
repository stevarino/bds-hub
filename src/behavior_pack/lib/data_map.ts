import {atob, btoa} from '../../lib/base64/index.js';

export const MAX_BYTE = 255;
export const MAX_U32 = 4_294_967_295;

export interface BasicMap {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
  bitLimit?: number;
}

class MapAdapter implements BasicMap {
  constructor(public map: Map<string, unknown>) {}

  get(key: string): string | undefined {
    return this.map.get(key) as string | undefined;
  }

  set(key: string, val: string) {
    return this.map.set(key, val);
  }
}

/**
 * six bits per char
 * assume 1024 char limit per tag
 * 12 char overhead (prefix: 3, sep: 2, key: 2-5, sep: 2)
 * 1012 chars or 6072 bits or 758 bytes or 188 32-bit values
 *
 * limit to 6016 bits (752 bytes, 188 32-bit values, 94 64-bit values)
 */
export const DataType = {
  flag: {token: 'b', size: 1} as DataTypeDef,
  bit: {token: 'B', size: 2} as DataTypeDef,
  byte: {token: 'y', size: 8} as DataTypeDef,
  u32: {token: 'u', size: 32} as DataTypeDef,
};
type DataTypeDef = {
  token: string;
  size: number;
};

/**
 * DataMap - Allows for binary data to be stored in tags
 *
 * key values:
 *  'P': Settings for player
 *  's[0-9]*': script defined variables
 *
 * type values:
 *  'b' - flag (single bit) - 1 bit
 *  'B' - bit (double bit) - 2 bits
 *  'y' - byte - 8 bits
 *  'i' - i32 (not implemented)
 *  'u' - u32 - 32 bits
 */
export class DataMap {
  constructor(public map: BasicMap) {}

  static from(map: Map<string, undefined>) {
    return new DataMap(new MapAdapter(map));
  }

  /**
   * Gets a sequence of bits from a base64-encoded tag
   *
   */
  _constructKey(key: string, bitOffset: number, type: DataTypeDef) {
    const page =
      this.map.bitLimit === undefined
        ? 0
        : Math.floor(bitOffset / this.map.bitLimit);
    return `${key}${page === 0 ? '' : page}${type.token}`;
  }

  /** Retrieves a series of bytes from the map (bitoffset is only used for page) */
  _getData(key: string, bitOffset: number, type: DataTypeDef) {
    const str = this.map.get(this._constructKey(key, bitOffset, type)) ?? '';
    return Uint8Array.from(atob(str) as string, c => c.charCodeAt(0));
  }

  /** Debugging method to display raw binary data from bytes */
  _dataToHex(data: Uint8Array, sep = ' ') {
    const buffer: string[] = [];
    const lookup = '0123456789ABCDEF';
    for (const num of data) {
      buffer.push(`${lookup[num >> 4]}${lookup[15 & num] as string}`);
    }
    return buffer.join(sep);
  }

  /** Retrieves a series of bytes from the map */
  _getBytes(key: string, index: number, type: DataTypeDef) {
    const bitOffset = index * type.size;
    const byteIndex = Math.floor(bitOffset / 8);
    const byteCnt = Math.ceil(type.size / 8);
    const data = this._getData(key, bitOffset, type);
    const bytes = new Uint8Array(byteCnt);
    for (let i = 0; i < byteCnt; i++) {
      bytes[i] = data[byteIndex + i] ?? 0;
    }
    return bytes;
  }

  /** Retrieves a byte from the map */
  _getByte(key: string, index: number, type: DataTypeDef) {
    const bytes = this._getBytes(key, index, type);
    return bytes[0] ?? 0;
  }

  /** Writes a series of bytes to the map */
  _setData(
    key: string,
    bytes: Uint8Array,
    bitOffset: number,
    type: DataTypeDef,
  ) {
    const str = btoa(
      String.fromCharCode.apply(null, bytes as unknown as number[]),
    ) as string;
    this.map.set(this._constructKey(key, bitOffset, type), str);
  }

  /** Sets a sequence of bits to a base64-encoded tag and writes to the map */
  _setBytes(key: string, arr: Uint8Array, offset: number, type: DataTypeDef) {
    const bitOffset = offset * type.size;
    const byteIndex = Math.floor(bitOffset / 8);

    const current =
      this.map.get(this._constructKey(key, bitOffset, type)) ?? '';
    let bytes = Uint8Array.from(atob(current) as string, c => c.charCodeAt(0));
    bytes = this._resizeUint8(bytes, byteIndex + arr.length);
    for (let i = 0; i < arr.length; i++) {
      bytes[byteIndex + i] = arr[i] as number;
    }
    this._setData(key, bytes, bitOffset, type);
  }

  /** Set a byte to a given value and writes to the map */
  _setByte(key: string, value: number, index: number, type: DataTypeDef) {
    value = this._setBound(value, 0, MAX_BYTE);
    this._setBytes(key, new Uint8Array([value]), index, type);
  }

  /** Return a singular b it from a byte */
  _getBit(byte: number, n: number) {
    return (byte & (1 << n % 8)) !== 0;
  }

  /** Given a byte, sets a singular bit to true or false */
  _setBit(num: number, index: number, value: boolean) {
    // set the is-set bit
    if (value) {
      return num | (1 << index % 8);
    }
    return num & (255 - (1 << index % 8));
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

  /** Given a value, clamps the value between a min and max */
  _setBound(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  /** Return a DataNamespace, given a key */
  getNamespace(key: string) {
    return new DataNamespace(this, key);
  }

  /**
   * Gets a bit from a tag.
   *
   * WARNING: will default to false on unset values.s
   */
  getFlag(index: number, key = 'P') {
    const num = this._getByte(key, index, DataType.flag);
    return this._getBit(num, index);
  }

  /** Set a bit in a tag */
  setFlag(index: number, value: boolean, key = 'P') {
    let num = this._getByte(key, index, DataType.flag);
    num = this._setBit(num, index, value);
    this._setByte(key, num, index, DataType.flag);
  }

  /**
   * Read a bit with a default value.
   *
   * Reads bits two at a time, if the first bit is 0, returns default value,
   * otherwise returns the second bit.
   */
  getBit(index: number, defaultValue?: boolean, key = 'P') {
    const num = this._getByte(key, index, DataType.bit);
    if (this._getBit(num, index * 2)) {
      return this._getBit(num, index * 2 + 1);
    }
    return defaultValue;
  }

  /** Writes a bit and marks it as explicitly set. */
  setBit(index: number, value: boolean, key = 'P') {
    let num = this._getByte(key, index, DataType.bit);
    num = this._setBit(num, index * 2, true);
    num = this._setBit(num, index * 2 + 1, value);
    this._setByte(key, num, index, DataType.bit);
  }

  /** Efficiently set multiple bits across pages */
  setBits(bits: [number, boolean][], key = 'P') {
    if (bits.length === 0) return;
    const bitsperPage = (this.map.bitLimit ?? 0) / DataType.bit.size;

    const pages = new Map<number, [number, boolean][]>();
    for (const [index, value] of bits) {
      const page = Math.floor(index / bitsperPage);
      let pageSet = pages.get(page);
      if (pageSet === undefined) {
        pageSet = [];
        pages.set(page, pageSet);
      }
      pageSet.push([index, value]);
    }
    for (const [page, vals] of pages.entries()) {
      const pageOffset = page * bitsperPage;
      const bytes = this._getData(key, pageOffset, DataType.bit);
      for (const [index, val] of vals) {
        const pageIndex = bitsperPage === 0 ? 0 : index % bitsperPage;
        this._resizeUint8(bytes, (pageIndex * 2) / 8);
        let num = bytes[pageIndex] ?? 0;
        num = this._setBit(num, pageIndex * 2, true);
        num = this._setBit(num, pageIndex * 2 + 1, val);
      }
      this._setData(key, bytes, pageOffset, DataType.bit);
    }
  }

  /** Return a singular byte (0-255) */
  getByte(index: number, key = 'P') {
    return this._getByte(key, index, DataType.byte);
  }

  /** Set a singular byte */
  setByte(index: number, value: number, key = 'P') {
    this._setByte(key, value, index, DataType.byte);
  }

  /** Lookup an unsigned 32-bit integer */
  getU32(index: number, key = 'P') {
    const bytes = this._getBytes(key, index, DataType.u32);
    return Number(
      (BigInt(bytes[0] ?? 0) << BigInt(24)) |
        (BigInt(bytes[1] ?? 0) << BigInt(16)) |
        (BigInt(bytes[2] ?? 0) << BigInt(8)) |
        BigInt(bytes[3] ?? 0),
    );
  }

  /** Set an unsigned 32-bit integer */
  setU32(index: number, value: number, key = 'P') {
    value = this._setBound(value, 0, MAX_U32);
    const bytes = this._getBytes(key, index, DataType.u32);
    bytes[0] = 255 & (value >> 24);
    bytes[1] = 255 & (value >> 16);
    bytes[2] = 255 & (value >> 8);
    bytes[3] = 255 & value;
    this._setBytes(key, bytes, index, DataType.u32);
  }
}

/** ComplexDataMapNamespace - simpler interface with common key */
export class DataNamespace {
  constructor(
    public map: DataMap,
    public key: string,
  ) {}

  get(type: string, index: number) {
    switch (type) {
      case 'flag':
        return this.getFlag(index);
      case 'bit':
        return this.getBit(index);
      case 'byte':
        return this.getByte(index);
      case 'u32':
        return this.getU32(index);
      default:
        return;
    }
  }

  set(type: string, index: number, value: number | boolean) {
    switch (type) {
      case 'flag':
        return this.setFlag(index, Boolean(value));
      case 'bit':
        return this.setBit(index, Boolean(value));
      case 'byte':
        return this.setByte(index, Number(value));
      case 'u32':
        return this.setU32(index, Number(value));
    }
  }

  getFlag(index: number) {
    return this.map.getFlag(index, this.key);
  }
  setFlag(index: number, value: boolean) {
    return this.map.setFlag(index, value, this.key);
  }
  getBit(index: number, defaultValue?: boolean) {
    return this.map.getBit(index, defaultValue, this.key);
  }
  setBit(index: number, value: boolean) {
    return this.map.setBit(index, value, this.key);
  }
  getByte(index: number) {
    return this.map.getByte(index, this.key);
  }
  setByte(index: number, value: number) {
    return this.map.setByte(index, value, this.key);
  }
  getU32(index: number) {
    return this.map.getU32(index, this.key);
  }
  setU32(index: number, value: number) {
    return this.map.setU32(index, value, this.key);
  }
}
