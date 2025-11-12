
import {Waiter} from '../src/Waiter';

describe('Waiter', () => {
    it('should be a Promise', () => {
        let waiter: Waiter = new Waiter();
        expect(waiter).toBeInstanceOf(Promise);
    });

    it('can resolve', async () => {
        let waiter: Waiter<number> = new Waiter<number>();

        let p: Promise<number> = waiter;

        setTimeout(() => {
            void waiter.resolve(123);
        }, 0);

        let value: number = await p;
        expect(value).toBe(123);
    });

    it('can reject', async () => {
        let waiter: Waiter<number> = new Waiter<number>();

        let p: Promise<number> = waiter;

        setTimeout(() => {
            void waiter.reject(123);
        }, 0);

        await expect(p).rejects.toBe(123);
    });
});
