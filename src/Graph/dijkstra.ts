import { Heap } from "src/Heap/Heap";
import { DijkstraHeapValue, DijkstraParams, ShortestPathResult, ShortestPathResultForNode, IGraph, RelaxationResult } from "./types";

const defaultDijkstraResultForNode = {
    parent: null,
    cost: Infinity,
};

const relax = <ID>(
    currentResult: ShortestPathResultForNode<ID> = defaultDijkstraResultForNode,
    candidateResult: ShortestPathResultForNode<ID> = defaultDijkstraResultForNode,
): RelaxationResult<ID> => {
    if (candidateResult.cost < currentResult.cost) {
        return { result: candidateResult, updated: true };
    } else {
        return { result: currentResult, updated: false };
    }
}

export const dijkstra = <ID, Value>(
    rootId: ID,
    graph: IGraph<ID, Value>,
    {
        createHeap = () => new Heap<DijkstraHeapValue<ID>>('min', (a, b) => a.cost - b.cost),
    }: DijkstraParams<ID> = {},
): ShortestPathResult<ID> => {
    const heap = createHeap();
    const visited = new Set();
    const result = new Map<ID, ShortestPathResultForNode<ID>>();

    heap.insert({ nodeId: rootId, cost: 0 });
    result.set(rootId, { parent: null, cost: 0 })

    let heapExtractionsCount = 0;
    while (heapExtractionsCount < graph.size) {
        const nodeId = heap.extract()?.nodeId as ID;
        heapExtractionsCount++;
        const node = graph.get(nodeId);

        if (!node) throw new Error(`Node with id ${nodeId} is not in the graph`);
        visited.add(node);

        const parentResult = result.get(node.id) || defaultDijkstraResultForNode;
        for (const [adjNode, weight] of node.adjacent.entries()) {
            if (!visited.has(adjNode)) {
                const { result: adjNodeResult, updated } = relax(result.get(adjNode.id), { parent: node.id, cost: parentResult.cost + weight })
                if (updated) {
                    result.set(adjNode.id, adjNodeResult);
                    heap.insert({ nodeId: adjNode.id, cost: adjNodeResult.cost });
                }
            };
        };
    }

    return result;
}