import { performance } from "node:perf_hooks";

const formatMs = (ms) => `${ms.toFixed(2)}ms`;

export function createTimer(operation) {
    const operationStart = performance.now();
    const steps = [];

    return {
        async measure(step, fn) {
            const startedAt = new Date();
            const start = performance.now();
            let status = "ok";

            try {
                return await fn();
            } catch (error) {
                status = "error";
                throw error;
            } finally {
                const duration = performance.now() - start;
                const endedAt = new Date();

                steps.push({ step, duration, status });

                console.log(
                    `[PERF] ${operation} > ${step} | ` +
                    `start=${startedAt.toISOString()} ` +
                    `end=${endedAt.toISOString()} ` +
                    `duration=${formatMs(duration)} status=${status}`
                );
            }
        },

        end() {
            const total = performance.now() - operationStart;
            const breakdown = steps
                .map(({ step, duration }) => `${step}=${formatMs(duration)}`)
                .join(", ");

            console.log(`[PERF] ${operation} | total=${formatMs(total)} | ${breakdown}`);

            return { total, steps };
        }
    };
}
