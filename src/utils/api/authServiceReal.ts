import { AuthService, ConfirmUpdateUser, LoginData, RegisterPayload, ConfirmRegisterPayload, UpdateUser, UserExtra, UserExtended, RegisterPromise } from './authService';
import { handleFetch } from '../serviceFuncs/handleFetch';

export class AuthServiceReal implements AuthService {
    async login({ phone, password }: LoginData): Promise<{ data: UserExtended }> {
        const result = await handleFetch('api/auth/jwt/create/', { method: 'POST', data: { username: phone, password } });
        const { access } = result.data;
        localStorage.setItem('token', access);
        delete result.data.access;
        return decoded;
    }

    async register({ fullname, phone, password }: RegisterPayload): Promise<{ data: RegisterPromise }> {
        const result = await handleFetch('api/auth/users/', { method: 'POST', data: { phone, password, name: fullname } });
        return result;
    }

    async confirmRegister({ phone, code }: ConfirmRegisterPayload): Promise<void> {
        const result = await handleFetch('api/auth/users/activation/', { method: 'POST', data: { phone, code } });
        const { access } = result.data;
        localStorage.setItem('token', access);
        delete result.data.access;
    }

    async updateUser({ fullname, phone, password, password_confirm }: UpdateUser): Promise<{ data: { temp_data_code: string } }> {
        let requestData: UpdateUser = { fullname, phone };
        if (password && password_confirm) {
            requestData = { ...requestData, password, password_confirm };
        }
        return handleFetch('client/profile/update_request/', { method: 'POST', data: requestData });
    }

    async confirmUpdateUser({ confirmation_code }: ConfirmUpdateUser): Promise<{ data: UserExtra }> {
        const result = await handleFetch('client/profile/', { method: 'PATCH', data: { confirmation_code } });
        delete result.data.auth_token;
        delete result.data.role;
        return result;
    }

    async logOut() {
        const result = await handleFetch('api/auth/jwt/logout/', { method: 'POST' });
        if (result) {
            localStorage.removeItem('token');
        }
    }

    async getProfile(): Promise<{ data: UserExtended }> {
        const result = await handleFetch('api/auth/users/me/');
        return result;
    }
}
