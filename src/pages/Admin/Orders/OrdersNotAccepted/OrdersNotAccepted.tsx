import AccordionList from '../AccordionList/AccordionList';
import { mockOrders } from './MockOrdersNotAccepted';

export interface MockOrder {
    summary: {
        userName: string;
        orderCode: string;
    };
}

function OrdersNotAccepted() {
    return <AccordionList data={mockOrders} />;
}

export default OrdersNotAccepted;
