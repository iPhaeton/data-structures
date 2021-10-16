import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { traverseBFS } from "./utils";

describe('utils', () => {
    describe('traverseBFS', () => {
        it('should traverse a graph nodes in the BFS way', () => {
            const node1 = new GraphNode<number>(1);
            const node2 = new GraphNode<number>(2);
            const node3 = new GraphNode<number>(3);
            const node4 = new GraphNode<number>(4);
            const node5 = new GraphNode<number>(5);

            const graph = Graph.fromArray([
                [node1, [node3]],
                [node2, [node1, node2, node5]],
                [node3, [node2, node4]],
            ]);

            const visitedValues = [];
            for (const node of traverseBFS(graph)) {
                visitedValues.push(node.value);
            };
            
            expect(visitedValues).toEqual([node1.value, node3.value, node2.value, node4.value, node5.value]);
        });
    });
});