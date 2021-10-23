import { HashTable } from "./HashTable";

describe('HashTable', () => {
    it('should add/get key - value pairs', () => {
        const hashFn = (key: string) => {
            if (key === 'val1' || key === 'val2') return 2;
            else return 4;
        }

        const table = new HashTable<string, number>(10, hashFn);
        expect(table.add('val1', 1)).toBe(1);
        expect(table.add('val2', 2)).toBe(2);
        expect(table.add('val3', 3)).toBe(3);

        expect(table.get('val1')).toBe(1);
        expect(table.get('val2')).toBe(2);
        expect(table.get('val3')).toBe(3);

        table._checkRI([
            [],
            [],
            [['val1', 1], ['val2', 2]],
            [],
            [['val3', 3]],
            [],
            [],
            [],
            [],
            [],
        ]);
    });

    it('should increase and rebuild inner array, when desired fill rate is reached', () => {
        const table = new HashTable<string, number>(3, () => 5, [0.5, 0.5]);
        table._checkRI([[], []]);

        table.add('val1', 1);
        table._checkRI([[], [], [['val1', 1]]]);

        table.add('val2', 2);
        table._checkRI([[], [], [], [], [], [['val1', 1], ['val2', 2]]]);
    });
});