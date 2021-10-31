import { AdjacentStorageConstructor, IAdjacentStorage, IGraphNode } from "./types";

export class GraphNode<ID, Value> implements IGraphNode<ID, Value> {
    private _adjacent: IAdjacentStorage<ID, Value>;

    constructor(private readonly _id: ID, private _value: Value, _AdjacentStorage: AdjacentStorageConstructor<ID, Value> = Map) {
        this._adjacent = new _AdjacentStorage();
    }

    get id(): ID {
        return this._id;
    }

    get value(): Value {
        return this._value;
    }

    set value(_value: Value) {
        this._value = _value;
    }

    get adjacent(): IAdjacentStorage<ID, Value> {
        return this._adjacent;
    }

    add(node: IGraphNode<ID, Value>, weight: number = 1): IGraphNode<ID, Value> {
        this._adjacent.set(node, weight);
        return node;
    }

    remove(node: IGraphNode<ID, Value>): IGraphNode<ID, Value> {
        this._adjacent.delete(node);
        return node;
    }

    static copy<ID, Value>(node: IGraphNode<ID, Value>, _AdjacentStorage: AdjacentStorageConstructor<ID, Value> = Map): GraphNode<ID, Value> {
        return new GraphNode(node.id, node.value, _AdjacentStorage);
    }
}