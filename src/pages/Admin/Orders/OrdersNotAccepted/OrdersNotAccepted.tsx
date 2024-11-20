import Accordions from '../Accordions/Accordions';
import { mockOrders } from './MockOrdersNotAccepted';

function OrdersNotAccepted() {
    return <Accordions data={mockOrders} />;
}

export default OrdersNotAccepted;
