import { IHashTable, Table } from "./types";

export class HashTable<K, V> implements IHashTable<K, V> {
    private readonly _table: Table<K, V>;

    constructor(
        private readonly _size: number,
        private readonly _hashFn: (key: K) => number,
        private readonly _desiredFillRate: number[] = [0.8, 0.5],
    ) {
        this._table = new Array(_size);
        for (let i = 0; i < this._table.length; i++) {
            this._table[i] = [];
        }
    };

    private _hash(key: K): number {
        return this._hashFn(key) % this._size;
    }

    add(key: K, value: V): V {
        const hashValue = this._hash(key);
        this._table[hashValue].push([key, value]);
        return value;
    }

    get(key: K): V | undefined {
        const hashValue = this._hash(key);
        const entry = this._table[hashValue].length === 1 ?
            this._table[hashValue][0] :
            this._table[hashValue].find(([k]) => k === key) || [];
        return entry[1];
    }

    // should be run in jest environment
    _checkRI(expectedTable: Table<K, V>): void {
        return expect(this._table).toEqual(expectedTable);
    };
}