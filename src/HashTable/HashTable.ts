import { IHashTable, Table } from "./types";

export class HashTable<K, V> implements IHashTable<K, V> {
    private readonly _table: Table<K, V>;

    constructor(
        private readonly _size: number,
        private readonly _hashFn: (key: K) => number,
        private readonly _desiredFillRate: number[] = [0.8, 0.5],
    ) {
        this._table = new Array(_size);
        this._table.fill([]);
    };

    private _hash(key: K): number {
        return this._hashFn(key) % this._size;
    }

    add(key: K, value: V): V {
        return value;
    }

    get(key: K): V | undefined {
        return;
    }

    // should be run in jest environment
    _checkRI(expectedTable: Table<K, V>): void {
        return expect(this._table).toEqual(expectedTable);
    };
}