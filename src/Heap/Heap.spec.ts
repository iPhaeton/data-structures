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
        });
    });

    describe('exctract', () => {
        it.each`
            type
            ${'min'}
            ${'max'}
        `('should extract $type element', ({ type }: { type: HeapType }) => {
            const heap = new Heap<number>(type, comparisonFn);
            heap.insert(2);
            heap.insert(5);
            heap.insert(-5);
            heap.insert(15);
            heap.insert(0);

            
            const expectedResult = Math[type](...heap['_data']);

            const element = heap.extract();

            expect(element).toBe(expectedResult);
            expect(heap.size).toBe(4);
            expect(heap._checkRI()).toBe(null);
        });

        it.each`
            type
            ${'min'}
            ${'max'}
        `('should handle the case when the heap is empty', ({type}) => {
            const heap = new Heap<number>(type, comparisonFn);

            expect(heap.extract()).toBe(undefined);
            expect(heap.size).toBe(0);
        });
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