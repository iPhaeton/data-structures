export type HeapType = 'min' | 'max';

export type ComparisonFn<Value> = (a: Value, b: Value) => number;

export interface IHeap<Value> {
    size: number;
    insert: (v: Value) => Value;
    extract: () => Value | undefined;
    _checkRI: (comparisonFn: ComparisonFn<Value>) => null;
}