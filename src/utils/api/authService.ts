import { AuthServiceReal } from './authServiceReal';

export interface LoginData {
    phone: string;
    password: string;
}
export interface RegisterPayload {
    phone: string;
    password: string;
    fullname: string;
}
export interface RegisterPromise {
    id: number;
    name: string;
    phone: string;
}
export interface ConfirmRegisterPayload {
    phone: string;
    code: string;
}
export interface UpdateUser {
    fullname: string;
    phone: string;
    password?: string;
    password_confirm?: string;
}

export interface ConfirmUpdateUser {
    confirmation_code: string;
}
export interface User {
    userId: string;
    phone: string;
    fullname: string;
    role?: 'CLIENT';
}

export interface UserExtended {
    id: number;
    is_banned: boolean;
    is_staff: boolean;
    is_verified: boolean;
    name: string;
    phone: string;
    role: string;
    username: string;
}

export interface UserExtra {
    userId: string;
    phone: string;
    fullname: string;
    role?: 'CLIENT';
    auth_token: string;
}
export interface SuccessProfileResponse {
    status: 'success';
    data: User;
}
export interface ErrorProfileResponse {
    status: 'error';
    error_message: string;
}

export interface AuthService {
    login: ({ phone, password }: LoginData) => Promise<{ data: User }>;

    register: ({ fullname, phone, password }: RegisterPayload) => Promise<{ data: RegisterPromise }>;

    confirmRegister: ({ phone, code }: ConfirmRegisterPayload) => Promise<void>;

    updateUser: ({ fullname, phone, password, password_confirm }: UpdateUser) => Promise<{ data: { temp_data_code: string } }>;

    confirmUpdateUser: ({ confirmation_code }: ConfirmUpdateUser) => Promise<{ data: UserExtra }>;

    logOut: () => Promise<void>;

    getProfile: () => Promise<{ data: UserExtended }>;
}

export const authService = new AuthServiceReal();
