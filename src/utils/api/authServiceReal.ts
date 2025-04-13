import { AuthService, ConfirmUpdateUser, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser, UserExtra, UserExtended } from './authService';
import { handleFetch } from '../serviceFuncs/handleFetch';
import { jwtDecode } from 'jwt-decode';

export class AuthServiceReal implements AuthService {
    /* contracts https://www.notion.so/Api-Auth-b7317228f7134259a5089a7d05e79bb2 */

    async login({ phone, password }: LoginData): Promise<{ data: UserExtended }> {
        const result = await handleFetch('api/auth/jwt/create/', { method: 'POST', data: { username: phone, password } });
        const { access, refresh } = result.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        const decoded = jwtDecode(access);
        delete result.data.access;
        delete result.data.refresh;
        return decoded;
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ data: { id: number; name: string; phone: string } }> {
        const result = await handleFetch('api/auth/users/', { method: 'POST', data: { phone, password, name: fullname } });
        return result;
    }

    async confirmRegisterPhone({ phone, code }: ConfirmRegisterPhoneData): Promise<{ data: UserExtended }> {
        const result = await handleFetch('api/auth/users/activation/', { method: 'POST', data: { phone, code } });
        const { access, refresh } = result.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        const decoded = jwtDecode(access);
        delete result.data.access;
        delete result.data.refresh;
        return decoded;
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
        const currentRefresh = localStorage.getItem('refresh');
        const result = await handleFetch('api/auth/jwt/logout/', { method: 'POST', data: { refresh: currentRefresh } });
        if (result) {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
        }
    }

    async checkAuthorization(): Promise<{ data: UserExtended }> {
        const currentRefresh = localStorage.getItem('refresh');
        const result = await handleFetch('api/auth/jwt/refresh/', { method: 'POST', data: { refresh: currentRefresh } });
        const { access, refresh } = result.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        const decoded = jwtDecode(access);
        delete result.data.access;
        delete result.data.refresh;
        return decoded;
    }
}
