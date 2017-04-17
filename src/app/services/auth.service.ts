import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {
    private baseUrl = 'api/auth/';

    constructor(private http: Http) {

    }

    login(credentials) {
        return this.http.post(this.baseUrl + 'login', credentials);
    }
}
