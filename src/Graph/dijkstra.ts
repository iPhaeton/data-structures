import { Heap } from "src/Heap/Heap";
import { DijkstraHeapValue, DijkstraParams, DijkstraResult, IGraph } from "./types";

export const dijkstra = <ID, Value>(
    rootId: ID,
    graph: IGraph<ID, Value>,
    {
        createHeap = () => new Heap<DijkstraHeapValue<ID>>('min', (a, b) => a.cost - b.cost),
    }: DijkstraParams<ID, Value> = {},
): DijkstraResult<ID> => {
    return new Map();
}