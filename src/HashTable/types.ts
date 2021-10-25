export type Table<K, V> = [K, V][][];

export type HashFn<K> = (key: K) => number;

export interface HashTableParams<K> {
    desiredLoadFactor?: [number, number];
    hashFnCreator: (size: number) => HashFn<K>;
    sizeIncreaser?: (size: number) => number;
    sizeDecreaser?: (size: number) => number;
}

export interface IHashTable<K, V> {
    add: (key: K, value: V) => V;
    get: (key: K) => V | undefined;
    delete: (key: K) => V | undefined;
}