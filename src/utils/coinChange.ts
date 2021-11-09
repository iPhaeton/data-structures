export const coinChange = (denominations: number[], value: number): [number[], number[]] => {
    const results: number[][][] = [[]];
    const indices: number[] = [];
    const parents: number[] = [];
    // const amount = [];

    const initialResult = [];
    let k = 0;
    let result;
    do {
        result = k * denominations[0]
        initialResult.push(result);
        k++;
    } while (result < value)

    for (let i = 0; i <= value; i++) {
        results[0].push(initialResult);
    }

    for (let i = 1; i < denominations.length; i++) {
        if (!results[i]) results.push([]);

        for (let thisAmount = 0; thisAmount <= value; thisAmount++) {
            if (!results[i][thisAmount]) results[i].push([]);

            for (let otherAmount = 0; otherAmount <= value; otherAmount++) {
                const result = results[i - 1][thisAmount][otherAmount] + thisAmount * denominations[i];
                results[i][thisAmount][otherAmount] = result;
            }
        }
    }

    console.log('***************', results)
    return [indices, parents];
};