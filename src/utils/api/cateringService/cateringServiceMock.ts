import { mockCateringService } from './MockCateringService';
import { CateringService, Administrator } from './cateringService';

export class CateringServiceMock implements CateringService {
    private administrators: Administrator[] = mockCateringService;

    async getAdministrators(): Promise<{ data: Administrator[] }> {
        const success = true;
        if (success) {
            return await Promise.resolve({ data: this.administrators });
        } else {
            return await Promise.reject(new Error('Произошла ошибка getAdministrators'));
        }
    }

    async getAdministratorById(id: string): Promise<{ data: Administrator }> {
        const success = true;
        if (success) {
            const admin = this.administrators.find((a) => a.id === id);
            if (admin) {
                return await Promise.resolve({ data: admin });
            }
            return await Promise.reject(new Error('Error: administrator not found'));
        } else {
            return await Promise.reject(new Error('Error server'));
        }
    }

    async createAdministrator(data: Omit<Administrator, 'id'>): Promise<{ data: Administrator }> {
        const newAdministrator = {
            ...data,
            id: Date.now().toString(),
        };

        this.administrators.push(newAdministrator);
        return { data: newAdministrator };
    }
}
