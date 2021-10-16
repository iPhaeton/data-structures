export interface IAdjacentStorage<Value> extends Iterable<IGraphNode<Value>> {
    add(node: IGraphNode<Value>): IAdjacentStorage<Value>;
    delete(node: IGraphNode<Value>): boolean;
    has(node: IGraphNode<Value>): boolean;
    forEach(callbackfn: (value: IGraphNode<Value>, value2: IGraphNode<Value>, set: IAdjacentStorage<Value>) => void, thisArg?: any): void;
}

export interface AdjacentStorageConstructor<Value> {
    new(): IAdjacentStorage<Value>;
}

export interface IGraphNode<Value> {
    value: Value;
    adjacent: IAdjacentStorage<Value>;
}

export interface GraphNodeConstructor<Value> {
    new(_value: Value, _AdjacentStorage?: AdjacentStorageConstructor<Value>): IGraphNode<Value>;
    copy: (node: IGraphNode<Value>) => IGraphNode<Value>;
}

export interface IGraph<Value> {
    nodes: IGraphNode<Value>[];
    add: (node: IGraphNode<Value>) => IGraph<Value>;
}

export type GraphNodesArray<Value> = [IGraphNode<Value>, IGraphNode<Value>[]?][];