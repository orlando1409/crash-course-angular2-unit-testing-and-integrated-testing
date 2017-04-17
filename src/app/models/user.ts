export class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    organization: string;
    city: string;
    state: string;
    password: string;
    roles: [string];
    ipaddress: string;

    constructor() {
    }
}
