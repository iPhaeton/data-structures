import { coinChange } from "./coinChange";

describe('coinChange', () => {
    it('should return an array matching indices and an array of parents', () => {
        const value = 27;
        const denominations = [1,5,10,25];

        coinChange(denominations, value);
    });
});