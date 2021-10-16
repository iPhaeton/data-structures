export interface IAdjacentStorage<Value> extends Iterable<Value> {
    add(node: IGraphNode<Value>): IAdjacentStorage<Value>;
    delete(node: IGraphNode<Value>): boolean;
    has(node: IGraphNode<Value>): boolean;
}

export interface AdjacentStorageConstructor<Value> {
    new(): IAdjacentStorage<Value>;
}

export interface IGraphNode<Value> {
    value: Value;
    adjacent: IAdjacentStorage<IGraphNode<Value>>;
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