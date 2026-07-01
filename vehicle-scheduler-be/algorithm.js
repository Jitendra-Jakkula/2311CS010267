const knapsack = (vehi, cap) => {

    const n = vehi.length;

    const dp = Array.from({ length: n + 1 }, () =>
        Array(cap + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {

        const v = vehi[i - 1];

        for (let w = 0; w <= cap; w++) {

            if (v.Duration <= w) {

                dp[i][w] = Math.max(
                    v.Impact + dp[i - 1][w - v.Duration],
                    dp[i - 1][w]
                    
                );

            } else {

                dp[i][w] = dp[i - 1][w];

            }

        }

    }

    let w = cap;
    const tasks = [];

    for (let i = n; i > 0; i--) {

        if (dp[i][w] !== dp[i - 1][w]) {

            tasks.push(vehi[i - 1]);

            w -= vehi[i - 1].Duration;

        }

    }

    return {
        totalImpact: dp[n][cap],
        tasks: tasks.reverse()
    };

};

module.exports = knapsack;