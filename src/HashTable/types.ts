export type Table<K, V> = [K, V][][];

export interface IHashTable<K, V> {
    add: (key: K, value: V) => V;
    get: (key: K) => V | undefined;
}