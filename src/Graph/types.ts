import { IHeap } from '../Heap/types';

export interface IAdjacentStorage<ID, Value> extends Iterable<[IGraphNode<ID, Value>, number]> {
    keys: () => Iterable<IGraphNode<ID, Value>>;
    entries: () => Iterable<[IGraphNode<ID, Value>, number]>;
    set(node: IGraphNode<ID, Value>, weight: number): IAdjacentStorage<ID, Value>;
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
    add: (node: IGraphNode<ID, Value>, weight?: number) => IGraphNode<ID, Value>;
    remove: (node: IGraphNode<ID, Value>) => IGraphNode<ID, Value>;
}

export interface GraphNodeConstructor<ID, Value> {
    new(_value: Value, _AdjacentStorage?: AdjacentStorageConstructor<ID, Value>): IGraphNode<ID, Value>;
    copy: (node: IGraphNode<ID, Value>) => IGraphNode<ID, Value>;
}

export interface IGraph<ID, Value> {
    nodes: IterableIterator<IGraphNode<ID, Value>>;
    size: number;
    add: (node: IGraphNode<ID, Value>, weight?: number) => IGraph<ID, Value>;
    get: (id: ID) => IGraphNode<ID, Value> | undefined;
    remove: (id: ID) => Value | undefined;
    addEdge: (id1: ID, id2: ID) => IGraph<ID, Value>;
    removeEdge: (id1: ID, id2: ID) => IGraph<ID, Value>;
}

export type GraphNodesArray<ID, Value> = [IGraphNode<ID, Value>, IGraphNode<ID, Value>[]?, number[]?][];

export type DFSOrder = 'pre' | 'post';

export interface DijkstraHeapValue<ID> {
    nodeId: ID,
    cost: number,
};

export interface DijkstraParams<ID> {
    createHeap?: () => IHeap<DijkstraHeapValue<ID>>;
};

export interface ShortestPathResultForNode<ID> {
    parent: ID | null;
    cost: number;
}

export interface RelaxationResult<ID> {
    result: ShortestPathResultForNode<ID>;
    updated: boolean;
}

export type ShortestPathResult<ID> = Map<ID, ShortestPathResultForNode<ID>>;