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

    async getAdminOrders(status: AdminOrderStatus): Promise<{ data: AdminOrder[] }> {
        await this._wait(1000);
        const orders = this.adminOrders.filter((order) => order.status === status);
        const success = true;
        if (success) {
            const result = await Promise.resolve({ data: orders });
            const returnResult: AdminOrder[] = result.data.map((item) => {
                const meals = item.meals.map((oldMeal) => {
                    const { meal, ...rest } = oldMeal;
                    const newMeal = {
                        ...rest,
                        meal: {
                            id: meal.id,
                            name: meal.name,
                            price: meal.price,
                            waitingTime: meal.waiting_time,
                        },
                    };
                    return newMeal;
                });
                const result = { ...item, waitingTime: item.waiting_time, meals };
                Reflect.deleteProperty(result, 'waiting_time');
                return result;
            });
            return { data: returnResult };
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }

    async changeAdminOrderStatus(id: number, status: AdminOrderStatus): Promise<void> {
        await this._wait(500);
        const actionAt = status === 'accepted' ? 'acceptedAt' : status === 'ready' ? 'readyAt' : status === 'cancel' ? 'cancelledAt' : status === 'archive' ? 'issuedAt' : '';
        const success = true;
        if (success) {
            this.adminOrders = this.adminOrders.map((order) => (order.id === id ? { ...order, status, [actionAt]: this._getDate() } : order));
            return await Promise.resolve();
        } else {
            return await Promise.reject(new Error('Произошла ошибка'));
        }
    }
}
