import { DoublyLinkedList } from "src/LinkedList/DoublyLinkedList";
import { ILinkedList } from "src/LinkedList/types";
import { HashFn, HashTableParams, IHashTable, Table } from "./types";

export class HashTable<K, V> implements IHashTable<K, V> {
    private _size: number;
    private readonly _originalSize: number;
    private _cellCount: number;
    private _table: ILinkedList<[K, V]>[];
    private _desiredLoadFactor: [number, number];
    private _createHashFn: (size: number) => HashFn<K>;
    private _increaseSize: (size: number) => number;
    private _decreaseSize: (size: number) => number;
    private _hash: HashFn<K>;
    private readonly _createList: () => ILinkedList<[K, V]>;

    constructor(
        size: number,
        {
            desiredLoadFactor = [0.8, 0.5],
            hashFnCreator,
            sizeIncreaser = (size: number) => size * 2,
            sizeDecreaser = (size: number) => Math.floor(size / 2),
            createList = () => new DoublyLinkedList<[K, V]>(),
        }: HashTableParams<K, V>,
    ) {
        if (!size) {
            throw new Error('Size should be greater than 0');
        }

        this._createList = createList;
        this._desiredLoadFactor = desiredLoadFactor;
        this._createHashFn = hashFnCreator;
        this._increaseSize = sizeIncreaser;
        this._decreaseSize = sizeDecreaser;
        this._size = size;
        this._originalSize = size;
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
            this._table[i] = this._createList();
        }
    }

    private _rebuild(size: number): void {
        this._cellCount = 0;
        const currentTable = this._table;
        this._createTable(size);
        this._hash = this._createHashFn(this._size);

        for (let i = 0; i < currentTable.length; i++) {
            for (const [key, value] of currentTable[i]) {
                this.add(key, value);
            }
        }
    }

    private _loadFactor(): number {
        return (this._cellCount && this._size) ? this._cellCount / this._size : 0;
    }

    private _shouldRebuildUp(): boolean {
        return this._loadFactor() >= this._desiredLoadFactor[0] ? true : false;
    }

    private _shouldRebuildDown(): boolean {
        return this._loadFactor() <= this._desiredLoadFactor[1] ? true : false;
    }

    private _findEntryInIndex(index: number, key: K): [K, V] | undefined {
        for (const entry of this._table[index]) {
            if (entry[0] === key) return entry;
        }
    }

    add(key: K, value: V): V {
        const hashValue = this._hash(key);
        const exisingEntry = this._findEntryInIndex(hashValue, key);

        if (exisingEntry) {
            exisingEntry[1] = value;
        } else {
            this._table[hashValue].push([key, value]);
            this._cellCount++;
        }

        if (this._shouldRebuildUp()) {
            this._rebuild(this._size * 2);
        }

        return value;
    }

    get(key: K): V | undefined {
        const hashValue = this._hash(key);
        const entry = this._findEntryInIndex(hashValue, key) || [];
        return entry[1];
    }

    delete(key: K): V | undefined {
        const hashValue = this._hash(key);
        const newTableEntry: ILinkedList<[K, V]> = this._createList();
        let deletedValue;
        for (const [k, v] of this._table[hashValue]) {
            if (k !== key) {
                newTableEntry.push([k, v])
            } else {
                deletedValue = v;
                this._cellCount--;
            }
        }
        this._table[hashValue] = newTableEntry;
        if (this._shouldRebuildDown()) {
            this._rebuild(Math.max(Math.floor(this._size / 2), this._originalSize));
        }
        return deletedValue;
    }

    keys(): IterableIterator<K> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        function* gen() {
            for (const tableEntry of self._table) {
                for (const [key] of tableEntry) {
                    yield key;
                }
            }
        };
        return gen();
    }

    values(): IterableIterator<V> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const foundValues = new Set<V>();
        function* gen() {
            for (const tableEntry of self._table) {
                for (const [_, value] of tableEntry) {
                    if (!foundValues.has(value)) {
                        foundValues.add(value);
                        yield value;
                    }
                }
            }
        };
        return gen();
    }

    // should be run in jest environment
    _checkRI(expectedTable: Table<K, V>): void {
        return expect(this._table).toEqual(expectedTable);
    };
}