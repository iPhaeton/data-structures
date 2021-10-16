import { GraphNode } from "./GraphNode";
import { GraphNodeConstructor, GraphNodesArray, IGraph, IGraphNode } from "./types";

export class Graph<Value> implements IGraph<Value> {
    private _nodes: IGraphNode<Value>[];

    constructor() {
        this._nodes = [];
    };

    get nodes(): IGraphNode<Value>[] {
        return this._nodes;
    }

    add(node: IGraphNode<Value>): Graph<Value> {
        this._nodes.push(node);
        return this;
    }

    // TODO: The nodes should be copied, not mutated.
    static fromArray<Value>(array: GraphNodesArray<Value>, _Node: GraphNodeConstructor<Value> = GraphNode): Graph<Value> {
        const graph = new Graph<Value>();

        if (!array.length) {
            return graph;
        }

        const copies = new Map();
        for (const [node, adjacent = []] of array) {
            let copy: IGraphNode<Value>;
            if (copies.has(node)) {
                copy = copies.get(node);
            } else {
                copy = _Node.copy(node);
                copies.set(node, copy);
            }
            graph.add(copy);

            adjacent.forEach(adjacentNode => {
                let adjacentCopy: IGraphNode<Value>;
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