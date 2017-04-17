import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthServiceMock {
    token = 'ABC';

    constructor() {
    }

    login(credentials: any) {
        return Observable.of({token: this.token});
    }

    changePassword(data: any) {
        return Observable.of({});
    }
}
