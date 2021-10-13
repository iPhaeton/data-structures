import { BST } from "./BST";

describe('BST', () => {
    let bst: BST<number>;
    beforeEach(() => {
        bst = new BST();
    });

    describe('insert', () => {
        it('should insert nodes correctly', () => {
            bst.insert(10);
            bst.insert(5);
            bst.insert(15);
            bst.insert(2);
            bst.insert(7);
            
            bst._checkRI();
            expect(bst.size).toBe(5);
        });
    });
})