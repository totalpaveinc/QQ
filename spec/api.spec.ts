
import * as api from '../src/api';
import {Waiter} from '../src/Waiter';
import {QQ} from '../src/QQ';


describe('Public API', () => {
    it('QQ', () => {
        expect(api.QQ).toBe(QQ);
    });

    it('Waiter', () => {
        expect(api.Waiter).toBe(Waiter);
    });
});
