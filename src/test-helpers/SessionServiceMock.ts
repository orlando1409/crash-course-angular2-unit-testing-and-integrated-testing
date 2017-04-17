import {Injectable} from '@angular/core';

@Injectable()
export class SessionServiceMock {
    token: string;

    constructor() {
    }

    destroy() {
    }
}
