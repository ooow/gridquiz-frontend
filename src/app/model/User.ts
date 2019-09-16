export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
}

export enum Role {
    USER,
    ADMIN
}

export interface UserToken {
    user: User;
    message: string;
}
