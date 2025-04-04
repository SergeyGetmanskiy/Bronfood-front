import { Restaurant } from '../restaurantsService/restaurantsService';
import { CateringServiceMock } from './cateringServiceMock';

export type Administrator = {
    id: string;
    login: string;
    password: string;
    restaurant?: Restaurant;
};

export interface CateringService {
    getAdministrators: () => Promise<{ data: Administrator[] }>;
}

export const cateringService = new CateringServiceMock();
