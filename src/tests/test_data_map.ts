import test from 'ava';
import * as dm from '../behavior_pack/lib/data_map.js';

class FakeTagMap {
  map = new Map<string, string>();
  // tagmap with 1024 char limit and default settings
  bitLimit = 6016;
  get(key: string) {
    return this.map.get(key);
  }

  set(key: string, value: string) {
    return this.map.set(key, value);
  }

  get size() {
    return this.map.size;
  }
}

test('SetFlag', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  data.setFlag(0, true, 't');
  t.deepEqual(map.size, 1);
  t.deepEqual(data.getFlag(0, 't'), true);
  t.deepEqual(data.getFlag(1, 't'), false);
});

test('SetFlagAcrossPages', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  data.setFlag(0, true);
  data.setFlag(5, true);
  data.setFlag(10, true);
  data.setFlag(10_000, true);
  t.deepEqual(map.size, 2);
  for (let i = 0; i < 12; i++) {
    t.deepEqual(data.getFlag(i), i % 5 === 0);
  }
  t.deepEqual(data.getFlag(10_000), true);
});

test('SetBit', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  data.setBit(3, true);
  data.setBit(5, false);

  t.deepEqual(data.getBit(0), undefined);
  t.deepEqual(data.getBit(3), true);
  t.deepEqual(data.getBit(5), false);
});

test('SetByte', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  data.setByte(0, 100);
  data.setByte(1, 200);

  t.deepEqual(map.size, 1);
  t.deepEqual(data.getByte(0), 100);
  t.deepEqual(data.getByte(1), 200);
  t.deepEqual(data.getByte(2), 0);
});

test('SetByteOverflow', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  data.setByte(0, -50);
  data.setByte(1, 300);

  t.deepEqual(data.getByte(0), 0);
  t.deepEqual(data.getByte(1), 255);
});

test('SetU32', t => {
  const map = new FakeTagMap();
  const data = new dm.DataMap(map);

  for (let i = 0; i < 35; i++) {
    data.setU32(i, 2 ** i);
  }

  for (let i = 0; i < 35; i++) {
    const value = data.getU32(i);
    t.deepEqual(value, Math.min(dm.MAX_U32, 2 ** i), `Index: ${i}`);
  }
});
