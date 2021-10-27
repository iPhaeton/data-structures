import { GraphNode } from "./GraphNode";
import { GraphNodeConstructor, GraphNodesArray, IGraph, IGraphNode } from "./types";

export class Graph<ID, Value> implements IGraph<ID, Value> {
    private _nodes: Map<ID, IGraphNode<ID, Value>>;

    constructor() {
        this._nodes = new Map();
    };

    get nodes(): IterableIterator<IGraphNode<ID, Value>> {
        return this._nodes.values();
    }

    add(node: IGraphNode<ID, Value>): Graph<ID, Value> {
        if (!this._nodes.get(node.id)) {
            this._nodes.set(node.id, node);
        }
        return this;
    }

    // TODO: The nodes should be copied, not mutated.
    static fromArray<ID, Value>(array: GraphNodesArray<ID, Value>, _Node: GraphNodeConstructor<ID, Value> = GraphNode as GraphNodeConstructor<ID, Value>): Graph<ID, Value> {
        const graph = new Graph<ID, Value>();

        if (!array.length) {
            return graph;
        }

        const copies = new Map();
        for (const [node, adjacent = []] of array) {
            let copy: IGraphNode<ID, Value>;
            if (copies.has(node)) {
                copy = copies.get(node);
            } else {
                copy = _Node.copy(node);
                copies.set(node, copy);
            }
            graph.add(copy);

            adjacent.forEach(adjacentNode => {
                let adjacentCopy: IGraphNode<ID, Value>;
                if (copies.has(adjacentNode)) {
                    adjacentCopy = copies.get(adjacentNode);
                } else {
                    adjacentCopy = _Node.copy(adjacentNode);
                    copies.set(adjacentNode, adjacentCopy);
                }
                copy.adjacent.add(adjacentCopy);
            });
        }

        return graph;
    };
}