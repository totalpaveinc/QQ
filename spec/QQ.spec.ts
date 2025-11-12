
import {QQ} from '../src/QQ';
import {Waiter} from '../src/Waiter';

describe('QQ', () => {
    it('QQ.all should only fulfil once all promises are fulfilled', async () => {
        let p1: Waiter<number> = new Waiter();
        let p2: Waiter<number> = new Waiter();

        setTimeout(() => {
            void p1.resolve(1);
            void p2.resolve(2)
        }, 0);

        let results: [number, number] = await QQ.all([p1, p2]);

        expect(results).toEqual([
            1,
            2
        ]);
    });

    it('QQ.all should only reject once all promises are fulfilled', async () => {
        let p1: Waiter<number> = new Waiter();
        let p2: Waiter<number> = new Waiter();

        setTimeout(() => {
            void p1.reject(new Error('TestError'));
        }, 0);

        setTimeout(() => {
            void p2.resolve(2);
        }, 100);

        await expect(QQ.all([p1, p2])).rejects.toThrow('TestError');
    });
});
