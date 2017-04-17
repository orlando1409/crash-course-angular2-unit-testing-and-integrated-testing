import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class TranslateServiceMock {

    setDefaultLang() {
        return Observable.of({});
    }

    use() {
        return Observable.of({});
    }

    instant(value: string) {
        return value;
    }

    get(key: string): Observable<string | any> {
        return Observable.of(key);
    }
}
