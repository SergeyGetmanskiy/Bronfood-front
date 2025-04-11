import { mockCateringService } from './MockCateringService';
import { CateringService, Administrator } from './cateringService';

export class CateringServiceMock implements CateringService {
    private administrators: Administrator[] = mockCateringService;

    async getAdministrators(): Promise<{ data: Administrator[] }> {
        const success = true;
        if (success) {
            return await Promise.resolve({ data: this.administrators });
        } else {
            return await Promise.reject(new Error('Error server'));
        }
    }

    async getAdministratorById(id: string): Promise<{ data: Administrator }> {
        const admin = this.administrators.find((a) => a.id === id);
        if (admin) {
            return await Promise.resolve({ data: admin });
        }
        return await Promise.reject(new Error('Error: administrator not found'));
    }

    async createAdministrator(data: Omit<Administrator, 'id'>): Promise<{ data: Administrator }> {
        const newAdministrator = {
            ...data,
            id: Date.now().toString(),
        };

        this.administrators.push(newAdministrator);
        return { data: newAdministrator };
    }

    async updateAdministrator(data: Partial<Administrator> & { id: string }): Promise<{ data: Administrator }> {
        const index = this.administrators.findIndex((a) => a.id === data.id);

        if (index !== -1) {
            this.administrators[index] = { ...this.administrators[index], ...data };
            return await Promise.resolve({ data: this.administrators[index] });
        } else {
            return await Promise.reject(new Error('Error server'));
        }
    }

    async deleteAdministrator(id: string): Promise<{ success: boolean }> {
        const index = this.administrators.findIndex((a) => a.id === id);

        if (index !== -1) {
            this.administrators.splice(index, 1);
            return await Promise.resolve({ success: true });
        } else {
            return await Promise.reject(new Error('Error: administrator not found'));
        }
    }
}
