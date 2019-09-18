export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface UserToken {
    user: User;
    message: string;
}
