export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
