import { AuthService, ConfirmUpdateUser, LoginData, RegisterPayload, ConfirmRegisterPayload, UpdateUserPayload, UserExtra, User, RegisterPromise } from './authService';
import { handleFetch } from '../serviceFuncs/handleFetch';

export class AuthServiceReal implements AuthService {
    async login({ phone, password }: LoginData): Promise<void> {
        const result = await handleFetch('api/auth/jwt/create/', { method: 'POST', data: { username: phone, password } });
        const { access } = result.data;
        localStorage.setItem('token', access);
        delete result.data.access;
    }

    async register({ name, phone, password }: RegisterPayload): Promise<{ data: RegisterPromise }> {
        const result = await handleFetch('api/auth/users/', { method: 'POST', data: { phone, password, name } });
        return result;
    }

    async confirmRegister({ phone, code }: ConfirmRegisterPayload): Promise<void> {
        const result = await handleFetch('api/auth/users/activation/', { method: 'POST', data: { phone, code } });
        const { access } = result.data;
        localStorage.setItem('token', access);
        delete result.data.access;
    }

    async updateUser({ name, phone, currentPassword, newPassword, newPasswordConfirm }: UpdateUserPayload): Promise<void> {
        const requestData = {
            name,
            phone,
            current_password: currentPassword,
            new_password: newPassword,
            re_new_password: newPasswordConfirm,
        };
        const result = await handleFetch('api/auth/users/me/', { method: 'PATCH', data: requestData });
        return result;
    }

    async confirmUpdateUser({ code }: ConfirmUpdateUser): Promise<{ data: UserExtra }> {
        const result = await handleFetch('api/auth/users/me/set-phone/confirm/', { method: 'POST', data: { code } });
        console.log(result);
    }

    async logOut(): Promise<void> {
        const result = await handleFetch('api/auth/jwt/logout/', { method: 'POST' });
        if (result) {
            localStorage.removeItem('token');
        }
    }

    async getProfile(): Promise<{ data: User }> {
        const result = await handleFetch('api/auth/users/me/');
        return result;
    }

    async refreshToken(): Promise<void> {
        const result = await handleFetch('api/auth/jwt/refresh/', { method: 'POST' });
        const { access } = result.data;
        localStorage.setItem('token', access);
        delete result.data.access;
    }
}
