const createArray = (value: number, defaultValue?: number) => {
    const arr = [];
    for (let i = 0; i <= value; i++) {
        arr.push(defaultValue === undefined ? [] : [defaultValue]);
    }
    return arr;
}

export const coinChange = (denominations: number[], value: number): void => {
    const results = [[[0]]];

    for (let i = 0; i < denominations.length; i++) {
        results.push(createArray(value));

        for (let k = 0; k <= value; k++) {
            for (const prevValues of results[i]) {
                for (const prevValue of prevValues) {
                    const result = prevValue + k * denominations[i];
                    if (result > value) continue;
                    results[i + 1][k].push(result);
                }
            }
        }
    }

    console.log(results);
}