import { AuthService, ConfirmUpdateUser, User, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser, UserExtra, UserExtended } from './authService';
import { handleFetch } from '../serviceFuncs/handleFetch';
import { jwtDecode } from 'jwt-decode';

export class AuthServiceReal implements AuthService {
    /* contracts https://www.notion.so/Api-Auth-b7317228f7134259a5089a7d05e79bb2 */

    async login({ phone, password }: LoginData): Promise<{ data: User }> {
        const result = await handleFetch('signin/', { method: 'POST', data: { phone, password } });
        const { auth_token } = result.data;
        localStorage.setItem('token', auth_token);
        delete result.data.auth_token;
        return result;
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
        return handleFetch('client/signout/', { method: 'POST' });
    }

    async checkAuthorization(): Promise<{ data: User }> {
        const result = await handleFetch('client/profile/', { method: 'GET' });
        const { auth_token } = result.data;
        localStorage.setItem('token', auth_token);
        delete result.data.auth_token;
        delete result.status;
        return result;
    }
}
