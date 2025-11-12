
/**
 * A static class with utility methods for creating promises.
 */
export class QQ {
    private constructor() {}

    /**
     * Uses Promise.allSettled behind the scenes.
     * 
     * Returns a list of fulfilled promise responses, or rejects with the first rejection.
     * 
     * Unlike Promise.all, it waits for all promises to be completed before rejecting.
     * 
     * @param promises 
     * @returns 
     */
    public static async all<T extends readonly unknown[]>(promises: T): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
        let settled = await Promise.allSettled(promises);

        let response: unknown[] = [];
        for (let i: number = 0; i < settled.length; i++) {
            let result = settled[i];

            if (result.status === 'fulfilled') {
                response.push(result.value);
            }
            else {
                throw result.reason;
            }
        }

        return response as { [K in keyof T]: Awaited<T[K]> };
    }
}
