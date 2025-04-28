import { Restaurant } from '../restaurantsService/restaurantsService';
import { CateringServiceMock } from './cateringServiceMock';

export type Administrator = {
    id: string;
    login: string;
    password: string;
    restaurant: Restaurant;
};

export interface CateringService {
    getAdministrators: () => Promise<{ data: Administrator[] }>;
    getAdministratorById: (id: string) => Promise<{ data: Administrator }>;
    createAdministrator: (data: Omit<Administrator, 'id'>) => Promise<{ data: Administrator }>;
    updateAdministrator: (data: Partial<Administrator> & { id: string }) => Promise<{ data: Administrator }>;
    deleteAdministrator: (id: string) => Promise<{ success: boolean }>;
}

export const cateringService = new CateringServiceMock();
