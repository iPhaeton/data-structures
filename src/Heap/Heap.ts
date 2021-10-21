import { ComparisonFn, HeapType, IHeap } from "./types";

export class Heap<Value> implements IHeap<Value> {
    private _data: Value[];
    private _size: number;
    private _checkComparisonResult: (a: Value, b: Value) => boolean;

    constructor(private _type: HeapType, private _comparisonFn: ComparisonFn<Value>) {
        this._checkComparisonResult = (a: Value, b: Value) => {
            if (b === undefined) {
                return true;
            } else if (a === undefined && b !== undefined) {
                return false;
            } else {
                return this._type === 'min' ?
                    this._comparisonFn(a, b) < 0 :
                    this._comparisonFn(a, b) > 0;
            }
        }

        this._data = [];
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    private _swap(index1: number, index2: number): void {
        [this._data[index1], this._data[index2]] =
            [this._data[index2], this._data[index1]];
    }

    private _bubbleUp(valueIndex: number): void {
        let parentIndex = Math.floor((valueIndex - 1) / 2);
        while (parentIndex >= 0) {
            if (!this._checkComparisonResult(this._data[parentIndex], this._data[valueIndex])) {
                this._swap(parentIndex, valueIndex);
                valueIndex = parentIndex;
                parentIndex = Math.floor((valueIndex - 1) / 2);
            } else {
                break;
            };
        };
    }

    private _bubbleDown(valueIndex: number): void {
        const leftChildIndex = (valueIndex * 2) + 1;
        const rightChildIndex = (valueIndex * 2) + 2;
        let swapCandidateIndex = this._checkComparisonResult(
            this._data[leftChildIndex],
            this._data[rightChildIndex]
        ) ?
            leftChildIndex :
            rightChildIndex;

        while (swapCandidateIndex < this._data.length) {
            if (this._checkComparisonResult(this._data[valueIndex], this._data[swapCandidateIndex])) {
                return;
            } else {
                this._swap(valueIndex, swapCandidateIndex);
                valueIndex = swapCandidateIndex
            }


            const leftChildIndex = (valueIndex * 2) + 1;
            const rightChildIndex = (valueIndex * 2) + 2;
            swapCandidateIndex = this._checkComparisonResult(
                this._data[leftChildIndex],
                this._data[rightChildIndex]
            ) ?
                leftChildIndex :
                rightChildIndex;
        };
    }

    insert(value: Value): Value {
        this._data.push(value);

        this._size++;
        this._bubbleUp(this.size - 1);

        return value;
    }

    extract(): Value | undefined {
        this._swap(0, this._data.length - 1);
        const value = this._data.pop();
        this._size = Math.max(this._size - 1, 0);
        this._bubbleDown(0);
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