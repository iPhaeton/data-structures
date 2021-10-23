export type Table<K, V> = [K, V][][];

export type HashFn<K> = (key: K) => number;

export interface IHashTable<K, V> {
    add: (key: K, value: V) => V;
    get: (key: K) => V | undefined;
}