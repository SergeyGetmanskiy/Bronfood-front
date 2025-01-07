/* import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList'; */
import { AdminOrder, AdminService } from './adminService';
import { mockAdminOrders } from './MockAdminOrders';

export class AdminServiceMock implements AdminService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getAdminOrders(): Promise<{ data: AdminOrder[] }> {
        await this._wait(1000);
        const success = true;
        if (success) {
            return await Promise.resolve({ data: mockAdminOrders });
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }

    /*     async setFavorites(restId: number): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            const rest: Restaurant | undefined = mockRestaurants.find((rest) => restId === rest.id);
            if (rest) {
                rest.isLiked = true;
                mockUser.favorites.push(rest);
            }
        } else {
            throw new Error('Ресторан не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }

    async deleteFavorites(restId: number): Promise<{ status: 'success'; data: Restaurant[] | null } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            const rest = mockRestaurants.find((rest) => restId === rest.id);
            if (rest) {
                const newFavorites: Restaurant[] = mockUser.favorites.filter((rest) => rest.id !== restId) ?? null;
                rest.isLiked = false;
                mockUser.favorites = newFavorites;
            }
        } else {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    } */
}
