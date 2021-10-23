import { HashFn, HashTableParams, IHashTable, Table } from "./types";

export class HashTable<K, V> implements IHashTable<K, V> {
    private _size: number;
    private _cellCount: number;
    private _table: Table<K, V>;
    private _desiredLoadFactor: [number, number];
    private _createHashFn: (size: number) => HashFn<K>;
    private _increaseSize: (size: number) => number;
    private _decreaseSize: (size: number) => number;
    private _hash: HashFn<K>;

    constructor(
        size: number,
        {
            desiredLoadFactor = [0.8, 0.5],
            hashFnCreator,
            sizeIncreaser = size => size * 2,
            sizeDecreaser = size => Math.floor(size / 2),
        }: HashTableParams<K> = { hashFnCreator: () => () => 0 },
    ) {
        if (!size) {
            throw new Error('Size should be greater than 0');
        }

        this._desiredLoadFactor = desiredLoadFactor;
        this._createHashFn = hashFnCreator;
        this._increaseSize = sizeIncreaser;
        this._decreaseSize = sizeDecreaser;
        this._size = size;
        this._cellCount = 0;
        this._table = [];
        this._createTable(size);
        this._hash = this._createHashFn(this._size);
    };

    private _createTable(size: number) {
        this._size = (size > this._size) ?
            this._increaseSize(this._size) :
            (size < this._size) ?
                this._decreaseSize(this._size) :
                size;
        this._table = new Array(size);
        for (let i = 0; i < this._table.length; i++) {
            this._table[i] = [];
        }
    }

    private _rebuild(size: number): void {
        this._cellCount = 0;
        const currentTable = this._table;
        this._createTable(size);
        this._hash = this._createHashFn(this._size);

        for (let i = 0; i < currentTable.length; i++) {
            for (let j = 0; j < currentTable[i].length; j++) {
                const [key, value] = currentTable[i][j];
                this.add(key, value);
            }
        }
    }

    private _loadFactor(): number {
        return (this._cellCount && this._size) ? this._cellCount / this._size : 0;
    }

    private _shouldRebuild(): boolean {
        return this._loadFactor() >= this._desiredLoadFactor[0] ? true : false;
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