import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { IGraphNode } from "./types";

const valuesArray = <ID, Value>(nodes: IGraphNode<ID, Value>[]): Value[] => nodes.map(n => n.value);

describe('Graph', () => {
    it('should create a graph from an array of nodes', () => {
        const node1 = new GraphNode<number, number>(1, 1);
        const node2 = new GraphNode<number, number>(2, 2);
        const node3 = new GraphNode<number, number>(3, 3);
        const node4 = new GraphNode<number, number>(4, 4);

        const graph = Graph.fromArray([
            [node1, [node2, node3]],
            [node2, [node1]],
            [node3, [node2, node4]],
        ]);

        const nodes = [...graph.nodes];

        expect(valuesArray(nodes)).toEqual(valuesArray([node1, node2, node3]));
        expect(valuesArray([...nodes[0].adjacent.keys()])).toEqual(valuesArray([node2, node3]));
        expect(valuesArray([...nodes[1].adjacent.keys()])).toEqual(valuesArray([node1]));
        expect(valuesArray([...nodes[2].adjacent.keys()])).toEqual(valuesArray([node2, node4]));
    });

    describe('remove', () => {
        it('should remove a node from th graph', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);

            const graph = Graph.fromArray([
                [node1, [node2]],
                [node2, [node1]],
                [node3, [node2]],
                [node4, []],
            ]);

            const node = graph.get(node1.id) as IGraphNode<number, number>;

            expect(graph.remove(node1.id)).toBe(node1.value);
            expect(graph.get(node1.id)).toBe(undefined);
            expect(graph.get(node2.id)?.adjacent.has(node)).toBe(false);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the graph', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);

            const graph = Graph.fromArray([
                [node1, [node2]],
                [node2, [node1]],
                [node3, [node2]],
                [node4, []],
            ]);

            expect(graph.addEdge(node4.id, node1.id)).toBe(graph);
            expect(graph.get(node4.id)?.adjacent.has(graph.get(node1.id) as any)).toBe(true);
            expect(graph.get(node1.id)?.adjacent.has(graph.get(node4.id) as any)).toBe(false);
        });
    });

    describe('removeEdge', () => {
        it('should remove an edge from the graph', () => {
            const node1 = new GraphNode<number, number>(1, 1);
            const node2 = new GraphNode<number, number>(2, 2);
            const node3 = new GraphNode<number, number>(3, 3);
            const node4 = new GraphNode<number, number>(4, 4);

            const graph = Graph.fromArray([
                [node1, [node2]],
                [node2, [node1]],
                [node3, [node2]],
                [node4, []],
            ]);

            expect(graph.removeEdge(node2.id, node1.id)).toBe(graph);
            expect(graph.get(node2.id)?.adjacent.has(graph.get(node1.id) as any)).toBe(false);
        });
    });
});