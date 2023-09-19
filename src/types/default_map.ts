
/** Creates a default value on get calls if unset */
export class DefaultMap<K,V> extends Map<K,V> {
  constructor(public defaultValueCallback: (key: K) => V) {
    super();
  }
  get(key: K): V {
    let value = super.get(key);
    if (value === undefined) {
      value = this.defaultValueCallback(key);
      this.set(key, value);
    }
    return value;
  }
}
