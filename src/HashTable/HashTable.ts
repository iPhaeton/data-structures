import { IHashTable, Table } from "./types";

export class HashTable<K, V> implements IHashTable<K, V> {
    private _size: number;
    private _cellCount: number;
    private _table: Table<K, V>;

    constructor(
        size: number,
        private readonly _hashFn: (key: K) => number,
        private readonly _desiredFillRate: number[] = [0.8, 0.5],
    ) {
        this._size = 0;
        this._cellCount = 0;
        this._table = [];
        this._createTable(size);
    };

    private _createTable(size: number) {
        this._size = size;
        this._table = new Array(size);
        for (let i = 0; i < this._table.length; i++) {
            this._table[i] = [];
        }
    }

    private _hash(key: K): number {
        return this._hashFn(key) % this._size;
    }

    private _rebuild(size: number): void {
        this._cellCount = 0;
        const currentTable = this._table;
        this._createTable(size);

        for (let i = 0; i < currentTable.length; i++) {
            for (let j = 0; j < currentTable[i].length; j++) {
                const [key, value] = currentTable[i][j];
                this.add(key, value);
            }
        }
    }

    private _fillRate(): number {
        return (this._cellCount && this._size) ? this._cellCount / this._size : 0;
    }

    private _shouldRebuild(): boolean {
        return this._fillRate() >= this._desiredFillRate[0] ? true : false;
    }

    add(key: K, value: V): V {
        this._cellCount++;
        if (this._shouldRebuild()) {
            this._rebuild(this._size * 2);
        }

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