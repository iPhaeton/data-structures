export type HeapType = 'min' | 'max';

export type ComparisonFn<Value> = (a: Value, b: Value) => number;

export interface IHeap<Value> {
    size: number;
    insert: (v: Value) => Value;
    _checkRI: (comparisonFn: ComparisonFn<Value>) => null;
}