import { AdminOrder, AdminOrderStatus, AdminService } from './adminService';
import { mockAdminOrders } from './MockAdminOrders';

export class AdminServiceMock implements AdminService {
    private adminOrders: AdminOrder[] = mockAdminOrders;

    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getAdminOrders(): Promise<{ data: AdminOrder[] }> {
        await this._wait(1000);
        const success = true;
        if (success) {
            return await Promise.resolve({ data: this.adminOrders });
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }

    async changeAdminOrderStatus(id: number, status: AdminOrderStatus): Promise<void> {
        await this._wait(500);
        const success = true;
        if (success) {
            this.adminOrders = this.adminOrders.map((order) => (order.id === id ? { ...order, status } : order));
            return await Promise.resolve();
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }
}
