export interface IUser {
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    isConfirmed: boolean
    confirmationToken: string | null;
}