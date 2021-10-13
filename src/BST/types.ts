export interface IBSTNode<Value> {
    value: Value;
    parent: IBSTNode<Value> | null;
    left: IBSTNode<Value> | null;
    right: IBSTNode<Value> | null;
    _checkRI: () => null;
}

export interface IBST<Value> {
    size: number;
    insert: (v: Value) => IBST<Value>;
    _checkRI: () => null;
}
