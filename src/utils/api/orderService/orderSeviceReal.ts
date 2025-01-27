import { OrderState } from './orderService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class OrderServiceReal {
    async fetchOrderIdByUserId(userId: string): Promise<{ status: 'success'; data: { id: string }[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/orders?clientId=${userId}`);
    }

    async fetchOrderedMealByOrderId(id: string): Promise<{ status: 'success'; data: OrderState[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/orders?id=${id}`);
    }

    async cancelOrder(id: string): Promise<{ status: 'success'; data: void } | { status: 'error'; error_message: string }> {
        const options = {
            method: 'PATCH',
            data: { cancellationStatus: 'requested', isCancellationRequested: true },
        };
        return handleFetch(`api/orders/${id}`, options);
    }

    async checkPreparationStatus(orderId: string): Promise<{ status: 'success'; data: { preparationStatus: 'confirmed' | 'waiting' | 'notConfirmed' }[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/orders?id=${orderId}`);
    }

    async submitOrderFeedback(restaurantId: number, rating: number, comment: string): Promise<{ status: 'success'; data: void } | { status: 'error'; error_message: string }> {
        console.log(restaurantId, rating, comment);
        const options = {
            method: 'POST',
            data: { rating, comment },
        };
        return handleFetch(`api/review/${restaurantId}/`, options);
    }
}

export default OrderServiceReal;
