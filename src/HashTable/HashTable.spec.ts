import { HashTable } from "./HashTable";

describe('HashTable', () => {
    it('should throw, if size is 0', () => {
        const createTable = () => new HashTable<string, number>(0, { hashFnCreator: () => () => 1 });
        expect(createTable).toThrow();
    })

    describe('add', () => {
        it('should add/get key - value pairs', () => {
            const createHashFn = () => (key: string) => {
                if (key === 'val1' || key === 'val2') return 2;
                else return 4;
            }

            const table = new HashTable<string, number>(10, { hashFnCreator: createHashFn });
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

        it('should overwrite the previous value, if the key is added more than once', () => {
            const table = new HashTable(2, { hashFnCreator: () => () => 0, desiredLoadFactor: [1, 1] });

            table.add('val1', 1);
            table.add('val1', 2);

            table._checkRI([[['val1', 2]], []]);
        })

        it('should increase and rebuild inner array, when desired fill rate is reached', () => {
            const table = new HashTable<string, number>(
                3,
                {
                    hashFnCreator: (m) => () => 5 % m,
                    desiredLoadFactor: [0.5, 0.5],
                });
            table._checkRI([[], [], []]);

            table.add('val1', 1);
            table._checkRI([[], [], [['val1', 1]]]);

            table.add('val2', 2);
            table._checkRI([[], [], [], [], [], [['val1', 1], ['val2', 2]]]);
        });
    });

    describe('get', () => {
        it('should return undefined, if the key is not in the table', () => {
            const table = new HashTable(3, {hashFnCreator: () => () => 0});
            table.add('val1', 1);
            expect(table.get('val2')).toBe(undefined);
        });
    });

    describe('delete', () => {
        it('should delete a value', () => {
            const createHashFn = () => (key: string) => {
                if (key === 'val1' || key === 'val2') return 2;
                else return 4;
            }

            const table = new HashTable<string, number>(5, { hashFnCreator: createHashFn, desiredLoadFactor: [1, 1] });
            expect(table.add('val1', 1)).toBe(1);
            expect(table.add('val2', 2)).toBe(2);
            expect(table.add('val3', 3)).toBe(3);

            expect(table.delete('val2')).toBe(2);
            expect(table.get('val2')).toBe(undefined);

            expect(table.delete('val3')).toBe(3);
            expect(table.get('val3')).toBe(undefined);

            table._checkRI([
                [],
                [],
                [['val1', 1]],
                [],
                [],
            ]);
        });

        it('should decrease and rebuild inner array, when desired fill rate is reached', () => {
            const table = new HashTable<string, number>(
                3,
                {
                    hashFnCreator: (m) => () => 5 % m,
                    desiredLoadFactor: [0.5, 0.5],
                });
            table.add('val1', 1);
            table.add('val2', 2);

            table._checkRI([[], [], [], [], [], [['val1', 1], ['val2', 2]]]);

            table.delete('val2');
            table._checkRI([[], [], [['val1', 1]]]);
        });
    });
});