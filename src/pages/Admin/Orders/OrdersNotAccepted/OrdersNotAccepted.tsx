import Accordions from '../Accordions/Accordions';
import { mockOrders } from './MockOrdersNotAccepted';

export interface MockOrder {
    summary: {
        userName: string;
        orderCode: string;
    };
}

function OrdersNotAccepted() {
    return <Accordions data={mockOrders} />;
}

export default OrdersNotAccepted;
