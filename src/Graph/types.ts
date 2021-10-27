export interface IAdjacentStorage<ID, Value> extends Iterable<IGraphNode<ID, Value>> {
    add(node: IGraphNode<ID, Value>): IAdjacentStorage<ID, Value>;
    delete(node: IGraphNode<ID, Value>): boolean;
    has(node: IGraphNode<ID, Value>): boolean;
    forEach(callbackfn: (value: IGraphNode<ID, Value>, value2: IGraphNode<ID, Value>, set: IAdjacentStorage<ID, Value>) => void, thisArg?: any): void;
}

export interface AdjacentStorageConstructor<ID, Value> {
    new(): IAdjacentStorage<ID, Value>;
}

export interface IGraphNode<ID, Value> {
    id: ID;
    value: Value;
    adjacent: IAdjacentStorage<ID, Value>;
}

export interface GraphNodeConstructor<ID, Value> {
    new(_value: Value, _AdjacentStorage?: AdjacentStorageConstructor<ID, Value>): IGraphNode<ID, Value>;
    copy: (node: IGraphNode<ID, Value>) => IGraphNode<ID, Value>;
}

export interface IGraph<ID, Value> {
    nodes: IterableIterator<IGraphNode<ID, Value>>;
    add: (node: IGraphNode<ID, Value>) => IGraph<ID, Value>;
}

export type GraphNodesArray<ID, Value> = [IGraphNode<ID, Value>, IGraphNode<ID, Value>[]?][];

export type DFSOrder = 'pre' | 'post';