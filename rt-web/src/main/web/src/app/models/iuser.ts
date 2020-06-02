import { IRole } from './irole';

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    affiliate: string ;
    email: string;
    password: string;
    userName: string;
    department: string;
    roles: IRole;
}


