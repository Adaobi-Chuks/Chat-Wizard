export default interface IUser {
    email: string;
    password: string;
}

export interface IUserWithId extends IUser {
    _id?: string;
    id?: string;
}