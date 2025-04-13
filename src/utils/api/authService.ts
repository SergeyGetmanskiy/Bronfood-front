import { AuthServiceReal } from './authServiceReal';

/**
 11 digits string, no space, brackets, or +
 */
export type PhoneNumber = string;

export interface LoginData {
    phone: PhoneNumber;
    password: string;
}
export interface RegisterData {
    phone: PhoneNumber;
    password: string;
    fullname: string;
}
export interface UpdateUser {
    fullname: string;
    phone: PhoneNumber;
    password?: string;
    password_confirm?: string;
}
/*
 temp_data_code: Temporary code that the server assign to the user in db during registration
 confirmation_code: 4-digit code that user shoud enter to confirm registration
 */
export interface ConfirmRegisterPhoneData {
    phone: string;
    code: string;
}

export interface ConfirmUpdateUser {
    confirmation_code: string;
}
export interface User {
    userId: string;
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
}

export interface UserExtended {
    exp: number;
    iat: number;
    is_banned: boolean;
    is_staff: boolean;
    is_verified: boolean;
    jti: string;
    name: string;
    phone: string;
    role: string;
    token_type: number;
    user_id: number;
    username: string;
}

export interface UserExtra {
    userId: string;
    phone: PhoneNumber;
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

    register: ({ fullname, phone, password }: RegisterData) => Promise<{ data: { id: number; name: string; phone: string } }>;

    confirmRegisterPhone: ({ phone, code }: ConfirmRegisterPhoneData) => Promise<{ data: UserExtended }>;

    updateUser: ({ fullname, phone, password, password_confirm }: UpdateUser) => Promise<{ data: { temp_data_code: string } }>;

    confirmUpdateUser: ({ confirmation_code }: ConfirmUpdateUser) => Promise<{ data: UserExtra }>;

    logOut: () => Promise<void>;

    checkAuthorization: () => Promise<{ data: UserExtended }>;
}

export const authService = new AuthServiceReal();
