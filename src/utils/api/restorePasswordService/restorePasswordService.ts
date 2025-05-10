import { RestorePasswordServiceReal } from './restorePasswordServiceReal';

export type RestorePassword = {
    /**
     * User's phone number
     */
    phoneNumber: string;
};

export type NewPassword = {
    /**
     * User's phone number
     */
    phoneNumber: string;
    /**
     * New password
     */
    newPassword: string;
    /**
     * Code to verify user is owner of the phone number
     */
    verificationСode: string;
};

export interface RestorePasswordService {
    queryPhoneNumber: (phone: string) => Promise<void>;
    setNewPassword: (phone: string, newPassword: string, verificationCode: string) => Promise<void>;
    verifyPasswordChange: (temp_data_code: string, confirmation_code: string) => Promise<void>;
}

export const restorePasswordService = new RestorePasswordServiceReal();
