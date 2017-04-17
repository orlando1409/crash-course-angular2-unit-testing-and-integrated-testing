import {Injectable} from '@angular/core';

import {Subject} from 'rxjs/Subject';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class SessionService {
    // Observable string sources
    private tokenChangeSource = new Subject<string>();
    private sessionDestroyedSource = new Subject<any>();

    // Observable string streams
    tokenChange$ = this.tokenChangeSource.asObservable();
    sessionDestroyed$ = this.sessionDestroyedSource.asObservable();

    constructor(private _cookieService: CookieService) {
    }

    get token(): string {
        return this._cookieService.get('token');
    }

    set token(value: string) {
        this._cookieService.put('token', value);
        this.tokenChangeSource.next(value);
    }

    destroy() {
        this._cookieService.removeAll();
        this.sessionDestroyedSource.next(null);
    }
}
