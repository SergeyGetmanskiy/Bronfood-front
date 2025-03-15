import { AdminOrder, AdminOrderFromApi, AdminOrderStatus, AdminService } from './adminService';
import { mockAdminOrders } from './MockAdminOrders';

export class AdminServiceMock implements AdminService {
    private adminOrders: AdminOrderFromApi[] = mockAdminOrders;

    _getDate() {
        return new Date();
    }

    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getAdminOrders(): Promise<{ data: AdminOrder[] }> {
        await this._wait(1000);
        const success = true;
        if (success) {
            const result = await Promise.resolve({ data: this.adminOrders });
            const returnResult: AdminOrder[] = result.data.map((item) => {
                const result = { ...item, waitingTime: item.waiting_time };
                delete result.waiting_time;
                return result;
            });
            return { data: returnResult };
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }

    async changeAdminOrderStatus(id: number, status: AdminOrderStatus): Promise<void> {
        await this._wait(500);
        const actionAt = status === 'accepted' ? 'acceptedAt' : status === 'ready' ? 'readyAt' : status === 'cancelled_by_admin' ? 'cancelledAt' : status === 'archive' ? 'issuedAt' : '';
        const success = true;
        if (success) {
            this.adminOrders = this.adminOrders.map((order) => (order.id === id ? { ...order, status, [actionAt]: this._getDate() } : order));
            return await Promise.resolve();
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }
}
