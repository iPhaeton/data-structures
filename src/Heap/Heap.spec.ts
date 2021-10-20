import { Heap } from "./Heap";
import { HeapType } from "./types";

const comparisonFn = (a: number, b: number) => a - b;

describe('Heap', () => {
    describe('insert', () => {
        it.each`
            type
            ${'min'}
            ${'max'}
        `('should insert a value into a $type heap', ({ type }: { type: HeapType }) => {
            const heap = new Heap<number>(type, comparisonFn);
            heap.insert(2);
            heap.insert(5);
            heap.insert(-5);
            heap.insert(15);
            heap.insert(0);

            expect(heap.size).toBe(5);
            expect(heap._checkRI()).toBe(null)
        })
    });

    describe('_checkRI', () => {
        it.each`
            type        | data
            ${'min'}    | ${[1, 4, 7, 5, 6, 8]}
            ${'max'}    | ${[8, 6, 2, 3, 4, 1]}
        `('should return null, if RI holds for a $type heap', ({ type, data }: { type: HeapType, data: number[] }) => {
            const heap = new Heap<number>(type, comparisonFn);
            heap['_data'] = data;

            expect(heap._checkRI()).toBe(null);
        });

        it.each`
            type        | data
            ${'min'}    | ${[1, 4, 7, 3, 6, 8]}
            ${'max'}    | ${[8, 6, 12, 3, 4, 1]}
        `('should throw, if RI does not hold for a $type heap', ({ type, data }: { type: HeapType, data: number[] }) => {
            const heap = new Heap<number>(type, comparisonFn);
            heap['_data'] = data;

            expect(() => heap._checkRI()).toThrow();
        });
    });
});