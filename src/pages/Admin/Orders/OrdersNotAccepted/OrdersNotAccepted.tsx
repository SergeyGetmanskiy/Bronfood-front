import Accordions from '../AccordionList/AccordionList';
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
