import { createQueue } from "../LinkedList/Queue";
import { IQueue } from "../LinkedList/types";
import { IGraph, IGraphNode } from "./types";

export interface TraverseBFSParams<Value> {
    _Queue?: () => IQueue<IGraphNode<Value>>;
    _Set?: () => Set<IGraphNode<Value>>;
}

export function* traverseBFS<Value>(
    graph: IGraph<Value>,
    { _Queue = createQueue, _Set = () => new Set() }: TraverseBFSParams<Value> = {}
): Generator<IGraphNode<Value>, undefined, undefined> {
    const visited = _Set();
    const queue = _Queue();

    for (const currentRoot of graph.nodes) {
        if (!visited.has(currentRoot)) {
            queue.add(currentRoot);
        };

        while (queue.length) {
            const node = queue.remove() as IGraphNode<Value>;
            visited.add(node);
            node.adjacent.forEach(adjNode => {
                if (!visited.has(adjNode)) {
                    queue.add(adjNode)
                };
            });
            yield node;
        };
    }

    return;
};