import { ComparisonFn, HeapType, IHeap } from "./types";

export class Heap<Value> implements IHeap<Value> {
    private _data: Value[];
    private _size: number;
    private _checkComparisonResult: (a: Value, b: Value) => boolean;

    constructor(private _type: HeapType, private _comparisonFn: ComparisonFn<Value>) {
        this._checkComparisonResult = (a: Value, b: Value) =>
            this._type === 'min' ?
                this._comparisonFn(a, b) < 0 :
                this._comparisonFn(a, b) > 0;

        this._data = [];
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    private _bubbleUp(valueIndex: number) {
        let parentIndex = Math.floor((valueIndex - 1) / 2);
        while (parentIndex >= 0) {
            if (!this._checkComparisonResult(this._data[parentIndex], this._data[valueIndex])) {
                [this._data[parentIndex], this._data[valueIndex]] = [this._data[valueIndex], this._data[parentIndex]];
                valueIndex = parentIndex;
                parentIndex = Math.floor((valueIndex - 1) / 2);
            } else {
                break;
            };
        };
    }

    insert(value: Value): Value {
        this._data.push(value);

        this._size++;
        this._bubbleUp(this.size - 1);

        return value;
    }

    _checkRI(): null {
        for (let i = 0; i < this._data.length; i++) {
            if ((i * 2) + 1 >= this._data.length) break;
            if (!this._checkComparisonResult(this._data[i], this._data[(i * 2) + 1])) {
                throw new Error(`Values "${this._data[i]}" and "${this._data[(i * 2) + 1]} are not ordered correctly. ${this._data}`);
            }

            if ((i * 2) + 2 >= this._data.length) break;
            if (!this._checkComparisonResult(this._data[i], this._data[(i * 2) + 2])) {
                throw new Error(`Values "${this._data[i]}" and "${this._data[(i * 2) + 2]} are not ordered correctly. ${this._data}`);
            }
        }

        return null;
    }
};