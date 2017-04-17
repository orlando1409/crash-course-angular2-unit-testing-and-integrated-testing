import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';

@Injectable()

export class TestUtils {
    static blank() {
        return Observable.of({});
    }

    static failure() {
        return Observable.throw(new Error('Test!'));
    }
}
