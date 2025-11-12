/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * A class that extends a Promise, but with an exposed resolve/reject function.
 * The manager can hold a reference to Waiter reference and resolve based on a decoupled
 * signal. It can pass this instance off as a regular Promise, as to not expose the Resolve/Reject
 * APIs., 
 */
export class Waiter<T = void> extends Promise<T> {
    private $resolveFn: Function;
    private $rejectFn: Function;

    public constructor() {
        let context: {resolve: Function, reject: Function} = {
            resolve: null,
            reject: null
        };
        
        super((resolve, reject) => {
            context.resolve = resolve;
            context.reject = reject;
        });

        this.$resolveFn = context.resolve;
        this.$rejectFn = context.reject;
    }

    // Required for creating promise chains (e.g. via .then)
    public static get [Symbol.species](): typeof Promise { return Promise; }

    public resolve(v?: T): Promise<T> {
        this.$resolveFn(v);
        return this;
    }

    public reject(e?: any): Promise<T> {
        this.$rejectFn(e);
        return this;
    }
}
