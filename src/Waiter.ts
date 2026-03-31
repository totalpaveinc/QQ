/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * A class that extends a Promise, but with an exposed resolve/reject function.
 * The manager can hold a reference to Waiter reference and resolve based on a decoupled
 * signal. It can pass this instance off as a regular Promise, as to not expose the Resolve/Reject
 * APIs., 
 */
export class Waiter<T = void, TUserContext = any> extends Promise<T> {
    private $resolveFn: Function;
    private $rejectFn: Function;
    private $timer: number;
    private $instantiateStack: string;
    private $userContext: TUserContext;

    public static readonly LONG_RESOLUTATION_WARNING: number = 10000;

    public constructor(userContext?: TUserContext) {
        let context: {resolve: Function, reject: Function} = {
            resolve: null,
            reject: null
        };
        
        super((resolve, reject) => {
            context.resolve = resolve;
            context.reject = reject;
        });

        this.$userContext = userContext || null;

        this.$instantiateStack = new Error().stack;

        this.$resolveFn = context.resolve;
        this.$rejectFn = context.reject;

        this.$timer = setTimeout(() => {
            console.warn('Waiter has been waiting for more than 30 seconds without resolution', this.$instantiateStack, this.$userContext);
        }, Waiter.LONG_RESOLUTATION_WARNING);
    }

    // Required for creating promise chains (e.g. via .then)
    public static get [Symbol.species](): typeof Promise { return Promise; }

    public resolve(v?: T): Promise<T> {
        clearTimeout(this.$timer);
        this.$resolveFn(v);
        return this;
    }

    public reject(e?: any): Promise<T> {
        clearTimeout(this.$timer);
        this.$rejectFn(e);
        return this;
    }
}
