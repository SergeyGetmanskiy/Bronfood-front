import { mockAdminOrders } from '../../../../utils/api/adminService/MockAdminOrders';
import AccordionList from '../AccordionList/AccordionList';

function OrdersNotAccepted() {
    const ordersNotAccepted = mockAdminOrders;

    return <AccordionList data={ordersNotAccepted} />;
}

export default OrdersNotAccepted;
