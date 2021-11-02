import { buildPath } from "./utils";

describe('utils', () => {
    describe('buildPath', () => {
        it('should build path from a shortest path result', () => {
            const result = new Map([
                ['A', { parent: null, cost: 0 }],
                ['B', { parent: 'A', cost: 3 }],
                ['C', { parent: 'D', cost: 5 }],
                ['D', { parent: 'B', cost: 4 }],
            ]);

            const path = buildPath(result, 'C');

            expect(path).toEqual(['A', 'B', 'D', 'C']);
        });
    });
});