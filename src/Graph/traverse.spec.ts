import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { traverseBFS, traverseDFS, traverseDFSIteratively } from "./traverse";

describe('Graph utils', () => {
    describe('traverseBFS', () => {
        it('should traverse a graph nodes in the BFS way', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);
            const node5 = new GraphNode<number, number>(5, 5);
            const node6 = new GraphNode<number, number>(6, 6);
            const node7 = new GraphNode<number, number>(7, 7);

            const graph = Graph.fromArray([
                [node1, [node3]],
                [node2, [node1, node2, node5]],
                [node3, [node2, node4]],
                [node6, [node7]]
            ]);

            const visitedValues = [];
            for (const node of traverseBFS(graph)) {
                visitedValues.push(node.value);
            };

            expect(visitedValues).toEqual([
                node1.value,
                node3.value,
                node2.value,
                node4.value,
                node5.value,
                node6.value,
                node7.value,
            ]);
        });
    });

    describe('traverseDFS', () => {
        it('should traverse a graph nodes in the DFS pre-order way', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);
            const node5 = new GraphNode<number, number>(5, 5);
            const node6 = new GraphNode<number, number>(6, 6);
            const node7 = new GraphNode<number, number>(7, 7);

            const graph = Graph.fromArray([
                [node1, [node3]],
                [node2, [node1, node2, node5]],
                [node3, [node2, node4]],
                [node6, [node7]]
            ]);

            const visitedValues = [];
            for (const node of traverseDFS(graph, 'pre')) {
                visitedValues.push(node.value);
            };

            expect(visitedValues).toEqual([
                node1.value,
                node3.value,
                node2.value,
                node5.value,
                node4.value,
                node6.value,
                node7.value,
            ]);
        });

        it('should traverse a graph nodes in the DFS post-order way', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);
            const node5 = new GraphNode<number, number>(5, 5);
            const node6 = new GraphNode<number, number>(6, 6);
            const node7 = new GraphNode<number, number>(7, 7);

            const graph = Graph.fromArray([
                [node1, [node3]],
                [node2, [node1, node2, node5]],
                [node3, [node2, node4]],
                [node6, [node7]]
            ]);

            const visitedValues = [];
            for (const node of traverseDFS(graph, 'post')) {
                visitedValues.push(node.value);
            };

            expect(visitedValues).toEqual([
                node5.value,
                node2.value,
                node4.value,
                node3.value,
                node1.value,
                node7.value,
                node6.value,
            ]);
        });
    });

    describe('traverseDFSIteratively', () => {
        it('should traverse a graph nodes in the DFS pre-order way', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);
            const node5 = new GraphNode<number, number>(5, 5);
            const node6 = new GraphNode<number, number>(6, 6);
            const node7 = new GraphNode<number, number>(7, 7);

            const graph = Graph.fromArray([
                [node1, [node3]],
                [node2, [node1, node2, node5]],
                [node3, [node2, node4]],
                [node6, [node7]]
            ]);

            const visitedValues = [];
            for (const node of traverseDFSIteratively(graph)) {
                visitedValues.push(node.value);
            };

            expect(visitedValues).toEqual([
                node1.value,
                node3.value,
                node4.value,
                node2.value,
                node5.value,
                node6.value,
                node7.value,
            ]);
        });
    });
});