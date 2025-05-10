import { RestorePasswordService } from './restorePasswordService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class RestorePasswordServiceReal implements RestorePasswordService {
    async queryPhoneNumber(phone: string): Promise<Response> {
        return handleFetch('api/auth/users/password/reset/send-code/', { method: 'POST', data: { phone } });
    }

    async setNewPassword(password: string, password_confirm: string, temp_data_code: string): Promise<Response> {
        return handleFetch('client/change_password/confirmation/', { method: 'POST', data: { password, password_confirm, temp_data_code } });
    }

    async verifyPasswordChange(temp_data_code: string, confirmation_code: string): Promise<Response> {
        return handleFetch('client/change_password/complete/', { method: 'PATCH', data: { confirmation_code, temp_data_code } });
    }
}
