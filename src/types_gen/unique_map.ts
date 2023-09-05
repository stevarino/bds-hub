/** Throws error on setting a key already set */
export class UniqueMap<K, V> extends Map<K, V> {
    set(key: K, value: V): this {
        if (this.has(key))
            throw new Error('Duplicate key specified: ' + JSON.stringify(key));
        return super.set(key, value);
    }
}
