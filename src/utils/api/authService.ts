import { AuthServiceReal } from './authServiceReal';

export interface LoginData {
    phone: string;
    password: string;
}
export interface RegisterPayload {
    phone: string;
    password: string;
    name: string;
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
    name: string;
    phone: string;
    password?: string;
    password_confirm?: string;
}

export interface ConfirmUpdateUser {
    confirmation_code: string;
}

export interface User {
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
    name: string;
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
    login: ({ phone, password }: LoginData) => Promise<void>;

    register: ({ name, phone, password }: RegisterPayload) => Promise<{ data: RegisterPromise }>;

    confirmRegister: ({ phone, code }: ConfirmRegisterPayload) => Promise<void>;

    updateUser: ({ name, phone, password, password_confirm }: UpdateUser) => Promise<{ data: { temp_data_code: string } }>;

    confirmUpdateUser: ({ confirmation_code }: ConfirmUpdateUser) => Promise<{ data: UserExtra }>;

    logOut: () => Promise<void>;

    getProfile: () => Promise<{ data: User }>;

    refreshToken: () => Promise<void>;
}

export const authService = new AuthServiceReal();
