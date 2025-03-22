import { handleFetch } from '../../serviceFuncs/handleFetch';
import { AdminOrder, AdminOrderFromApi, AdminOrderStatus, AdminService } from './adminService';

export class AdminServiceReal implements AdminService {
    async getAdminOrders(status: AdminOrderStatus): Promise<{ data: AdminOrder[] }> {
        const result: AdminOrderFromApi = await handleFetch(`api/restaurants/admin/orders/?status=${status}&limit=3`);
        const returnResult: AdminOrder[] = result.data.results.map((item) => {
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
